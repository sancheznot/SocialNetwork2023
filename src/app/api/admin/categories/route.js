import { connectMongoDB } from "@/lib/mongodb";
import Categories from "@/models/Categories";

export async function POST(request) {
  const { categoryname, description, imgURL } = await request.json();
  console.log(categoryname, description, imgURL);

  if (!categoryname || !description || !imgURL) {
    return Response.json({ message: "Please fill in all fields" }, 400);
  }

  try {
    connectMongoDB();
    const ExistCategory = await Categories.findOne({ name: categoryname });
    if (ExistCategory) {
      return Response.json({ message: "Category already exists" });
    }
    const newCategory = await Categories.create({
      name: categoryname,
      description: description,
      imgURL: imgURL,
    });
    return Response.json(
      { message: "Save category successfully" },
      newCategory
    );
  } catch (error) {
    return Response.json({ message: `Sorry Error` }, error);
  }
}
