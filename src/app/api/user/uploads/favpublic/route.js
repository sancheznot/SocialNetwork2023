import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function PUT(request) {
  const { _id, imageId } = await request.json();
  console.log(_id, imageId);
  try {
    connectMongoDB();
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


