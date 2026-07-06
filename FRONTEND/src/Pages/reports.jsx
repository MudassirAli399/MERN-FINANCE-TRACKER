import React from "react";
import {MyPieChart} from "../Components/Charts.jsx";
import {useSelector} from "react-redux";


export default function Reports(){

    const budget = useSelector((state)=>state.Budget);
    const transaction = useSelector((state)=>state.Transaction);
    
    const Data = budget.Categories?.map(item => ({
                    color : `#${Math.floor(Math.random()*16777215)
                        .toString(16)
                        .padStart(6,"0")}`,
                    name: item,
                    value: transaction?.Categories?.[item.toLowerCase()] || 0
                        })) || [{color: "#1C77AA", name: "Food", value: 400 }];

    const total = Data.reduce((sum, item) => sum + Number(item.value), 0) || 0;
    return(
        <>
        <div className=" bg-[#FAFAFA]  h-[800px] p-5 grid grid-rows-[0.5fr_3.5fr]">
            <div className="">
                <div>
                    <h1 className="text-[30px] font-sans font-bold">
                        Reports & Analytics
                    </h1>

                    <p>
                        Visualize your financial data and trends
                    </p>
                </div>

            </div>
            <div className="bg-[#FFFFFF] grid grid-rows-[0.5fr_3.5fr] p-[2%] border-gray-500 border-1">
                <div className="">
                     <div>
                    <h1 className="text-[20px] font-sans font-medium">
                        Expense Breakdown by Category
                    </h1>

                    <p>
                        Visualize your financial data and trends
                    </p>
                </div>
                </div>
                <div className=" grid lg:grid-cols-2 md:grid-cols-1 gap-2">
                    <div className="">
                        <MyPieChart
                        
                        data = {Data}
                        
                        />
                    </div>
                    <div className="">
                       

                     {
                        Data.map((item)=>{
                            return(
                                <div className=" w-full h-[20px] flex justify-between mt-[5px]">
                            <div className="w-1/4   flex  ">
                                <div className="h-[20px] w-[20px]  rounded-[50%]" style={{backgroundColor:`${item.color}`}}></div>
                                <div className="w-1/2  flex pl-1 items-center">{item.name}</div>
                            </div>
                            <div className="w-1/4  font-mono flex items-center">
                            ${item.value}
                            </div>

                        </div>
                            )
                        })
                     } 
                     <div className="border-t-1 border-black w-full h-[20px] flex justify-between mt-[10px]">
                            <div className="w-1/4   flex  ">
                                {/* <div className="w-1/8 border-1  border-black rounded-full"></div> */}
                                <div className="w-1/2  flex pl-1 items-center font-semibold">TOTAL</div>
                            </div>
                            <div className="w-1/4  font-mono flex items-center text-red-500">
                            ${total}
                            </div>

                        </div>  
                        
                    </div>

                </div>

            </div>


        </div>       
        </>
    )
}
