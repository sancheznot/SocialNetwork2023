import { connectMongoDB } from "@/lib/mongodb";
import Photos from "@/models/Photos";
import User from "@/models/User";

export async function GET(request, { params }) {
  const { username } = params;
  if (!username) return Response.error({ message: "username is required" });

  try {
    connectMongoDB();
    const user = await User.findOne({ username }).select(["name", "lastname", "image","photoFav", "followers", "following", "leyend"]);
    if (!user || user === null)
      return Response.json({ message: "user not found" });
    const userPublic = await Photos.find({ user: user._id }).select(["-user"]);
    return Response.json({ user, userPublic });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
