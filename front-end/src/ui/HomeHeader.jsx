import React, { useState } from 'react';

import { BsHandIndex } from 'react-icons/bs';
import useDatefunction from '../features/DashBoard/pastDate';
import clsx from 'clsx';

const HomeHeader = ({ date }) => {
  const [isActive, setisAcitve] = useState(7);
  function handelseven(val) {
    date(val);
    setisAcitve(val);
  }
  return (
    <div className="flex flex-row justify-between items-center ">
      <div>
        <h1 className="font-semibold text-xl">Dashboard</h1>
      </div>
      <div className="bg-white flex gap-3 rounded-md p-1">
        <button
          onClick={() => handelseven(7)}
          className={clsx(
            `${isActive === 7 && 'bg-blue-400 text-white'} text-slate-700 p-4 hover:bg-blue-400 hover:text-white font-semibold transition-all rounded-lg`,
          )}
        >
          Last 7 days
        </button>
        <button
          onClick={() => handelseven(30)}
          className={clsx(
            `${isActive === 30 && 'bg-blue-400 text-white'} text-slate-700 p-4 hover:bg-blue-400 hover:text-white font-semibold transition-all rounded-lg`,
          )}
        >
          Last 30 days
        </button>
        <button
          onClick={() => handelseven(90)}
          className={clsx(
            `${isActive === 90 && 'bg-blue-400 text-white'} text-slate-700 p-4 hover:bg-blue-400 hover:text-white font-semibold transition-all rounded-lg`,
          )}
        >
          Last 90 days
        </button>
      </div>
    </div>
  );
};

export default HomeHeader;
