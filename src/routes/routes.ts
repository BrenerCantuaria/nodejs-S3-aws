import { FastifyInstance } from "fastify";
import { pdfRoutes } from "./pdf.routes";
import { usuarioRoutes } from "./usuarios.routes";

export async function registerRoutes(app: FastifyInstance) {
  await pdfRoutes(app);
  await usuarioRoutes(app);
  // await authRoutes(app);
}
