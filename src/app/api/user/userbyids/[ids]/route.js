import User from "@/models/User";


export async function GET(request, { params }) {
  const { ids } = await params;
  try {
    const users = await User.find({ _id: { $in: ids } });
    return Response.json(users);
  } catch (error) {
    return Response.json({ message: `Sorry Error` }, error);
  }
}
