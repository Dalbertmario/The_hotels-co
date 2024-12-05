import React, { useRef, useState } from 'react';
import datetimeformate from '../../helper/dateformate';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import Moneyformate from '../../helper/Moneyformate';
import { HiDotsHorizontal } from 'react-icons/hi';
import Loading from '../../ui/Loading';
import { FaRegEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
const Bookingrow = ({ bookings = [], guestdata = [], isLoading }) => {
  const [treebtn, settreeBtn] = useState(false);
  const [position, setPosition] = useState({});
  const btnref = useRef(null);
  console.log(btnref);
  const {
    booking_id,
    guest_id: bookTguest_id,
    cabin_id,
    fromdate,
    todate,
    numnight,
    status,
    totalprice,
    hasbreakfast,
  } = bookings;
  const guestdatas = guestdata.find((el) => el.guest_id === bookTguest_id);
  function handelTree(e) {
    if (btnref.current && btnref.current.contains(e.target)) {
      const rect = e.target.getBoundingClientRect();
      setPosition({
        x: window.innerWidth - rect.width - rect.x + 10,
        y: rect.y - rect.height + 2,
      });
    }
    settreeBtn((e) => !e);
  }
  console.log(isLoading);
  return (
    <div>
      <div className="grid bookgrid text-xs border border-slate-100 bg-white text-center p-1 bg-white">
        <h1 className="content-center font-semibold font-medium text-slate-800  xl:text-[12px] xs:text-xs">
          {cabin_id}
        </h1>
        <div className="flex flex-col gap-2 p-2 justify-center">
          <h1 className="font-medium text-slate-800">{guestdatas?.fullname}</h1>
          <h1 className="mail font-semibold text-slate-500 ">
            {guestdatas?.email}
          </h1>
        </div>
        <div className="flex date">
          <h1 className="text-[11px] text-slate-600 font-semibold">
            {datetimeformate(fromdate)}
          </h1>
          <h1>To</h1>
          <h1 className="text-[11px] text-slate-600 font-semibold">
            {datetimeformate(todate)}
          </h1>
        </div>
        <h1
          className={clsx(
            `${status === 'Checked In' && 'bg-green-200 text-green-900 p-1'} ${status === 'Checked Out' && 'bg-gray-300 text-grey-900 p-1'} ${status === 'Unconfirmed' && 'bg-blue-200 text-blue-800'} rounded-md font-semibold max-h-10 py-1 m-auto bookingstatus`,
          )}
        >
          {status}
        </h1>
        <h1 className="content-center xs:text-[9px]">
          {Moneyformate(totalprice)}
        </h1>
        <div className="flex justify-center items-center">
          <button
            className={clsx(
              `${treebtn && 'outline outline-violet-300'} flex justify-center rounded-md p-1`,
            )}
            onClick={handelTree}
            ref={btnref}
          >
            <HiDotsHorizontal />
          </button>
        </div>
      </div>
      {treebtn && (
        <div
          style={{
            position: 'fixed',
            right: `${position.x}px`,
            top: `${position.y}px`,
          }}
          className="absolute flex flex-col bg-slate-300 rounded-md border bottom-slate-200"
        >
          <button className="hover:bg-slate-200 p-2">
            <NavLink
              to={`/bookings/${booking_id}`}
              state={{ guest_id: bookTguest_id }}
            >
              <span className="flex items-center gap-1">
                <FaRegEye size={20} />
                <h1>See details</h1>
              </span>
            </NavLink>
          </button>
          <button className="hover:bg-slate-200 p-2">
            <span className="flex items-center gap-1">
              <MdDelete size={20} />
              <h1>delete booking</h1>
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Bookingrow;
