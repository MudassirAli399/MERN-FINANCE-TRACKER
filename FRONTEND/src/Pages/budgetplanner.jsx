import React from "react";
import {useSelector,useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {UpdateBudget} from "../Store/Slice.js";
import Budgetcard from "../Components/budgetcard.jsx";

export default function Budgetplanner(){

    const user = useSelector((state)=>state.User);
    const budget = useSelector((state)=>state.Budget);
    const Data = useSelector((state)=>state.Budget.Data);
    const categories = useSelector((state)=>state.Transaction.Categories);

    const dispatch = useDispatch();

    const totalbudget = Data.reduce(
        (sum,item)=>sum + Number(item.Value),
        0
    );

    const spent = Data.reduce(
        (sum,item)=>
            sum +
            Number(
                categories[item.Name.toLowerCase()] || 0
            ),
        0
    );

    return(
        <>
        {
        user.Active ? (

            budget.Created ? (

            <div className="
            min-h-screen
            w-full
            flex
            flex-col
            p-4
            sm:p-5
            bg-[rgb(250,250,250)]
            dark:bg-gray-800
            text-black
            dark:text-white
            gap-4
            ">

                <div>
                    <h1 className="text-[24px] sm:text-[30px] font-sans font-bold">
                        Budget Planner
                    </h1>

                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                        Track and manage your monthly budgets
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

                {
                    Data.map((item)=>{

                        return (
                        
                        <Budgetcard
                            serve={categories[item.Name.toLowerCase()] || 0}
                            key={item.Name}
                            Name={item.Name}
                            Value={item.Value}
                        />
                        )
                    })
                }

                </div>

                <div className="
                bg-white
                dark:bg-gray-900
                text-black
                dark:text-white
                rounded-2xl
                border
                border-gray-400
                dark:border-gray-700
                p-4
                sm:p-5
                ">

                    <h1 className="text-[18px] sm:text-[20px] font-semibold mb-4">
                        Budget Summary
                    </h1>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between">

                        <div>
                            <div className="text-gray-500 dark:text-gray-300 text-sm sm:text-base">
                                Total Budget
                            </div>

                            <p className="font-mono text-[18px] sm:text-[20px]">
                                ${totalbudget}
                            </p>
                        </div>

                        <div>
                            <div className="text-gray-500 dark:text-gray-300 text-sm sm:text-base">
                                Total Spent
                            </div>

                            <p className="font-mono text-[18px] sm:text-[20px]">
                                ${spent}
                            </p>
                        </div>

                        <div>
                            <div className="text-gray-500 dark:text-gray-300 text-sm sm:text-base">
                                Total Remaining
                            </div>

                            <p className="font-mono text-[18px] sm:text-[20px] text-green-500">
                                ${totalbudget-spent}
                            </p>
                        </div>

                    </div>

                </div>

            </div>

            ) : (
                <div className="w-full h-full flex items-center justify-center">
                <Link
                className="dark:text-white border-2 border-gray-400 dark:border-gray-700 rounded-lg px-4 py-2 bg-blue-50 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                to="/budgetplanner/create"
                >
                    Create
                </Link>
                </div>
            )

        ) : (

            <div className="dark:text-white">
                You are not logged in
            </div>

        )
        }
        </>
    )
}