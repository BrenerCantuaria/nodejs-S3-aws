import { FastifyInstance } from "fastify";
import {
  buscaUsuarioController,
  criaUsuarioController,
  deletaUsuarioController,
} from "../controllers/usuario.controller";
export async function usuarioRoutes(app: FastifyInstance) {
  app.post("/usuario", criaUsuarioController);
  app.get("/usuario/:id", buscaUsuarioController);
  app.delete("/usuario/:id", deletaUsuarioController);
}
