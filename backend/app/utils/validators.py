def mask_email(email: str) -> str:
    """Used only in non-sensitive log lines — never logs OTP/password/ID numbers."""
    try:
        local, domain = email.split("@", 1)
    except ValueError:
        return "***"
    visible = local[:2]
    return f"{visible}{'*' * max(len(local) - 2, 1)}@{domain}"