from __future__ import annotations

from datetime import datetime, timezone
from typing import Any


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def build_health_case_document(
    *,
    case_id: str,
    patient_id: str,
    title: str,
    problem_description: str | None,
    language: str,
) -> dict[str, Any]:
    now = utc_now()

    return {
        "case_id": case_id,
        "patient_id": patient_id,

        "title": title,
        "problem_description": problem_description,

        "language": language,

        "status": "draft",

        "interview_status": "not_started",
        "documents_status": "not_started",

        # Reserved for later phases.
        "interview": None,
        "documents": [],
        "analysis": None,
        "summary": None,

        "created_at": now,
        "updated_at": now,
    }