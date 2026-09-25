from datetime import datetime, timezone

from app.core.security import create_access_token, hash_secret, verify_secret
from app.schemas.auth import AuthTokenResponse, PatientRegisterRequest
from app.services import otp_service, patient_service
from app.services.email_service import send_otp_email
from app.services.otp_service import OtpCooldownError, OtpExpiredError, OtpInvalidError, OtpLockedError
from app.services.patient_service import EmailAlreadyExistsError
from app.utils.id_generator import generate_reset_token


class InvalidCredentialsError(Exception):
    pass


class EmailNotVerifiedError(Exception):
    pass


class EmailNotFoundError(Exception):
    pass


class InvalidResetTokenError(Exception):
    pass


_reset_tokens: dict[str, str] = {}  # email -> reset_token, set only after OTP verification


async def register_patient(payload: PatientRegisterRequest) -> None:
    doc = await patient_service.create_patient(payload)  # raises EmailAlreadyExistsError
    otp = await otp_service.issue_otp(doc["email"], purpose="register")
    await send_otp_email(doc["email"], doc["first_name"], otp)


async def resend_otp(email: str, purpose: str) -> None:
    existing = await patient_service.find_by_email(email)
    if purpose == "register" and (not existing or existing["email_verified"]):
        return  # do not reveal account state
    if purpose == "reset" and not existing:
        return
    first_name = existing["first_name"] if existing else "there"
    otp = await otp_service.issue_otp(email, purpose)
    await send_otp_email(email, first_name, otp)


async def verify_registration_otp(email: str, otp: str) -> AuthTokenResponse:
    await otp_service.verify_otp(email, purpose="register", otp=otp)
    doc = await patient_service.mark_email_verified(email)
    token = create_access_token(subject=doc["patient_id"], role="patient")
    return AuthTokenResponse(access_token=token, patient=patient_service.to_public(doc))


async def login_patient(email: str, password: str, remember_me: bool) -> AuthTokenResponse:
    doc = await patient_service.find_by_email(email)
    if not doc or not verify_secret(password, doc["password_hash"]):
        raise InvalidCredentialsError("Incorrect email or password.")
    if not doc["email_verified"]:
        raise EmailNotVerifiedError("Please verify your email before logging in.")

    token = create_access_token(subject=doc["patient_id"], role="patient", remember_me=remember_me)
    return AuthTokenResponse(access_token=token, patient=patient_service.to_public(doc))


async def start_forgot_password(email: str) -> None:
    doc = await patient_service.find_by_email(email)
    if not doc:
        return  # avoid account enumeration — caller always returns a generic message
    otp = await otp_service.issue_otp(email, purpose="reset")
    await send_otp_email(email, doc["first_name"], otp)


async def verify_reset_otp(email: str) -> None:
    pass  # placeholder for symmetry; actual verification happens in verify_reset_otp_and_issue_token


async def verify_reset_otp_and_issue_token(email: str, otp: str) -> str:
    try:
        await otp_service.verify_otp(email, purpose="reset", otp=otp)
    except (OtpInvalidError, OtpExpiredError, OtpLockedError):
        raise
    reset_token = generate_reset_token()
    _reset_tokens[email.lower()] = reset_token
    return reset_token


async def reset_password(email: str, reset_token: str, new_password: str) -> None:
    expected = _reset_tokens.get(email.lower())
    if not expected or expected != reset_token:
        raise InvalidResetTokenError("This reset session is invalid or has expired. Please start again.")

    doc = await patient_service.find_by_email(email)
    if not doc:
        raise EmailNotFoundError("Account not found.")

    await patient_service.update_password(email, hash_secret(new_password))
    _reset_tokens.pop(email.lower(), None)