import { connectMongoDB } from "@/lib/mongodb";
import Categorie from "@/models/Categories";

export async function GET(request) {
  try {
    connectMongoDB();
    const categories = await Categorie.find({});
    return Response.json({ categories }, {status: 200});
  } catch (error) {
    return Response.json({ message: `Sorry Error` }, error);
  }
}
