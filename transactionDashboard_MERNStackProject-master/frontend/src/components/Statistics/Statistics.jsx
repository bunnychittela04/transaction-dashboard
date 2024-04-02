import React, { useEffect, useState } from 'react' 
import "./Statistics.css"

function Statistics({currentMonth, currentMonthStats}) {  

   const [ stats , setStats ] = useState({}) ; 

  async function getStatsData() { 

      try {
          const response =  await fetch(`https://transaction-dashboard-mern-stack-project-backend.vercel.app/allTransaction/statistics/${currentMonth}`) ; 

          const data = await response.json() ;  
          setStats(data) ; 
          currentMonthStats(data)
   
      } catch (error) {
        console.log(error) ;
      }
      
  }  


  useEffect( ()=> { 
     getStatsData() ; 
  }, [currentMonth] ) ;

  return (
    <div className="w-full flex justify-center items-center " >
         <div className='statsContainer'> 

              <div className='w-[300px] pt-4 ml-10 font-bold text-3xl'>
                        Statistics - {currentMonth}  
               </div>

               <div className='w-[300px] p-7 bg-orange-300 mt-8 rounded-xl ml-10'> 

                      <div className='text-lg'> Total Sale   <span className='ml-[70px] text-lg font-semibold'> {stats.totalSale}  </span> </div>
                      <div className='text-lg pt-2'> Total Sold item  <span className='ml-[30px] text-lg font-semibold'>{stats.soldCount}  </span> </div>
                      <div className='text-lg pt-2'> Total not sold item <span className='ftext-lg font-semibold'></span>{stats.notSold} </div>
               </div>
         </div>
    </div>
  )
}

export default Statistics ;
