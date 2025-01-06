# API - TIENDA
CRUD utilizando NodeJS, Express y SQL Server.

Extras JWT


## RUTAS ##
    "/api/productos"
    "/api/estado"
    "/api/clientes"
    "/api/categoria"
    "/api/usuarios"
    "/api/ordenes"

### Para generar token visitar ###
    '/api/auth/login' 
    JSON => 
    {
        "email": "admin@test.com",
        "password": "1234"
    }


### CONFIGURAR .env ###
    PORT='port_server_nodejs'
    PORT_DB='port_sql_server'
    DB_HOST='localhost'
    DB_USER='user_sql_server'
    DB_PASSWORD='password_sql_server'
    DB_NAME='GDA0031_OT_DavidOrozco'
    SECRET_KEY='invent_a_secret_key'


## INICIALIZAR SERVER ##
    npm run dev  -> modo desarrollador

## INSTALAR DEPENDENCIAS ##
    npm install

## BASE DE DATOS ##
    SQL Server
    
    Inicializar la base de datos GDA0031_OT_DavidOrozco.sql
