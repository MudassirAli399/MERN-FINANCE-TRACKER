export default function Dashboard(){
    return(
        <>
            <div className="border-2 border-black lg:h-[800px] md:h-[1600px] grid grid-rows-[1fr_3fr] p-6 gap-4 overflow-y-auto">
                <div className="border-2 border-black flex lg:flex-row md:flex-col p-2 gap-4 md:items-center">
                    <div className="bg-green-900 lg:h-full lg:w-1/4 md:w-full md:h-1/4"></div>
                    <div className="bg-green-900 lg:h-full lg:w-1/4 md:w-full md:h-1/4"></div>
                    <div className="bg-green-900 lg:h-full lg:w-1/4 md:w-full md:h-1/4"></div>
                    <div className="bg-green-900 lg:h-full lg:w-1/4 md:w-full md:h-1/4"></div>
                </div>
                <div className="border-2 border-black flex lg:flex-row md:flex-col gap-2">
                    <div className="bg-green-700 flex-3">

                    </div>
                    <div className="bg-green-800 flex-2">

                    </div>  
                </div>
            </div>
        </>
    )
}