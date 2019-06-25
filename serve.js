const express = require("express");
const proxy = require("express-http-proxy");
const app = express();

app.use('/odata/', proxy('https://services.odata.org/'));

app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/src'));

app.listen(3000, () => console.log("http://localhost:3000/"));
