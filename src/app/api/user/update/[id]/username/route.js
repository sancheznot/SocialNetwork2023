import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(resuqes, { params }) {
  const { id } = params;
  if (!id) {
    return Response.json({
      message: `id is required`,
    });
  }
  try {
    connectMongoDB();
    const user = await User.findOne({ username: id }).select("username");
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
    const { username } = await request.json();
    if (!id) {
        return Response.json({
        message: `id is required`,
        });
    }
    if (!username) {
        return Response.json({
        message: `username is required`,
        });
    }
    try {
        connectMongoDB();
        const userVerified = await User.find({ username });
        if (userVerified.length > 0) {
        return Response.json({
            message: `Username already exists`,
        }, { status: 202 });
        }
        const userUpdated = await User.findOneAndUpdate(
        { username: id },
        { username },
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
