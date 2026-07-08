import React from "react";
import {MyPieChart} from "../Components/Charts.jsx";
import {useSelector} from "react-redux";

export default function Reports(){
    const user = useSelector((state)=>state.User);
    const budget = useSelector((state)=>state.Budget);
    const transaction = useSelector((state)=>state.Transaction);

    const Data = budget.Categories?.map(item => ({
        color:`#${Math.floor(Math.random()*16777215)
        .toString(16)
        .padStart(6,"0")}`,
        name:item,
        value:transaction?.Categories?.[item.toLowerCase()] || 0
    })) || [
        {
            color:"#1C77AA",
            name:"Food",
            value:400
        }
    ];

    const total=Data.reduce(
        (sum,item)=>sum+Number(item.value),
        0
    ) || 0;

    return(
        <>
        {
            user.Active? (
                budget.Created ? (
                     <div className="bg-[#FAFAFA] dark:bg-gray-800 text-black dark:text-white min-h-screen p-5 grid grid-rows-[0.5fr_3.5fr]">

            <div>

                <div>

                    <h1 className="text-[30px] font-sans font-bold">
                        Reports & Analytics
                    </h1>

                    <p className="text-gray-600 dark:text-gray-300">
                        Visualize your financial data and trends
                    </p>

                </div>

            </div>

            <div className="bg-[#FFFFFF] mt-[2%] dark:bg-gray-900 border-gray-500 dark:border-gray-700 border p-[2%] grid grid-rows-[0.5fr_3.5fr] rounded-xl">

                <div>

                    <div>

                        <h1 className="text-[20px] font-sans font-medium">
                            Expense Breakdown by Category
                        </h1>

                        <p className="text-gray-600 dark:text-gray-300">
                            Visualize your financial data and trends
                        </p>

                    </div>

                </div>

                <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-2">

                    <div>
                        <MyPieChart
                            data={Data}
                        />
                    </div>

                    <div>

                    {
                        Data.map((item,index)=>{
                            return(

                            <div
                            key={index}
                            className="w-full h-[20px] flex justify-between mt-[15px]"
                            >

                                <div className="w-1/4 flex">

                                    <div
                                    className="h-[20px] w-[20px] rounded-[50%]"
                                    style={{
                                        backgroundColor:item.color
                                    }}
                                    >
                                    </div>

                                    <div className="w-1/2 flex pl-1 items-center">
                                        {item.name}
                                    </div>

                                </div>

                                <div className="w-1/4 font-mono flex items-center">
                                    ${item.value}
                                </div>

                            </div>

                            )
                        })
                    }

                    <div className="border-t border-black dark:border-gray-600 w-full h-[20px] flex justify-between mt-[20px]">

                        <div className="w-1/4 flex">

                            <div className="w-1/2 flex pl-1 items-center font-semibold">
                                TOTAL
                            </div>

                        </div>

                        <div className="w-1/4 font-mono flex items-center text-red-500">
                            ${total}
                        </div>

                    </div>

                    </div>

                </div>

            </div>

        </div>
                ) :
                (
                    <div>You have not created a budget</div>
                )
            ) :
            (<div>You are not logged in</div>)
        }
       
        </>
    )
}