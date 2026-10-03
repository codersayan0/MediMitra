from __future__ import annotations

import secrets
from datetime import datetime, timezone
from typing import Any

from bson import ObjectId
from fastapi import HTTPException, status

from app.core.database import get_database
from app.models.health_case import build_health_case_document
from app.schemas.health_case import (
    CreateHealthCaseRequest,
    HealthCaseResponse,
)


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def generate_case_id() -> str:
    token = secrets.token_hex(4).upper()

    return f"CASE-{datetime.now().year}-{token}"


def serialize_case(
    document: dict[str, Any],
) -> HealthCaseResponse:

    return HealthCaseResponse(
        id=str(document["_id"]),
        case_id=document["case_id"],
        patient_id=document["patient_id"],
        title=document["title"],
        problem_description=document.get(
            "problem_description"
        ),
        language=document.get(
            "language",
            "en",
        ),
        status=document.get(
            "status",
            "draft",
        ),
        interview_status=document.get(
            "interview_status",
            "not_started",
        ),
        documents_status=document.get(
            "documents_status",
            "not_started",
        ),
        created_at=document["created_at"],
        updated_at=document.get(
            "updated_at"
        ),
    )


class HealthCaseService:

    async def create_case(
        self,
        patient_id: str,
        payload: CreateHealthCaseRequest,
    ) -> HealthCaseResponse:

        db = get_database()
        collection = db.health_cases

        case_id = generate_case_id()

        document = build_health_case_document(
            case_id=case_id,
            patient_id=patient_id,
            title=payload.title.strip(),
            problem_description=(
                payload.problem_description.strip()
                if payload.problem_description
                else None
            ),
            language=payload.language,
        )

        result = await collection.insert_one(
            document
        )

        document["_id"] = result.inserted_id

        return serialize_case(document)

    async def list_cases(
        self,
        patient_id: str,
    ) -> list[HealthCaseResponse]:

        db = get_database()
        collection = db.health_cases

        cursor = (
            collection
            .find(
                {
                    "patient_id": patient_id,
                }
            )
            .sort(
                "created_at",
                -1,
            )
        )

        documents = await cursor.to_list(
            length=100
        )

        return [
            serialize_case(document)
            for document in documents
        ]

    async def get_case(
        self,
        patient_id: str,
        case_id: str,
    ) -> HealthCaseResponse:

        db = get_database()
        collection = db.health_cases

        document = await collection.find_one(
            {
                "case_id": case_id,
                "patient_id": patient_id,
            }
        )

        if not document:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Health case not found.",
            )

        return serialize_case(document)


health_case_service = HealthCaseService()