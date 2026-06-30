import React from "react";

export default function Budgetcard({
    Name,
    Value
}) {
const [serve,setserve] = React.useState(1500);
const [remain,setremain] = React.useState(0); 
const [percent,setprecent] = React.useState(0);
const [limit,setlimit] = React.useState(false);
React.useEffect(() => {
    setremain(Value-serve);
    setprecent((serve/Value)*100);
    if(serve>=Value){
        setlimit(true);
    }
},[serve])
return(
    <>
    <div className={`"bg-[#FFFFFF] rounded-2xl h-[200px] ${limit ? "border-red-400 border-1 " : "border-gray-400 border-1"}   grid grid-rows-[0.5fr_1fr]"`}>

        <div className="flex items-center justify-center">
            <h3 className="font-stretch-extra-expanded text-[20px]">
                {Name}
            </h3>
        </div>

        <div className="p-5 font-mono">
            <div className="flex justify-between">
                <div>
                    <p className="text-[20px]"><span className={`${limit ? "text-red-500" : "text-black"} font-bold text-[25px]`}>${serve}</span><span className="text-gray-600">{`/$${Value}`}</span></p>
                </div>

                <div>
                   <span > <p className={`${limit ? "text-red-500" : "text-gray-600"}`}>{percent}%</p> </span>
                </div>
            </div>

            <div className="w-full">
                <meter
                    className="w-full"
                    value="70"
                    min="0"
                    max="100"
                ></meter>
            </div>

            <div className="flex justify-between">
                <div>
                    <p className="text-gray-600 font-sans">Remaining</p>
                </div>

                <div>
                  <span className={`${limit ? "text-red-500" : "text-green-600"}`}>  <p>${remain}</p></span>
                </div>
            </div>

        </div>

    </div>
    </>
)

}