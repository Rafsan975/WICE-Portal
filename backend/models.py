from sqlalchemy import Column, Integer, String, Float
from database import Base


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    amount = Column(Float)
    status = Column(String, default="Pending")
    date = Column(String)
    approved_by = Column(String, nullable=True)