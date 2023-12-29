import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";


export async function GET(request) {
    try {
        connectMongoDB();
        const users = await User.find({});
        return Response.json(users);
    } catch (error) {
        return Response.json({ message: `Sorry Error` }, error);
    }
}
