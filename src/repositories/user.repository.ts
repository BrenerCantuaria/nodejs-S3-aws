import { UsuarioDoc } from "../models/UsuarioSchema";
import { usuarioMoongoseSchema } from "../models/UsuarioSchema";
import { Usuario } from "../types/usuario";
import { ObjectId } from "mongodb";

export const criaUsuario = async (usuarioData: Omit<Usuario, "createAt">) => {
  return usuarioMoongoseSchema.create(usuarioData);
};

export const findUsuarioByEmail = async (email: string) => {
  return usuarioMoongoseSchema.findOne({ email }).exec();
};

export const findUsuarioById = async (id: ObjectId) => {
  return usuarioMoongoseSchema.findOne({ id }).exec();
};

export const deleteUsuarioById = async (id: ObjectId) => {
  return usuarioMoongoseSchema.deleteOne({ id }).exec();
};

export const updateUsuarioById = async (
  id: ObjectId,
  updateData: Partial<UsuarioDoc>
) => {
  return usuarioMoongoseSchema
    .findByIdAndUpdate(id, updateData, { new: true })
    .exec();
};
