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
import Loading from '../ui/Loading';

const Home = () => {
  const [getDateval, setDateval] = useState(7);
  const { data, pastdataloading } = useDatefunction(getDateval);
  const { graphdata, graphloading } = UseGraph();
  const { todayData, todaydataLoading } = UseToday();
  const { piedatas, piechartLoading } = UsePieChart();
  return (
    <div>
      {pastdataloading && graphloading && todaydataLoading ? (
        <div className="h-screen mt-[350px] ">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-w-[1400px] m-auto min-h-[89vh]">
          <div>
            <HomeHeader date={setDateval} />
          </div>
          <div>
            <Dashboard
              datas={data}
              val={getDateval}
              isLoading={pastdataloading}
            />
          </div>
          <div>
            <TodayDetails
              datas={todayData}
              piedata={piedatas}
              isLoading={todaydataLoading}
              piechartLoading={piechartLoading}
            />
          </div>
          <div>
            <GraphingData datas={graphdata} isLoading={graphloading} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
