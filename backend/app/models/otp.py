from datetime import datetime
from typing import Literal
from pydantic import BaseModel

Purpose = Literal["register", "reset", "doctor_register", "doctor_reset"]


class OtpDocument(BaseModel):
    """Shape of a document in the `otp_verifications` MongoDB collection."""

    email: str
    purpose: Purpose
    otp_hash: str
    attempts: int = 0
    max_attempts: int
    consumed: bool = False
    created_at: datetime
    last_sent_at: datetime
    expires_at: datetime