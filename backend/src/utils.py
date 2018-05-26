from passlib.hash import sha256_crypt
import aiosqlite

import sqlalchemy as sa

from aiohttp_security.abc import AbstractAuthorizationPolicy
from passlib.hash import sha256_crypt


class DBAuthorizationPolicy(AbstractAuthorizationPolicy):
    async def authorized_userid(self, identity):
        async with aiosqlite.connect('../database.db') as conn:
            cursor = await conn.execute('SELECT id, login, passwd FROM users WHERE login=?', (identity, ))
            if await cursor.fetchone():
                return identity
            else:
                return None

    async def permits(self, identity, permission, context=None):
        return True


async def check_credentials(username, password):
    async with aiosqlite.connect('../database.db') as conn:
        cursor = await conn.execute('SELECT id, login, passwd FROM users')
        user = await cursor.fetchone()
        if user is not None:
            hash = user[2]
            return sha256_crypt.verify(password, hash)
    return False

async def encrypt_password(password):
    return sha256_crypt.encrypt(password)