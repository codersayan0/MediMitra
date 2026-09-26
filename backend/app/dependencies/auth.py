from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.config import get_settings
from app.core.security import decode_access_token
from app.schemas.admin import AdminPublic
from app.services import doctor_service, patient_service

bearer_scheme = HTTPBearer(auto_error=False)
settings = get_settings()


async def get_current_patient(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> dict:
    if credentials is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Not authenticated.")

    payload = decode_access_token(credentials.credentials)
    if not payload or payload.get("role") != "patient":
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid or expired session.")

    doc = await patient_service.find_by_patient_id(payload["sub"])
    if not doc:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Account no longer exists.")

    return doc


async def get_current_doctor(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> dict:
    """Mirrors get_current_patient exactly, but enforces role == 'doctor' so a
    patient JWT can never authenticate a doctor-only endpoint and vice versa."""
    if credentials is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Not authenticated.")

    payload = decode_access_token(credentials.credentials)
    if not payload or payload.get("role") != "doctor":
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid or expired session.")

    doc = await doctor_service.find_by_doctor_id(payload["sub"])
    if not doc:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Account no longer exists.")

    return doc


async def get_current_admin(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> AdminPublic:
    """Admin sessions are signed with their own ADMIN_JWT_SECRET (see
    core/security.py), not the shared patient/doctor secret. That means a
    patient or doctor token cannot be decoded here at all — decode_access_token
    returns None rather than a payload with the wrong role — and an admin
    token is equally unusable against get_current_patient/get_current_doctor.
    There is no admin collection in MongoDB, so unlike the patient/doctor
    dependencies this never does a database lookup."""
    if credentials is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Not authenticated.")

    payload = decode_access_token(credentials.credentials, secret_key=settings.admin_jwt_secret)
    if not payload or payload.get("role") != "admin" or payload.get("sub") != "admin":
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid or expired session.")

    return AdminPublic()