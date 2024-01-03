import { connectMongoDB } from "@/lib/mongodb";
import BlackList from "@/models/BlackList";

export async function GET(request) {
  const header = request.headers.get("Authorization");
  if (header !== "Admin true") {
    return Response.json(
      { message: "Sorry you are not admin" },
      { status: 401 }
    );
  }
  try {
    connectMongoDB();
    const blacklist = await BlackList.find({});
    return Response.json({ blacklist }, { status: 200 });
  } catch (error) {
    return Response.json({ message: `Sorry Error` });
  }
}

export async function POST(request) {
  const { username, email, reason } = await request.json();
  if (!username || !email || !reason) {
    return Response.json(
      { message: "Please fill all fields" },
      { status: 204 }
    );
  }
  const checklist = await BlackList.findOne({ email });

  if (checklist) {
    return Response.json({ message: "User already banned" }, { status: 202 });
  }
  try {
    connectMongoDB();
    const newBlackList = await BlackList.create({
      username,
      email,
      reason,
    });
    return Response.json({ message: "User banned successfully" }, newBlackList);
  } catch (error) {
    return Response.json({ message: `Sorry Error` });
  }
}

export async function DELETE(request) {
  const { username } = await request.json();
  if (!username) {
    return Response.json(
      { message: "Sorry we can not get the username" },
      { status: 204 }
    );
  }
  const checklist = await BlackList.findOne({ username });
  if (!checklist) {
    return Response.json({ message: "User not found" }, { status: 202 });
  }
  try {
    connectMongoDB();
    const newBlackList = await BlackList.deleteOne({
      username,
    });
    return Response.json(
      { message: "User unbanned successfully" },
      newBlackList,
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: `Sorry Error` }, { status: 500 });
  }
}
