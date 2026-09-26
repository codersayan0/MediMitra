import re
from datetime import date, datetime
from typing import Literal, Optional

from pydantic import BaseModel, EmailStr, Field, field_validator

PASSWORD_RE = re.compile(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$")
PHONE_RE = re.compile(r"^\+?[1-9]\d{7,14}$")
OTP_RE = re.compile(r"^\d{6}$")


def _validate_password(value: str) -> str:
    if not PASSWORD_RE.match(value):
        raise ValueError(
            "Password must be at least 8 characters and include an uppercase letter, "
            "a lowercase letter, a digit, and a special character."
        )
    return value


class PatientRegisterRequest(BaseModel):
    title: Literal["Mr", "Mrs", "Miss"]
    first_name: str = Field(min_length=1, max_length=80)
    last_name: str = Field(min_length=1, max_length=80)
    date_of_birth: date
    address: str = Field(min_length=3, max_length=300)
    country: str = Field(min_length=2, max_length=80)
    state: str = Field(min_length=2, max_length=80)
    district: str = Field(min_length=2, max_length=80)
    pin_code: str = Field(min_length=3, max_length=12)
    id_proof_type: Literal["aadhaar", "voter_id", "driving_licence"]
    id_proof_number: str = Field(min_length=4, max_length=40)
    email: EmailStr
    phone: str
    password: str
    confirm_password: str
    terms_accepted: bool

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        if not PHONE_RE.match(v):
            raise ValueError("Enter a valid phone number, e.g. +919876543210")
        return v

    @field_validator("date_of_birth")
    @classmethod
    def validate_dob(cls, v: date) -> date:
        if v >= date.today():
            raise ValueError("Date of birth must be in the past")
        return v

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        return _validate_password(v)

    @field_validator("confirm_password")
    @classmethod
    def validate_confirm(cls, v: str, info):
        if "password" in info.data and v != info.data["password"]:
            raise ValueError("Passwords do not match")
        return v

    @field_validator("terms_accepted")
    @classmethod
    def validate_terms(cls, v: bool) -> bool:
        if not v:
            raise ValueError("You must accept the Terms & Conditions")
        return v


class PatientLoginRequest(BaseModel):
    email: EmailStr
    password: str
    remember_me: bool = False


class VerifyEmailRequest(BaseModel):
    email: EmailStr
    otp: str = Field(pattern=OTP_RE.pattern)


class ResendOtpRequest(BaseModel):
    email: EmailStr
    purpose: Literal["register", "reset"] = "register"


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class VerifyResetOtpRequest(BaseModel):
    email: EmailStr
    otp: str = Field(pattern=OTP_RE.pattern)


class ResetPasswordRequest(BaseModel):
    email: EmailStr
    reset_token: str
    new_password: str
    confirm_new_password: str

    @field_validator("new_password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        return _validate_password(v)

    @field_validator("confirm_new_password")
    @classmethod
    def validate_confirm(cls, v: str, info):
        if "new_password" in info.data and v != info.data["new_password"]:
            raise ValueError("Passwords do not match")
        return v


class PatientPublic(BaseModel):
    """Safe-to-return patient shape — never includes password_hash / raw ID numbers."""

    id: str
    patient_id: str
    title: str
    first_name: str
    last_name: str
    email: str
    phone: str
    role: str = "patient"
    email_verified: bool
    created_at: datetime


class AuthTokenResponse(BaseModel):
    access_token: str
    token_type: Literal["bearer"] = "bearer"
    patient: PatientPublic

class PatientProfileUpdateRequest(BaseModel):
    phone: Optional[str] = Field(
        default=None,
        min_length=10,
        max_length=15,
    )

    address: Optional[str] = Field(
        default=None,
        min_length=3,
        max_length=500,
    )

    country: Optional[str] = Field(
        default=None,
        min_length=2,
        max_length=100,
    )

    state: Optional[str] = Field(
        default=None,
        min_length=2,
        max_length=100,
    )

    district: Optional[str] = Field(
        default=None,
        min_length=2,
        max_length=100,
    )

    pin_code: Optional[str] = Field(
        default=None,
        min_length=4,
        max_length=10,
    )

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value):
        if value is None:
            return value

        cleaned = value.strip()

        if not cleaned.isdigit():
            raise ValueError("Phone number must contain only digits.")

        return cleaned

    @field_validator(
        "address",
        "country",
        "state",
        "district",
        "pin_code",
    )
    @classmethod
    def clean_text_fields(cls, value):
        if value is None:
            return value

        return value.strip()


class PatientProfileResponse(BaseModel):
    id: str
    patient_id: str

    title: str
    first_name: str
    last_name: str

    date_of_birth: str

    address: str
    country: str
    state: str
    district: str
    pin_code: str

    email: str
    phone: str

    role: str = "patient"
    email_verified: bool

    created_at: datetime
    updated_at: Optional[datetime] = None