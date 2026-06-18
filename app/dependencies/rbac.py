from fastapi import HTTPException, status
from app.models.user import User

def require_admin(user: User):
    if user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return user


def require_owner_or_admin(user: User, owner_id: int):
    if user.role == "admin":
        return user

    if user.id != owner_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not allowed"
        )

    return user