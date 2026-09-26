from datetime import datetime, timedelta, timezone
from typing import Any

from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError, VerificationError, InvalidHashError
from jose import JWTError, jwt

from app.core.config import get_settings

settings = get_settings()
_hasher = PasswordHasher()


def hash_secret(raw: str) -> str:
    """Argon2 hash for passwords AND OTPs — neither is ever stored in plain text."""
    return _hasher.hash(raw)


def verify_secret(raw: str, hashed: str) -> bool:
    try:
        return _hasher.verify(hashed, raw)
    except (VerifyMismatchError, VerificationError, InvalidHashError):
        return False


def create_access_token(subject: str, role: str, remember_me: bool = False, secret_key: str | None = None) -> str:
    """JWT carries only sub (patient_id/doctor_id/"admin"), role and exp — no PII, per security policy.

    secret_key is optional and defaults to the shared patient/doctor secret
    (settings.jwt_secret_key), so existing call sites are unaffected. Admin
    login passes settings.admin_jwt_secret explicitly, which means an admin
    token is signed with a completely different key from patient/doctor
    tokens — not just a different role claim.
    """
    minutes = settings.jwt_remember_me_expire_minutes if remember_me else settings.jwt_access_token_expire_minutes
    expire = datetime.now(timezone.utc) + timedelta(minutes=minutes)
    payload = {"sub": subject, "role": role, "exp": expire}
    key = secret_key or settings.jwt_secret_key
    return jwt.encode(payload, key, algorithm=settings.jwt_algorithm)


def decode_access_token(token: str, secret_key: str | None = None) -> dict[str, Any] | None:
    key = secret_key or settings.jwt_secret_key
    try:
        return jwt.decode(token, key, algorithms=[settings.jwt_algorithm])
    except JWTError:
        return None