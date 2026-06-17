export default function Header(){
    return(
        <>
            <div className=" border-5 border-emerald-900 lg:h-screen md:h-[300px] md:w-full md:sticky md:top-0 md:bottom-0  z-50  lg:sticky lg:top-0">
                <div className="h-full w-full flex lg:flex-col md:flex-row ">
                    <div className="bg-amber-50 flex-[0.5]">

                    </div>
                    <div className="bg-amber-500 flex-[3] flex lg:flex-col md:flex-row md:gap-8 lg:gap-2 md:items-center lg:items-start lg:justify-start md:justify-center lg:gap-0">
                        <div className="bg-amber-600 lg:h-[40px] md:h-[100px] md:w-[100px] lg:w-full   "></div>
                        <div className="bg-amber-600 lg:h-[40px] md:h-[100px] md:w-[100px] lg:w-full "></div>
                        <div className="bg-amber-600 lg:h-[40px] md:h-[100px] md:w-[100px] lg:w-full  "></div>
                        <div className="bg-amber-600 lg:h-[40px] md:h-[100px] md:w-[100px] lg:w-full "></div>
                    </div>

                    <div className="bg-amber-950 flex-1">

                    </div>
                </div>    
            </div>
        </>
    )
}