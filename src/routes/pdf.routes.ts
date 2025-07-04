import { FastifyInstance } from "fastify";
import { uploadPdfHandler, listaPdfsHandler, deletePdfHandler } from "../controllers/pdf.controller";

export async function pdfRoutes(app: FastifyInstance) {
  app.get("/pdf", listaPdfsHandler);
  app.post("/pdf", uploadPdfHandler);
  app.delete("/pdf/:id", deletePdfHandler);
}
