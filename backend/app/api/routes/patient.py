from fastapi import APIRouter, Depends

from app.dependencies.auth import get_current_patient
from app.schemas.auth import PatientPublic
from app.schemas.common import ApiResponse
from app.services import patient_service

router = APIRouter(
    prefix="/patient",
    tags=["patient"],
)


@router.get(
    "/dashboard",
    response_model=ApiResponse[PatientPublic],
)
async def get_patient_dashboard(
    current_patient: dict = Depends(get_current_patient),
):
    """
    Step 1 patient dashboard endpoint.

    Returns only the safe public patient information.
    Password hash and identity document numbers are never returned.
    """

    patient = patient_service.to_public(current_patient)

    return ApiResponse(
        success=True,
        data=patient,
        message="Patient dashboard data loaded successfully.",
    )