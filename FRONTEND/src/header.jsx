import {NavLink, Link} from "react-router-dom";
import {useSelector} from "react-redux";

export default function Header(){
    const user = useSelector((state) => state.User);
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
                    <div className="border-b-1 border-black flex-[3] flex lg:flex-col md:flex-row md:gap-8 lg:gap-2 md:items-center lg:items-start lg:justify-start md:justify-center lg:gap-0 p-3 ">
                        {/* <nav> */}
                            <div className=" lg:h-[40px] md:h-[100px] md:w-[100px] lg:w-full flex justify-center  ">
                                <NavLink to="/" className={ ({isActive}) => `block w-full text-center font-sans text-[20px] rounded-xl  ${isActive ? "text-white bg-[rgb(3,105,161)]" : "text-black hover:bg-blue-100"}`}>Dashboard</NavLink>
                            </div>
                             <div className=" lg:h-[40px] md:h-[100px] md:w-[100px] lg:w-full flex justify-center ">
                                <NavLink to="/transaction" className={ ({isActive}) => `block w-full text-center font-sans text-[20px] rounded-xl ${isActive ? "text-white bg-[rgb(3,105,161)]" : "text-black hover:bg-blue-100"}`}>Transaction</NavLink>
                            </div>
                             <div className=" lg:h-[40px] md:h-[100px] md:w-[100px] lg:w-full flex justify-center">
                                <NavLink to="/budgetplanner" className={ ({isActive}) => `block w-full text-center font-sans text-[20px] rounded-xl ${isActive ? "text-white bg-[rgb(3,105,161)]" : "text-black hover:bg-blue-100"}`}>BudgetPlanner</NavLink>
                            </div>
                             <div className=" lg:h-[40px] md:h-[100px] md:w-[100px] lg:w-full flex justify-center">
                                <NavLink to="/reports" className={ ({isActive}) => `block w-full text-center font-sans text-[20px] rounded-xl ${isActive ? "text-white bg-[rgb(3,105,161)]" : "text-black hover:bg-blue-100"}`}>Reports</NavLink>
                            </div>

                        
                        {/* </nav> */}
                    </div>
                    {user.Active ? 
                    ( <div className="flex-[0.7] grid lg:grid-rows-[2.5fr_1.5fr] gap-2 ">
                        <div className="grid lg:grid-cols-[1fr_3fr]  ">
                            <div className=" flex justify-end items-end">
                                <div className="w-10 h-10 text-center  text-[20px] rounded-4xl pt-1 bg-[rgb(241,245,249)] ">{user.Name[0]}</div>
                            </div>
                            <div className="  text-[12px] pt-3 ">
                                <p className="font-bold text-black  font-sans">{user.Name}</p>
                                <p className="text-gray-600  font-sans">{user.Email}</p>
                            </div>
                        </div>
                        <div className="  rounded-xl">
                            <button className="block w-full rounded-xl h-full bg-[rgb(250,250,250)]">DARK MODE</button>
                        </div>

                    </div>) 
                    :
                    (<center><Link to="/create" >Create/Login Account</Link></center>)
                    
                    }
                   
                </div>    
            </div>
        </>
    )
}