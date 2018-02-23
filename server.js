const express = require('express');
// Obtiene funciones express
const app = express();
// Crea servidor
const server = app.listen(8000, encender);

function encender() {
  console.log('Servidor encendido');
}

app.use(express.static('public'));