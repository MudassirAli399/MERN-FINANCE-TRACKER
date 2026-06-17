export default function Budgetplanner(){

    return(
        <>
        <div className="border-2 border-black h-screen p-5 grid grid-rows-[0.8fr_3.2fr]">
            <div className="bg-amber-100"></div>
            <div className="bg-amber-400 grid grid-rows-[1fr_3fr]">
                <div className="bg-gray-500"></div>
                <div className="bg-gray-700 grid lg:grid-cols-2 md:grid-cols-1 gap-2">
                    <div className="bg-red-400"></div>
                    <div className="bg-red-400"></div>

                </div>

            </div>


        </div>       
        </>
    )
}
