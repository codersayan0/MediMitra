from datetime import datetime, timezone

from pymongo.errors import DuplicateKeyError

from app.core.database import get_database
from app.core.security import hash_secret
from app.schemas.doctor import DoctorPublic, DoctorRegisterRequest
from app.utils.id_generator import generate_doctor_id


class EmailAlreadyExistsError(Exception):
    """Mirrors patient_service.EmailAlreadyExistsError — kept as its own class
    (not imported/shared) so patient and doctor registration can evolve
    independently without cross-coupling the two services."""


def _to_public(doc: dict) -> DoctorPublic:
    return DoctorPublic(
        id=str(doc["_id"]),
        doctor_id=doc["doctor_id"],
        title=doc["title"],
        first_name=doc["first_name"],
        last_name=doc["last_name"],
        email=doc["email"],
        phone=doc["phone"],
        specialization=doc["specialization"],
        consultation_type=doc["consultation_type"],
        availability=doc["availability"],
        chambers=doc["chambers"],
        role="doctor",
        email_verified=doc["email_verified"],
        created_at=doc["created_at"],
    )


async def find_by_email(email: str) -> dict | None:
    db = get_database()
    return await db.doctors.find_one({"email": email.lower()})


async def find_by_doctor_id(doctor_id: str) -> dict | None:
    db = get_database()
    return await db.doctors.find_one({"doctor_id": doctor_id})


async def create_doctor(payload: DoctorRegisterRequest) -> dict:
    """Creates the doctor. Relies on the unique index on doctors.email as the
    final source of truth for duplicates (race-condition safe), matching
    patient_service.create_patient's approach exactly."""
    db = get_database()
    now = datetime.now(timezone.utc)

    doc = {
        "doctor_id": generate_doctor_id(),
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
        "medical_degree": payload.medical_degree.model_dump(),
        "medical_registration_number": payload.medical_registration_number.strip(),
        "specialization": payload.specialization.strip(),
        "consultation_type": payload.consultation_type,
        "availability": [slot.model_dump() for slot in payload.availability],
        "chambers": [chamber.model_dump() for chamber in payload.chambers],
        "email": payload.email.lower(),
        "phone": payload.phone,
        "password_hash": hash_secret(payload.password),
        "role": "doctor",
        "email_verified": False,
        "terms_accepted": True,
        "terms_accepted_at": now,
        "created_at": now,
        "updated_at": now,
    }

    try:
        result = await db.doctors.insert_one(doc)
    except DuplicateKeyError as exc:
        raise EmailAlreadyExistsError("An account with this email already exists.") from exc

    doc["_id"] = result.inserted_id
    return doc


async def mark_email_verified(email: str) -> dict:
    db = get_database()
    now = datetime.now(timezone.utc)
    await db.doctors.update_one(
        {"email": email.lower()}, {"$set": {"email_verified": True, "updated_at": now}}
    )
    return await find_by_email(email)


async def update_password(email: str, password_hash: str) -> None:
    db = get_database()
    await db.doctors.update_one(
        {"email": email.lower()},
        {"$set": {"password_hash": password_hash, "updated_at": datetime.now(timezone.utc)}},
    )


def to_public(doc: dict) -> DoctorPublic:
    return _to_public(doc)