const mongoose = require("mongoose");
const UsuarioModel = require("../models/UsuarioModel");
const bcryptjs = require("bcryptjs");

class UsuarioController {
    static async listar(req, res) {
        const s = req.query.s;
        const usuarios = await UsuarioModel.find();
        res.render("usuario/listar", { usuarios, s });
    }

    static async cadastrar(req, res) {
        const { nome, email, senha } = req.body;
        const usuario = await UsuarioModel.findOne({ email });
        if (usuario != null){
            res.redirect("usuario/cadastrar?s=1")
        } else { 
            const salt = bcryptjs.genSaltSync();
            const hash =  bcryptjs.hashSync(senha, salt);
            const novoUsuario = new UsuarioModel({
                nome,
                email,
                senha: hash,
            });
            await novoUsuario.save();
            res.redirect(`/usuarios?s=1`);
        }
    }
    

    static paginaCadastrar(req, res) {
        const s = req.query.s;
        res.render("usuario/cadastrar", { s });
    }

    static async detalhar(req, res) {
        const id = req.params.id;
        const usuario = await UsuarioModel.findById(id);
        if (usuario) {
            res.render("usuario/detalhar", { usuario });
        } else {
            res.status(404).send("Usuário não encontrado.");
        }
    }

    static async deletar(req, res) {
        const id = req.params.id;
        await UsuarioModel.findByIdAndDelete(id);
        res.redirect("/usuarios?s=2");
    }

    static async paginaEditar(req, res) {
        const id = req.params.id;
        const usuario = await UsuarioModel.findById(id);
        if (usuario) {
            res.render("usuario/editar", { usuario });
        } else {
            res.status(404).send("Usuário não encontrado.");
        }
    }

    static async editar(req, res) {
        try {
            const id = req.params.id;
            const { nome, email, senha } = req.body;
    
            const updateData = { nome, email };
    
            if (senha) {
                const salt =  bcryptjs.genSaltSync();
                updateData.senha = bcryptjs.hashSync(senha, salt);}
    
            await UsuarioModel.findByIdAndUpdate(id, updateData);
            res.redirect("/usuarios?s=3");
        } catch (err) {
            res.status(400).send("ID inválido ou erro ao editar usuário.");
        }
    }
    

    static paginaLogar(req, res) {
        res.render("usuario/login");
    }    

    static async logar(req, res) {
        const usuario = await UsuarioModel.findOne({
            email: req.body.email
        });
        if (usuario == null){
            res.redirect("usuario/login?s=1")
        } else {
            if (bcryptjs.compareSync(req.body.senha, usuario.senha)) {
                req.session.usuario = req.body.email;
                res.redirect("/")
            } else {
                res.redirect("usuario/login?s=1")
            }
        }
    }

    static logout(req,res){
        req.session.usuario = null;
        res.redirect("/");
    }
    
}

module.exports = UsuarioController;
