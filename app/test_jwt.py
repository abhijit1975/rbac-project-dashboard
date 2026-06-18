from app.services.jwt_service import create_access_token

token = create_access_token(
    {
        "sub": "admin@example.com",
        "role": "admin"
    }
)

print(token)