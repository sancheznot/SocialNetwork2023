import User from "@/models/User";

export async function POST(request, { params }) {
  const { usernameInsession } = await request.json();
  const { username } = params;

  try {
    if (!username) {
      return Response.error({ message: "username is required" });
    }

    const userToFollowFound = await User.findOne({ username }).select("_id");
    const userInSessionFound = await User.findOne({ username: usernameInsession }).select("_id");

    if (!userToFollowFound || !userInSessionFound) {
      return Response.error({ message: "user not found" });
    }

    if (userToFollowFound._id.equals(userInSessionFound._id)) {
      return Response.json({ message: "cannot follow yourself" }, { status: 400 });
    }

    // check if the user is already following the user
    const isFollowing = await User.findOne({
      _id: userInSessionFound._id,
      following: userToFollowFound._id,
    });

    if (isFollowing) {
      // leave follow if already following
      await User.updateOne(
        { _id: userToFollowFound._id },
        { $pull: { followers: userInSessionFound._id } }
      );
      await User.updateOne(
        { _id: userInSessionFound._id },
        { $pull: { following: userToFollowFound._id } }
      );
    } else {
      // begin following if the user is not being followed using $addToSet
      await User.updateOne(
        { _id: userToFollowFound._id },
        { $addToSet: { followers: userInSessionFound._id } }
      );
      await User.updateOne(
        { _id: userInSessionFound._id },
        { $addToSet: { following: userToFollowFound._id } }
      );
    }

    return Response.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.error(error); // Asegúrate de registrar el error adecuadamente
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
