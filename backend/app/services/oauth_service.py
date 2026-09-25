"""
OAuth architecture placeholder for 'Continue with Google' / 'Continue with Microsoft'.

Not wired to any route yet — no fake login is issued. Once GOOGLE_OAUTH_CLIENT_ID /
MICROSOFT_OAUTH_CLIENT_ID are configured, extend this service to:
  1. Verify the provider's ID token (google-auth / msal),
  2. Look up or create the patient by verified email,
  3. Issue a normal JWT via core.security.create_access_token.

The frontend already shows these buttons and surfaces a clear
"configuration required" message until this is implemented — see
frontend/src/pages/patient/PatientLogin.tsx.
"""

from app.core.config import get_settings

settings = get_settings()


def google_oauth_configured() -> bool:
    return bool(settings.google_oauth_client_id)


def microsoft_oauth_configured() -> bool:
    return bool(settings.microsoft_oauth_client_id)