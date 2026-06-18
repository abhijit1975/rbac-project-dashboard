from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)

    # 🔥 IMPORTANT: ownership field
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # 🔥 relationship to User model
    owner = relationship("User", back_populates="projects")