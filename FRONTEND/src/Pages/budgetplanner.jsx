import React from "react";
import {useSelector,useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import { UpdateBudget } from "../Store/Slice.js";
import Budgetcard from "../Components/budgetcard.jsx";

export default function Budgetplanner(){
    const user = useSelector((state)=>state.User)
    const budget = useSelector((state)=>state.Budget)
    const Data = useSelector((state)=>state.Budget.Data)
    const dispatch = useDispatch();
    const totalbudget = Data.reduce(
        (sum,item)=> sum + Number(item.Value),
        0
    );

   React.useEffect(() => {
      if(user.Active){
        
      
        if(!budget.fetched){
            const data = async () => {
                const response = await fetch(
                    import.meta.env.VITE_GET_BUDGET,
                    {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      credentials: "include",
                    }
                )
                const output = await response.json();
                if(output.status==200){
                    dispatch(UpdateBudget({Created:true,fetched:true,Data:output.RequiredData.Items}))
                }
                console.log(output);
                
            }

            data();
          }
        }
},[]);
 

    return(
        <>
        
        

       {
  user.Active ? (
    budget.Created ? (
      <div className=" h-auto w-full grid grid-rows-[80px_auto_auto_150px] p-5 bg-[rgb(250,250,250)] gap-2">
        <div >
          <h1 className="text-[30px] font-sans font-bold">Budget Planner</h1>
          <p>Track and manage your monthly budgets</p>
        </div>
        <div className="bg-amber-200">
      
        </div>

        <div className=" grid lg:grid-cols-[1fr_1fr_1fr] gap-2 md:grid-cols-2">
          {Data.map((data) =>{
            return(
            <Budgetcard Name={data.Name} Value={data.Value}/>
            )})}
          {/* <Budgetcard Name="Food" Value="1000"/> */}
          {/* <Budgetcard/>
          <Budgetcard/>
          <Budgetcard/>
          <Budgetcard/>
          <Budgetcard/>
          <Budgetcard/>
          <Budgetcard/>
          <Budgetcard/>
          <Budgetcard/>
          <Budgetcard/> */}

          {/* <div className="bg-green-950 h-[200px]"></div>
          <div className="bg-green-950 h-[200px]"></div>
          <div className="bg-green-950 h-[200px]"></div>
          <div className="bg-green-950 h-[200px]"></div>
          <div className="bg-green-950 h-[200px]"></div>
          <div className="bg-green-950 h-[200px]"></div>
          <div className="bg-green-950 h-[200px]"></div>
          <div className="bg-green-950 h-[200px]"></div> */}
        </div>

        <div className="bg-[rgb(255,255,255)] rounded-2xl border-gray-400 border-1 grid grid-row-[1fr_3fr] font-sans p-2">
            <div className="text-[20px] font-[600]"> 
              <h1>Budget Summmary</h1>
            </div>
            <div className="flex justify-between">
              <div>
                <div>Total Budget</div>
                <div><p className="font-mono text-[20px]">${totalbudget}</p></div>
              </div>
              <div>
                <div>Total Spent</div>
                <div><p className="font-mono text-[20px]">$1000</p></div>
              </div>
              <div>
                <div>Total Remaining</div>
                <div><p className="font-mono text-[20px] text-green-500">$1000</p></div>
              </div>
            </div>
        </div>
      </div>
    ) : (
      <Link to="/budgetplanner/create">
        Create
      </Link>
    )
  ) : (
    <div>You are not logged in</div>
  )
}
        
       
        
        
        </>
    )
}