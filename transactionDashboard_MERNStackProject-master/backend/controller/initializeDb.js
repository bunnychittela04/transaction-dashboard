

const { MongoClient } = require("mongodb") ;   
const axios = require("axios") ;

const url = "mongodb+srv://atique:V62JV2zmkB0D4KFi@cluster0.vx7cs.mongodb.net/?retryWrites=true&w=majority"; 

const client = new MongoClient(url) ; 

var data = [] ;  

async function getData() { 
     
     try {  
        const response =  await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json") ;
        
        data = response.data ;   
        // console.log(data) ; 
     } catch (error) {  
        console.log(error) ; 
     }
}



const run = async(req ,res)=> { 

    try {
        await client.connect();
        const db = client.db("test");
        const coll = db.collection("transaction");
         
        await getData() ;  
   
        const result = await coll.insertMany(data);  
        // console.log(result.insertedIds); 

      } finally {
         
        res.sendStatus(200) ;
        await client.close(); 
      }   
}

module.exports= { run }; 
