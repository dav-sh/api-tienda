const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME , // Nombre de la base de datos
  process.env.DB_USER , // Usuario
  process.env.DB_PASSWORD , // Contraseña
  {
    server: process.env.DB_HOST ,
    dialect: "mssql",
    // dialectOptions: {
    //   options: {
    //     encrypt:true,
    //     trustServerCertificate: true
    //   }
    // },
    port: process.env.PORT_DB ,
    // logging: console.log
  }
);








// const sequelize = new Sequelize(
//   'GDA0031_OT_DavidOrozco', // Nombre de la base de datos
//   'test', // Usuario
//    'Hola1234!', // Contraseña
//   {
//     server: 'localhost',
//     dialect: 'mssql',
//     port:  1433,

//   }
// );







// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('La conexión se ha establecido correctamente.');
//   } catch (error) {
//     console.error('No se pudo conectar a la base de datos:', error);
//   }
// })();


module.exports = sequelize;
