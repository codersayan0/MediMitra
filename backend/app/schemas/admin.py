from typing import Literal

from pydantic import BaseModel, Field


class AdminLoginRequest(BaseModel):
    login_id: str = Field(min_length=1, max_length=100)
    password: str = Field(min_length=1, max_length=200)


class AdminPublic(BaseModel):
    """Safe-to-return admin shape. Never includes the configured admin
    password/login id/JWT secret — those never leave backend/.env."""

    role: Literal["admin"] = "admin"


class AdminTokenResponse(BaseModel):
    access_token: str
    token_type: Literal["bearer"] = "bearer"
    role: Literal["admin"] = "admin"