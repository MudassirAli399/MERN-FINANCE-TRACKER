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
        (sum, item) =>
            sum +
            Number(
                categories[item.Name.toLowerCase()] || 0
            ),
        0
    );

    // categories automatically generate from Data
  

   

  
    

    return(
        <>
        {
        user.Active ? (

            budget.Created ? (

            <div className="h-auto w-full grid grid-rows-[80px_auto_auto_150px] p-5 bg-[rgb(250,250,250)] gap-2">

                <div>
                    <h1 className="text-[30px] font-sans font-bold">
                        Budget Planner
                    </h1>

                    <p>
                        Track and manage your monthly budgets
                    </p>
                </div>

              

                <div className="grid lg:grid-cols-[1fr_1fr_1fr] gap-2 md:grid-cols-2">

                {
                    Data.map((item)=>{
                        console.log(categories)

                       

                        return (
                        
                        <Budgetcard
                            serve={categories[item.Name.toLowerCase()]}
                            key={item.Name}
                            Name={item.Name}
                            Value={item.Value}
                        />)
                            }  )
                }

                </div>

                <div className="bg-white rounded-2xl border-gray-400 border p-2">

                    <h1 className="text-[20px] font-semibold">
                        Budget Summary
                    </h1>

                    <div className="flex justify-between">

                        <div>
                            <div>Total Budget</div>
                            <p className="font-mono text-[20px]">
                                ${totalbudget}
                            </p>
                        </div>

                        <div>
                            <div>Total Spent</div>
                            <p className="font-mono text-[20px]">
                                ${spent}
                            </p>
                        </div>

                        <div>
                            <div>Total Remaining</div>
                            <p className="font-mono text-[20px] text-green-500">
                                ${totalbudget-spent}
                            </p>
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