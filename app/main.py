from fastapi import FastAPI
from app.database import Base, engine
from app.routers import auth, projects

Base.metadata.create_all(bind=engine)

app = FastAPI(title="RBAC Project Dashboard API")

app.include_router(auth.router)
app.include_router(projects.router)


@app.get("/")
def root():
    return {"message": "API Running"}