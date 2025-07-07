import mongoose from "mongoose";
const { Schema } = mongoose;

const usuario = new Schema({
  nome: String,
  sobrenome: String,
  email: String,
  senha: String,
  cargo: String,
  createAt: { type: Date, default: Date.now },
});

export const usuarioMoongoseSchema = mongoose.model("usuarios", usuario);
