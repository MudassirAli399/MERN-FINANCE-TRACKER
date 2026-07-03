import React from "react"
import AddTransaction from "../Components/AddTransaction"
import { useDispatch ,useSelector} from "react-redux";
import {UpdateTransaction} from "../Store/Slice.js"

export default function Transaction(){
    const user = useSelector((state) => state.User);
    const dispatch = useDispatch();
    const trans = useSelector((state) => state.Transaction.Trans);
    const StartFetch = useSelector((state) => state.Transaction.StartFetch);
    
    React.useEffect(() => {

        if(!StartFetch) return
        const execute =  async () => {
            const response = await fetch(import.meta.env.VITE_GET_TRANSACTION,{method:"GET",credentials:"include"});
            const output = await response.json();
            dispatch(UpdateTransaction({
                StartFetch:false,
                Trans:output.RequiredData}));
            
        }

        execute();
        
    },[StartFetch])
    return(
        <>
        {user.Active ? ( <div className="border-2 bg-amber-800  border-black h-auto overflow-y-auto scroll-auto grid grid-rows-[0.5fr_auto] p-8 ">
            <div className="border-2 border-black flex flex-row justify-between">
                <div className="bg-green-900 w-1/3 h-full"></div>
                <div className=" w-1/6 h-full flex justify-center items-center">
                
                <div className="w-full"><button 
                        onClick={() => {
                        dispatch(UpdateTransaction({Popup:true}))
                    }} 
                        className="bg-[#1C77AA] text-white w-full h-9 cursor-pointer rounded ">Add Transaction</button></div>

                </div>
            </div>
            <div className="border-2 border-black grid grid-rows-[50px_80px_3.4fr]">
                <div className="bg-amber-100"></div>
                <div className="bg-amber-200 flex flex-row justify-between">
                    <div className="bg-pink-400 h-full w-1/3"></div>
                    <div className="bg-pink-400 h-full w-1/6"></div>
                </div>

                <table className="w-full bg-gray-200">
                    <thead>
                        <tr>
                            <th className="">Date</th>
                            <th className="">Name</th>
                            <th className="">Amount</th>
                            <th className="">Type</th>
                            <th className="">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trans.map((item) => {
                            return(
                                <tr>
                                    <td className="border-t-2 border-black">{item.date}</td>
                                    <td className="border-t-2 border-black">{item.category}</td>
                                    <td className="border-t-2 border-black">{item.amount}</td>
                                    <td className="border-t-2 border-black">{item.type}</td>
                                    <td className="border-t-2 border-black">{item.description}</td>
                                </tr>
                            )
                        })}
                    </tbody>
            
                </table>
            </div>

                        
        </div> ) : (<div>You are not logged in</div>)}
       
        {/* {<AddTransaction/>} */}
        
        </>
    )    
}