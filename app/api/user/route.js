import dbConnect from "@/mongo/mongodb";
import User from "@/models/User";

export async function GET(request){
    const url = new URL(request.url);
    const email = url.searchParams.get("email");
    await dbConnect();
    if(email.trim() !== ""){
     const user = await User.findOne({email : email});
     if(user){

        return new Response(JSON.stringify(user) , { status : 200 , headers : { "Content-Type": "application/json" }})
     }
     else {
       return new Response(JSON.stringify({ status: 404, message: "Not found" }), {
     status: 404,
     headers: { "Content-Type": "application/json" },
});
     }
    }
    
}