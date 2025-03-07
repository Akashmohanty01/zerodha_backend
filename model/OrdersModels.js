const { model }=require("mongoose");
const { OrdersModel}= require("../schemas/OrdersSchema");
const OrdersModel=new model("order",OrdersModel);
module.exports={OrdersModel};