export async function GET(request, {params}) {
const { id } = params;  
  return Response.json({ message: `Hello from the user update [id] avatar route ${id}` });
}