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
    const [search, setSearch] = React.useState("");
    const [selectedType, setSelectedType] = React.useState("trans");

    const searchTrans = async () => {

    if (search.trim() === "") {
        if (selectedType === "trans") {
            setTrans(Transactions.Trans || []);
        } else if (selectedType.includes("category")) {
            const result = selectedType.split("-").pop();
            setTrans(
                Transactions.Categories?.[`${result}Transactions`] || []
            );
        } else {
            setTrans(
                Transactions.Types?.[`${selectedType}Transactions`] || []
            );
        }
        return;
    }

    const response = await fetch(import.meta.env.VITE_SEARCH_TRANSACTION, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            search: search
        })
    });

    const output = await response.json();

    if (output.status === 200) {
        setTrans(output.RequiredData);
    } else {
        setTrans([]);
    }
};
    const [trans,setTrans] = React.useState([]);


   React.useEffect(() => {
    if (selectedType === "trans") {
        setTrans(Transactions.Trans || []);
    }
    else if (selectedType.includes("category")) {
        const result = selectedType.split("-").pop();
        setTrans(
            Transactions.Categories?.[`${result}Transactions`] || []
        );
    }
    else {
        setTrans(
            Transactions.Types?.[`${selectedType}Transactions`] || []
        );
    }
}, [selectedType, Transactions]);

    return(
        <>
        {
        user.Active ? (

            Budget.Created ? (

            <div className="bg-[#FAFAFA] dark:bg-gray-800 text-black dark:text-white p-4 sm:p-[4%] h-auto overflow-y-auto scroll-auto flex flex-col gap-4">

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between sm:items-center">

                <div className="w-full sm:w-2/3">

                    <div>
                        <h1 className="text-[24px] sm:text-[30px] font-sans font-bold">
                            Transactions
                        </h1>

                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                            View and manage all your transactions
                        </p>
                    </div>

                </div>

                <div className="w-full sm:w-1/6 flex justify-start sm:justify-center items-center">

                    <div className="w-full">

                        <button
                        onClick={()=>{
                            dispatch(UpdateTransaction({Popup:true}))
                        }}
                        className="bg-[#1C77AA] text-white w-full h-9 cursor-pointer rounded whitespace-nowrap"
                        >
                            Add Transaction
                        </button>

                    </div>

                </div>

            </div>

            <div className="bg-[#FFFFFF] dark:bg-gray-900 border-gray-400 dark:border-gray-700 border rounded-2xl p-3 sm:p-[2%] flex flex-col gap-3">

                <div className="flex items-center">
                    <h3>All Transactions</h3>
                </div>

                <div className="flex flex-col md:flex-row gap-2 md:justify-between">

                    <div className="w-full md:w-1/2 flex gap-2 dark:border-gray-700 pb-[1%]">

                        <input
                            onChange={(e)=>setSearch(e.target.value)}
                            type="text"
                            className="flex-1 min-w-0 px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />

                        <button
                            onClick={searchTrans}
                            className="px-4 sm:px-5 py-2 rounded-lg bg-[#1C77AA] text-white hover:bg-[#155e85] transition cursor-pointer shrink-0"
                        >
                            Search
                        </button>

                    </div>

                    <div className="flex gap-2">

                    <div className="w-1/2 md:w-[140px]">

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

                    <div className="w-1/2 md:w-[140px]">

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

                </div>

                <div className="w-full overflow-x-auto">

                <table className="w-full min-w-[600px] text-left">

                    <thead className="bg-[#1C77AA] text-white h-[40px]">

                        <tr>
                            <th className="px-[2%] whitespace-nowrap">Date</th>
                            <th className="px-[2%] whitespace-nowrap">Category</th>
                            <th className="px-[2%] whitespace-nowrap">Amount</th>
                            <th className="px-[2%] whitespace-nowrap">Type</th>
                            <th className="px-[2%] whitespace-nowrap">Description</th>
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

                                <td className="px-[2%] whitespace-nowrap">
                                    {item.date}
                                </td>

                                <td className="px-[2%]">
                                    {item.category}
                                </td>

                                <td className="px-[2%] whitespace-nowrap">
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