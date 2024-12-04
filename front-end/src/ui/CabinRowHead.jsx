import React from 'react';

const CabinRowHead = () => {
  return (
    <div className="grid grid-cols-[1fr_1fr_2fr_1fr_1fr_0.1fr] ">
      <div className="flex justify-center font-semibold text-md">Cabin ID</div>
      <div className="flex justify-center font-semibold text-md">Image</div>
      <div className="flex justify-center font-semibold text-md">
        Description
      </div>
      <div className="flex justify-center font-semibold text-md">Price</div>
      <div className="flex justify-center font-semibold text-md">Discount</div>
    </div>
  );
};

export default CabinRowHead;
