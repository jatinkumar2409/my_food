import dbConnect from "@/mongo/mongodb";
import User from "@/models/User";

export async function POST(request) {
  await dbConnect();
  const data = await request.json();
  const user = await User.create(data);
  return new Response(JSON.stringify(user), { status: 201 });
}

