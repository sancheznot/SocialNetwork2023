import User from "@/models/User";
// this can be used to disable the cache
export const revalidate=0
export async function PUT(request) {
  const { _id, imageId } = await request.json();
    try {    
    const photoFavExists = await User.findOne({ _id: _id });
    if (photoFavExists.photoFav.includes(imageId)) {
      return Response.json({
        message: "Image already in favorites",
        fav: photoFavExists.photoFav,
      });
    }
    const userExists = await User.findOneAndUpdate(
      { _id },
      { $push: { photoFav: imageId } }
    );
    return Response.json({
      message: "Image added to favorites",
      fav: userExists.photoFav,
    });
  } catch (error) {
    return Response.json({ message: "Error" });
  }
}


