import React from "react"
import Header from "../header.jsx"
import {Outlet} from "react-router-dom"
import { useSelector } from "react-redux";
import AddTransaction from "../Components/AddTransaction.jsx";
export default function Layout(){
    const popup = useSelector((state) => state.Transaction.Popup);
    console.log(popup);
    return(
        <>

            <div className={`grid lg:grid-cols-[0.8fr_3.2fr] relative ${popup ? "pointer-events-none brightness-50" : ""}`} >
              <Header/>
              <Outlet/>
            </div>
            
            {popup && <AddTransaction/>}
            
            </>
    )
}