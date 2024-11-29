import React, { useState } from 'react';
import HomeHeader from '../ui/HomeHeader';
import Dashboard from '../ui/DashBoard';
import useDatefunction from '../features/DashBoard/pastDate';
import { FaCalendarAlt } from 'react-icons/fa';
import UseToday from '../features/DashBoard/Today';
import TodayDetails from '../ui/TodayDetails';
import UseGraph from '../features/DashBoard/DashGraph';
import GraphingData from '../ui/GraphingData';
import UsePieChart from '../features/DashBoard/Piechart';

const Home = () => {
  const [getDateval, setDateval] = useState(7);
  const { data } = useDatefunction(getDateval);
  const { graphdata } = UseGraph();
  const { todayData } = UseToday();
  const { piedatas } = UsePieChart();

  return (
    <div className="flex flex-col gap-4 max-w-[1400px] m-auto min-h-[89vh]">
      <div>
        <HomeHeader date={setDateval} />
      </div>
      <div>
        <Dashboard datas={data} val={getDateval} />
      </div>
      <div>
        <TodayDetails datas={todayData} piedata={piedatas} />
      </div>
      <div>
        <GraphingData datas={graphdata} />
      </div>
    </div>
  );
};

export default Home;
