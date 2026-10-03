import logging

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from pymongo import ASCENDING, DESCENDING

from app.core.config import get_settings

logger = logging.getLogger("medimitra.database")
settings = get_settings()

_client: AsyncIOMotorClient | None = None
_db: AsyncIOMotorDatabase | None = None


def get_client() -> AsyncIOMotorClient:
    global _client

    if _client is None:
        _client = AsyncIOMotorClient(settings.mongodb_uri)

    return _client


def get_database() -> AsyncIOMotorDatabase:
    global _db

    if _db is None:
        _db = get_client()[settings.mongodb_database]

    return _db


async def connect_and_init_indexes() -> None:
    db = get_database()

    # ============================================================
    # PATIENT INDEXES
    # ============================================================

    await db.patients.create_index(
        [("email", ASCENDING)],
        unique=True,
        name="uniq_email",
    )

    await db.patients.create_index(
        [("patient_id", ASCENDING)],
        unique=True,
        name="uniq_patient_id",
    )

    # ============================================================
    # DOCTOR INDEXES
    # ============================================================

    await db.doctors.create_index(
        [("email", ASCENDING)],
        unique=True,
        name="uniq_email",
    )

    await db.doctors.create_index(
        [("doctor_id", ASCENDING)],
        unique=True,
        name="uniq_doctor_id",
    )

    # ============================================================
    # OTP INDEXES
    # ============================================================

    await db.otp_verifications.create_index(
        [
            ("email", ASCENDING),
            ("purpose", ASCENDING),
        ],
        name="email_purpose",
    )

    # MongoDB automatically removes expired OTP documents.
    await db.otp_verifications.create_index(
        [("expires_at", ASCENDING)],
        expireAfterSeconds=0,
        name="ttl_expiry",
    )

    # ============================================================
    # HEALTH CASE INDEXES
    # ============================================================

    # Every health case gets a globally unique case ID.
    await db.health_cases.create_index(
        [("case_id", ASCENDING)],
        unique=True,
        name="uniq_case_id",
    )

    # Fast retrieval of a patient's cases,
    # newest cases first.
    await db.health_cases.create_index(
        [
            ("patient_id", ASCENDING),
            ("created_at", DESCENDING),
        ],
        name="patient_created_at",
    )

    # Useful later for filtering:
    # draft / interviewing / analyzing / completed / etc.
    await db.health_cases.create_index(
        [
            ("patient_id", ASCENDING),
            ("status", ASCENDING),
        ],
        name="patient_status",
    )

    logger.info(
        "MongoDB indexes ensured on '%s' "
        "(patients, doctors, otp_verifications, health_cases)",
        settings.mongodb_database,
    )


async def close_connection() -> None:
    global _client

    if _client is not None:
        _client.close()
        _client = None