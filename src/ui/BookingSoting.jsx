import clsx from 'clsx';
import React from 'react';
import {
  toggelguestAll,
  toggleguestCheckIn,
  toggelguestCheckedOut,
  toggleguestUnconfirmed,
} from './uiStore';
import { useDispatch, useSelector } from 'react-redux';
import { selecting } from '../ui/uiStore';

const BookingHeader = () => {
  const { guestAll, checkedOut, checkIn, unconfirmed } = useSelector(
    (state) => state.uistore,
  );
  const dispatch = useDispatch();
  function handelAll() {
    if (!guestAll) {
      dispatch(toggelguestAll());
    }
  }
  function handelCheckedIn() {
    if (!checkIn) {
      dispatch(toggleguestCheckIn());
    }
  }
  function handelCheckout() {
    if (!checkedOut) {
      dispatch(toggelguestCheckedOut());
    }
  }
  function handelUnconfirmed() {
    if (!unconfirmed) {
      dispatch(toggleguestUnconfirmed());
    }
  }
  function selectings(val) {
    dispatch(selecting(val));
  }
  return (
    <div className="flex flex-row justify-between gap-1 xs:gap-0 items-center ">
      <h1 className={clsx(`heading font-semibold`)}>All Bookings</h1>
      <div className="flex flex-row gap-2 items-center">
        <div className="flex flex-row rounded-md sortbtn">
          <button
            onClick={handelAll}
            className={clsx(`${'cursor-not-allowed'} sorting text-xs`)}
          >
            All
          </button>
          <button
            onClick={handelCheckout}
            className={clsx(`${'cursor-not-allowed'} sorting`)}
          >
            Checked Out
          </button>
          <button
            onClick={handelCheckedIn}
            className={clsx(`${'cursor-not-allowed'} sorting`)}
          >
            Checked In
          </button>
          <button onClick={handelUnconfirmed} className="sorting">
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
