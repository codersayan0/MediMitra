from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


HealthCaseStatus = Literal[
    "draft",
    "interviewing",
    "documents_pending",
    "analyzing",
    "review",
    "ready",
    "appointment_requested",
    "completed",
    "archived",
]

HealthCaseLanguage = Literal["en", "bn", "hi"]

InterviewStatus = Literal[
    "not_started",
    "in_progress",
    "completed",
    "skipped",
]

DocumentsStatus = Literal[
    "not_started",
    "pending",
    "completed",
    "skipped",
]


class CreateHealthCaseRequest(BaseModel):
    title: str = Field(
        min_length=1,
        max_length=160,
    )

    problem_description: str | None = Field(
        default=None,
        max_length=2000,
    )

    language: HealthCaseLanguage = "en"


class HealthCaseResponse(BaseModel):
    id: str
    case_id: str
    patient_id: str

    title: str
    problem_description: str | None = None

    language: HealthCaseLanguage

    status: HealthCaseStatus

    interview_status: InterviewStatus
    documents_status: DocumentsStatus

    created_at: datetime
    updated_at: datetime | None = None


class CreateHealthCaseResponse(BaseModel):
    case: HealthCaseResponse