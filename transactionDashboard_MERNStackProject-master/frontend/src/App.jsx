import "./App.css";
import Table from "./components/Table/Table"; 
import Statistics from "./components/Statistics/Statistics";


import { useState } from "react";
function App() {  

   const [ currentMonth , setCurrentMonth ] = useState() ;  

   const [ currMonthStats , setCurrMonthStats ] = useState() ;

   function getCurrentMonth(month) { 
       setCurrentMonth(month)
   } 

   function getCurrentMonthStats(data) { 
         setCurrMonthStats(data) ;

   }
  return (
    <div className="w-full ">
      <h1 className="text-3xl text-center text-white p-4 bg-green-500 ">

        Transaction Dashboard
      </h1>
      <Table setMonth={getCurrentMonth} currentMonth={currentMonth}/> 
       
       <Statistics currentMonth={currentMonth} currentMonthStats={getCurrentMonthStats}/>
       
    </div>
  );
}

export default App;
