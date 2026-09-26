import secrets
import string

_ALPHABET = string.ascii_uppercase + string.digits


def generate_patient_id() -> str:
    """MED-P-XXXXXXXX — 8 random uppercase alphanumeric chars."""
    suffix = "".join(secrets.choice(_ALPHABET) for _ in range(8))
    return f"MED-P-{suffix}"


def generate_doctor_id() -> str:
    """MED-D-XXXXXXXX — 8 random uppercase alphanumeric chars."""
    suffix = "".join(secrets.choice(_ALPHABET) for _ in range(8))
    return f"MED-D-{suffix}"


def generate_otp() -> str:
    """Cryptographically secure 6-digit numeric OTP."""
    return "".join(secrets.choice(string.digits) for _ in range(6))


def generate_reset_token() -> str:
    return secrets.token_urlsafe(32)