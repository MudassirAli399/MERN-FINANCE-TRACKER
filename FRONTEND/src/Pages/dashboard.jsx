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
                    if(output.status===410){alert(output.message);return}
                    if(output.status===404){alert(output.message);return}
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
                if(output.status===404){alert(output.message);return}
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
        {user.Active ? (
            
                budget.Created ? (
            <div className=" lg:h-[800px] md:h-[1600px] grid grid-rows-[1fr_3fr] p-6 gap-4 overflow-y-auto">
                <div className=" flex lg:flex-row md:flex-col p-2 gap-4 md:items-center justify-between">
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
                <div className=" flex lg:flex-row md:flex-col gap-2">
                    <div className="flex-3 p-2 border-1 rounded-2xl border-gray-400 bg-[rgb(255,255,255)]]">
                        <h3 className="font-medium font-sans text-[20px]">Income vs Expense</h3>
                        <p className="font-light text-gray-500 font-sans text-[15px]">THis is Raw Data.Original data will be show after 1 month</p>
                        <div className="mt-[2%]"><MonthlyChart  data={chartData}/></div>
                    </div>
                    <div className="flex-2 border border-gray-400 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-900 p-4">

    <h3 className="font-medium font-sans text-[20px]">
        Last 5 Transactions
    </h3>

    <p className="font-light text-gray-500 dark:text-gray-300 text-[14px] mb-4">
        Recent activity
    </p>

    <div className="flex flex-col gap-3">

    {
        transaction?.Trans
        ?.slice(-5)
        ?.reverse()
        ?.map((item,index)=>{

            return(

            <div
            key={index}
            className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2"
            >

                <div>

                    <p className="font-medium">
                        {item.category}
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.description}
                    </p>

                </div>

                <div className="text-right">

                    <p className={`font-bold ${
                        item.type==="expense"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}>
                        ${item.amount}
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.date}
                    </p>

                </div>

            </div>

            )

        })
    }

    </div>

</div>  
                </div>
            </div>
                ):
                (
                    <div>You have not created a budget</div>
                )
            
        ) : (<div>You are not logged in</div>)}
           
        </>
    )
}