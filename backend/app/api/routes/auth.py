from fastapi import APIRouter, Depends, HTTPException, status

from app.dependencies.auth import get_current_patient
from app.schemas.auth import (
    AuthTokenResponse,
    ForgotPasswordRequest,
    PatientLoginRequest,
    PatientPublic,
    PatientRegisterRequest,
    ResendOtpRequest,
    ResetPasswordRequest,
    VerifyEmailRequest,
    VerifyResetOtpRequest,
    PatientProfileUpdateRequest,
)
from app.schemas.common import ApiResponse
from app.services import auth_service, patient_service
from app.services.otp_service import OtpCooldownError, OtpExpiredError, OtpInvalidError, OtpLockedError
from app.services.patient_service import EmailAlreadyExistsError

router = APIRouter(prefix="/auth/patient", tags=["patient-auth"])


@router.post("/register", response_model=ApiResponse[dict], status_code=status.HTTP_201_CREATED)
async def register(payload: PatientRegisterRequest):
    try:
        await auth_service.register_patient(payload)
    except EmailAlreadyExistsError:
        raise HTTPException(status.HTTP_409_CONFLICT, "An account with this email already exists. Please login instead.")
    return ApiResponse(success=True, message="Registration successful. Please verify your email.")


@router.post("/verify-email", response_model=ApiResponse[AuthTokenResponse])
async def verify_email(payload: VerifyEmailRequest):
    try:
        result = await auth_service.verify_registration_otp(payload.email, payload.otp)
    except OtpExpiredError as exc:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, str(exc))
    except OtpLockedError as exc:
        raise HTTPException(status.HTTP_429_TOO_MANY_REQUESTS, str(exc))
    except OtpInvalidError as exc:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, str(exc))
    return ApiResponse(success=True, data=result, message="Email verified successfully.")


@router.post("/resend-otp", response_model=ApiResponse[dict])
async def resend_otp(payload: ResendOtpRequest):
    try:
        await auth_service.resend_otp(payload.email, payload.purpose)
    except OtpCooldownError as exc:
        raise HTTPException(status.HTTP_429_TOO_MANY_REQUESTS, str(exc))
    return ApiResponse(success=True, message="If eligible, a new code has been sent.")


@router.post("/login", response_model=ApiResponse[AuthTokenResponse])
async def login(payload: PatientLoginRequest):
    try:
        result = await auth_service.login_patient(payload.email, payload.password, payload.remember_me)
    except auth_service.InvalidCredentialsError as exc:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, str(exc))
    except auth_service.EmailNotVerifiedError as exc:
        raise HTTPException(status.HTTP_403_FORBIDDEN, str(exc))
    return ApiResponse(success=True, data=result, message="Login successful.")


@router.post("/forgot-password", response_model=ApiResponse[dict])
async def forgot_password(payload: ForgotPasswordRequest):
    try:
        await auth_service.start_forgot_password(payload.email)
    except OtpCooldownError as exc:
        raise HTTPException(status.HTTP_429_TOO_MANY_REQUESTS, str(exc))
    # Deliberately generic — avoids account enumeration.
    return ApiResponse(success=True, message="If the account exists, a verification code has been sent.")


@router.post("/verify-reset-otp", response_model=ApiResponse[dict])
async def verify_reset_otp(payload: VerifyResetOtpRequest):
    try:
        reset_token = await auth_service.verify_reset_otp_and_issue_token(payload.email, payload.otp)
    except OtpExpiredError as exc:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, str(exc))
    except OtpLockedError as exc:
        raise HTTPException(status.HTTP_429_TOO_MANY_REQUESTS, str(exc))
    except OtpInvalidError as exc:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, str(exc))
    return ApiResponse(success=True, data={"reset_token": reset_token}, message="Code verified.")


@router.post("/reset-password", response_model=ApiResponse[dict])
async def reset_password(payload: ResetPasswordRequest):
    try:
        await auth_service.reset_password(payload.email, payload.reset_token, payload.new_password)
    except auth_service.InvalidResetTokenError as exc:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, str(exc))
    except auth_service.EmailNotFoundError as exc:
        raise HTTPException(status.HTTP_404_NOT_FOUND, str(exc))
    return ApiResponse(success=True, message="Password updated successfully. Please login.")


@router.get("/me", response_model=ApiResponse[PatientPublic])
async def get_me(current=Depends(get_current_patient)):
    return ApiResponse(success=True, data=patient_service.to_public(current))

@router.patch(
    "/profile",
    status_code=status.HTTP_200_OK,
)
async def update_patient_profile(
    payload: PatientProfileUpdateRequest,
    current_patient: dict = Depends(get_current_patient),
):
    updated_patient = await patient_service.update_profile(
        patient_id=current_patient["patient_id"],
        update_data=payload.model_dump(
            exclude_unset=True
        ),
    )

    if updated_patient is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient profile not found.",
        )

    return {
        "success": True,
        "message": "Patient profile updated successfully.",
        "data": patient_service.to_public(
            updated_patient
        ),
    }