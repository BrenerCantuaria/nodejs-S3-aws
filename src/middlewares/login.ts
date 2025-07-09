import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { Usuario } from "../types/usuario";

export async function LoginRequired(
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) {
  const token = request.headers["token"];
  if (!token || token !== process.env.TOKEN) {
    reply.status(401).send({
      error: "Unauthorized",
    });
  }
  done();
}
