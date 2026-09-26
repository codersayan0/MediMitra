import logging

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from pymongo import ASCENDING

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

    await db.patients.create_index([("email", ASCENDING)], unique=True, name="uniq_email")
    await db.patients.create_index([("patient_id", ASCENDING)], unique=True, name="uniq_patient_id")

    # Doctor collection — same uniqueness guarantees as patients, so duplicate
    # doctor emails are rejected at the database layer, not just in the API
    # (see doctor_service.create_doctor's DuplicateKeyError handling).
    await db.doctors.create_index([("email", ASCENDING)], unique=True, name="uniq_email")
    await db.doctors.create_index([("doctor_id", ASCENDING)], unique=True, name="uniq_doctor_id")

    await db.otp_verifications.create_index([("email", ASCENDING), ("purpose", ASCENDING)], name="email_purpose")
    # TTL index: MongoDB auto-deletes the document once expires_at has passed.
    await db.otp_verifications.create_index([("expires_at", ASCENDING)], expireAfterSeconds=0, name="ttl_expiry")

    logger.info("MongoDB indexes ensured on '%s' (patients, doctors, otp_verifications)", settings.mongodb_database)


async def close_connection() -> None:
    global _client
    if _client is not None:
        _client.close()
        _client = None