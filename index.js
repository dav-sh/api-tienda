var express = require('express');
var bodyParser = require('body-parser');
const db = require('./config/db');

var app = express();
var port = process.env.PORT || 3525;



// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', async function(req, res){

	const data = await db.sequelize.authenticate();
   	// res.status(200).send({
	// 	message: 'GET Home route working fine!'
	// });
});

app.listen(port, function(){
	console.log(`Server running in http://localhost:${port}`);
	console.log('Defined routes:');
	console.log('	[GET] http://localhost:3525/');
});