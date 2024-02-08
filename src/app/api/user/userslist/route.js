import User from "@/models/User";

// this can be used to disable the cache
export const revalidate=0

export async function GET(request) {
    try {
        
        const users = await User.find({});
        return Response.json(users);
    } catch (error) {
        return Response.json({ message: `Sorry Error` }, error);
    }
}
