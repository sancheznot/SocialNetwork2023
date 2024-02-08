import User from "@/models/User";
// this can be used to disable the cache
export const revalidate=0
export async function GET(request, {params}) {
  const { id } =  params;
  try {
   
    const user = await User.findOne({ _id: id });
    return Response.json(user.photoFav);
  } catch (error) {
    return Response.json({ message: "Error" });
  }
}

export async function DELETE(request, {params}) {
  const [ _id, imageId ] = params.id
  try {
    const userExists = await User.findOneAndUpdate(
      { _id },
      { $pull: { photoFav: imageId } }
    );
    return Response.json({
      message: "Image removed from favorites",
      fav: userExists.photoFav,
    });
  } catch (error) {
    return Response.json({ message: "Error" });
  }
}