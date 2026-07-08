import React from "react"
import AddTransaction from "../Components/AddTransaction"
import { useDispatch ,useSelector} from "react-redux";
import {UpdateTransaction} from "../Store/Slice.js"

export default function Transaction(){

    const user = useSelector((state) => state.User);
    const Budget = useSelector((state) => state.Budget);
    const dispatch = useDispatch();
    const Transactions = useSelector((state) => state.Transaction);
    const StartFetch = useSelector((state) => state.Transaction.StartFetch);

    const [selectedType, setSelectedType] = React.useState("trans");

    let trans=[];

    if(selectedType==="trans"){
        trans=Transactions.Trans || [];
    }
    else if(selectedType.includes("category")){
        const result=selectedType.split("-").pop();

        trans=
        Transactions.Categories?.[`${result}Transactions`] || [];
    }
    else{
        trans=
        Transactions.Types?.[`${selectedType}Transactions`] || [];
    }

    React.useEffect(()=>{
        console.log(selectedType);
    },[selectedType]);

    return(
        <>
        {
        user.Active ? (

            Budget.Created ? (

            <div className="bg-[#FAFAFA] dark:bg-gray-800 text-black dark:text-white p-[4%] h-auto overflow-y-auto scroll-auto grid grid-rows-[0.5fr_3.5fr]">

            <div className="flex flex-row justify-between">

                <div className="w-1/3 h-full">

                    <div>
                        <h1 className="text-[30px] font-sans font-bold">
                            Transactions
                        </h1>

                        <p className="text-gray-600 dark:text-gray-300">
                            View and manage all your transactions
                        </p>
                    </div>

                </div>

                <div className="w-1/6 h-full flex justify-center items-center">

                    <div className="w-full">

                        <button
                        onClick={()=>{
                            dispatch(UpdateTransaction({Popup:true}))
                        }}
                        className="bg-[#1C77AA] text-white w-full h-9 cursor-pointer rounded"
                        >
                            Add Transaction
                        </button>

                    </div>

                </div>

            </div>

            <div className="bg-[#FFFFFF] dark:bg-gray-900 border-gray-400 dark:border-gray-700 border rounded-2xl p-[2%] grid grid-rows-[40px_50px_3.4fr] mt-[2%]">

                <div className="flex items-center">
                    <h3>All Transactions</h3>
                </div>

                <div className="flex flex-row justify-between">

                    <div className="h-full w-1/2 flex gap-2  dark:border-gray-700 pb-[1%]">

                        <input
                            onChange={(e)=>setSelectedType(e.target.value)}
                            type="text"
                            className="flex-1 px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />

                        <button
                            className="px-5 py-2 rounded-lg bg-[#1C77AA] text-white hover:bg-[#155e85] transition cursor-pointer"
                        >
                            Search
                        </button>

                    </div>

                    <div className="h-full w-1/5">

                        <select
                        onChange={(e)=>setSelectedType(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition"
                        >

                            <option value="trans">
                                All Types
                            </option>

                            <option value="income">
                                Income
                            </option>

                            <option value="expense">
                                Expense
                            </option>

                        </select>

                    </div>

                    <div className="h-full w-1/5">

                        <select
                        onChange={(e)=>setSelectedType(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition"
                        >

                            <option value="trans">
                                Select type
                            </option>

                            {
                                Budget.Categories.map((item)=>{
                                    return(
                                        <option
                                        key={item}
                                        value={`category-${item.toLowerCase()}`}
                                        >
                                            {item}
                                        </option>
                                    )
                                })
                            }

                        </select>

                    </div>

                </div>

                <table className="w-full text-left">

                    <thead className="bg-[#1C77AA] text-white h-[40px]">

                        <tr>
                            <th className="px-[2%]">Date</th>
                            <th className="px-[2%]">Category</th>
                            <th className="px-[2%]">Amount</th>
                            <th className="px-[2%]">Type</th>
                            <th className="px-[2%]">Description</th>
                        </tr>

                    </thead>

                    <tbody>

                    {
                        trans.map((item,index)=>{

                            return(

                            <tr
                            key={index}
                            className="h-[30px] border-t dark:border-gray-700"
                            >

                                <td className="px-[2%]">
                                    {item.date}
                                </td>

                                <td className="px-[2%]">
                                    {item.category}
                                </td>

                                <td className="px-[2%]">
                                    {item.amount}
                                </td>

                                <td className="px-[2%]">
                                    {item.type}
                                </td>

                                <td className="px-[2%]">
                                    {item.description}
                                </td>

                            </tr>

                            )

                        })
                    }

                    </tbody>

                </table>

            </div>

            </div>

            ) : (

                <div className="dark:text-white">
                    Make a budget first
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