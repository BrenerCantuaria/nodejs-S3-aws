import { FastifyReply, FastifyRequest } from "fastify";
import { ObjectId } from "mongodb";
import { usuarioMoongoseSchema } from "../models/Usuario";
import { Usuario } from "../types/usuario";

export async function loginUsuarioController(
  request: FastifyRequest<{ Body: { email: string; senha: string } }>,
  reply: FastifyReply
) {
  const { email, senha } = request.body;
  try {
    const usuario = await usuarioMoongoseSchema.findOne({ email });
    if (!usuario) reply.status(401).send({ error: "Usuario nao encontrado" });
    const senhaValida= await usuario?.compararSenha(senha)
    if (!senhaValida) {
      reply.status(401).send({error:"Senha errada"})
    }
    reply.status(200).send({ mensagem: "Login bem-sucedido", usuario });
  } catch (error) {
    console.log("Error ao fazer login", error);
  }
}

export async function criaUsuarioController(
  request: FastifyRequest<{ Body: Omit<Usuario, "createAt"> }>,
  reply: FastifyReply
) {
  const { nome, sobrenome, email, senha, cargo } = request.body;
  try {
    const usuarioCriado = await usuarioMoongoseSchema.create({
      nome,
      sobrenome,
      email,
      senha,
      cargo,
    });
    reply.status(201).send(usuarioCriado);
  } catch (error) {
    return reply.status(500).send({
      message: "Erro ao criar usuário",
    });
  }
}
export async function buscaUsuarioController(
  request: FastifyRequest<{ Params: { id: ObjectId } }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  try {
    const usuario = await usuarioMoongoseSchema.find({
      id,
    });
    reply.status(200).send(usuario);
  } catch (error) {
    return reply.status(404).send({
      message: "Nenhum usuario encontrado",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    });
  }
}
export async function atualizaUsuario(
  request: FastifyRequest,
  reply: FastifyReply
) {}

export async function deletaUsuarioController(
  request: FastifyRequest<{
    Params: { id: ObjectId };
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    await usuarioMoongoseSchema.findByIdAndDelete(id);
    return reply.status(200).send({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    return reply.status(500).send({
      message: "Erro ao deletar usuário",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    });
  }
}
