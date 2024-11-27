import React, { useRef, useState } from 'react';
import datetimeformate from '../../helper/dateformate';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import Moneyformate from '../../helper/Moneyformate';
import { HiDotsHorizontal } from 'react-icons/hi';
const Bookingrow = ({ bookings = [], guestdata = [] }) => {
  const [treebtn, settreeBtn] = useState(false);
  const [position, setPosition] = useState({});
  const btnref = useRef(null);
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
        x: window.innerWidth - rect.width - rect.x + 30,
        y: rect.y - rect.height + 2,
      });
    }
    settreeBtn((e) => !e);
  }
  return (
    <div>
      <div className="grid grid-cols-[0.1fr_0.5fr_0.3fr_0.4fr_0.3fr_0.1fr] gap-1 text-xs border border-slate-100 text-center p-1 bg-white">
        <h1 className="content-center font-semibold font-medium text-slate-800  xl:text-[12px] xs:text-xs">
          {cabin_id}
        </h1>
        <div className="flex flex-col shrink-1 justify-center">
          <h1 className="font-medium text-slate-800">{guestdatas?.fullname}</h1>
          <h1 className="mail font-semibold text-slate-500">
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
            `${status === 'Checked In' && 'bg-green-200 text-green-900 p-1'} ${status === 'Checked Out' && 'bg-gray-300 text-grey-900 p-1'} ${status === 'Unconfirmed' && 'bg-blue-200 text-blue-800'} rounded-md font-semibold max-h-10 py-1 m-auto`,
          )}
        >
          {status}
        </h1>
        <h1 className="content-center xs:text-[9px]">
          {Moneyformate(totalprice)}
        </h1>
        <button onClick={handelTree} ref={btnref}>
          <HiDotsHorizontal />
        </button>
      </div>
      {treebtn && (
        <div
          style={{
            position: 'fixed',
            right: `${position.x}px`,
            top: `${position.y + 20}px`,
          }}
          className="absolute flex flex-col bg-slate-300 rounded-md border bottom-slate-200"
        >
          <button className="hover:bg-slate-200 p-2">
            <NavLink
              to={`/bookings/${booking_id}`}
              state={{ cabinid: cabin_id }}
            >
              See details
            </NavLink>
          </button>
          <button className="hover:bg-slate-200 p-2">delete booking</button>
        </div>
      )}
    </div>
  );
};

export default Bookingrow;
