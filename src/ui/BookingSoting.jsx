import clsx from 'clsx';
import React from 'react';

const BookingHeader = () => {
  return (
    <div className="flex flex-row justify-between gap-1 xs:gap-0 items-center ">
      <h1 className={clsx(`heading font-semibold`)}>All Bookings</h1>
      <div className="flex flex-row gap-2 items-center">
        <div className="flex flex-row rounded-md sortbtn">
          <button className={clsx(`${'cursor-not-allowed'} sorting text-xs`)}>
            All
          </button>
          <button className={clsx(`${'cursor-not-allowed'} sorting`)}>
            Checked Out
          </button>
          <button className={clsx(`${'cursor-not-allowed'} sorting`)}>
            Checked In
          </button>
          <button className="sorting">Unconfirmed</button>
        </div>
        <div>
          <select className="rounded-md xs:text-sm select xs:max-w-[60px] ">
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
