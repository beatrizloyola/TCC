// Import das variáveis de ambiente

require('dotenv/config')

// Setup do Express

const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true}));
app.set('view engine','ejs');
app.use(express.static('public'));

// Setup do Banco de Dados

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

// Setup de Sessão

const session = require("express-session")
app.use(session({
    secret: 'ifpe',
    saveUninitialized: false,
    resave: false
}));

// Importação de Usuário

const UsuarioModel =  require("./models/UsuarioModel");
const UsuarioController = require("./controller/UsuarioController")
const UsuarioRoutes = require("./routes/UsuarioRoutes")
app.use(UsuarioRoutes)

// Rota Index

app.get("/", function(req, res){
    if(req.session.usuario){
        res.render("index");
    } else {
        res.redirect("/login")
    }
});

// Rotas Erro

app.use(function(req, res) {

    res.status(404).render("404");
    
    });

// Rodar aplicação

app.listen(process.env.PORT, function(){
    console.log("Rodando...");
});