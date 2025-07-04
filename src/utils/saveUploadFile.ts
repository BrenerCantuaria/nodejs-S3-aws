import { pipeline } from "stream/promises";
import { createWriteStream, mkdirSync, existsSync } from "fs";
import path from "path";
import crypto from "crypto";
import type { MultipartFile } from "@fastify/multipart";

export async function saveUploadedFile(file: MultipartFile): Promise<string> {
  const uploadDir = path.resolve("tmp", "uploads");

  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }

  const hash = crypto.randomBytes(16).toString("hex");
  const fileName = `${hash}-${file.filename}`;
  const filePath = path.join(uploadDir, fileName);

  await pipeline(file.file, createWriteStream(filePath));

  return  fileName;
}
