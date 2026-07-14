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
                     <div className="bg-[#FAFAFA] dark:bg-gray-800 text-black dark:text-white min-h-screen p-4 sm:p-5 flex flex-col gap-4">

            <div>

                <div>

                    <h1 className="text-[24px] sm:text-[30px] font-sans font-bold">
                        Reports & Analytics
                    </h1>

                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                        Visualize your financial data and trends
                    </p>

                </div>

            </div>

            <div className="bg-[#FFFFFF] dark:bg-gray-900 border-gray-500 dark:border-gray-700 border p-4 sm:p-[2%] flex flex-col gap-4 rounded-xl">

                <div>

                    <div>

                        <h1 className="text-[18px] sm:text-[20px] font-sans font-medium">
                            Expense Breakdown by Category
                        </h1>

                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                            Visualize your financial data and trends
                        </p>

                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                    <div className="w-full overflow-x-auto">
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
                            className="w-full flex justify-between items-center gap-2 mt-[15px]"
                            >

                                <div className="flex items-center gap-1 min-w-0 flex-1">

                                    <div
                                    className="h-[20px] w-[20px] rounded-[50%] shrink-0"
                                    style={{
                                        backgroundColor:item.color
                                    }}
                                    >
                                    </div>

                                    <div className="flex items-center pl-1 truncate">
                                        {item.name}
                                    </div>

                                </div>

                                <div className="font-mono flex items-center shrink-0">
                                    ${item.value}
                                </div>

                            </div>

                            )
                        })
                    }

                    <div className="border-t border-black dark:border-gray-600 w-full flex justify-between items-center mt-[20px] pt-2">

                        <div className="flex">

                            <div className="flex items-center pl-1 font-semibold">
                                TOTAL
                            </div>

                        </div>

                        <div className="font-mono flex items-center text-red-500">
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