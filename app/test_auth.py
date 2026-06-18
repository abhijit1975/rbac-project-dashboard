from app.services.auth_service import (
    hash_password,
    verify_password
)

password = "admin123"

hashed = hash_password(password)

print("HASH:", hashed)

print(
    verify_password(
        password,
        hashed
    )
)