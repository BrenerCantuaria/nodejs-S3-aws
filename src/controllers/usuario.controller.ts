import { FastifyReply, FastifyRequest } from "fastify";
import { ObjectId } from "mongodb";
import * as usuarioService from "../service/usuario.service";
import { Usuario } from "../types/usuario";

export async function loginUsuarioController(
  request: FastifyRequest<{ Body: { email: string; senha: string } }>,
  reply: FastifyReply
) {
  const { email, senha } = request.body;
  try {
    const usuario = await usuarioService.loginUsuario(email, senha);
    const token = request.server.jwt.sign({
      id: usuario?._id,
      email: usuario?.email,
      cargo: usuario?.cargo,
    });
    reply
      .status(200)
      .send({ mensagem: "Login bem-sucedido", token: `${token}`, usuario });
  } catch (error) {
    console.log("Error ao fazer login", error);
  }
}

export async function criaUsuarioController(
  request: FastifyRequest<{ Body: Omit<Usuario, "createAt"> }>,
  reply: FastifyReply
) {
  try {
    const usuarioCriado = await usuarioService.criaUsuario(request.body);
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
    const usuario = await usuarioService.buscaUsuario(id);
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
    await usuarioService.deletaUsuario(id);
    return reply.status(200).send({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    return reply.status(500).send({
      message: "Erro ao deletar usuário",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    });
  }
}
