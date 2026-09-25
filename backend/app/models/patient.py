from datetime import datetime, date
from typing import Literal, Optional
from pydantic import BaseModel, Field

Title = Literal["Mr", "Mrs", "Miss"]
IdProofType = Literal["aadhaar", "voter_id", "driving_licence"]


class PatientDocument(BaseModel):
    """Shape of a document in the `patients` MongoDB collection."""

    patient_id: str
    title: Title
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
    email: str
    phone: str
    password_hash: str
    role: Literal["patient"] = "patient"
    email_verified: bool = False
    terms_accepted: bool
    terms_accepted_at: datetime
    created_at: datetime
    updated_at: datetime