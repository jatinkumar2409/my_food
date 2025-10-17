import dbConnect from "@/mongo/mongodb";
import OrderProduct from "@/models/OrderSchema";

export async function POST(request){
    await dbConnect();
    var data = await request.json();
    var order = await OrderProduct.create(data);
    if(order){
        return new Response(JSON.stringify({message : "order added"}) , {status : 200})
    }
    return new Response(JSON.stringify({message : "Product not added"}) , {status : 404})

}

export async function GET(request){
    await dbConnect();
    var url = new URL(request.url);
    var email = url.searchParams.get("email");
    var orders = await OrderProduct.find({email : email});
    if(orders){
        return new Response(JSON.stringify(orders) , {status : 200})
    }
    return new Response(JSON.stringify({message : "No product found"}) , {status : 201})
}