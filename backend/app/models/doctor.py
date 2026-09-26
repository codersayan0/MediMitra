from datetime import datetime, date
from typing import Literal
from pydantic import BaseModel

from app.models.patient import IdProofType  # shared enum, same values as patient

DoctorTitle = Literal["Dr"]
ConsultationType = Literal["in_person", "online"]
DayOfWeek = Literal["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]


class DoctorDegreeDoc(BaseModel):
    degree_name: str
    institution: str
    passing_year: int


class DoctorAvailabilityDoc(BaseModel):
    day: DayOfWeek
    start_time: str
    end_time: str


class DoctorChamberDoc(BaseModel):
    name: str
    address: str
    country: str
    state: str
    district: str
    pin_code: str


class DoctorDocument(BaseModel):
    """Shape of a document in the `doctors` MongoDB collection."""

    doctor_id: str
    title: DoctorTitle
    first_name: str
    last_name: str
    date_of_birth: date
    address: str
    country: str
    state: str
    district: str
    pin_code: str
    id_proof_type: IdProofType
    id_proof_number: str
    medical_degree: DoctorDegreeDoc
    medical_registration_number: str
    specialization: str
    consultation_type: list[ConsultationType]
    availability: list[DoctorAvailabilityDoc]
    chambers: list[DoctorChamberDoc]
    email: str
    phone: str
    password_hash: str
    role: Literal["doctor"] = "doctor"
    email_verified: bool = False
    terms_accepted: bool
    terms_accepted_at: datetime
    created_at: datetime
    updated_at: datetime