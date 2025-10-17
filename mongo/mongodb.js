 import mongoose from "mongoose";

 const uri = process.env.MONGODB_URI

 let cached = global.mongoose || {conn : null , promise : null}

 export default async function dbConnect(){
    if(cached.conn) return cached.conn;

    if(!cached.promise){
        cached.promise = mongoose.connect(uri)
    }
    cached.conn = await cached.promise;
    return cached.conn;
 }