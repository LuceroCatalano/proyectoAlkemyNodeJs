const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const router = require ('./routes/router');

app.use('/', router);

app.listen(8080);