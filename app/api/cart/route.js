import dbConnect from "@/mongo/mongodb";
import Cart from "@/models/CartProduct"
export async function POST(request){
  await dbConnect();
  var data = await request.json();

    try{
        var cart = await Cart.create(data);
        if(cart){
   return new Response(JSON.stringify(cart) , {status : 200 , headers : {"Content-Type" : "application/json"}})
        }
    }
    catch(error){
      if(error.code === 11000){
        return new Response(JSON.stringify({message: "Product already added"}) , {status:404})
      }
    }
}
export async function GET(request){
    await dbConnect();
    var url = new URL(request.url);
    var email = url.searchParams.get("email");
    var cartProducts = await Cart.find({email : email});
    if(cartProducts){
    return new Response(JSON.stringify(cartProducts) , {status : 200 , headers : {"Content-Type" : "application/json"}})
    }
    else {
      return new Response(JSON.stringify({message : "Product not found"}) , {status : 201})
    }
}

export async function DELETE(request){
    await dbConnect();
  var url = new URL(request.url);
  var productId = url.searchParams.get("id");
  var email = url.searchParams.get("email");
  if(productId){
    var cart = await Cart.findOneAndDelete({productId : productId , email : email})
    if(cart){
        return new Response(JSON.stringify({message : "product deleted"}) , {status : 200})
    }
    else {
         return new Response(JSON.stringify({message : "product not found"}) , {status :404})
    }
  }
  else {
     return new Response(JSON.stringify({message : "product id not found"}) , {status : 200})
  }
}