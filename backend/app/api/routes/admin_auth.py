from fastapi import APIRouter, Depends, HTTPException, status

from app.dependencies.auth import get_current_admin
from app.schemas.admin import AdminLoginRequest, AdminPublic, AdminTokenResponse
from app.schemas.common import ApiResponse
from app.services import admin_auth_service
from app.services.admin_auth_service import InvalidAdminCredentialsError

router = APIRouter(prefix="/auth/admin", tags=["admin-auth"])


@router.post("/login", response_model=ApiResponse[AdminTokenResponse])
async def login(payload: AdminLoginRequest):
    try:
        result = await admin_auth_service.login_admin(payload.login_id, payload.password)
    except InvalidAdminCredentialsError as exc:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, str(exc))
    return ApiResponse(success=True, data=result, message="Administrative login successful.")


@router.get("/me", response_model=ApiResponse[AdminPublic])
async def get_me(current: AdminPublic = Depends(get_current_admin)):
    return ApiResponse(success=True, data=current)