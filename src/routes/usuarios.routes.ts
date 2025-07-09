import { FastifyInstance } from "fastify";
import {
  buscaUsuarioController,
  criaUsuarioController,
  deletaUsuarioController,
} from "../controllers/usuario.controller";
import { LoginRequired } from "../middlewares/login";
import { Usuario } from "../types/usuario";
import { ObjectId } from "mongodb";

export async function usuarioRoutes(app: FastifyInstance) {
  app.post<{
    Body: Omit<Usuario, "createAt">;
  }>("/usuario", { preHandler: LoginRequired }, criaUsuarioController);
  app.get<{ Params: { id: ObjectId } }>("/usuario/:id", { preHandler: LoginRequired }, buscaUsuarioController);
  app.delete<{ Params: { id: ObjectId } }>("/usuario/:id", { preHandler: LoginRequired }, deletaUsuarioController);
}
