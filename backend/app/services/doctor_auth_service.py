from app.core.security import create_access_token, hash_secret, verify_secret
from app.schemas.doctor import DoctorRegisterRequest, DoctorTokenResponse
from app.services import doctor_service, otp_service
from app.services.doctor_service import EmailAlreadyExistsError
from app.services.email_service import send_otp_email
from app.services.otp_service import OtpCooldownError, OtpExpiredError, OtpInvalidError, OtpLockedError
from app.utils.id_generator import generate_reset_token


class InvalidCredentialsError(Exception):
    pass


class EmailNotVerifiedError(Exception):
    pass


class EmailNotFoundError(Exception):
    pass


class InvalidResetTokenError(Exception):
    pass


# Deliberately its own module-level dict (not shared with auth_service._reset_tokens)
# so a doctor reset session can never satisfy a patient reset, or vice versa,
# even if the same email is registered under both roles. See Part 23 in the
# accompanying notes for the known limitation (in-memory, single-process) and
# the planned MongoDB-backed replacement.
_reset_tokens: dict[str, str] = {}


async def register_doctor(payload: DoctorRegisterRequest) -> None:
    doc = await doctor_service.create_doctor(payload)  # raises EmailAlreadyExistsError
    otp = await otp_service.issue_otp(doc["email"], purpose="doctor_register")
    await send_otp_email(doc["email"], doc["first_name"], otp)


async def resend_otp(email: str, purpose: str) -> None:
    existing = await doctor_service.find_by_email(email)
    if purpose == "doctor_register" and (not existing or existing["email_verified"]):
        return  # do not reveal account state
    if purpose == "doctor_reset" and not existing:
        return
    first_name = existing["first_name"] if existing else "there"
    otp = await otp_service.issue_otp(email, purpose)
    await send_otp_email(email, first_name, otp)


async def verify_registration_otp(email: str, otp: str) -> DoctorTokenResponse:
    await otp_service.verify_otp(email, purpose="doctor_register", otp=otp)
    doc = await doctor_service.mark_email_verified(email)
    token = create_access_token(subject=doc["doctor_id"], role="doctor")
    return DoctorTokenResponse(access_token=token, doctor=doctor_service.to_public(doc))


async def login_doctor(email: str, password: str, remember_me: bool) -> DoctorTokenResponse:
    doc = await doctor_service.find_by_email(email)
    if not doc or not verify_secret(password, doc["password_hash"]):
        raise InvalidCredentialsError("Incorrect email or password.")
    if not doc["email_verified"]:
        raise EmailNotVerifiedError("Please verify your email before logging in.")

    token = create_access_token(subject=doc["doctor_id"], role="doctor", remember_me=remember_me)
    return DoctorTokenResponse(access_token=token, doctor=doctor_service.to_public(doc))


async def start_forgot_password(email: str) -> None:
    doc = await doctor_service.find_by_email(email)
    if not doc:
        return  # avoid account enumeration — caller always returns a generic message
    otp = await otp_service.issue_otp(email, purpose="doctor_reset")
    await send_otp_email(email, doc["first_name"], otp)


async def verify_reset_otp_and_issue_token(email: str, otp: str) -> str:
    await otp_service.verify_otp(email, purpose="doctor_reset", otp=otp)
    reset_token = generate_reset_token()
    _reset_tokens[email.lower()] = reset_token
    return reset_token


async def reset_password(email: str, reset_token: str, new_password: str) -> None:
    expected = _reset_tokens.get(email.lower())
    if not expected or expected != reset_token:
        raise InvalidResetTokenError("This reset session is invalid or has expired. Please start again.")

    doc = await doctor_service.find_by_email(email)
    if not doc:
        raise EmailNotFoundError("Account not found.")

    await doctor_service.update_password(email, hash_secret(new_password))
    _reset_tokens.pop(email.lower(), None)