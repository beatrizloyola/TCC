const express = require("express");
const routes = express.Router();
const UsuarioController = require("../controller/UsuarioController")
const auth = require("../middlewares/usuarioAuth");

//

routes.get("/usuarios", UsuarioController.listar)

routes.get("/login", UsuarioController.paginaLogar) 
routes.post("/login", UsuarioController.logar)

routes.get("/usuarios/cadastrar", UsuarioController.paginaCadastrar) 

routes.get("/usuarios/editar/:id", auth, UsuarioController.paginaEditar)
routes.post("/usuarios/editar/:id", auth, UsuarioController.editar) 

routes.post("/usuarios/deletar/:id", auth, UsuarioController.deletar)

routes.get("/usuarios/:id", UsuarioController.detalhar) 

routes.get("/logout", UsuarioController.logout)
//

module.exports = routes;