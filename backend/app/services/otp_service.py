from datetime import datetime, timedelta, timezone

from app.core.config import get_settings
from app.core.database import get_database
from app.core.security import hash_secret, verify_secret
from app.utils.id_generator import generate_otp

settings = get_settings()


class OtpCooldownError(Exception):
    pass


class OtpInvalidError(Exception):
    pass


class OtpExpiredError(Exception):
    pass


class OtpLockedError(Exception):
    pass


async def issue_otp(email: str, purpose: str) -> str:
    """Creates (or replaces) an OTP for this email+purpose, respecting resend cooldown."""
    db = get_database()
    now = datetime.now(timezone.utc)

    existing = await db.otp_verifications.find_one({"email": email, "purpose": purpose})
    if existing:
        elapsed = (now - existing["last_sent_at"]).total_seconds()
        if elapsed < settings.otp_resend_cooldown_seconds:
            raise OtpCooldownError(f"Please wait {int(settings.otp_resend_cooldown_seconds - elapsed)}s before requesting another code.")

    otp = generate_otp()
    doc = {
        "email": email,
        "purpose": purpose,
        "otp_hash": hash_secret(otp),
        "attempts": 0,
        "max_attempts": settings.otp_max_attempts,
        "consumed": False,
        "created_at": now,
        "last_sent_at": now,
        "expires_at": now + timedelta(minutes=settings.otp_expire_minutes),
    }
    await db.otp_verifications.update_one(
        {"email": email, "purpose": purpose}, {"$set": doc}, upsert=True
    )
    return otp  # returned only to caller for emailing — never persisted in plain text


async def verify_otp(email: str, purpose: str, otp: str) -> None:
    db = get_database()
    record = await db.otp_verifications.find_one({"email": email, "purpose": purpose})
    now = datetime.now(timezone.utc)

    if not record or record.get("consumed"):
        raise OtpInvalidError("Invalid or expired verification code.")

    if record["expires_at"].replace(tzinfo=timezone.utc) < now:
        raise OtpExpiredError("This verification code has expired. Please request a new one.")

    if record["attempts"] >= record["max_attempts"]:
        raise OtpLockedError("Too many incorrect attempts. Please request a new code.")

    if not verify_secret(otp, record["otp_hash"]):
        await db.otp_verifications.update_one({"_id": record["_id"]}, {"$inc": {"attempts": 1}})
        raise OtpInvalidError("Invalid verification code.")

    await db.otp_verifications.update_one({"_id": record["_id"]}, {"$set": {"consumed": True}})