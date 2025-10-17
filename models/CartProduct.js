import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    productId : {type : Number , required : true , unique : true} ,
    name : { type : String , required : true } ,
    cuisine : {type : String , required : true},
    image : {type : String , required : true},
    quantity : { type : Number , required : true} ,
    unitPrice : { type : Number , required : true}  , 
    email : { type : String , required : true} 
})

 export default mongoose.models.CartProduct || mongoose.model("CartProduct" , CartSchema)