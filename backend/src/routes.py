from views import channels_list, create_channel, login, register


def setup_routes(app, cors):
    cors.add(app.router.add_route('GET', '/api/', channels_list, name='channels_list'))
    cors.add(app.router.add_route('POST', '/api/', create_channel, name='create_channel'))
    cors.add(app.router.add_route('POST', '/api/login', login, name='login'))
    cors.add(app.router.add_route('POST', '/api/register', register, name='register'))