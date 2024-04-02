
const mongoose = require("mongoose") ;


const transactionSchema = new mongoose.Schema( { 
    id : {type : Number , unique: true} , 
    title: {type : String } , 
    price : Number , 
    description: String , 
    category : String , 
    image : String , 
    sold : Boolean , 
    dateOfSale : String, 
     
}) ;

const Transaction = mongoose.model("Transaction", transactionSchema) ;    

module.exports = {Transaction} ;




