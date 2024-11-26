import React from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { FaAngleDoubleLeft } from 'react-icons/fa';
const BookingFooter = ({ left, right, bookLen = [], leftval, rightval }) => {
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
        <h1>
          {leftval + 1} to {rightval} showing Total {bookLen.length}
        </h1>
      </div>
    </div>
  );
};

export default BookingFooter;
