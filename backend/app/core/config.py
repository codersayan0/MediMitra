from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Centralized app configuration, loaded from environment variables / .env."""

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    # MongoDB
    mongodb_uri: str
    mongodb_database: str = "MediMitra"

    # JWT
    jwt_secret_key: str
    jwt_algorithm: str = "HS256"
    jwt_access_token_expire_minutes: int = 30
    jwt_remember_me_expire_minutes: int = 10080

    # OTP
    otp_expire_minutes: int = 10
    otp_max_attempts: int = 5
    otp_resend_cooldown_seconds: int = 60

    # Frontend / CORS
    frontend_url: str = "http://localhost:5173"

    # EmailJS
    emailjs_service_id: str = ""
    emailjs_template_id: str = ""
    emailjs_public_key: str = ""
    emailjs_private_key: str = ""

    # OAuth (unset until configured)
    google_oauth_client_id: str = ""
    microsoft_oauth_client_id: str = ""

    # Administrative login — credentials live ONLY here (backend env), never in
    # MongoDB and never sent to the frontend. Empty defaults mean "not
    # configured yet"; admin_auth_service treats that as an always-invalid
    # login rather than crashing the app on startup.
    admin_login_id: str = ""
    admin_login_password: str = ""
    admin_jwt_secret: str = ""


@lru_cache
def get_settings() -> Settings:
    return Settings()