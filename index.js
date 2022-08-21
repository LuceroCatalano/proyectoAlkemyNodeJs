const express = require('express');
const app = express();

require('./db');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.send('hello world');
  });

app.listen(8080)
