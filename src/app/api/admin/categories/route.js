import { connectMongoDB } from "@/lib/mongodb";
import Categories from "@/models/Categories";

export async function POST(request) {
  const { categoryname } = await request.json();
  console.log(categoryname);
  if (!categoryname) {
    return {
      status: 400,
      body: {
        message: "Please fill all fields",
      },
    };
  }
  try {
    connectMongoDB();
    const newCategory = await Categories.create({
      name: categoryname,
    });
    return Response.json({message: "Save category successfully"},newCategory);
  } catch (error) {
    return Response.json({message: `Sorry Error`},error);
  }
}
