import React from 'react';

const BookingHeader = () => {
  return (
    <div>
      <div className="grid grid-cols-[0.1fr_0.5fr_0.3fr_0.4fr_0.3fr_0.1fr] gap-1 rounded-t-md p-2  bg-slate-300 text-md font-semibold text-center ">
        <h1 className="flex justify-center font-semibold text-md">CABIN</h1>
        <h1 className="flex justify-center font-semibold text-md">GUEST</h1>
        <h1 className="flex justify-center font-semibold text-md">DATES</h1>
        <h1 className="flex justify-center font-semibold text-md">STATUS</h1>
        <h1 className="flex justify-center font-semibold text-md">AMOUNT</h1>
      </div>
    </div>
  );
};

export default BookingHeader;
