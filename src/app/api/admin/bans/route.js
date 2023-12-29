import { connectMongoDB } from "@/lib/mongodb";
import BlackList from "@/models/BlackList";

export async function POST(request) {
    const { username, email, reason } = await request.json();
    if (!username || !email || !reason) {
        return Response.json({ message: "Please fill all fields" }, 400);
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
        return Response.json({ message: `Sorry Error` }, error);
    }
}
