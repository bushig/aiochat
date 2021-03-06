from aiohttp import web
import aiohttp_cors
from aiohttp_security import setup as setup_security
from aiohttp_security import SessionIdentityPolicy
from aiohttp_session import setup as setup_session
from aiohttp_session.cookie_storage import EncryptedCookieStorage
import base64
from cryptography import fernet
from sqlalchemy import create_engine

from middleware import json_content_type_middleware
from routes import setup_routes
from models import metadata
from utils import DBAuthorizationPolicy

engine = create_engine('sqlite:///../database.db')
metadata.create_all(engine)

fernet_key = fernet.Fernet.generate_key()
secret_key = base64.urlsafe_b64decode(fernet_key)

app = web.Application()
cors = aiohttp_cors.setup(app, defaults={
        "*": aiohttp_cors.ResourceOptions(allow_methods=["GET", 'POST'], allow_credentials=True, expose_headers="*", allow_headers="*"),
    })
setup_session(app, EncryptedCookieStorage(secret_key))
setup_security(app, SessionIdentityPolicy(), DBAuthorizationPolicy())

setup_routes(app, cors)

web.run_app(app, port=7000)