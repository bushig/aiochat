from aiohttp.web import middleware

@middleware
async def json_content_type_middleware(request, handler):
    resp = await handler(request)
    resp.content_type='application/javascript'
    return resp