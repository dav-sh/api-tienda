--GO
--DROP DATABASE[GDA0031_OT_DavidOrozco]

-- CREACIÓN DE LA BASE DE DATOS
CREATE DATABASE [GDA0031_OT_DavidOrozco];

-- SELECCIÓN DE LA BASE DE DATOS
GO
USE [GDA0031_OT_DavidOrozco];


GO
-- CREACIÓN DE TABLAS
CREATE TABLE estados (
    idestados INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(45) NOT NULL
);

CREATE TABLE rol (
    idrol INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(45) NOT NULL
);

CREATE TABLE Clientes (
    idclientes INT IDENTITY(1,1) PRIMARY KEY,
    razon_social NVARCHAR(245),
    nombre_comercial NVARCHAR(245),
    direccion_entrega NVARCHAR(245),
    telefono NVARCHAR(45),
    email NVARCHAR(45)
);

CREATE TABLE usuarios (
    idusuarios INT IDENTITY(1,1) PRIMARY KEY,
    rol_idrol INT NOT NULL FOREIGN KEY REFERENCES rol(idrol),
    estados_idestados INT NOT NULL FOREIGN KEY REFERENCES estados(idestados),
    correo_electronico NVARCHAR(245) NOT NULL,
    nombre_completo NVARCHAR(245) NOT NULL,
    password NVARCHAR(45) NOT NULL,
    telefono NVARCHAR(45),
    fecha_nacimiento DATE,
    fecha_creacion DATETIME DEFAULT GETDATE(),
    clientes_idclientes INT NOT NULL FOREIGN KEY REFERENCES Clientes(idclientes)
);

CREATE TABLE CategoriaProductos (
    idcategoriaProductos INT IDENTITY(1,1) PRIMARY KEY,
    usuarios_idusuarios INT NOT NULL FOREIGN KEY REFERENCES usuarios(idusuarios),
    estados_idestados INT NOT NULL FOREIGN KEY REFERENCES estados(idestados),
    nombre NVARCHAR(45),
    fecha_creacion DATETIME DEFAULT GETDATE()
);

CREATE TABLE Productos (
    idProductos INT IDENTITY(1,1) PRIMARY KEY,
    CategoriaProductos_idCategoriaProductos INT NOT NULL FOREIGN KEY REFERENCES CategoriaProductos(idcategoriaProductos),
    usuarios_idusuarios INT NOT NULL FOREIGN KEY REFERENCES usuarios(idusuarios),
    estados_idestados INT NOT NULL FOREIGN KEY REFERENCES estados(idestados),
    nombre NVARCHAR(45),
    marca NVARCHAR(45),
    codigo NVARCHAR(45),
    stock FLOAT,
    precio FLOAT,
    fecha_creacion DATETIME DEFAULT GETDATE(),
    foto VARBINARY(MAX)
);

CREATE TABLE Ordenes (
    idOrden INT IDENTITY(1,1) PRIMARY KEY,
    usuarios_idusuarios INT NOT NULL FOREIGN KEY REFERENCES usuarios(idusuarios),
    estados_idestados INT NOT NULL FOREIGN KEY REFERENCES estados(idestados),
    fecha_creacion DATETIME DEFAULT GETDATE(),
    nombre_completo NVARCHAR(245),
    direccion NVARCHAR(245),
    telefono NVARCHAR(45),
    correo_electronico NVARCHAR(245),
    fecha_entrega DATE,
    total_orden FLOAT
);

CREATE TABLE OrdenDetalles (
    idOrdenDetalles INT IDENTITY(1,1) PRIMARY KEY,
    Orden_idOrden INT NOT NULL FOREIGN KEY REFERENCES Ordenes(idOrden),
    Productos_idProductos INT NOT NULL FOREIGN KEY REFERENCES Productos(idProductos),
    cantidad INT,
    precio FLOAT,
    subtotal FLOAT
);









--			 PROCEDIMIENTOS ALMACENADOS

GO
-------------------------ROL ------------------------------------


-- Insertar un rol nuevo
CREATE PROC p_Insertar_Rol
	@nombre NVARCHAR(45)
AS
BEGIN
	INSERT INTO rol (nombre)
	VALUES (@nombre)
END;



GO



-- Modificar un rol
CREATE PROCEDURE p_Modificar_Rol
	@idrol INT,
	@nombre NVARCHAR(45)
AS
BEGIN
	UPDATE rol
	SET 
		nombre = ISNULL(@nombre, nombre)
	WHERE idrol = @idrol;
END;


GO



-- Eliminar un rol
CREATE PROCEDURE p_Eliminar_rol
	@idrol INT
AS
BEGIN
	DELETE FROM rol 
	WHERE idrol = @idrol;
END;



GO




-------------------ESTADO-----------------------

-- Insertar un estado nuevo
CREATE PROC p_Insertar_Estado
	@nombre NVARCHAR(45)
AS
BEGIN
	INSERT INTO estados (nombre)
	VALUES (@nombre)
END;



GO
-- Modificar un estado
CREATE PROCEDURE p_Modificar_Estado
	@idestados INT,
	@nombre NVARCHAR(45)
AS
BEGIN
	UPDATE estados 
	SET 
		nombre = ISNULL(@nombre, nombre)
	WHERE idestados = @idestados;
END;

GO



-- Eliminar un estado
CREATE PROCEDURE p_Eliminar_Estado
	@idestados INT
AS
BEGIN
	DELETE FROM estados 
	WHERE idestados = @idestados;
END;




------------------CLIENTE--------------------------
GO
-- Insertar un nuevo cliente
CREATE PROCEDURE p_Insertar_Cliente
    @razon_social NVARCHAR(245),
    @nombre_comercial NVARCHAR(245),
    @direccion_entrega NVARCHAR(245),
    @telefono NVARCHAR(45),
    @email NVARCHAR(45)
AS
BEGIN
    INSERT INTO Clientes (razon_social, nombre_comercial, direccion_entrega, telefono, email)
    VALUES (@razon_social, @nombre_comercial, @direccion_entrega, @telefono, @email);
END;
GO



-- Modificar información de un cliente
CREATE PROCEDURE p_Modificar_Cliente
    @idclientes INT,
    @razon_social NVARCHAR(245) = NULL,
    @nombre_comercial NVARCHAR(245) = NULL,
    @direccion_entrega NVARCHAR(245) = NULL,
    @telefono NVARCHAR(45) = NULL,
    @email NVARCHAR(45) = NULL
AS
BEGIN
    UPDATE Clientes
    SET
        razon_social = ISNULL(@razon_social, razon_social),
        nombre_comercial = ISNULL(@nombre_comercial, nombre_comercial),
        direccion_entrega = ISNULL(@direccion_entrega, direccion_entrega),
        telefono = ISNULL(@telefono, telefono),
        email = ISNULL(@email, email)
    WHERE idclientes = @idclientes;
END;
GO

-- Desabilitar un cliente (cambiar a estado "Inactivo")
CREATE PROCEDURE p_Inactivar_Cliente
    @idclientes INT
AS
BEGIN
    UPDATE Clientes
    SET razon_social = 'Inactivo - ' + razon_social
    WHERE idclientes = @idclientes;
END;
GO





------------------USUARIOS-----------------------
--				SUGERIDO
GO
-- Insertar un nuevo usuario
CREATE PROCEDURE p_Insertar_Usuario
    @rol_idrol INT,
    @estados_idestados INT,
    @correo_electronico NVARCHAR(245),
    @nombre_completo NVARCHAR(245),
    @password NVARCHAR(45),
    @telefono NVARCHAR(45),
    @fecha_nacimiento DATE,
    @clientes_idclientes INT
AS
BEGIN
    INSERT INTO usuarios (rol_idrol, estados_idestados, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, fecha_creacion,clientes_idclientes)
    VALUES (@rol_idrol, @estados_idestados, @correo_electronico, @nombre_completo, @password, @telefono, @fecha_nacimiento, GETDATE(), @clientes_idclientes);
END;


GO


-- Modificar información de un usuario
CREATE PROCEDURE p_Modificar_Usuario
    @idusuarios INT,
    @rol_idrol INT = NULL,
    @estados_idestados INT = NULL,
    @correo_electronico NVARCHAR(245) = NULL,
    @nombre_completo NVARCHAR(245) = NULL,
    @password NVARCHAR(45) = NULL,
    @telefono NVARCHAR(45) = NULL,
    @fecha_nacimiento DATE = NULL,
    @clientes_idclientes INT = NULL
AS
BEGIN
    UPDATE Usuarios
    SET
        rol_idrol = ISNULL(@rol_idrol, rol_idrol),
        estados_idestados = ISNULL(@estados_idestados, estados_idestados),
        correo_electronico = ISNULL(@correo_electronico, correo_electronico),
        nombre_completo = ISNULL(@nombre_completo, nombre_completo),
        password = ISNULL(@password, password),
        telefono = ISNULL(@telefono, telefono),
        fecha_nacimiento = ISNULL(@fecha_nacimiento, fecha_nacimiento),
        clientes_idclientes = ISNULL(@clientes_idclientes, clientes_idclientes)
    WHERE idusuarios = @idusuarios;
END;
GO




-- Cambiar estado de un usuario
CREATE PROCEDURE p_Cambiar_Estado_Usuario
    @idUsuario INT,
    @nuevoEstado INT
AS
BEGIN
    UPDATE usuarios
    SET estados_idestados = @nuevoEstado
    WHERE idusuarios = @idUsuario;
END;

GO







--------------------ORDEN----------------------------

-- Insertar una orden con detalles usando JSON
CREATE PROCEDURE p_Insertar_Orden
    @usuarios_idusuarios INT,
	@estados_idestados INT,
	@nombre_completo NVARCHAR(245),
    @direccion NVARCHAR(45),
    @telefono NVARCHAR(45),
    @correo_electronico NVARCHAR(45),
    @fecha_entrega DATE,
    @total_orden FLOAT,
    @jsonDetalles NVARCHAR(MAX) -- JSON con los detalles de la orden
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        -- 1. Insertar la Orden Principal
        DECLARE @idOrden INT;

        INSERT INTO Ordenes (usuarios_idusuarios, estados_idestados, nombre_completo, direccion, telefono, correo_electronico, fecha_entrega, total_orden, fecha_creacion)
        VALUES (@usuarios_idusuarios, @estados_idestados, @nombre_completo, @direccion, @telefono, @correo_electronico, @fecha_entrega, @total_orden, GETDATE());

        SET @idOrden = SCOPE_IDENTITY(); -- Recuperar el ID de la orden insertada

        -- 2. Insertar los Detalles de la Orden usando OPENJSON
        INSERT INTO OrdenDetalles (Orden_idOrden, Productos_idProductos, cantidad, precio, subtotal)
        SELECT 
            @idOrden AS Orden_idOrden,
            JSONDetalles.Productos_idProductos,
            JSONDetalles.cantidad,
            JSONDetalles.precio,
            JSONDetalles.subtotal
        FROM OPENJSON(@jsonDetalles)
        WITH (
            Productos_idProductos INT '$.Productos_idProductos',
            cantidad INT '$.cantidad',
            precio FLOAT '$.precio',
            subtotal FLOAT '$.subtotal'
        ) AS JSONDetalles;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO


-- Procedimiento almacenado para actualizar una orden y sus detalles
CREATE PROCEDURE p_Modificar_Orden
    @idOrden INT,
    @estados_idestados INT,
    @nombre_completo NVARCHAR(245),
    @direccion NVARCHAR(45),
    @telefono NVARCHAR(45),
    @correo_electronico NVARCHAR(45),
    @fecha_entrega DATE,
    @total_orden FLOAT,
    @jsonDetalles NVARCHAR(MAX) -- JSON con los detalles actualizados
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        -- 1. Actualizar la Orden Principal
        UPDATE Ordenes
        SET estados_idestados = @estados_idestados,
            nombre_completo = @nombre_completo,
            direccion = @direccion,
            telefono = @telefono,
            correo_electronico = @correo_electronico,
            fecha_entrega = @fecha_entrega,
            total_orden = @total_orden
        WHERE idOrden = @idOrden;

        -- 2. Eliminar los detalles actuales de la orden
        DELETE FROM OrdenDetalles
        WHERE Orden_idOrden = @idOrden;

        -- 3. Insertar los nuevos detalles de la orden usando OPENJSON
        IF @jsonDetalles IS NOT NULL AND @jsonDetalles <> ''
        BEGIN
            INSERT INTO OrdenDetalles (Orden_idOrden, Productos_idProductos, cantidad, precio, subtotal)
            SELECT 
                @idOrden AS Orden_idOrden,
                JSONDetalles.Productos_idProductos,
                JSONDetalles.cantidad,
                JSONDetalles.precio,
                JSONDetalles.subtotal
            FROM OPENJSON(@jsonDetalles)
            WITH (
                Productos_idProductos INT '$.Productos_idProductos',
                cantidad INT '$.cantidad',
                precio FLOAT '$.precio',
                subtotal FLOAT '$.subtotal'
            ) AS JSONDetalles;
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO


-- Procedimiento almacenado para eliminar lógicamente una orden
CREATE PROCEDURE p_Eliminar_Orden
    @idOrden INT
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Actualizar el estado de la orden a inactiva (0 = inactivo)
        UPDATE Ordenes
        SET estados_idestados = 0
        WHERE idOrden = @idOrden;

        UPDATE OrdenDetalles
        SET cantidad = 0, subtotal = 0 
        WHERE Orden_idOrden = @idOrden;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO



---------------------CATEGORIA------------------------------------


-- Insertar una nueva categoria
CREATE PROCEDURE p_Insertar_Categoria
    @nombre NVARCHAR(45),
    @usuarios_idusuarios INT,
    @estados_idestados INT
AS
BEGIN
    INSERT INTO CategoriaProductos (nombre, usuarios_idusuarios, estados_idestados, fecha_creacion)
    VALUES (@nombre, @usuarios_idusuarios, @estados_idestados, GETDATE());
END;
GO


-- Desabilitar una categoria
CREATE PROCEDURE p_Cambiar_Estado_Categoria
    @idCategoria INT,
	@estados_idestados INT
AS
BEGIN
    UPDATE CategoriaProductos
    SET estados_idestados = @estados_idestados
    WHERE idcategoriaProductos = @idCategoria;
END;
GO




-------------------PRODUCTO-------------------------------

-- Insertar un producto nuevo
CREATE PROCEDURE p_Insertar_Producto
    @CategoriaProductos_idCategoriaProductos INT,
    @usuarios_idusuarios INT,
    @nombre NVARCHAR(45),
    @marca NVARCHAR(45),
    @codigo NVARCHAR(45),
    @stock FLOAT,
    @precio FLOAT,
    @foto VARBINARY(MAX)
AS
BEGIN
    INSERT INTO Productos (CategoriaProductos_idCategoriaProductos, usuarios_idusuarios, nombre, marca, codigo, stock, precio, foto, fecha_creacion, estados_idestados)
    VALUES (@CategoriaProductos_idCategoriaProductos, @usuarios_idusuarios, @nombre, @marca, @codigo, @stock, @precio, @foto, GETDATE(), 1); -- Estado activo por defecto
END;
GO


-- Actualizar un producto existente
CREATE PROCEDURE p_Actualizar_Producto
    @idProducto INT, -- ID del producto a actualizar
    @CategoriaProductos_idCategoriaProductos INT,
    @usuarios_idusuarios INT,
    @nombre NVARCHAR(45),
    @marca NVARCHAR(45),
    @codigo NVARCHAR(45),
    @stock FLOAT,
    @precio FLOAT,
    @foto VARBINARY(MAX)
AS
BEGIN
    UPDATE Productos
    SET 
        CategoriaProductos_idCategoriaProductos = @CategoriaProductos_idCategoriaProductos,
        usuarios_idusuarios = @usuarios_idusuarios,
        nombre = @nombre,
        marca = @marca,
        codigo = @codigo,
        stock = @stock,
        precio = @precio,
        foto = @foto
    WHERE idProductos = @idProducto;
END;
GO



-- Actualizar stock de un producto
CREATE PROCEDURE p_Actualizar_Stock_Producto
    @idProducto INT,
    @nuevoStock FLOAT
AS
BEGIN
    UPDATE Productos
    SET stock = @nuevoStock
    WHERE idProductos = @idProducto;
END;
GO



GO
-- Desabilitar un producto
CREATE PROCEDURE p_Cambiar_Estado_Producto
    @idProducto INT,
    @idEstado INT
AS
BEGIN
    UPDATE Productos
    SET estados_idestados = @idEstado
    WHERE idProductos = @idProducto;
END;




GO
CREATE PROCEDURE p_getProductos
AS
BEGIN
    SELECT * FROM Productos;
END;





------------------------------------------------------------
-----------------CREACIÓN DE VISTAS-------------------------
------------------------------------------------------------


GO
CREATE VIEW v_Productos_Activos AS
SELECT * 
FROM Productos 
WHERE estados_idestados = 1 AND stock > 0;




GO
CREATE VIEW v_Vista_Ordenes_Agosto_2024 AS
SELECT SUM(total_orden) AS TotalQuetzales
FROM Ordenes
WHERE MONTH(fecha_creacion) = 8 AND YEAR(fecha_creacion) = 2024;



GO
CREATE VIEW v_Top10_Clientes_Mayor_Consumo AS
SELECT c.idclientes, c.nombre_comercial, SUM(o.total_orden) AS TotalConsumo
FROM Clientes c
JOIN usuarios u ON u.clientes_idclientes = c.idclientes
JOIN Ordenes o ON o.usuarios_idusuarios = u.idusuarios
GROUP BY c.idclientes, c.nombre_comercial
ORDER BY TotalConsumo DESC
OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;



GO
CREATE VIEW v_Top10_Productos_Mas_Vendidos AS
SELECT p.idProductos, p.nombre, SUM(od.cantidad) AS TotalCantidad
FROM Productos p
JOIN OrdenDetalles od ON od.Productos_idProductos = p.idProductos
GROUP BY p.idProductos, p.nombre
ORDER BY TotalCantidad ASC
OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;









----------------------------------------------------
-----------------------EXEC-------------------------
----------------------------------------------------





------------ INIT  ------------------------------------

---------------ROL------------------
GO
EXEC p_Insertar_Rol
	@nombre = 'OPERADOR'

GO
-----------ESTADOS---------------------------

EXEC p_Insertar_Estado
	@nombre = 'Activo'

	GO
-- Insertar un cliente
EXEC p_Insertar_Cliente 
    @razon_social = 'Comercial 2',
    @nombre_comercial = 'Mi Negocio',
    @direccion_entrega = 'Calle Falsa 123',
    @telefono = '12345678',
    @email = 'cliente@test.com';

	GO
-----------------USUARIO---------------------

EXEC p_Insertar_Usuario 
	@rol_idrol = 1 ,
	@estados_idestados = 1,
	@correo_electronico = 'test@test.com', 
	@nombre_completo = 'Usuario Nuevo', 
	@password = '123456789', 
	@telefono = '12345678', 
	@fecha_nacimiento = '2020-12-20', 
	@clientes_idclientes = 1;

	GO
--------------CATEGORIA------------------------

-- Insertar una categoría
EXEC p_Insertar_Categoria
    @nombre = 'Electrónica',
    @usuarios_idusuarios = 1,
    @estados_idestados = 1;
	
--------------PRODUCTO------------------------
	GO

-- Insertar un producto
EXEC p_Insertar_Producto 
    @CategoriaProductos_idCategoriaProductos = 1,
    @usuarios_idusuarios = 1,
    @nombre = 'Aceite Maxima 007',
    @marca = 'Pum',
    @codigo = 'AMP',
    @stock = 20,
    @precio = 99.99,
    @foto = NULL; -- Si no se tiene imagen inicial



	--------------------------------------------------------------------
	------------------- EXTRAS  ------------------------------------
	--------------------------------------------------------------------
	
-----------------ROL------------------
--GO
--EXEC p_Insertar_Rol
--	@nombre = 'OPERADOR'

--EXEC p_Modificar_Rol 
--	@idrol = 1, 
--	@nombre = 'OPERADOR';

--EXEC p_Eliminar_rol 
--	@idrol = 1;

-------------ESTADOS---------------------------

--EXEC p_Insertar_Estado
--	@nombre = 'Activo'

--EXEC p_Modificar_Estado 
--	@idestados = 1, 
--	@nombre = 'Inactivo';

--EXEC p_Eliminar_Estado 
--	@idestados = 1;


--EXEC p_Insertar_Estado
--	@nombre = 'Inactivo'


--------------CLIENTE----------------------

---- Insertar un cliente
--EXEC p_Insertar_Cliente 
--    @razon_social = 'Comercial 2',
--    @nombre_comercial = 'Mi Negocio',
--    @direccion_entrega = 'Calle Falsa 123',
--    @telefono = '12345678',
--    @email = 'cliente@test.com';

---- Modificar información de un cliente
--EXEC p_Modificar_Cliente 
--    @idclientes = 1,
--    @razon_social = 'Comercial ABC',
--    @telefono = '87654321';

---- Desabilitar un cliente
--EXEC p_Inactivar_Cliente 
--	@idclientes = 1;




-------------------USUARIO---------------------

--EXEC p_Insertar_Usuario 
--	@rol_idrol = 1 ,
--	@estados_idestados = 1,
--	@correo_electronico = 'test@test.com', 
--	@nombre_completo = 'Usuario Nuevo', 
--	@password = '123456789', 
--	@telefono = '12345678', 
--	@fecha_nacimiento = '2020-12-20', 
--	@clientes_idclientes = 1;


--EXEC p_Cambiar_Estado_Usuario 
--    @idUsuario = 1,
--    @nuevoEstado = 2;

	   


----------------CATEGORIA------------------------

---- Insertar una categoría
--EXEC p_Insertar_Categoria
--    @nombre = 'Electrónica',
--    @usuarios_idusuarios = 1,
--    @estados_idestados = 1;


--EXEC p_Cambiar_Estado_Categoria 
--    @idCategoria = 2,
--	@estados_idEstados = 1;


--EXEC p_Cambiar_Estado_Categoria 
--	@idCategoria = 1, 
--	@estados_idestados = 2;



---------------PRODUCTO----------------------

---- Insertar un producto
--EXEC p_Insertar_Producto 
--    @CategoriaProductos_idCategoriaProductos = 1,
--    @usuarios_idusuarios = 1,
--    @nombre = 'Aceite Maxima 007',
--    @marca = 'Pum',
--    @codigo = 'AMP',
--    @stock = 20,
--    @precio = 99.99,
--    @foto = NULL; -- Si no se tiene imagen inicial

---- Desabilitar producto
--EXEC p_Cambiar_Estado_Producto 
--    @idProducto = 3,
--	@idEstado = 1;

---- Actualizar el stock de un producto
--EXEC p_Actualizar_Stock_Producto 
--    @idProducto = 1,
--    @nuevoStock = 250;



------------------ORDEN ACTUALIZADO--------------------

------------------- INSERTAR UNA ORDEN ----------------

--DECLARE @jsonDetalles NVARCHAR(MAX) = '[
--    {"Productos_idProductos": 1, "cantidad": 2, "precio": 150.00, "subtotal": 300.00}
--]';

--EXEC p_Insertar_Orden
--    @usuarios_idusuarios = 1,
--	@estados_idestados = 1,
--	@nombre_completo = "Juan Paco Pedro de la Mar",
--    @direccion = '123 Calle Principal',
--    @telefono = '555-123-4567',
--    @correo_electronico = 'cliente@email.com',
--    @fecha_entrega = '2024-08-15',
--    @total_orden = 500.00,
--    @jsonDetalles = @jsonDetalles;


--	GO


--GO

--EXEC p_Modificar_Orden 
--    @idOrden = 1, -- ID de la orden a modificar
--    @estados_idestados = 1,
--    @nombre_completo = 'Ana López',
--    @direccion = 'Calle Nueva 456',
--    @telefono = '987-654-3210',
--    @correo_electronico = 'ana.lopez@example.com',
--    @fecha_entrega = '2024-04-01',
--    @total_orden = 36.47,
--    @jsonDetalles = @jsonDetalles;

--GO
------------ ELIMINAR UNA ORDEN -------------------

--EXEC p_Eliminar_Orden @idOrden = 1;




----		QUERY

--select * from  Clientes;

--SELECT * FROM estados;

--SELECT * FROM Ordenes;

--SELECT * FROM OrdenDetalles;

--SELECT * FROM CategoriaProductos;

--SELECT * FROM Productos;

--SELECT * FROM usuarios;


---- TEST QUERY
--select * from  sys.tables;





--		Views

SELECT * FROM v_Productos_Activos; 
SELECT * FROM v_Top10_Clientes_Mayor_Consumo;
SELECT * FROM v_Top10_Productos_Mas_Vendidos;
SELECT * FROM v_Vista_Ordenes_Agosto_2024;


---- EXTRAS

--SELECT * FROM sys.sysprocesses WHERE dbid = DB_ID('GDA0031_OT_DavidOrozco');


----KILL 51;