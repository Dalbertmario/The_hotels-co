import { data } from 'autoprefixer';
import React from 'react';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { NavLink } from 'react-router-dom';
import Loading from './Loading';
ChartJS.register(ArcElement, Tooltip, Legend);
const TodayDetails = ({ datas, piedata, isLoading, piechartLoading }) => {
  const currentDate = new Date();
  const val = datas?.find((el) => el);
  const da = piedata?.map((el) => {
    const cabinid = el.cabin_id;
    const price = el.each_cabin_sales;
    return { data: cabinid, label: price };
  });
  const labelingval = da?.map((el) => ` Cabin No ${el.data}`);
  const dataval = da?.map((el) => el.label);

  //PIE CHART
  const data = {
    labels: labelingval,
    datasets: [
      {
        label: 'Cabins',
        data: dataval,
        backgroundColor: [
          'rgba(200, 80, 115, 0.4)',
          'rgba(45, 130, 200, 0.4)',
          'rgba(230, 185, 70, 0.4)',
          'rgba(60, 150, 150, 0.4)',
          'rgba(120, 80, 200, 0.4)',
          'rgba(200, 120, 50, 0.4)',
        ],
        borderColor: [
          'rgba(200, 80, 115, 1)',
          'rgba(45, 130, 200, 1)',
          'rgba(230, 185, 70, 1)',
          'rgba(60, 150, 150, 1)',
          'rgba(120, 80, 200, 1)',
          'rgba(200, 120, 50, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="today">
      <div className="flex flex-col gap-2 bg-white rounded-md box shadow transition-all w-[50%] xs:w-[100%]">
        <div className="border-b-2 p-2">
          <h1 className="font-bold xs:text-[17px] py-3">Today</h1>
        </div>
        <div>
          {isLoading ? (
            <div className="mt-[150px]">
              <Loading />
            </div>
          ) : (
            <ul key={val?.guest_id} className="flex flex-col gap-2 p-7">
              {datas?.map((el) => {
                return new Date(el?.fromdate).getDate() ===
                  currentDate.getDate() ? (
                  <li className="flex flex-row gap-2 justify-between border-b-2 p-1">
                    <h1 className="bg-green-200 text-green-600 font-medium rounded-lg text-[10px] font-semibold content-center px-1">
                      ARRIVING
                    </h1>
                    <h1 className="font-medium ">{el.guest_fullname}</h1>
                    <h1>{el.numnight} nights</h1>
                    <NavLink
                      to={`/bookings/${el.booking_id}`}
                      state={{ guest_id: el.guest_id, status: 'Check In' }}
                    >
                      <button className="checkBtn p-3">CHECK IN</button>
                    </NavLink>
                  </li>
                ) : (
                  <li className=" flex flex-row gap-2 justify-between border-b-2 p-1 ">
                    <h1 className="bg-blue-200 text-blue-600 font-medium rounded-lg text-[10px] font-semibold content-center px-1">
                      {el.status === 'Checked Out'
                        ? 'Checked out'
                        : 'DEPARTING'}
                    </h1>
                    <h1 className="font-medium ">{el.guest_fullname}</h1>
                    <h1>{el.numnight} nights</h1>
                    <NavLink
                      to={`/bookings/${el.booking_id}`}
                      state={{ guest_id: el.guest_id, status: 'Check Out' }}
                    >
                      <button className="checkBtn p-1">CHECK OUT</button>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="bg-white rounded-md w-[50%] box shadow w-[50%] xs:w-[100%] transition-all">
        <div className="border-b-2 p-2">
          <h1 className="font-bold xs:text-[17px] py-3">
            Popularly booked cabin
          </h1>
        </div>
        {piechartLoading ? (
          <div className="mt-[150px]">
            <Loading />
          </div>
        ) : (
          <div className="flex justify-center h-[450px] m-auto p-2">
            <Pie data={data} options={options} width={400} height={400} />;
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayDetails;
