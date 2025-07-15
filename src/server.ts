import dotenv from "dotenv";
dotenv.config();
import fastifyMultipart from "@fastify/multipart";
import { fastify } from "fastify";
import { connectToServer } from "./database/config";
import { registerRoutes } from "./routes/routes";
import fastifyJwt from "@fastify/jwt";
const server = fastify({ logger: true });
server.register(fastifyMultipart);
connectToServer();


server.register(fastifyJwt,{
  secret: process.env.JWT_SECRET || ""
})



// rotas da aplição
registerRoutes(server);

server.listen({
  port: 3333,
});
