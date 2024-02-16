import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request, { params }) {
  const { id } = params;
  const { imgURL } = await request.json();
  try {
    connectMongoDB();
    const foundUser = await User.findOne({ username: id });
    if (!foundUser) {
      return Response.json({
        message: "User not found",
      });
    }

    const photosave = await User.findOneAndUpdate(
      { username: id },
      { image: imgURL },
      { new: true }
    );
    if (photosave) {
      return Response.json(
        {
          message: `Photo profile updated successfully`,
        },
        { status: 200 }
      );
    }
    return Response.json(
      {
        message: `Photo not updated`,
      },
      { status: 400 }
    );
  } catch (error) {
    return Response.json(
      {
        message: `Sorry Error`,
      },
      { status: 500 }
    );
  }
}