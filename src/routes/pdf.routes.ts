import { FastifyInstance } from "fastify";
import {
  uploadPdfHandler,
  listaPdfsHandler,
  deletePdfHandler,
  listaPdfsHandlerById,
} from "../controllers/pdf.controller";
import { LoginRequired } from "../middlewares/loginRequired";
import { ObjectId } from "mongodb";

export async function pdfRoutes(app: FastifyInstance) {
  app.get("/pdf", { preHandler: LoginRequired }, listaPdfsHandler);
  app.get<{ Params: { id: ObjectId } }>("/pdf/:id", { preHandler: LoginRequired }, listaPdfsHandlerById);
  app.post("/pdf", { preHandler: LoginRequired }, uploadPdfHandler);
  app.delete<{ Params: { id: ObjectId } }>("/pdf/:id", { preHandler: LoginRequired },deletePdfHandler);
}
