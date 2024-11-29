import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import getMonthName from '../helper/OnlyUniqueMonth';
const GraphingData = ({ datas }) => {
  const graphdata = datas?.map((el) => {
    const name = getMonthName(el?.month);
    const sales = el?.total_price;

    return { name: name, sales: sales };
  });
  const data = graphdata;

  return (
    <div className="bg-white rounded-md flex flex-col">
      <div className="p-5 font-semibold text-xl">
        <h1>Sales from Nov 25 2024 to DEC 25 2024</h1>
      </div>
      <div className="p-10 flex justify-center">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            width={700}
            height={300}
            data={data}
            margin={{ top: 10, right: 40, left: 5, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraphingData;
