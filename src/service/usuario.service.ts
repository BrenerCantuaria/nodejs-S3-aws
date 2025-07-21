import * as usuarioRepository from "../repositories/user.repository";
import { UsuarioDoc } from "../models/UsuarioSchema";
import { Usuario } from "../types/usuario";
import { ObjectId } from "mongodb";

export const loginUsuario = async (email: string, senha: string) => {
  const usuario = await usuarioRepository.findUsuarioByEmail(email);
  if (!usuario) throw new Error("Usuário não encontrado");
  const senhaValida = await usuario?.compararSenha(senha);
  if (!senhaValida) throw new Error("Senha incorreta");
  return usuario;
};

export const criaUsuario = async (usuarioData: Omit<Usuario, "createAt">) => {
  return usuarioRepository.criaUsuario(usuarioData);
};

export const buscaUsuario = async (id: ObjectId) => {
  const usuario = await usuarioRepository.findUsuarioById(id);
  if (!usuario) throw new Error("Usuário não encontrado");
};

export const atualizaUsuario = async (
  id: ObjectId,
  updateData: Partial<UsuarioDoc>
) => {
  return usuarioRepository.updateUsuarioById(id, updateData);
};

export const deletaUsuario = async (id: ObjectId) => {
  return usuarioRepository.deleteUsuarioById(id);
};
