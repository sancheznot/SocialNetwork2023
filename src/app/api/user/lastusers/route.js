import User from "@/models/User";

// this can be used to disable the cache
export const revalidate = 0;

export async function GET(request) {
  try {
    const users = await User.find({})
      .sort({ createdAt: -1 })
      .limit(8)
      .select(["username", "followers", "following", "image", "createdAt"]);
    return Response.json({ users }, { status: 200 });
  } catch (error) {
    return Response.json({ message: `Sorry Error` }, error);
  }
}
