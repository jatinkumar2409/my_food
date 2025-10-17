import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productIds : {type : [Number] , required : true} ,
    quantities : { type : [Number] , required : true} ,
    names : {type : [String] , required : true} ,
    unitPrices : {type : [Number] ,  required : true} ,
    totalPrice : { type : Number , required : true} , 
    email : {type : String , required : true}
})

export default mongoose.models.OrderProduct || mongoose.model("OrderProduct" , productSchema) 