import mongoose from "mongoose";
const { Schema } = mongoose;

const usuario = new Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true, 
  },
  senha: { type: String, required: true },
  cargo: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
});

export const usuarioMoongoseSchema = mongoose.model("usuarios", usuario);
