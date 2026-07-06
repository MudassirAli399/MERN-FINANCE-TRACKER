import React from "react";
import {useSelector,useDispatch} from "react-redux";
import {UpdateBudget,UpdateTransaction} from "../Store/Slice.js";
import DashboardCard from "../Components/DashboardCard"
import {MonthlyChart} from "../Components/Charts.jsx";



export default function Dashboard(){
    const user = useSelector((state)=>state.User);
    const budget = useSelector((state)=>state.Budget);
    const transaction = useSelector((state)=>state.Transaction);
    const StartFetch = useSelector((state) => state.Transaction.StartFetch);
    const dispatch = useDispatch();
    const chartData = [
    {month:"Jan-feb", income:4000, expense:2500},
    {month:"Feb", income:5000, expense:3000},
    {month:"Mar", income:4500, expense:2800},
    {month:"Apr", income:6000, expense:3500},
];
     React.useEffect(()=>{
    
            if(user.Active && !budget.fetched){
    
                const data = async()=>{
                    console.log("I am running");
                    const response = await fetch(
                        import.meta.env.VITE_GET_BUDGET,
                        {
                            method:"GET",
                            headers:{
                                "Content-Type":"application/json"
                            },
                            credentials:"include"
                        }
                    );
    
                    const output = await response.json();
    
                    if(output.status===200){
                            const items = output.RequiredData.Items;
    
                            
                            const categories = items.map(
                                item => item.Name
                            );
    
                            
                            dispatch(
                                UpdateBudget({
                                    Created:true,
                                    fetched:true,
                                    Data:items,
                                    Categories:categories
                                })
                            );
                        
    
                    }
    
                    console.log(output);
                };
    
                data();
            }
    
        },[]);
    React.useEffect(() => {
    
            if(!StartFetch || !user.Active) return
            const execute =  async () => {
                const response = await fetch(import.meta.env.VITE_GET_TRANSACTION,{method:"GET",credentials:"include"});
                const output = await response.json();
                console.log(output);
                dispatch(UpdateTransaction({
                    StartFetch:false,
                    Trans:output.RequiredData.OriginalData,
                    Types:output.RequiredData.Types,
                    Categories:output.RequiredData.Categories,
                    Month:output.RequiredData.Month
    
                    
                }));
                
            }
    
            execute();
            
        },[StartFetch])    
    return(
        <>
            <div className="border-2 border-black lg:h-[800px] md:h-[1600px] grid grid-rows-[1fr_3fr] p-6 gap-4 overflow-y-auto">
                <div className="border-2 border-black flex lg:flex-row md:flex-col p-2 gap-4 md:items-center justify-between">
                    <DashboardCard
                        text = "Income"
                        month = {transaction.Month}
                        amount = {transaction?.Types?.income || 0}    
                    />
                    <DashboardCard
                        text = "Expense"
                        month = {transaction.Month}
                        amount = {transaction?.Types?.expense || 0}    
                    />
                    {/* <div className="bg-green-900 lg:h-full lg:w-1/4 md:w-full md:h-1/4"></div> */}
                    {/* <div className="bg-green-900 lg:h-full lg:w-1/4 md:w-full md:h-1/4"></div> */}
                    
                </div>
                <div className="border-2 border-black flex lg:flex-row md:flex-col gap-2">
                    <div className="flex-3">
                        <MonthlyChart data={chartData}/>
                    </div>
                    <div className=" flex-2">

                    </div>  
                </div>
            </div>
        </>
    )
}