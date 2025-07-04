import { FastifyReply, FastifyRequest } from "fastify";
import { ObjectId } from "mongodb";
import { FileSchemaMongoose } from "../models/FileSchema";
import { saveUploadedFile } from "../utils/saveUploadFile";

export async function uploadPdfHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const data = await request.file();
  if (!data)
    return reply.status(400).send({
      error: "Nenhum arquivo foi enviado",
    });

  if (data.mimetype != "application/pdf") {
    return reply.status(400).send({
      error: "Apenas PDFs são permitidos",
    });
  }

  try {
    const filePath = await saveUploadedFile(data);
    const size = (data.file as any).bytesRead;

    await FileSchemaMongoose.create({
      nome: data.filename,
      size: (data.file as any).bytesRead,
      key: filePath,
      url: "",
    });
    return reply.status(200).send({
      message: "Arquivo salvo com sucesso !!",
    });
  } catch (error) {
    return reply.status(400).send({
      error: "Erro ao salvar arquivo no database MongoDB",
    });
  }
}

export async function listaPdfsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const arquivos = await FileSchemaMongoose.find();
  return reply.send(arquivos);
}

export async function deletePdfHandler(
  request: FastifyRequest<{ Params: { id: ObjectId } }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const documento = await FileSchemaMongoose.findOneAndDelete({ _id: id });

  if (!documento) {
    return reply.status(400).send({ error: "Arquivo não encontrado" });
  }
  return reply.send({ message: "Arquivo excluído com sucesso!" });
}
