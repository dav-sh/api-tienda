const sequelize = require("../config/db");
const { QueryTypes } = require("sequelize");
const Usuarios = require("../models/Usuarios");
const { encrypt, compare } = require("../helpers/handleBcrypt");

const getUsuarios = async (req, res) => {
  try {
    const data = await Usuarios.findAll();
    return res.json(data);
  } catch (error) {
    return res.json(error).status(404);
  }
};

// Insertar un nuevo usuario
const createUsuario = async (req, res) => {
  const {
    rol_idRol,
    estados_idEstados,
    correo_electronico,
    nombre_completo,
    password,
    telefono,
    fecha_nacimiento,
    clientes_idClientes,
  } = req.body;
  try {
    // Verificar si el usuario ya existe
    const existingUser = await Usuarios.findOne({
      where: { correo_electronico },
    });
    if (existingUser) {
      return res.status(409).json({ error: "El usuario ya existe" });
    }

    const pwEncrypted = await encrypt(password);
    await sequelize.query(
      "EXEC p_Insertar_Usuario :rol_idRol, :estados_idEstados, :correo_electronico, :nombre_completo, :password, :telefono, :fecha_nacimiento, :clientes_idClientes",
      {
        replacements: {
          rol_idRol,
          estados_idEstados,
          correo_electronico,
          nombre_completo,
          password: pwEncrypted,
          telefono,
          fecha_nacimiento,
          clientes_idClientes,
        },
        type: QueryTypes.INSERT,
      }
    );
    //console.log(pwEncrypted);
    // const isPasswordValid = await compare(password, pwEncrypted)
    // if(!isPasswordValid){
    //   console.log('contrasena no coincide')
    // }
    //console.log("mathc")
    
    res.json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario
const updateUsuario = async (req, res) => {
  const idUsuarios = req.params.id;
  let {
    rol_idRol,
    estados_idEstados,
    correo_electronico,
    nombre_completo,
    password,
    telefono,
    fecha_nacimiento,
    clientes_idClientes,
  } = req.body;

  try {
    // Verifica si el usuario existe
    const user = await Usuarios.findByPk(idUsuarios);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Si se proporciona una nueva contraseña, encriptarla
    let pwEncrypted = "";
    if (password) {
      pwEncrypted = await encrypt(password);
    }



    // Actualiza el usuario en la base de datos
    await sequelize.query(
      "EXEC p_Modificar_Usuario :idUsuarios, :rol_idRol, :estados_idEstados, :correo_electronico, :nombre_completo, :password, :telefono, :fecha_nacimiento, :clientes_idClientes",
      {
        replacements: {
          idUsuarios,
          rol_idRol,
          estados_idEstados,
          correo_electronico,
          nombre_completo,
          password: pwEncrypted,
          telefono,
          fecha_nacimiento,
          clientes_idClientes,
        },
        type: QueryTypes.UPDATE,
      }
    );

    
    //console.log(pwEncrypted);
    // const isPasswordValid = await compare(password, pwEncrypted)
    // if(!isPasswordValid){
      //console.log('contrasena no coincide')
    // }
    //console.log("match")
    //console.log(pwEncrypted);
    res.json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




const cambiarEstadoProducto = async (req, res)=>{
  const {id} = req.params
  const {idEstado} = req.body 
  try {
    await sequelize.query(
      'EXEC p_Cambiar_Estado_Usuario :idUsuario, :nuevoEstado ',
      {
        replacements : {
          idUsuario : id, nuevoEstado : idEstado
        } ,type: QueryTypes.UPDATE,
      }
      
    )
    res.json({ message: "Estado del Usuario actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}




module.exports = { createUsuario, updateUsuario, getUsuarios, cambiarEstadoProducto };
