import clsx from 'clsx';
import React, { useState } from 'react';
import {
  toggelguestAll,
  toggleguestCheckIn,
  toggelguestCheckedOut,
  toggleguestUnconfirmed,
} from './uiStore';
import { useDispatch, useSelector } from 'react-redux';
import { selecting } from './uiStore';

const BookingHeader = () => {
  const [isActive, setActive] = useState('all');
  const { guestAll, checkedOut, checkIn, unconfirmed } = useSelector(
    (state) => state.uistore,
  );
  const dispatch = useDispatch();
  function handelAll() {
    if (!guestAll) {
      dispatch(toggelguestAll());
      setActive('all');
    }
  }
  function handelCheckedIn() {
    if (!checkIn) {
      dispatch(toggleguestCheckIn());
      setActive('check in');
    }
  }
  function handelCheckout() {
    if (!checkedOut) {
      dispatch(toggelguestCheckedOut());
      setActive('check out');
    }
  }
  function handelUnconfirmed() {
    if (!unconfirmed) {
      dispatch(toggleguestUnconfirmed());
      setActive('unconfirmed');
    }
  }
  function selectings(val) {
    dispatch(selecting(val));
  }
  return (
    <div className="flex flex-row justify-between gap-1 xs:gap-0 items-center ">
      <h1 className={clsx(`heading font-semibold`)}>All Bookings</h1>
      <div className="flex flex-row gap-2 items-center">
        <div className="flex bg flex-row rounded-md gap-1">
          <button
            onClick={handelAll}
            className={clsx(
              `${isActive === 'all' && 'cursor-not-allowed'} ${isActive === 'all' && 'sorting'} hover:bg-violet-600 text-sm p-1 hover:text-white hover:rounded-md transition-all`,
            )}
          >
            All
          </button>
          <button
            onClick={handelCheckout}
            className={clsx(
              `${isActive === 'check out' && 'cursor-not-allowed'} ${isActive === 'check out' && 'sorting'} hover:bg-violet-600 text-sm p-1 hover:text-white hover:rounded-md transition-all`,
            )}
          >
            Checked Out
          </button>
          <button
            onClick={handelCheckedIn}
            className={clsx(
              `${isActive === 'check in' && 'cursor-not-allowed'} ${isActive === 'check in' && 'sorting'} hover:bg-violet-600 text-sm p-1 hover:text-white hover:rounded-md transition-all`,
            )}
          >
            Checked In
          </button>
          <button
            onClick={handelUnconfirmed}
            className={clsx(
              `${'cursor-not-allowed'} ${isActive === 'unconfirmed' && 'sorting'} hover:bg-violet-600 text-sm p-1 hover:text-white hover:rounded-md transition-all`,
            )}
          >
            Unconfirmed
          </button>
        </div>
        <div>
          <select
            className="rounded-md xs:text-sm select xs:max-w-[60px]"
            onChange={(e) => selectings(e.target.value)}
          >
            <option disabled={true}>Select</option>
            <option value="high-price">Sort by high price</option>
            <option value="low-price">Sort By Low price</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default BookingHeader;
