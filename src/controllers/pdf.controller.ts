import { FastifyReply, FastifyRequest } from "fastify";
import { ObjectId } from "mongodb";
import { FileSchemaMongoose } from "../models/FileSchema";
import { saveUploadedFile } from "../utils/saveUploadFile";
import mongoose from "mongoose";

export async function uploadPdfHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id} = request.user as {
    id: string;
  };
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

    await FileSchemaMongoose.create({
      nome: data.filename,
      size: (data.file as any).bytesRead,
      key: filePath,
      url: "",
      dono: id,
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
  const { id } = request.user as {
    id: string;
  };
  const ObjectId = new mongoose.Types.ObjectId(id)
  const arquivos = await FileSchemaMongoose.find({
    dono: ObjectId
  });
  return reply.send(arquivos);
}
export async function listaPdfsHandlerById(
  request: FastifyRequest<{ Params: { id: ObjectId } }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const ObjectId = new mongoose.Types.ObjectId(id)
  const arquivos = await FileSchemaMongoose.findOne({ dono: ObjectId });
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
