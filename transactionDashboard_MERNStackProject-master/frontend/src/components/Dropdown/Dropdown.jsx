import React, {useEffect, useState} from "react" ; 


const Dropdown = ({month, setData}) => { 

    const [selectedOption, setSelectedOption] = useState(month[10].name);   

    const getMonthlyData = async()=>{ 
         
       try {
          const response = await fetch(`https://transaction-dashboard-mern-stack-project-backend.vercel.app/allTransaction/monthly/${selectedOption}`) ; 

          const data = await response.json() ; 

          console.log(data) ;  
          setData({ data : data , currMonth: selectedOption}) ;

       } catch (error) {
          console.log(error) ; 

       }
         
    }


     useEffect( ()=> { 
          
        getMonthlyData() ; 

     }, [selectedOption])  


    return (
        <select 
         className="w-[250px] border border-black p-2 rounded-l-lg "
         value={selectedOption} 
         onChange={ (e)=> setSelectedOption(e.target.value)} 
        > 
        {
            month.map( (m,i)=> (
                <option key={m.id} value={m.name}> {m.name} </option>
            ))
        }
             

        </select>
    );
};

export default Dropdown ; 