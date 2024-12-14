const express = require("express");
const routes = express.Router();
const NotaController = require("../controller/NotaController")
const auth = require("../middlewares/usuarioAuth");

//

routes.get("/notas", auth, LivroController.listar)

routes.get("/notas/cadastrar", auth, LivroController.paginaCadastrar)
routes.post("/notas", auth, LivroController.cadastrar)

routes.get("/notas/:id", auth, LivroController.detalhar)

routes.get("/notas/editar/:id", auth, LivroController.paginaEditar)
routes.post("/notas/editar/:id", auth, LivroController.editar)

routes.post("/notas/deletar/:id", auth, LivroController.deletar)

//

module.exports = routes;