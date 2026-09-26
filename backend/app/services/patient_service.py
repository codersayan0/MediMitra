from datetime import datetime, timezone

from pymongo.errors import DuplicateKeyError

from app.core.database import get_database
from app.core.security import hash_secret
from app.schemas.auth import PatientPublic, PatientRegisterRequest
from app.utils.id_generator import generate_patient_id


class EmailAlreadyExistsError(Exception):
    pass


def _to_public(doc: dict) -> PatientPublic:
    return PatientPublic(
        id=str(doc["_id"]),
        patient_id=doc["patient_id"],
        title=doc["title"],
        first_name=doc["first_name"],
        last_name=doc["last_name"],
        email=doc["email"],
        phone=doc["phone"],
        role="patient",
        email_verified=doc["email_verified"],
        created_at=doc["created_at"],
    )


async def find_by_email(email: str) -> dict | None:
    db = get_database()
    return await db.patients.find_one({"email": email.lower()})


async def find_by_patient_id(patient_id: str) -> dict | None:
    db = get_database()
    return await db.patients.find_one({"patient_id": patient_id})


async def create_patient(payload: PatientRegisterRequest) -> dict:
    """Creates the patient. Relies on the unique index as the final source of
    truth for duplicate emails (race-condition safe), not just a pre-check."""
    db = get_database()
    now = datetime.now(timezone.utc)

    doc = {
        "patient_id": generate_patient_id(),
        "title": payload.title,
        "first_name": payload.first_name.strip(),
        "last_name": payload.last_name.strip(),
        "date_of_birth": payload.date_of_birth.isoformat(),
        "address": payload.address.strip(),
        "country": payload.country.strip(),
        "state": payload.state.strip(),
        "district": payload.district.strip(),
        "pin_code": payload.pin_code.strip(),
        "id_proof_type": payload.id_proof_type,
        "id_proof_number": payload.id_proof_number.strip(),
        "email": payload.email.lower(),
        "phone": payload.phone,
        "password_hash": hash_secret(payload.password),
        "role": "patient",
        "email_verified": False,
        "terms_accepted": True,
        "terms_accepted_at": now,
        "created_at": now,
        "updated_at": now,
    }

    try:
        result = await db.patients.insert_one(doc)
    except DuplicateKeyError as exc:
        raise EmailAlreadyExistsError("An account with this email already exists.") from exc

    doc["_id"] = result.inserted_id
    return doc


async def mark_email_verified(email: str) -> dict:
    db = get_database()
    now = datetime.now(timezone.utc)
    await db.patients.update_one(
        {"email": email.lower()}, {"$set": {"email_verified": True, "updated_at": now}}
    )
    return await find_by_email(email)


async def update_password(email: str, password_hash: str) -> None:
    db = get_database()
    await db.patients.update_one(
        {"email": email.lower()},
        {"$set": {"password_hash": password_hash, "updated_at": datetime.now(timezone.utc)}},
    )


def to_public(doc: dict) -> PatientPublic:
    return _to_public(doc)

async def update_profile(
    self,
    patient_id: str,
    update_data: dict,
):
    """
    Update allowed patient profile fields.

    Sensitive fields such as password, ID proof number,
    email and patient_id are intentionally not editable here.
    """

    allowed_fields = {
        "phone",
        "address",
        "country",
        "state",
        "district",
        "pin_code",
    }

    update_fields = {
        key: value
        for key, value in update_data.items()
        if key in allowed_fields and value is not None
    }

    if not update_fields:
        return None

    update_fields["updated_at"] = datetime.now(timezone.utc)

    result = await self.collection.update_one(
        {"patient_id": patient_id},
        {"$set": update_fields},
    )

    if result.matched_count == 0:
        return None

    return await self.collection.find_one(
        {"patient_id": patient_id}
    )