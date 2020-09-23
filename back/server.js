const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

//inicia o app
const app = express();

//inicia o bd
mongoose.connect("mongodb://integracao:integracao@cluster0-shard-00-00-scuoy.mongodb.net:27017,cluster0-shard-00-01-scuoy.mongodb.net:27017,cluster0-shard-00-02-scuoy.mongodb.net:27017/integracao?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",{ useUnifiedTopology: true ,useNewUrlParser : true } );

requireDir('./src/models');

app.use(express.json());

//rotas
app.use("/", require("./src/models/routes")); // recebe todas as requisiçoes

app.listen(2000);