from pydantic import BaseModel
from typing import Optional


# ---------------------
# CREATE PROJECT
# ---------------------
class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None


# ---------------------
# UPDATE PROJECT (FIXED MISSING CLASS)
# ---------------------
class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None


# ---------------------
# RESPONSE MODEL
# ---------------------
class ProjectResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    owner_id: int

    class Config:
        from_attributes = True