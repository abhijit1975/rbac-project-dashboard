from pydantic import BaseModel


class UserCreate(BaseModel):
    email: str
    username: str
    password: str
    role: str


class LoginRequest(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    role: str

    class Config:
        from_attributes = True