import dotenv from "dotenv";
dotenv.config();
import fastifyMultipart from "@fastify/multipart";
import { fastify } from "fastify";
import { connectToServer } from "./database/config";
import { registerRoutes } from "./routes/routes";
const server = fastify({ logger: true });
server.register(fastifyMultipart);
connectToServer();

// rotas da aplição
registerRoutes(server);

server.listen({
  port: 3333,
});
