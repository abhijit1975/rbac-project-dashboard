from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectUpdate
from app.dependencies.auth import get_current_user
from app.dependencies.rbac import require_admin, require_owner_or_admin

router = APIRouter(prefix="/api/v1/projects", tags=["Projects"])


# -------------------------
# CREATE PROJECT
# -------------------------
@router.post("/")
def create_project(
    data: ProjectCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    project = Project(
        name=data.name,
        description=data.description,
        owner_id=current_user.id
    )

    db.add(project)
    db.commit()
    db.refresh(project)

    return project


# -------------------------
# GET ALL PROJECTS
# -------------------------
@router.get("/")
def get_projects(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    # admin sees all, user sees only own
    if current_user.role == "admin":
        return db.query(Project).all()

    return db.query(Project).filter(Project.owner_id == current_user.id).all()


# -------------------------
# UPDATE PROJECT
# -------------------------
@router.put("/{project_id}")
def update_project(
    project_id: int,
    data: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    project = db.query(Project).filter(Project.id == project_id).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    require_owner_or_admin(current_user, project.owner_id)

    for key, value in data.dict(exclude_unset=True).items():
        setattr(project, key, value)

    db.commit()
    db.refresh(project)

    return project


# -------------------------
# DELETE PROJECT (ADMIN ONLY)
# -------------------------
@router.delete("/{project_id}")
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    require_admin(current_user)

    project = db.query(Project).filter(Project.id == project_id).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    db.delete(project)
    db.commit()

    return {"message": "Project deleted"}