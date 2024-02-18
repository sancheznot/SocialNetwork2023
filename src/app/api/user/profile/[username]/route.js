import { connectMongoDB } from "@/lib/mongodb";
import Photos from "@/models/Photos";
import User from "@/models/User";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

export async function GET(request, { params }) {
  const { username } = params;
  if (!username) return Response.error({ message: "username is required" });

  try {
    connectMongoDB();
    const user = await User.findOne({ username }).select([
      "name",
      "lastname",
      "image",
      "photoFav",
      "followers",
      "following",
      "profilephoto",
      "leyend",
    ]);
    if (!user || user === null)
      return Response.json({ message: "user not found" });
    const userPublic = await Photos.find({ user: user._id }).select(["-user"]).sort({ createdAt: -1 });
    return Response.json({ user, userPublic });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { username } = params;
  const _id = username;
  const { photoId } = await request.json();
  if (!_id) return Response.error({ message: "user is required" });

  try {
    connectMongoDB();
    const user = await User.findOne({ _id });
    if (!user || user === null) {
      return Response.json({ message: "user not found" }, { status: 404 });
    }
    const photo = await Photos.findOne({ _id: photoId });
    if (!photo || photo === null) {
      return Response.json({ message: "photo not found" }, { status: 404 });
    }
    console.log(photo.filename, "2");
    if (photo.filename) {
      const res = await deleteFileFromS3(photo.filename);
      if (!res) {
        return Response.json(
          { message: "error deleting photo" },
          { status: 500 }
        );
      }
      if (res === true) {
        const userPublic = await Photos.findOneAndDelete({
          _id: photoId,
          user: user._id,
        });
        if (!userPublic || userPublic === null) {
          return Response.json({ message: "photo not found" }, { status: 404 });
        }
      }
    }
    return Response.json({ message: "photo deleted" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}

async function deleteFileFromS3(fileKey) {
  const s3client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  console.log(fileKey, "3");
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileKey, // File name you want to delete from S3
  };
  const command = new DeleteObjectCommand(params);
  try {
    await s3client.send(command);
    console.log("Archivo eliminado con éxito:", fileKey);
    return true;
  } catch (error) {
    console.error("Error al eliminar el archivo:", error);
  }
}
