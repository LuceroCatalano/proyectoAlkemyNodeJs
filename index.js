const express = require("express");
const { PORT } = require("./config");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const router = require ('./routes/router');

app.use('/', router);

app.listen(PORT);