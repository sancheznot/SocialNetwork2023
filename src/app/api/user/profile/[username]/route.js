import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(request, { params }) {
  const { username } = params;
  if (!username) return Response.error({ message: "username is required" });

  try {
    connectMongoDB();
    const user = await User.findOne({ username }).select(["name", "lastname", "image"]);
    if (!user || user === null)
      return Response.json({ message: "user not found" });
    return Response.json({ user });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
