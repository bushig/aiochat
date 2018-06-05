from aiohttp import web
import aiohttp
import aiosqlite
from aiohttp_session import new_session, get_session
from aiohttp_security import (
    remember, forget, authorized_userid,
    has_permission, login_required
)
import sqlite3
import json
from utils import check_credentials, encrypt_password

@login_required
async def channels_list(request):
    async with aiosqlite.connect('../database.db') as db:
        cursor = await db.execute('SELECT id, name FROM channels')
        rows = await cursor.fetchall()
        result = []
        for row in rows:
            new_row = {'id': row[0], 'name': row[1]}
            result.append(new_row)
        await cursor.close()

    response_obj = {'status': 'success'}
    return web.json_response(result)

async def listen_chat(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)

    async for msg in ws:
        if msg.type == aiohttp.WSMsgType.TEXT:
            print(msg)

@login_required
async def create_channel(request):
    data = await request.json()
    if data.get('name') == "" or data.get('name') is None:
        return web.json_response({"error": 'name cant be blank.'})
    async with aiosqlite.connect('../database.db') as db:
        cursor = await db.execute('SELECT id, name FROM channels where name=:name', data)
        if await cursor.fetchone() is not None:
            print(data)
            return web.json_response({'error': 'This name already exists.'})
        if data.get('password'):
            data['sha256'] = await encrypt_password(data['password'])
            await cursor.execute('INSERT INTO channels (name, passwd) VALUES (:name, :sha256)', data)
        else:
            await cursor.execute('INSERT INTO channels (name) VALUES (:name)', data)
        await db.commit()
        await cursor.close()
        response_obj = {'status': 'success'}
        return web.json_response(response_obj)

async def delete_channel(request):
    pass

@login_required
async def join_channel(request):
    data = await request.json()
    channel = data.get('channel')
    if channel is None or channel == '':
        return web.json_response({'error': 'Channel cant be empty'})
    async with aiosqlite.connect('../database.db') as db:
        cursor = await db.execute('SELECT id, name, passwd FROM channels where id=?', (channel,))
        row = await cursor.fetchone()
        if row is None:
            return web.json_response({'error': 'Channel does not exists'})
        password = data.get('password')
        sha256 = encrypt_password(password)
        success = False
        if row[2]:
            if sha256 == row[2]:
                success = True
            else:
                success = False
        else:
            success = True
        if success:
            resp = web.json_response({"status": "success"})
            resp.set_cookie('channels', row[0])
            return resp
        else:
            return web.json_response({'error': 'Invalid credentials.'})



async def register(request):
    data = await request.json()
    async with aiosqlite.connect('../database.db') as conn:
        cursor = await conn.execute('SELECT id, login, passwd FROM users WHERE login=?', (data["username"],))
        user = await cursor.fetchone()
        if user is not None:
            return web.json_response({'error': 'User already exists'})
        data["sha256"] = await encrypt_password(data["password"])
        print(data['sha256'])
        await cursor.execute('INSERT INTO users (login, passwd) VALUES (:username, :sha256)', data)
        await conn.commit()
        resp = web.json_response({"status": "success"})
        await remember(request, resp, data['username'])
        resp.set_cookie('username', data['username'])
        return resp

async def login(request):
    data = await request.json()
    if await check_credentials(data['username'], data['password']):
        resp = web.json_response({'status': 'success'})
        await remember(request, resp, data['username'])
        resp.set_cookie('username', data['username'])
        return resp
    return web.json_response({'error': 'Invalid credentials.'})