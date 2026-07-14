from passlib.context import CryptContext


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


ADMIN_EMAIL = "admin@wice.com"


ADMIN_PASSWORD = "123456"


def verify_password(
    plain_password,
    password
):

    return plain_password == password