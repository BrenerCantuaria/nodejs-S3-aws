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
  dono: [{type: Schema.Types.ObjectId, ref: 'usuarios'}]
});

export const FileSchemaMongoose = mongoose.model('pdfs', fileUploadSchema)
