import React from "react"
import Header from "../header.jsx"
import {Outlet} from "react-router-dom"
export default function Layout(){
    return(
        <>
            <div className="grid lg:grid-cols-[0.8fr_3.2fr] ">
              <Header/>
              <Outlet/>
            </div>
            </>
    )
}