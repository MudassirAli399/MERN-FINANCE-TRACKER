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
            grid
            grid-rows-[80px_auto_auto_auto]
            p-5
            bg-[rgb(250,250,250)]
            dark:bg-gray-800
            text-black
            dark:text-white
            gap-4
            ">

                <div>
                    <h1 className="text-[30px] font-sans font-bold">
                        Budget Planner
                    </h1>

                    <p className="text-gray-600 dark:text-gray-300">
                        Track and manage your monthly budgets
                    </p>
                </div>

                <div className="grid lg:grid-cols-[1fr_1fr_1fr] gap-3 md:grid-cols-2">

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
                p-5
                ">

                    <h1 className="text-[20px] font-semibold mb-4">
                        Budget Summary
                    </h1>

                    <div className="flex justify-between">

                        <div>
                            <div className="text-gray-500 dark:text-gray-300">
                                Total Budget
                            </div>

                            <p className="font-mono text-[20px]">
                                ${totalbudget}
                            </p>
                        </div>

                        <div>
                            <div className="text-gray-500 dark:text-gray-300">
                                Total Spent
                            </div>

                            <p className="font-mono text-[20px]">
                                ${spent}
                            </p>
                        </div>

                        <div>
                            <div className="text-gray-500 dark:text-gray-300">
                                Total Remaining
                            </div>

                            <p className="font-mono text-[20px] text-green-500">
                                ${totalbudget-spent}
                            </p>
                        </div>

                    </div>

                </div>

            </div>

            ) : (

                <Link
                className="dark:text-white"
                to="/budgetplanner/create"
                >
                    Create
                </Link>

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