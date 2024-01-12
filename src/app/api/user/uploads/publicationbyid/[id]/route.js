import { connectMongoDB } from "@/lib/mongodb";
import Photos from "@/models/Photos";

export async function GET(request, { params }) {
  const { id } = params;
  const ids = id.split(",").map((Ids) => {
    return Ids;
  });
  try {
    connectMongoDB();
    const FavoritePost = await Photos.find({ _id: { $in: ids } });
    return Response.json({message: "Favorites post found", FavoritePost});
  } catch (error) {
    return Response.json({ message: "Error" , error});
  }
}
