const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const router = require ('./routes/router');
app.use('/api', router);

const db = require("./db");

app.listen(8080, () => {
  console.log(`Servidor corriendo en puerto 8080.`);
});