import {NavLink} from "react-router-dom";

export default function Header(){
    return(
        <>
            <div className=" lg:h-screen md:h-[300px] md:w-full md:sticky md:top-0 md:bottom-0  z-50  lg:sticky lg:top-0">
                <div className="h-full w-full flex lg:flex-col md:flex-row ">
                    <div className="border-b-1 border-black flex items-center justify-center flex-[0.3] gap-1.5 ">
                        <svg width="40" height="40" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">

                    
                                <circle cx="100" cy="100" r="90" fill="#0F172A"/>

                                
                                <rect x="65" y="115" width="10" height="45" fill="#22C55E"/>
                                <rect x="80" y="100" width="10" height="60" fill="#3B82F6"/>
                                <rect x="95" y="85" width="10" height="75" fill="#F59E0B"/>
                                <rect x="110" y="100" width="10" height="60" fill="#EF4444"/>

                                
                                <polyline
                                    points="65,120 80,105 95,90 110,100 125,85"
                                    fill="none"
                                    stroke="#E2E8F0"
                                    strokeWidth="3"
                                />

                        </svg>
                        <p className="font-sans text-[20px] font-light" >Finance Tracker</p>
                    </div>
                    <div className=" flex-[3] flex lg:flex-col md:flex-row md:gap-8 lg:gap-2 md:items-center lg:items-start lg:justify-start md:justify-center lg:gap-0">
                        <nav>
                            <div className=" lg:h-[40px] md:h-[100px] md:w-[100px] lg:w-full ">
                                <NavLink to="/" className={({isActive}) => isActive ? "text-blue-600" : "text-black"}>Dashboard</NavLink>
                            </div>
                             <div className=" lg:h-[40px] md:h-[100px] md:w-[100px] lg:w-full ">
                                <NavLink to="/transaction" className={({isActive}) => isActive ? "text-blue-600" : "text-black"}>Dashboard</NavLink>
                            </div>
                             <div className=" lg:h-[40px] md:h-[100px] md:w-[100px] lg:w-full ">
                                <NavLink to="/reports" className={({isActive}) => isActive ? "text-blue-600" : "text-black"}>Dashboard</NavLink>
                            </div>
                             <div className=" lg:h-[40px] md:h-[100px] md:w-[100px] lg:w-full ">
                                <NavLink to="/budgetplanner" className={({isActive}) => isActive ? "text-blue-600" : "text-black"}>Dashboard</NavLink>
                            </div>

                        
                        </nav>
                    </div>

                    <div className="flex-1">

                    </div>
                </div>    
            </div>
        </>
    )
}