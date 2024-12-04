import React from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { useSelector } from 'react-redux';
const BookingFooter = ({
  left,
  right,
  bookLen = [],
  leftval,
  rightval,
  bookunconfirmed,
  bookcheckIn,
  bookcheckedOut,
  bookguestAll,
}) => {
  const { guestAll, checkedOut, checkIn, unconfirmed } = useSelector(
    (state) => state.uistore,
  );
  function handelRight() {
    if (rightval < bookLen.length) {
      left((el) => el + 10);
      right((el) => el + 10);
    }
  }
  function handelLeft() {
    left((el) => (el > 0 ? el - 10 : 0));
    right((el) => (el > 10 ? el - 10 : 10));
  }
  return (
    guestAll && (
      <div className="flex justify-between p-4">
        <div className="flex gap-4">
          <button
            onClick={handelLeft}
            className="hover:text-violet-500 transition-all hover:translate-x-2"
          >
            <FaAngleDoubleLeft />
          </button>
          <button
            onClick={handelRight}
            className="hover:text-violet-500 transition-all hover:translate-x-2"
          >
            <FaAngleDoubleRight />
          </button>
        </div>
        <div>
          <h1 className="flex gap-2">
            {leftval + 1} to {rightval}
            <span>showing Total {guestAll && bookLen.length}</span>
          </h1>
        </div>
      </div>
    )
  );
};

export default BookingFooter;
