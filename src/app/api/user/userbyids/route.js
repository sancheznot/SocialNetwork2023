import User from "@/models/User";

export async function POST(request) {
  const { ids } = await request.json();
  console.log(ids);
  try {
    const users = await User.find({ _id: { $in: ids } }).select([
      "username",
      "followers",
      "following",
      "image",
    ]);
    return Response.json({ users }, { status: 200 });
  } catch (error) {
    return Response.json({ message: `Sorry Error` }, { status: 500 });
  }
}
