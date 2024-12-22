var express = require('express');
var bodyParser = require('body-parser');
const db = require('./config/db');
const productosRoutes = require('./routes/productosRoutes')
const estadoRoutes = require('./routes/estadoRoutes')
const clienteRoutes = require('./routes/clienteRoutes')
const categoriaProdRoutes = require('./routes/categoriaProdRoutes')
const usuariosRoutes = require('./routes/usuariosRoutes')
const ordenRoutes = require('./routes/ordenRoutes')
var app = express();
var port = 3000;



// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//Rutas
app.use("/api/productos", productosRoutes);
app.use("/api/estado", estadoRoutes);
app.use("/api/clientes", clienteRoutes)
app.use("/api/categoria", categoriaProdRoutes)
app.use("/api/usuarios", usuariosRoutes)
app.use("/api/ordenes", ordenRoutes)

//Home
app.get('/', async function(req, res){

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

app.listen(port, function(){
	console.log(`Server running in http://localhost:${port}`);
	
	
});