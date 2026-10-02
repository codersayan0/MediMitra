import logging

import httpx

from app.core.config import get_settings
from app.utils.validators import mask_email

logger = logging.getLogger("medimitra.email")

EMAILJS_SEND_URL = "https://api.emailjs.com/api/v1.0/email/send"


async def send_otp_email(
    to_email: str,
    first_name: str,
    otp: str,
) -> bool:
    """
    Send OTP through EmailJS.

    Returns:
        True  -> EmailJS accepted the email
        False -> EmailJS rejected/failed the request
    """

    settings = get_settings()

    # Validate EmailJS configuration
    required_settings = {
        "EMAILJS_SERVICE_ID": settings.emailjs_service_id,
        "EMAILJS_TEMPLATE_ID": settings.emailjs_template_id,
        "EMAILJS_PUBLIC_KEY": settings.emailjs_public_key,
    }

    missing = [
        name
        for name, value in required_settings.items()
        if not value or not value.strip()
    ]

    if missing:
        logger.error(
            "EmailJS configuration missing: %s",
            ", ".join(missing),
        )
        return False

    payload = {
        "service_id": settings.emailjs_service_id.strip(),
        "template_id": settings.emailjs_template_id.strip(),
        "user_id": settings.emailjs_public_key.strip(),
        "template_params": {
            "to_email": to_email,
            "first_name": first_name,
            "otp_code": otp,
            "expire_minutes": settings.otp_expire_minutes,
        },
    }

    # Private key is optional according to EmailJS REST API.
    # Only send it when configured.
    if settings.emailjs_private_key and settings.emailjs_private_key.strip():
        payload["accessToken"] = settings.emailjs_private_key.strip()

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.post(
                EMAILJS_SEND_URL,
                json=payload,
            )

        if response.is_success:
            logger.info(
                "OTP email successfully accepted by EmailJS for %s",
                mask_email(to_email),
            )
            return True

        # IMPORTANT:
        # Log the EmailJS response so we know the actual reason
        # for a 403/400/etc. Never log the OTP or private key.
        safe_response = response.text[:1000]

        logger.error(
            "EmailJS rejected OTP email for %s | status=%s | response=%s",
            mask_email(to_email),
            response.status_code,
            safe_response,
        )

        return False

    except httpx.TimeoutException:
        logger.error(
            "EmailJS request timed out for %s",
            mask_email(to_email),
        )
        return False

    except httpx.RequestError as exc:
        logger.error(
            "EmailJS network error for %s: %s",
            mask_email(to_email),
            exc,
        )
        return False

    except Exception:
        logger.exception(
            "Unexpected EmailJS error for %s",
            mask_email(to_email),
        )
        return False