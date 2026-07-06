export default function DashboardCard({
    text,
    month,
    amount
}) {

    const expense = text === "Expense";

    return (
        <>
            <div className="bg-[#FFFFFF] border-gray-400 border-1 lg:h-full lg:w-1/4 md:w-full md:h-1/4 grid grid-rows-[1fr_3fr]">
                
                <div>
                    <center>
                        {text} ({month})
                    </center>
                </div>

                <div>
                    <center>
                        <p
                            className={`font-mono text-[40px] ${
                                expense
                                    ? "text-red-500"
                                    : "text-green-500"
                            }`}
                        >
                            ${amount}
                        </p>

                        <p className="font-sans text-[15px]">
                            Current month {text}
                        </p>
                    </center>
                </div>

            </div>
        </>
    );
}