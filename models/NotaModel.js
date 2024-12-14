const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const notaSchema = Schema({
    titulo: String,
    corpo: String,
    autor: String,
});

module.exports = mongoose.model("Nota", notaSchema)