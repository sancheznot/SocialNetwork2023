import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3client = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

const links = [];
const filenamed = [];
async function uploadFileToS3(file, fileName) {
  const fileBuffer = file;
  filenamed.push(
    `profileavatar/${process.env.S3_BUCKET_NAME}-${Date.now()}-${fileName}`
  );

  if (links.length > 0) {
    await deleteFileFromS3(filenamed[0]);
    links.pop();
    filenamed.shift();
  }
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filenamed[0],
    Body: fileBuffer,
    // ACL: "public-read",
    ContentType: "image/jpg",
  };
  const command = new PutObjectCommand(params);
  await s3client.send(command);
  links.push(
    `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${filenamed[0]}`
  );
  return fileName;
}

// Delete a file from an S3 bucket using the AWS SDK for JavaScript v3
async function deleteFileFromS3(fileKey) {
  console.log(fileKey, "3");
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileKey, // File name you want to delete from S3
  };
  const command = new DeleteObjectCommand(params);
  try {
    await s3client.send(command);
    console.log("Archivo eliminado con éxito:", fileKey);
  } catch (error) {
    console.error("Error al eliminar el archivo:", error);
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file) {
      return Response.json(
        { message: "Please select a file" },
        { status: 400 }
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, file.name);
    return Response.json(
      { message: "File uploaded successfully", links  },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: `Sorry Error` }, { status: 500 });
  }
}
