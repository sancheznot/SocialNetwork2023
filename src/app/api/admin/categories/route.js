import { connectMongoDB } from "@/lib/mongodb";
import Categories from "@/models/Categories";

export async function POST(request) {
  const { categoryname } = await request.json();

  if (!categoryname) {
    return Response.json({ message: "Please fill in all fields" }, 400);
  }

  try {
    connectMongoDB();
    const newCategory = await Categories.create({
      name: categoryname,
    });
    return Response.json(
      { message: "Save category successfully" },
      newCategory
    );
  } catch (error) {
    return Response.json({ message: `Sorry Error` }, error);
  }
}
