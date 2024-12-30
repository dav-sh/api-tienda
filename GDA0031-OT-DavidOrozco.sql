--GO
--DROP DATABASE[GDA0031_OT_DavidOrozco]

-- CREACIÓN DE LA BASE DE DATOS
CREATE DATABASE [GDA0031_OT_DavidOrozco];

-- SELECCIÓN DE LA BASE DE DATOS
GO
USE [GDA0031_OT_DavidOrozco];


GO
-- CREACIÓN DE TABLAS
CREATE TABLE Estados (
    idEstados INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(45) NOT NULL
);

CREATE TABLE Roles (
    idRol INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(45) NOT NULL
);

CREATE TABLE Clientes (
    idClientes INT IDENTITY(1,1) PRIMARY KEY,
    razon_social NVARCHAR(245),
    nombre_comercial NVARCHAR(245),
    direccion_entrega NVARCHAR(245),
    telefono NVARCHAR(45),
    email NVARCHAR(45)
);

CREATE TABLE Usuarios (
    idUsuarios INT IDENTITY(1,1) PRIMARY KEY,
    rol_idRol INT NOT NULL FOREIGN KEY REFERENCES Roles(idRol),
    estados_idEstados INT NOT NULL FOREIGN KEY REFERENCES Estados(idEstados),
    correo_electronico NVARCHAR(245) NOT NULL,
    nombre_completo NVARCHAR(245) NOT NULL,
    password NVARCHAR(75) NOT NULL,
    telefono NVARCHAR(45),
    fecha_nacimiento DATE,
    fecha_creacion DATETIME DEFAULT GETDATE(),
    clientes_idClientes INT NOT NULL FOREIGN KEY REFERENCES Clientes(idClientes)
);

CREATE TABLE CategoriaProductos (
    idCategoriaProductos INT IDENTITY(1,1) PRIMARY KEY,
    usuarios_idUsuarios INT NOT NULL FOREIGN KEY REFERENCES Usuarios(idUsuarios),
    estados_idEstados INT NOT NULL FOREIGN KEY REFERENCES Estados(idEstados),
    nombre NVARCHAR(45),
    fecha_creacion DATETIME DEFAULT GETDATE()
);

CREATE TABLE Productos (
    idProductos INT IDENTITY(1,1) PRIMARY KEY,
    CategoriaProductos_idCategoriaProductos INT NOT NULL FOREIGN KEY REFERENCES CategoriaProductos(idCategoriaProductos),
    usuarios_idUsuarios INT NOT NULL FOREIGN KEY REFERENCES Usuarios(idUsuarios),
    estados_idEstados INT NOT NULL FOREIGN KEY REFERENCES Estados(idEstados),
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
    usuarios_idUsuarios INT NOT NULL FOREIGN KEY REFERENCES Usuarios(idUsuarios),
    estados_idEstados INT NOT NULL FOREIGN KEY REFERENCES Estados(idEstados),
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
-------------------------Roles ------------------------------------


-- Insertar un Roles nuevo
CREATE PROC p_Insertar_Rol
	@nombre NVARCHAR(45)
AS
BEGIN
	INSERT INTO Roles (nombre)
	VALUES (@nombre)
END;



GO



-- Modificar un Roles
CREATE PROCEDURE p_Modificar_Rol
	@idRol INT,
	@nombre NVARCHAR(45)
AS
BEGIN
	UPDATE Roles
	SET 
		nombre = ISNULL(@nombre, nombre)
	WHERE idRol = @idRol;
END;


GO



-- Eliminar un Roles
CREATE PROCEDURE p_Eliminar_Rol
	@idRol INT
AS
BEGIN
	DELETE FROM Roles 
	WHERE idRol = @idRol;
END;



GO




-------------------ESTADO-----------------------

-- Insertar un estado nuevo
CREATE PROC p_Insertar_Estado
	@nombre NVARCHAR(45)
AS
BEGIN
	INSERT INTO Estados (nombre)
	VALUES (@nombre)
END;



GO
-- Modificar un estado
CREATE PROCEDURE p_Modificar_Estado
	@idEstados INT,
	@nombre NVARCHAR(45)
AS
BEGIN
	UPDATE Estados 
	SET 
		nombre = ISNULL(@nombre, nombre)
	WHERE idEstados = @idEstados;
END;

GO



-- Eliminar un estado
CREATE PROCEDURE p_Eliminar_Estado
	@idEstados INT
AS
BEGIN
	DELETE FROM Estados 
	WHERE idEstados = @idEstados;
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
    @idClientes INT,
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
    WHERE idClientes = @idClientes;
END;
GO

-- Desabilitar un cliente (cambiar a estado "Inactivo")
CREATE PROCEDURE p_Inactivar_Cliente
    @idClientes INT
AS
BEGIN
    UPDATE Clientes
    SET razon_social = 'Inactivo - ' + razon_social
    WHERE idClientes = @idClientes;
END;
GO





------------------Usuarios-----------------------
--				SUGERIDO
GO
-- Insertar un nuevo usuario
CREATE PROCEDURE p_Insertar_Usuario
    @rol_idRol INT,
    @estados_idEstados INT,
    @correo_electronico NVARCHAR(245),
    @nombre_completo NVARCHAR(245),
    @password NVARCHAR(75),
    @telefono NVARCHAR(45),
    @fecha_nacimiento DATE,
    @clientes_idClientes INT
AS
BEGIN
    INSERT INTO Usuarios (rol_idRol, estados_idEstados, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, fecha_creacion,clientes_idClientes)
    VALUES (@rol_idRol, @estados_idEstados, @correo_electronico, @nombre_completo, @password, @telefono, @fecha_nacimiento, GETDATE(), @clientes_idClientes);
END;


GO


-- Modificar información de un usuario
CREATE PROCEDURE p_Modificar_Usuario
    @idUsuarios INT,
    @rol_idRol INT = NULL,
    @estados_idEstados INT = NULL,
    @correo_electronico NVARCHAR(245) = NULL,
    @nombre_completo NVARCHAR(245) = NULL,
    @password NVARCHAR(75) = NULL,
    @telefono NVARCHAR(45) = NULL,
    @fecha_nacimiento DATE = NULL,
    @clientes_idClientes INT = NULL
AS
BEGIN
    UPDATE Usuarios
    SET
        rol_idRol = ISNULL(@rol_idRol, rol_idRol),
        estados_idEstados = ISNULL(@estados_idEstados, estados_idEstados),
        correo_electronico = ISNULL(@correo_electronico, correo_electronico),
        nombre_completo = ISNULL(@nombre_completo, nombre_completo),
        password = ISNULL(@password, password),
        telefono = ISNULL(@telefono, telefono),
        fecha_nacimiento = ISNULL(@fecha_nacimiento, fecha_nacimiento),
        clientes_idClientes = ISNULL(@clientes_idClientes, clientes_idClientes)
    WHERE idUsuarios = @idUsuarios;
END;
GO




-- Cambiar estado de un usuario
CREATE PROCEDURE p_Cambiar_Estado_Usuario
    @idUsuario INT,
    @nuevoEstado INT
AS
BEGIN
    UPDATE Usuarios
    SET estados_idEstados = @nuevoEstado
    WHERE idUsuarios = @idUsuario;
END;

GO







--------------------ORDEN----------------------------

-- Insertar una orden con detalles usando JSON
CREATE PROCEDURE p_Insertar_Orden
    @usuarios_idUsuarios INT,
	@estados_idEstados INT,
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

        INSERT INTO Ordenes (usuarios_idUsuarios, estados_idEstados, nombre_completo, direccion, telefono, correo_electronico, fecha_entrega, total_orden, fecha_creacion)
        VALUES (@usuarios_idUsuarios, @estados_idEstados, @nombre_completo, @direccion, @telefono, @correo_electronico, @fecha_entrega, @total_orden, GETDATE());

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
		-- 3. Descontar la cantidad de productos
        UPDATE Productos
        SET stock = stock - JSONDetalles.cantidad
        FROM OPENJSON(@jsonDetalles)
        WITH (
            Productos_idProductos INT '$.Productos_idProductos',
            cantidad INT '$.cantidad'
        ) AS JSONDetalles
        WHERE Productos.idProductos = JSONDetalles.Productos_idProductos;

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
    @estados_idEstados INT,
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
        SET estados_idEstados = @estados_idEstados,
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
		-- 3. Restaurar la cantidad de productos a su valor original
        UPDATE Productos
        SET stock = stock + ISNULL(OD.cantidad, 0)
        FROM Productos
        INNER JOIN OrdenDetalles OD ON Productos.idProductos = OD.Productos_idProductos
        WHERE OD.Orden_idOrden = @idOrden;

        -- 4. Insertar los nuevos detalles de la orden usando OPENJSON
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

            -- 5. Actualizar la cantidad de productos para reflejar los cambios
            UPDATE Productos
            SET stock = stock - JSONDetalles.cantidad
            FROM OPENJSON(@jsonDetalles)
            WITH (
                Productos_idProductos INT '$.Productos_idProductos',
                cantidad INT '$.cantidad'
            ) AS JSONDetalles
            WHERE Productos.idProductos = JSONDetalles.Productos_idProductos;
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

        -- 1. Actualizar el estado de la orden a inactiva (0 = inactivo)
        UPDATE Ordenes
        SET estados_idEstados = 0
        WHERE idOrden = @idOrden;
		 -- 2. Restaurar la cantidad de productos
        UPDATE Productos
        SET stock = stock + ISNULL(OD.cantidad, 0)
        FROM Productos
        INNER JOIN OrdenDetalles OD ON Productos.idProductos = OD.Productos_idProductos
        WHERE OD.Orden_idOrden = @idOrden;
		-- 3. Actualizar OrdenDetalles
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
    @usuarios_idUsuarios INT,
    @estados_idEstados INT
AS
BEGIN
    INSERT INTO CategoriaProductos (nombre, usuarios_idUsuarios, estados_idEstados, fecha_creacion)
    VALUES (@nombre, @usuarios_idUsuarios, @estados_idEstados, GETDATE());
END;
GO


-- Desabilitar una categoria
CREATE PROCEDURE p_Cambiar_Estado_Categoria
    @idCategoria INT,
	@estados_idEstados INT
AS
BEGIN
    UPDATE CategoriaProductos
    SET estados_idEstados = @estados_idEstados
    WHERE idCategoriaProductos = @idCategoria;
END;
GO




-------------------PRODUCTO-------------------------------

-- Insertar un producto nuevo
CREATE PROCEDURE p_Insertar_Producto
    @CategoriaProductos_idCategoriaProductos INT,
    @usuarios_idUsuarios INT,
    @nombre NVARCHAR(45),
    @marca NVARCHAR(45),
    @codigo NVARCHAR(45),
    @stock FLOAT,
    @precio FLOAT,
    @foto VARBINARY(MAX)
AS
BEGIN
    INSERT INTO Productos (CategoriaProductos_idCategoriaProductos, usuarios_idUsuarios, nombre, marca, codigo, stock, precio, foto, fecha_creacion, estados_idEstados)
    VALUES (@CategoriaProductos_idCategoriaProductos, @usuarios_idUsuarios, @nombre, @marca, @codigo, @stock, @precio, @foto, GETDATE(), 1); -- Estado activo por defecto
END;
GO


-- Actualizar un producto existente
CREATE PROCEDURE p_Actualizar_Producto
    @idProducto INT, -- ID del producto a actualizar
    @CategoriaProductos_idCategoriaProductos INT,
    @usuarios_idUsuarios INT,
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
        usuarios_idUsuarios = @usuarios_idUsuarios,
        nombre = @nombre,
        marca = @marca,
        codigo = @codigo,
        stock = @stock,
        precio = @precio,
        foto = @foto
    WHERE idProductos = @idProducto;
END;
GO



---- Actualizar stock de un producto
--CREATE PROCEDURE p_Actualizar_Stock_Producto
--    @idProducto INT,
--    @nuevoStock FLOAT
--AS
--BEGIN
--    UPDATE Productos
--    SET stock = @nuevoStock
--    WHERE idProductos = @idProducto;
--END;
--GO



GO
-- Desabilitar un producto
CREATE PROCEDURE p_Cambiar_Estado_Producto
    @idProducto INT,
    @idEstado INT
AS
BEGIN
    UPDATE Productos
    SET estados_idEstados = @idEstado
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
WHERE estados_idEstados = 1 AND stock > 0;




GO
CREATE VIEW v_Vista_Ordenes_Agosto_2024 AS
SELECT SUM(total_orden) AS TotalQuetzales
FROM Ordenes
WHERE MONTH(fecha_creacion) = 8 AND YEAR(fecha_creacion) = 2024;



GO
CREATE VIEW v_Top10_Clientes_Mayor_Consumo AS
SELECT c.idClientes, c.nombre_comercial, SUM(o.total_orden) AS TotalConsumo
FROM Clientes c
JOIN Usuarios u ON u.clientes_idClientes = c.idClientes
JOIN Ordenes o ON o.usuarios_idUsuarios = u.idUsuarios
GROUP BY c.idClientes, c.nombre_comercial
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

---------------Roles------------------
GO
EXEC p_Insertar_Rol
	@nombre = 'OPERADOR'

GO

GO
EXEC p_Insertar_Rol
	@nombre = 'USUARIO'
GO
-----------Estados---------------------------

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
	@rol_idRol = 1 ,
	@estados_idEstados = 1,
	@correo_electronico = 'test@test.com', 
	@nombre_completo = 'Usuario Nuevo', 
	@password = '$2b$10$tB1.x630p0SxjEz/gAkEd.ag36.K/yXwpfhMnEzT5J15SDCEWG23W',    --1234
	@telefono = '12345678', 
	@fecha_nacimiento = '2020-12-20', 
	@clientes_idClientes = 1;

	GO
--------------CATEGORIA------------------------

-- Insertar una categoría
EXEC p_Insertar_Categoria
    @nombre = 'Electrónica',
    @usuarios_idUsuarios = 1,
    @estados_idEstados = 1;
	
--------------PRODUCTO------------------------
	GO

-- Insertar un producto
EXEC p_Insertar_Producto 
    @CategoriaProductos_idCategoriaProductos = 1,
    @usuarios_idUsuarios = 1,
    @nombre = 'Aceite Maxima 007',
    @marca = 'Pum',
    @codigo = 'AMP',
    @stock = 20,
    @precio = 99.99,
    @foto = NULL; -- Si no se tiene imagen inicial



	--------------------------------------------------------------------
	------------------- EXTRAS  ------------------------------------
	--------------------------------------------------------------------
	
-----------------Roles------------------
--GO
--EXEC p_Insertar_Rol
--	@nombre = 'OPERADOR'

--EXEC p_Modificar_Rol 
--	@idRol = 1, 
--	@nombre = 'OPERADOR';

--EXEC p_Eliminar_rol 
--	@idRol = 1;

-------------Estados---------------------------

--EXEC p_Insertar_Estado
--	@nombre = 'Activo'

--EXEC p_Modificar_Estado 
--	@idEstados = 1, 
--	@nombre = 'Inactivo';

--EXEC p_Eliminar_Estado 
--	@idEstados = 1;


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
--    @idClientes = 1,
--    @razon_social = 'Comercial ABC',
--    @telefono = '87654321';

---- Desabilitar un cliente
--EXEC p_Inactivar_Cliente 
--	@idClientes = 1;




-------------------USUARIO---------------------

--EXEC p_Insertar_Usuario 
--	@rol_idRol = 1 ,
--	@estados_idEstados = 1,
--	@correo_electronico = 'test@test.com', 
--	@nombre_completo = 'Usuario Nuevo', 
--	@password = '123456789', 
--	@telefono = '12345678', 
--	@fecha_nacimiento = '2020-12-20', 
--	@clientes_idClientes = 1;


--EXEC p_Cambiar_Estado_Usuario 
--    @idUsuario = 1,
--    @nuevoEstado = 2;

	   


----------------CATEGORIA------------------------

---- Insertar una categoría
--EXEC p_Insertar_Categoria
--    @nombre = 'Electrónica',
--    @usuarios_idUsuarios = 1,
--    @estados_idEstados = 1;


--EXEC p_Cambiar_Estado_Categoria 
--    @idCategoria = 2,
--	@estados_idEstados = 1;


--EXEC p_Cambiar_Estado_Categoria 
--	@idCategoria = 1, 
--	@estados_idEstados = 2;



---------------PRODUCTO----------------------

---- Insertar un producto
--EXEC p_Insertar_Producto 
--    @CategoriaProductos_idCategoriaProductos = 1,
--    @usuarios_idUsuarios = 1,
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
--    @usuarios_idUsuarios = 1,
--	@estados_idEstados = 1,
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
--    @estados_idEstados = 1,
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

--SELECT * FROM Estados;

--SELECT * FROM Ordenes;

--SELECT * FROM OrdenDetalles;

--SELECT * FROM CategoriaProductos;

--SELECT * FROM Productos;

--SELECT * FROM Usuarios;


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