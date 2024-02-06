import User from "@/models/User";

export async function GET(request, { params }) {
  const { username } = await params;
  try {
    const userFound = await User.findOne({ username: username });
    if (!userFound) {
      return Response.json({ message: "User not found" });
    }
    const { followers, following } = userFound;
    return Response.json({ followers, following }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Error" }, { status: 500 });
  }
}
