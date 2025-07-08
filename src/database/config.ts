import mongoose from "mongoose";

async function connectToServer() {
  const mongoUrl = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`;
  try {
    await mongoose.connect(mongoUrl);
    console.log("✅ Conectado ao MongoDB com Mongoose");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error);
    throw error;
  } 
}

export { connectToServer };
