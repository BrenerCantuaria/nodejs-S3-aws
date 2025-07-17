import { FastifyReply, FastifyRequest } from "fastify";
export async function LoginRequired(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply.status(401).send({ error: "Não autorizado" });
  }
}
