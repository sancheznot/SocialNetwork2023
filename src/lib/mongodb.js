import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

export const connectMongoDB = async () => {
 try{
  const { connection } = await mongoose.connect(MONGODB_URI);
  if (connection.readyState === 1) {
    console.log("MongoDB connected");
    return Promise.resolve(true);
  }
 }catch(e){
   console.log(e)
  return Promise.reject(false);
 }

};
