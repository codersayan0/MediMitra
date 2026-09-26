import secrets

from app.core.config import get_settings
from app.core.security import create_access_token
from app.schemas.admin import AdminTokenResponse

settings = get_settings()


class InvalidAdminCredentialsError(Exception):
    pass


def _constant_time_eq(a: str, b: str) -> bool:
    """Constant-time string compare — a plain `==` would leak timing info
    about how many leading characters of the admin ID/password matched."""
    return secrets.compare_digest(a.encode("utf-8"), b.encode("utf-8"))


async def login_admin(login_id: str, password: str) -> AdminTokenResponse:
    """Validates against ADMIN_LOGIN_ID / ADMIN_LOGIN_PASSWORD from backend/.env
    only — there is no admin collection in MongoDB and the plaintext env
    password is never hashed into the database. Always raises the same
    InvalidAdminCredentialsError on any failure (missing config, wrong ID,
    wrong password) so the response never reveals which part was wrong."""
    expected_id = settings.admin_login_id
    expected_password = settings.admin_login_password

    if not expected_id or not expected_password or not settings.admin_jwt_secret:
        # Administrative login has not been configured on this deployment yet.
        raise InvalidAdminCredentialsError("Invalid administrative credentials.")

    id_matches = _constant_time_eq(login_id, expected_id)
    password_matches = _constant_time_eq(password, expected_password)
    if not (id_matches and password_matches):
        raise InvalidAdminCredentialsError("Invalid administrative credentials.")

    token = create_access_token(subject="admin", role="admin", secret_key=settings.admin_jwt_secret)
    return AdminTokenResponse(access_token=token, role="admin")