import {NavLink, Link} from "react-router-dom";
import {useSelector} from "react-redux";
import React from "react";

export default function Header({dark,setDark}){

    const user = useSelector((state) => state.User);
    const [menuOpen,setMenuOpen] = React.useState(true)

    React.useEffect(() => {

    const handleResize = () => {
        if (window.innerWidth < 768) {
            setMenuOpen(false);
        } else {
            setMenuOpen(true);
        }
    };

    handleResize(); // mount hote hi ek dafa check kar lo

    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
    };

}, []);

    return(
        <>
            <div className="
            w-full
            h-auto
            md:h-auto
            lg:h-screen
            sticky
            top-0
            z-50
            border-b
            lg:border-b-0
            lg:border-r
            bg-white
            text-black
            dark:bg-gray-900
            dark:text-white
            dark:border-gray-700
            ">

                <div className="h-full w-full flex flex-col md:flex-row lg:flex-col">

                    {/* Logo */}
                    <div className="
                    border-b
                    md:border-b-0
                    md:border-r
                    lg:border-r-0
                    lg:border-b
                    border-black
                    flex items-center justify-between
                    gap-1.5
                    py-3
                    md:flex-[0.3]
                    lg:flex-[0.3]
                    dark:border-gray-700
                    ">
                        <div className="flex items-center gap-1.5">
                        <svg
                        width="36"
                        height="36"
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0"
                        >

                            <circle
                            cx="100"
                            cy="100"
                            r="90"
                            fill="#0F172A"
                            />

                            <rect
                            x="65"
                            y="115"
                            width="10"
                            height="45"
                            fill="#22C55E"
                            />

                            <rect
                            x="80"
                            y="100"
                            width="10"
                            height="60"
                            fill="#3B82F6"
                            />

                            <rect
                            x="95"
                            y="85"
                            width="10"
                            height="75"
                            fill="#F59E0B"
                            />

                            <rect
                            x="110"
                            y="100"
                            width="10"
                            height="60"
                            fill="#EF4444"
                            />

                            <polyline
                            points="65,120 80,105 95,90 110,100 125,85"
                            fill="none"
                            stroke="#E2E8F0"
                            strokeWidth="3"
                            />

                        </svg>

                        <p className="
                        font-sans
                        text-[18px]
                        sm:text-[20px]
                        font-light
                        dark:text-white
                        ">
                            Finance Tracker
                        </p>
                        </div>
                        <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9 shrink-0"
                        aria-label="Toggle menu"
                        >
                            <span className={`block h-0.5 w-6 bg-current transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                            <span className={`block h-0.5 w-6 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
                            <span className={`block h-0.5 w-6 bg-current transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                        </button>

                    </div>

                    {/* Navigation */}
                    <div className={
                    `border-b
                    lg:border-b
                    md:border-b-0
                    md:border-r
                    lg:border-r-0
                    border-black
                    ${menuOpen ? "flex" : "hidden"}
                    flex-col
                    sm:flex-row
                    md:flex-row
                    lg:flex-col
                    flex-wrap
                    md:flex-nowrap
                    md:flex-[3]
                    lg:flex-[3]
                    gap-2
                    md:gap-4
                    lg:gap-2
                    items-stretch
                    md:items-center
                    lg:items-start
                
                    p-3
                    dark:border-gray-700`
                    }>

                        <div className="h-[40px] w-full md:w-[110px] lg:w-full flex justify-center">

                            <NavLink
                            to="/"
                            className={({isActive}) =>
                            `flex items-center justify-center w-full h-full text-center font-sans text-[16px] sm:text-[18px] lg:text-[20px] rounded-xl
                            ${
                            isActive
                            ? "text-white bg-[rgb(3,105,161)]"
                            : "text-black dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700"
                            }`
                            }
                            >
                                Dashboard
                            </NavLink>

                        </div>

                        <div className="h-[40px] w-full md:w-[110px] lg:w-full flex justify-center">

                            <NavLink
                            to="/transaction"
                            className={({isActive}) =>
                            `flex items-center justify-center w-full h-full text-center font-sans text-[16px] sm:text-[18px] lg:text-[20px] rounded-xl
                            ${
                            isActive
                            ? "text-white bg-[rgb(3,105,161)]"
                            : "text-black dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700"
                            }`
                            }
                            >
                                Transaction
                            </NavLink>

                        </div>

                        <div className="h-[40px] w-full md:w-[110px] lg:w-full flex justify-center">

                            <NavLink
                            to="/budgetplanner"
                            className={({isActive}) =>
                            `flex items-center justify-center w-full h-full text-center font-sans text-[16px] sm:text-[18px] lg:text-[20px] rounded-xl
                            ${
                            isActive
                            ? "text-white bg-[rgb(3,105,161)]"
                            : "text-black dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700"
                            }`
                            }
                            >
                                BudgetPlanner
                            </NavLink>

                        </div>

                        <div className="h-[40px] w-full md:w-[110px] lg:w-full flex justify-center">

                            <NavLink
                            to="/reports"
                            className={({isActive}) =>
                            `flex items-center justify-center w-full h-full text-center font-sans text-[16px] sm:text-[18px] lg:text-[20px] rounded-xl
                            ${
                            isActive
                            ? "text-white bg-[rgb(3,105,161)]"
                            : "text-black dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700"
                            }`
                            }
                            >
                                Reports
                            </NavLink>

                        </div>

                    </div>

                    {user.Active ? (

                            <div className={
                            `w-full
                            ${menuOpen ? "grid" : "hidden"}
                            grid-cols-1
                            sm:grid-cols-2
                            md:grid-cols-1
                            lg:grid-cols-1

                            gap-3

                            p-3`
                            }>
                            <div className="
                            grid

                            grid-cols-[50px_1fr]

                            items-center
                            ">
                                <div className="
                                flex
                                justify-center
                                items-center
                                ">
                                    <div className="
                                    w-10 h-10
                                    text-center
                                    text-[20px]
                                    rounded-full
                                    pt-1
                                    bg-[rgb(241,245,249)]
                                    dark:bg-gray-700
                                    ">
                                        {user.Name[0]}
                                    </div>

                                </div>

                                <div className="
                                        text-sm
                                        pl-2
                                        truncate
                                        ">

                                    <p className="
                                    font-bold
                                    font-sans
                                    text-black
                                    dark:text-white
                                    truncate
                                    ">
                                        {user.Name}
                                    </p>

                                    <p className="
                                    text-gray-600
                                    font-sans
                                    dark:text-gray-300
                                    truncate
                                    ">
                                        {user.Email}
                                    </p>

                                </div>

                            </div>

                            <div className="rounded-xl">

                                <button
                                onClick={() => setDark(!dark)}
                                className="
                                block w-full h-full min-h-[40px] rounded-xl
                                text-sm sm:text-base
                                bg-[rgb(250,250,250)]
                                text-black
                                dark:bg-gray-700
                                dark:text-white
                                "
                                >
                                    {dark
                                    ? "☀ LIGHT MODE"
                                    : "🌙 DARK MODE"}
                                </button>

                            </div>

                        </div>

                    ) : (

                        <center className="py-3">
                            <Link to="/create">
                                Create/Login Account
                            </Link>
                        </center>

                    )}

                </div>
            </div>
        </>
    );
}