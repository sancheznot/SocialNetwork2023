import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(request, { params }) {
  const { id } = params;
  if (!id) {
    return Response.json({
      message: `id is required`,
    });
  }
  try {
    connectMongoDB();
    const user = await User.findOne({ username: id }).select("leyend");
    if (!user) {
      return Response.json({
        message: `User not found`,
      });
    }
    return Response.json({ user }, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        message: `Error: ${error}`,
      },
      { status: 400 }
    );
  }
}

export async function POST(request, { params }) {
  const { id } = params;
  const { leyend } = await request.json();
  if (!id) {
    return Response.json({
      message: `id is required`,
    });
  }
  if (!leyend) {
    return Response.json({
      message: `leyend is required`,
    });
  }
  try {
    connectMongoDB();
    const userUpdated = await User.findOneAndUpdate(
      { username: id },
      { leyend },
      { new: true }
    );
    if (!userUpdated) {
      return Response.json({
        message: `User not found`,
      });
    }
    return Response.json({ message: `User updated` }, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        message: `Error: ${error}`,
      },
      { status: 400 }
    );
  }
}
