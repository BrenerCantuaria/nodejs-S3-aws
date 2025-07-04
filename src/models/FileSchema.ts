import mongoose, { Schema } from "mongoose";

const fileUploadSchema = new Schema({
  nome: String,
  size: Number,
  key: String,
  url: String,
  createAt: {
    type: Date,
    default: Date.now,      
  },
});

export const FileSchemaMongoose = mongoose.model('PDF', fileUploadSchema)
