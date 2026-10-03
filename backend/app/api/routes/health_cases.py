from fastapi import APIRouter, Depends, status

from app.schemas.health_case import (
    CreateHealthCaseRequest,
    CreateHealthCaseResponse,
    HealthCaseResponse,
)
from app.services.health_case_service import health_case_service

from app.dependencies.auth import require_role

router = APIRouter(
    prefix="/patient/health-cases",
    tags=["Patient Health Cases"],
)


@router.post(
    "",
    response_model=CreateHealthCaseResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_health_case(
    payload: CreateHealthCaseRequest,
    current_patient=Depends(require_role("patient")),
):
    patient_id = str(
        current_patient.get("patient_id")
        or current_patient.get("id")
    )

    case = await health_case_service.create_case(
        patient_id=patient_id,
        payload=payload,
    )

    return CreateHealthCaseResponse(case=case)


@router.get(
    "",
    response_model=list[HealthCaseResponse],
)
async def get_my_health_cases(
    current_patient=Depends(require_role("patient")),
):
    patient_id = str(
        current_patient.get("patient_id")
        or current_patient.get("id")
    )

    return await health_case_service.list_cases(
        patient_id=patient_id
    )


@router.get(
    "/{case_id}",
    response_model=HealthCaseResponse,
)
async def get_health_case(
    case_id: str,
    current_patient=Depends(require_role("patient")),
):
    patient_id = str(
        current_patient.get("patient_id")
        or current_patient.get("id")
    )

    return await health_case_service.get_case(
        patient_id=patient_id,
        case_id=case_id,
    )