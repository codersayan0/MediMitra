from datetime import date, datetime
from typing import Literal

from pydantic import BaseModel, EmailStr, Field, field_validator

from app.schemas.auth import PASSWORD_RE, PHONE_RE, OTP_RE, _validate_password

CURRENT_YEAR = date.today().year
TIME_RE_PATTERN = r"^([01]\d|2[0-3]):[0-5]\d$"  # 24-hour "HH:MM"


class DoctorDegree(BaseModel):
    degree_name: str = Field(min_length=2, max_length=120)
    institution: str = Field(min_length=2, max_length=160)
    passing_year: int = Field(ge=1950, le=CURRENT_YEAR)


class DoctorAvailability(BaseModel):
    day: Literal["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    start_time: str = Field(pattern=TIME_RE_PATTERN)
    end_time: str = Field(pattern=TIME_RE_PATTERN)

    @field_validator("end_time")
    @classmethod
    def validate_range(cls, v: str, info):
        if "start_time" in info.data and v <= info.data["start_time"]:
            raise ValueError("End time must be after start time")
        return v


class DoctorChamber(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    address: str = Field(min_length=3, max_length=300)
    country: str = Field(min_length=2, max_length=80)
    state: str = Field(min_length=2, max_length=80)
    district: str = Field(min_length=2, max_length=80)
    pin_code: str = Field(min_length=3, max_length=12)


class DoctorRegisterRequest(BaseModel):
    title: Literal["Dr"]
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
    medical_degree: DoctorDegree
    medical_registration_number: str = Field(min_length=3, max_length=60)
    specialization: str = Field(min_length=2, max_length=80)
    consultation_type: list[Literal["in_person", "online"]] = Field(min_length=1)
    availability: list[DoctorAvailability] = []
    chambers: list[DoctorChamber] = []
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


class DoctorResendOtpRequest(BaseModel):
    """Separate from patient's ResendOtpRequest: doctor purposes are
    namespaced (doctor_register / doctor_reset) so a doctor OTP request can
    never be misread as a patient one, and vice versa."""

    email: EmailStr
    purpose: Literal["doctor_register", "doctor_reset"] = "doctor_register"


class DoctorLoginRequest(BaseModel):
    email: EmailStr
    password: str
    remember_me: bool = False


class DoctorPublic(BaseModel):
    """Safe-to-return doctor shape. Never includes password_hash, OTP, reset
    token, medical document, profile image, or id_proof_number/type."""

    id: str
    doctor_id: str
    title: str
    first_name: str
    last_name: str
    email: str
    phone: str
    specialization: str
    consultation_type: list[str]
    availability: list[DoctorAvailability]
    chambers: list[DoctorChamber]
    role: str = "doctor"
    email_verified: bool
    created_at: datetime


class DoctorTokenResponse(BaseModel):
    access_token: str
    token_type: Literal["bearer"] = "bearer"
    doctor: DoctorPublic