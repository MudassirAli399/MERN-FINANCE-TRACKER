export default function DashboardCard({
    text,
    month,
    amount
}) {

    const expense = text === "Expense";

    return (
        <>
            <div className="bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-xl p-4 lg:h-full lg:w-1/4 md:w-full shadow-sm">

                <div className="text-center mb-4">
                    <p className="font-medium text-[18px]">
                        {text} ({month})
                    </p>
                </div>

                <div className="text-center">

                    <p
                        className={`font-mono text-[40px] font-bold ${
                            expense
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                    >
                        ${amount}
                    </p>

                    <p className="font-sans text-[15px] text-gray-600 dark:text-gray-300">
                        Current month {text}
                    </p>

                </div>

            </div>
        </>
    );
}