const NotaModel = require("../models/NotaModel");

class NotaController{

    static async listar(req, res) {
        const s = req.query.s;
        const autor = req.session.email;
        
        const notas = await NotaModel.find({ autor });
        
        res.render("nota/listar", { notas, s });
    };

    static async cadastrar(req, res) { 
        const { titulo, corpo } = req.body;
        const autor = req.session.email;

        const novaNota = new NotaModel({
            titulo,
            corpo,
            autor
        });

        await novaNota.save();
        res.redirect(`/notas?s=1`);
    };


    static paginaCadastrar(req, res) {
        res.render("nota/cadastrar");
    };

    static async detalhar(req, res) {
        const id = req.params.id;
        const autor = req.session.email;

        const nota = await NotaModel.findOne({ _id: id, autor });

        if (nota) {
            res.render("nota/detalhar", { nota });
        } else {
            res.status(404).send("Nota não encontrada OU você não tem permissão para acessar essa nota.");
        }
    };

    static async deletar(req, res) {
        const id = req.params.id;
        const autor = req.session.email;

        const resultado = await NotaModel.deleteOne({ _id: id, autor });

        if (resultado.deletedCount > 0) {
            res.redirect("/notas?s=2");
        } else { 
            res.status(404).send("Nota não encontrada OU você não tem permissão para acessar essa nota.");
        }
    };

    static async paginaEditar(req, res) {
        const id = req.params.id;
        const autor = req.session.email;

        const nota = await NotaModel.findOne({ _id: id, autor });

        if (nota) {
            res.render("nota/editar", { nota });
        } else {
            res.status(404).send("Nota não encontrada OU você não tem permissão para acessar essa nota.");
        }
    };

    static async editar(req, res) {
        const id = req.params.id;
        const { titulo, corpo } = req.body;
        const autor = req.session.email;

        const resultado = await NotaModel.updateOne({ _id: id, autor }, { titulo, corpo });

        if (resultado.modifiedCount > 0) {
            res.redirect("/notas?s=3");
        } else {
            res.status(404).send("Nota não encontrada OU você não tem permissão para acessar essa nota.");
        }
    };
}

module.exports = NotaController;
