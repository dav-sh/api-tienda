# API - TIENDA
CRUD utilizando NodeJS, Express y SQL Server.

Extras JWT


## ROUTES ##
    "/api/productos"
    "/api/estado"
    "/api/clientes"
    "/api/categoria"
    "/api/usuarios"
    "/api/ordenes"

### Para generar token visitar ###
    '/api/auth/login' 
    JSON => {
    "username": "operador",
    "role": "OPERADOR"
    }


### CONFIGURAR .env ###
    PORT='port_sql_server'
    DB_HOST='localhost'
    DB_USER='user_sql_server'
    DB_PASSWORD='password_sql_server'
    DB_NAME='BDD_sql_server'
    SECRET_KEY='your_secret_key'



