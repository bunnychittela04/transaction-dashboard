

const express = require("express") ; 

const router = express.Router() ; 
const {getAllUser, getMonthyData, getStatistics, getBarData, getPieData, getUserData}  = require("../controller/transaction") 

const { run } = require("../controller/initializeDb") ;

router.route("/:page").get( getAllUser)  ;  

router.route("/monthly/:month").get( getMonthyData) ;  
router.route("/statistics/:month").get( getStatistics ) ;  
router.route("/barchart/:month").get( getBarData ); 
router.route("/piechart/:month").get( getPieData ) ;  
router.route("/search/:month/:searchText").get( getUserData ) ;  
   

router.route("/").get(run) ;

module.exports=router;

