import { connectMongoDB } from "@/lib/mongodb";
import Photos from "@/models/Photos";

export async function GET(request) {
  try {
    connectMongoDB();
    const photos = await Photos.find({}).sort({createdAt:-1});
    return Response.json({ photos });
  } catch (error) {
    return Response.json({ message: `Sorry Error` }, { status: 500 });
  }
}
export async function POST(request) {
  const { title, url,filename, user, category } = await request.json();
  if (!title || !url || !user) {
    return Response.json(
      { message: "Please fill all fields" },
      { status: 204 }
    );
  }
  try {
    connectMongoDB();
    const newPhoto = await Photos.create({
      title,
      url,
      filename,
      user,
      category,
    });
    return Response.json({ message: "Photo uploaded successfully" }, newPhoto, {
      status: 200,
    });
  } catch (error) {
    return Response.json({ message: `Sorry Error` }, { status: 500 });
  }
}
