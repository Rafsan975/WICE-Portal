from fastapi import FastAPI
from database import Base, engine, SessionLocal
from models import Expense
from auth import ADMIN_EMAIL, ADMIN_PASSWORD, verify_password
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="WICE Sponsorship Portal"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create Database Table
Base.metadata.create_all(
    bind=engine
)


# -------------------------
# Home
# -------------------------

@app.get("/")
def home():

    return {
        "message": "WICE Portal Backend Running"
    }



# -------------------------
# Get All Expenses
# -------------------------

@app.get("/expenses")
def get_expenses():

    db = SessionLocal()

    expenses = db.query(
        Expense
    ).all()

    db.close()

    return expenses



# -------------------------
# Add Expense
# -------------------------

@app.post("/expenses")
def add_expense(item: dict):

    db = SessionLocal()


    expense = Expense(
        name=item["name"],
        description=item["description"],
        amount=item["amount"],
        required_date=item["required_date"]
    )


    db.add(expense)

    db.commit()

    db.refresh(expense)

    db.close()


    return {
        "message": "Expense Added Successfully"
    }



# -------------------------
# Approve Expense
# -------------------------

@app.put("/approve/{id}")
def approve_expense(id: int):

    db = SessionLocal()


    expense = db.query(
        Expense
    ).filter(
        Expense.id == id
    ).first()


    if expense is None:

        db.close()

        return {
            "message": "Expense not found"
        }


    expense.status = "Approved"

    expense.approved_date = "13-07-2026"

    expense.approved_by = "Admin"


    db.commit()

    db.close()


    return {
        "message": "Expense Approved Successfully"
    }



# -------------------------
# Reject Expense
# -------------------------

@app.put("/reject/{id}")
def reject_expense(id: int):

    db = SessionLocal()


    expense = db.query(
        Expense
    ).filter(
        Expense.id == id
    ).first()


    if expense is None:

        db.close()

        return {
            "message": "Expense not found"
        }


    expense.status = "Rejected"

    expense.approved_by = "Admin"


    db.commit()

    db.close()


    return {
        "message": "Expense Rejected Successfully"
    }



# -------------------------
# Admin Login
# -------------------------

@app.post("/admin/login")
def admin_login(data: dict):

    email = data["email"]

    password = data["password"]


    if email != ADMIN_EMAIL:

        return {
            "message": "Invalid Email"
        }


    if not verify_password(
        password,
        ADMIN_PASSWORD
    ):

        return {
            "message": "Invalid Password"
        }


    return {
        "message": "Login Successful",
        "admin": email
    }
    # -------------------------
# Get Pending Expenses
# -------------------------

@app.get("/pending-expenses")
def get_pending_expenses():

    db = SessionLocal()

    expenses = db.query(
        Expense
    ).filter(
        Expense.status == "Pending"
    ).all()


    db.close()


    return expenses



# -------------------------
# Get Approved Expenses
# -------------------------

@app.get("/approved-expenses")
def get_approved_expenses():

    db = SessionLocal()

    expenses = db.query(
        Expense
    ).filter(
        Expense.status == "Approved"
    ).all()


    db.close()


    return expenses



# -------------------------
# Get Rejected Expenses
# -------------------------

@app.get("/rejected-expenses")
def get_rejected_expenses():

    db = SessionLocal()

    expenses = db.query(
        Expense
    ).filter(
        Expense.status == "Rejected"
    ).all()


    db.close()


    return expenses