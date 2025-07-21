import bcrypt from "bcrypt";
import mongoose from "mongoose";

export interface UsuarioDoc extends Document {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  cargo: string;
  createAt: Date;
  arquivos: string[];
  compararSenha(senhaFornecida: string): Promise<boolean>;
}

const { Schema } = mongoose;
const usuario = new Schema<UsuarioDoc>({
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
  arquivos: [{ type: Schema.Types.ObjectId, ref: "pdfs" }],
});

usuario.pre("save", async function (next) {
  if (!this.isModified("senha")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
  } catch (error) {
    console.log("Erro ao tentar encriptar a senha do usuario", error);
  }
});

usuario.methods.compararSenha = async function (senhaFornecida: string) {
  return await bcrypt.compare(senhaFornecida, this.senha);
};

export const usuarioMoongoseSchema = mongoose.model<UsuarioDoc>("usuarios", usuario);
