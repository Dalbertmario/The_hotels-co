import { GiRollingSuitcase } from 'react-icons/gi';
import { BsCashCoin } from 'react-icons/bs';
import Moneyformate from '../helper/Moneyformate';
import { FaCalendarAlt } from 'react-icons/fa';
import { BsGraphUp } from 'react-icons/bs';

function Dashboard({ datas, val }) {
  const datalenght = datas?.length;
  const totalSalse = datas
    ?.map((el) => el.totalprice.slice('', -3))
    .reduce((a, b) => +a + +b, 0);

  const checkIns = datas?.filter((el) => el.status === 'Checked In');
  const OccupencyRate = (checkIns?.length / (8 * val)) * 1000;

  return (
    <div className="dash">
      <div className="flex gap-2">
        <div>
          <span className="flex flex-row gap-2 justify-center bg-white p-3 rounded-md ">
            <div className="bg-blue-200 rounded-full text-blue-700 p-3">
              <GiRollingSuitcase size={35} />
            </div>
            <div>
              <h1 className="font-semibold text-slate-500">Bookings</h1>
              <h1 className="dashdetails">{datalenght}</h1>
            </div>
          </span>
        </div>
        <div>
          <span className="flex flex-row gap-2 justify-center bg-white p-3 rounded-md">
            <div className="bg-green-200 rounded-full text-green-700 p-3 px-6">
              <BsCashCoin size={35} />
            </div>
            <div>
              <h1 className="font-semibold text-slate-500">Sales</h1>
              <h1 className="dashdetails">
                {Moneyformate(totalSalse).slice('', -3)}
              </h1>
            </div>
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <div>
          <span className="flex flex-row gap-2 justify-center bg-white p-3 rounded-md">
            <div className="bg-violet-200 rounded-full text-violet-700 p-3">
              <FaCalendarAlt size={35} />
            </div>
            <div>
              <h1 className="font-semibold text-slate-500">Check Ins</h1>
              <h1 className="dashdetails">{checkIns?.length}</h1>
            </div>
          </span>
        </div>
        <div>
          <span className="flex flex-row gap-2 justify-center bg-white p-3 rounded-md">
            <div className="bg-yellow-200 rounded-full text-yellow-700 p-3 px-6">
              <BsGraphUp size={35} />
            </div>
            <div>
              <h1 className="font-semibold text-slate-500">Occupancy rate</h1>
              <h1 className="dashdetails">{Math.round(OccupencyRate)}%</h1>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
