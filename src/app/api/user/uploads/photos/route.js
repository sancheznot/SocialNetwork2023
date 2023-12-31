import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3client = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

const links = [];
async function uploadFileToS3(file, fileName) {
  const fileBuffer = file;
  console.log(fileName);

  const filenamed = `${process.env.S3_BUCKET_NAME}-${Date.now()}-${fileName}`;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filenamed,
    Body: fileBuffer,
    // ACL: "public-read",
    ContentType: "image/jpg",
  };
  const command = new PutObjectCommand(params);
  await s3client.send(command);
    links.push(`https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${filenamed}`);
  return fileName;
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
      { message: "File uploaded successfully", links },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: `Sorry Error` }, { status: 500 });
  }
}
