
import {
  PieChart, Pie, Cell, Tooltip, Legend ,
    LineChart,
    Line,
    XAxis,
    YAxis,
    
    CartesianGrid,
    ResponsiveContainer,
    
} from "recharts";

 const MyPieChart = function (
    {
        data
    }
) {

//   const data = [
//     { name: "Food", value: 400 },
//     { name: "Rent", value: 700 },
//     { name: "Entertainment", value: 300 },
//     { name: "Travel", value: 200 },
//     { name: "Travel", value: 200 },
//     { name: "Travel", value: 200 },
//   ];

  const COLORS = data.map(
                    (item) => {
                        return item.color
                    }
                    );

  return (
    <div className="w-full flex justify-center">
      <PieChart width={400} height={300}>
        
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
 const MonthlyChart = function ({data}){

    return(
        <ResponsiveContainer
            width="100%"
            height={400}
        >
            <LineChart data={data}>

                <CartesianGrid strokeDasharray="3 3"/>

                <XAxis dataKey="month"/>

                <YAxis/>

                <Tooltip/>

                <Legend/>

                <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#22c55e"
                />

                <Line
                    type="monotone"
                    dataKey="expense"
                    stroke="#ef4444"
                />

            </LineChart>
        </ResponsiveContainer>
    )
}
export {MyPieChart,MonthlyChart}