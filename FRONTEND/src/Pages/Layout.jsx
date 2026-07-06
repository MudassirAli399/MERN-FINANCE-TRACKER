import React from "react";
import Header from "../header.jsx";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AddTransaction from "../Components/AddTransaction.jsx";

export default function Layout(){

    const popup = useSelector(
        (state)=>state.Transaction.Popup
    );

    const [dark,setDark] = React.useState(false);

    React.useEffect(()=>{

        if(dark){
            document.documentElement.classList.add("dark");
        }
        else{
            document.documentElement.classList.remove("dark");
        }

    },[dark]);

    return(
        <>
            <div
            className={`
            min-h-screen
            bg-white
            dark:bg-gray-800
            text-black
            dark:text-white
            grid lg:grid-cols-[0.8fr_3.2fr]
            relative
            ${popup ? "pointer-events-none brightness-50" : ""}
            `}>

                <Header
                    dark={dark}
                    setDark={setDark}
                />

                <Outlet/>

            </div>

            {popup && <AddTransaction/>}
        </>
    )
}