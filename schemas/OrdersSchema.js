const { Schema }=require("mongoose");
const OrderSchema= new Schema({
    name: String,
    price: Number,
    qty:Number,
    model:String
});
module.exports={ OrderSchema };