import logging

import httpx

from app.core.config import get_settings
from app.utils.validators import mask_email

logger = logging.getLogger("medimitra.email")
settings = get_settings()

EMAILJS_SEND_URL = "https://api.emailjs.com/api/v1.0/email/send"


async def send_otp_email(to_email: str, first_name: str, otp: str) -> bool:
    """
    Sends the OTP via the EmailJS REST API, from the server, using the private key.
    The OTP is generated and injected here only — it is never returned to the
    frontend and never logged. If EmailJS isn't configured, this fails loudly
    instead of silently pretending the email was sent.
    """
    if not all(
        [settings.emailjs_service_id, settings.emailjs_template_id, settings.emailjs_public_key, settings.emailjs_private_key]
    ):
        logger.warning("EmailJS is not configured — cannot send OTP email to %s", mask_email(to_email))
        return False

    payload = {
        "service_id": settings.emailjs_service_id,
        "template_id": settings.emailjs_template_id,
        "user_id": settings.emailjs_public_key,
        "accessToken": settings.emailjs_private_key,
        "template_params": {
            "to_email": to_email,
            "first_name": first_name,
            "otp_code": otp,
            "expire_minutes": settings.otp_expire_minutes,
        },
    }

    async with httpx.AsyncClient(timeout=10) as client:
        try:
            response = await client.post(EMAILJS_SEND_URL, json=payload)
            response.raise_for_status()
            logger.info("OTP email dispatched to %s", mask_email(to_email))
            return True
        except httpx.HTTPError as exc:
            logger.error("EmailJS send failed for %s: %s", mask_email(to_email), exc)
            return False