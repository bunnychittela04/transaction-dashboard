

const axios = require("axios") ;  
const {Transaction} = require("../model/transaction") ; 

var data = [] ;  

async function getData() { 
     
     try {  
        const response =  await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json") ;
        
        data = response.data ;   
     } catch (error) {  
        console.log(error) ; 
     }
}

getData() ;    


const getAllUser = (req ,res) => { 
     let totalPage  = Math.floor(data.length/10);  
     const pageNo = req.params.page ;  
     let high = pageNo*10 ;
     let low =  high -10 ; 

     const result  = {
          totalPage : totalPage  , 
          data : data.slice(low, high)
     } 

     res.json(result) ;
} 


const getMonthyData = async(req ,res)=> { 
     
   try {

     const month = req.params.month ; 
     let monthId = 0 ;
     switch(month) { 
          case "january" :  monthId = "01" ; 
                            break ; 
          case "february" : monthId = "02" ; 
                            break; 
          case "march" :   monthId = "03" ; 
                            break ;
          case "april" : monthId = "04" ; 
                           break ;
          case "may" : monthId = "05" ; 
                           break ;
          case "june" : monthId = "06" ; 
                           break ;
          case "july" : monthId = "07" ; 
                           break ;
          case "august" : monthId = "08" ; 
                           break ;
          case "september" : monthId = "09" ; 
                           break ;
          case "october" : monthId = "10" ; 
                           break ;
          case "november" : monthId = "11" ; 
                           break ;
          case "december" : monthId = "12" ; 
                           break ;
     } 

     const doc = await Transaction.find({
           $or: [
            { dateOfSale: { $gte: `2021-${monthId}-01`, $lte: `2021-${monthId}-31` } },
            { dateOfSale: { $gte: `2022-${monthId}-01`, $lte: `2022-${monthId}-31` } },
          ], 
          // dateOfSale: { $gte: "2022-06-01", $lte: "2022-06-31" }  

      })  

     // console.log(doc) ;  
     res.json(doc);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }

}


const getStatistics = async(req ,res)=> { 

   const month = req.params.month ;  
   let  monthlyData = [] ;
   try {
     const response = await axios.get(`https://transaction-dashboard-mern-stack-project-backend.vercel.app/allTransaction/monthly/${month}`) ;

      monthlyData = response.data;  
  
     // console.log(monthlyData) ; 
     } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
   }  

   let soldCount = monthlyData.reduce( (acc, curr)=> { 
       
           if(curr.sold) {
                acc = acc +1 ;
           }

           return acc ; 
   }, 0) ;

 
   const notSold = monthlyData.length - soldCount ;   

   const totalSale = monthlyData.reduce( (acc,curr)=> { 

         if(curr.sold) { 
            acc = acc + curr.price ; 
         } 

         return acc ;
   } , 0) ; 


//    console.log(soldCount) ; 
//    console.log(notSold)  ; 
//    console.log(totalSale)  ;  

   res.json( {
      soldCount : soldCount , 
      notSold : notSold , 
      totalSale : Math.floor(totalSale) ,
   })

}


const getBarData = async(req ,res)=> { 
     
      const month = req.params.month ; 
      let monthlyData = [] ;   
     try {

          const response = await axios.get(`https://transaction-dashboard-mern-stack-project-backend.vercel.app/allTransaction/monthly/${month}`) ;

          monthlyData = response.data;  
      
          const priceRanges = {
            '0-100': 0,
            '101-200': 0,
            '201-300': 0,
            '301-400': 0,
            '401-500': 0,
            '501-600': 0,
            '601-700': 0,
            '701-800': 0,
            '801-900': 0,
            '901-above': 0,
          };


          monthlyData.forEach((item) => {
            const price = item.price;
            if (price <= 100) priceRanges['0-100']++;
            else if (price <= 200) priceRanges['101-200']++;
            else if (price <= 300) priceRanges['201-300']++;
            else if (price <= 400) priceRanges['301-400']++;
            else if (price <= 500) priceRanges['401-500']++;
            else if (price <= 600) priceRanges['501-600']++;
            else if (price <= 700) priceRanges['601-700']++;
            else if (price <= 800) priceRanges['701-800']++;
            else if (price <= 900) priceRanges['801-900']++;
            else priceRanges['901-above']++;
          });
      
          res.json(priceRanges);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
     }
} 


const getPieData = async(req ,res)=>  { 

     const month  = req.params.month ; 
     let monthlyData = [] ; 

     try {
         const response =  await axios.get(`https://transaction-dashboard-mern-stack-project-backend.vercel.app/allTransaction/monthly/${month}`); 

         monthlyData = response.data ;  


         const categoryData = monthlyData.reduce( (acc, curr)=> { 
              
               if(!acc[curr.category]) { 
                    acc[curr.category] = 1 ;
               }else { 
                    acc[curr.category] = ++acc[curr.category]; 
               } 

               return acc ; 

          }, {}) 

          res.json(categoryData) ; 

     } catch (error) {
          console.log(error) ; 
          res.status(500).json({ error : "Internal Server Error! "}) ; 
     }
      
}


const getUserData = async(req ,res)=> {  

     const month = req.params.month; 
     const searchText = req.params.searchText ; 
      
     try { 

          const searchRegx = new RegExp(searchText , 'i') ; 

          const searchResults = await Transaction.find({ 

               $and: [ 

                    { dateOfSale: { $regex: new RegExp(`-${month}-`) } }, 

                    {
                      $or: [
                        { title: { $regex: searchRegx } },
                        { description: { $regex: searchRegx } },
                        { price: { $regex: searchRegx } },
                      ],
                    },
               ],
          }) ;
          
          res.json(searchResults) ;
          
     } catch (error) {
          console.log(error) ; 
          res.status(500).json({ error: "Internal server error"}) ; 
     }
      
}


module.exports = { data ,getAllUser, getMonthyData, getStatistics , getBarData , getPieData, getUserData}




