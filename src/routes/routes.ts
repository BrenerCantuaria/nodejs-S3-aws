import { FastifyInstance } from "fastify";
import { pdfRoutes } from "./pdf.routes";

export async function registerRoutes(app: FastifyInstance) {
  await pdfRoutes(app);

  // No futuro: await userRoutes(app);
  // await authRoutes(app);
}
