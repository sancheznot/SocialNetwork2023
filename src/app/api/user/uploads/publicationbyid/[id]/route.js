import Photos from "@/models/Photos";
// this can be used to disable the cache
export const revalidate = 0;
export async function GET(request, { params }) {
  const { id } = params;
  const ids = id.split(",").map((Ids) => {
    return Ids;
  });
  try {
    const FavoritePost = await Photos.find({ _id: { $in: ids } });
    return Response.json({ message: "Favorites post found", FavoritePost });
  } catch (error) {
    return Response.json({ message: "Error", error });
  }
}
