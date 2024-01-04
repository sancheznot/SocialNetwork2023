import { connectMongoDB } from "@/lib/mongodb";
import Photos from "@/models/Photos";

export async function GET(request, {params}) {
  const { id } = params;
  try {
    connectMongoDB();
    const publicationByCategory = await Photos.find({ category: id }).sort({
      createdAt: -1,
    });
    return Response.json(
      { message: "Publications by category",publicationByCategory },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: "Error", error }, { status: 500 });
  }
}
