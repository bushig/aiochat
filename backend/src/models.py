import sqlalchemy

metadata = sqlalchemy.MetaData()


users = sqlalchemy.Table(
    'users', metadata,
    sqlalchemy.Column('id', sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column('login', sqlalchemy.String(256), nullable=False ,unique=True),
    sqlalchemy.Column('passwd', sqlalchemy.String(256), nullable=False),
    sqlalchemy.Column('is_superuser', sqlalchemy.Boolean, nullable=False,
              server_default='0'),
    sqlalchemy.Column('disabled', sqlalchemy.Boolean, nullable=False,
              server_default='0'),

    sqlite_autoincrement=True
)

channels = sqlalchemy.Table(
    'channels', metadata,
    sqlalchemy.Column('id', sqlalchemy.Integer, nullable=False, primary_key=True),
    sqlalchemy.Column('name', sqlalchemy.String(256), nullable=False ,unique=True),
    sqlalchemy.Column('passwd', sqlalchemy.String(256), nullable=True),

    sqlite_autoincrement=True
)

#TODO: add per user chat permissions