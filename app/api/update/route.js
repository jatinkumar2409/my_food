import dbConnect from "@/mongo/mongodb";
import User from "@/models/User";

export async function POST(request){
 await dbConnect();
  const data = await request.json();
  const user = await User.findOneAndUpdate({email: data.email} , {
    name : data.name , password : data.password , phone : data.phone , address : data.address
  } ,{new : true})
  if(user){
    return new Response(JSON.stringify(user) , {status : 200 ,  headers: { "Content-Type": "application/json" }})
  }
  else {
    return new Response(JSON,stringify({message : "user not found"}) , {status : 404 ,  headers: { "Content-Type": "application/json" }} )
  }
}