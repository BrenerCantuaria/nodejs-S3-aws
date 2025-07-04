import fastifyMultipart from "@fastify/multipart";
import { fastify } from "fastify";
import { connectToServer } from "./database/config";
import { saveUploadedFile } from "./utils/saveUploadFile";
import { FileSchemaMongoose } from "./models/FileSchema";
const server = fastify({ logger: true });
server.register(fastifyMultipart);
connectToServer();


// Rota de upload
server.post("/pdf", async (request, reply) => {
  const data = await request.file();
  
  if (!data) {
    return reply.status(400).send({ error: "Nenhum arquivo enviado" });
  }
  // Verificar tipo MIME
  if (data.mimetype !== "application/pdf") {
    return reply
      .status(400)
      .send({ error: "Somente arquivos PDF são permitidos." });
  }

  try {
    const filePath = await saveUploadedFile(data);
    await FileSchemaMongoose.create({
      nome: data.filename,
      size: (data.file as any).bytesRead,
      key: filePath,
      url: '',
    })
    return reply.send({ message: "Arquivo salvo!", path: filePath });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: "Erro ao salvar arquivo." });
  }
});


server.listen({
  port: 3333,
});
