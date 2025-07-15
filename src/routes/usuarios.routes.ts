import { FastifyInstance } from "fastify";
import {
  buscaUsuarioController,
  criaUsuarioController,
  deletaUsuarioController,
  loginUsuarioController,
} from "../controllers/usuario.controller";
import { LoginRequired } from "../middlewares/loginRequired";
import { Usuario } from "../types/usuario";
import { ObjectId } from "mongodb";

export async function usuarioRoutes(app: FastifyInstance) {
  app.post<{
    Body: Omit<Usuario, "createAt">;
  }>("/registrar", criaUsuarioController);
  app.post("/login", loginUsuarioController);
  app.get<{ Params: { id: ObjectId } }>(
    "/usuario/:id",
    { preHandler: LoginRequired },
    buscaUsuarioController
  );
  app.delete<{ Params: { id: ObjectId } }>(
    "/usuario/:id",
    { preHandler: LoginRequired },
    deletaUsuarioController
  );
}
