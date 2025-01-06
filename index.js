var express = require('express');
var bodyParser = require('body-parser');
const db = require("./config/db");
const productosRoutes = require('./routes/productosRoutes')
const estadoRoutes = require('./routes/estadoRoutes')
const clienteRoutes = require('./routes/clienteRoutes')
const categoriaProdRoutes = require('./routes/categoriaProdRoutes')
const usuariosRoutes = require('./routes/usuariosRoutes')
const ordenRoutes = require('./routes/ordenRoutes')
const authRoutes = require('./routes/authRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const cookieParser = require("cookie-parser");
const cors = require('cors');
var app = express();
var port = process.env.PORT || 3000;



// Middlewares
app.use(cors(
	{
		origin: "http://localhost:5173",
		credentials: true,  // Permite el envío de cookies
	}
))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", );
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// app.options('*', (req, res) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     res.sendStatus(200);
// });

//Rutas
app.use('/api/auth', authRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/estado", estadoRoutes);
app.use("/api/clientes", clienteRoutes)
app.use("/api/categoria", categoriaProdRoutes)
app.use("/api/usuarios", usuariosRoutes)
app.use("/api/ordenes", ordenRoutes)
app.use("/api/roles", rolesRoutes)

//Home
app.get('/', async function (req, res) {

	try {
		await db.authenticate()
		console.log('La conexión se ha establecido correctamente.');
	} catch (error) {
		console.error('No se pudo conectar a la base de datos:', error);
	}
	res.status(200).send({
		message: 'GET Home route working fine!'
	});
});

app.listen(port, function () {
	console.log(`Server running in http://localhost:${port}`);


});