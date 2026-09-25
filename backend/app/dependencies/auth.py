from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.security import decode_access_token
from app.services import patient_service

bearer_scheme = HTTPBearer(auto_error=False)


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