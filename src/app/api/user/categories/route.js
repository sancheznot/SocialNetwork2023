import { connectMongoDB } from "@/lib/mongodb";
import Categorie from "@/models/Categories";
export const revalidate=0
export async function GET(request) {
  try {
    connectMongoDB();
    const categories = await Categorie.find({});
    return Response.json({ categories }, {status: 200});
  } catch (error) {
    return Response.json({ message: `Sorry Error` }, { status: 500 });
  }
}
