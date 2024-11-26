import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allcabindata, noDisocunt, selecting, WithDisount } from './uiStore';
import clsx from 'clsx';

const CabinSorting = () => {
  const dispatch = useDispatch();
  const { wDiscount, noDiscountbtn, allCabin } = useSelector(
    (state) => state.uistore,
  );
  function handelWithDiscount() {
    dispatch(WithDisount());
  }
  function handelNoDiscount() {
    dispatch(noDisocunt());
  }
  function handelAllcabin() {
    dispatch(allcabindata());
  }
  function seletingCabinSort(val) {
    dispatch(selecting(val));
  }
  return (
    <div className="flex flex-row justify-between content-center gap-1 items-center">
      <h1 className="font-semibold text-xl">All Cabins</h1>
      <div className="flex flex-row gap-2 items-center">
        <div className="flex bg-slate-300  flex-row rounded-md gap-2 xs:text-xs">
          <button
            className={clsx(`${allCabin && 'cursor-not-allowed'} sorting`)}
            onClick={handelAllcabin}
          >
            All
          </button>
          <button
            className={clsx(`${wDiscount && 'cursor-not-allowed'} sorting`)}
            onClick={handelWithDiscount}
          >
            With Discount
          </button>
          <button
            className={clsx(`${noDiscountbtn && 'cursor-not-allowed'} sorting`)}
            onClick={handelNoDiscount}
          >
            No Discount
          </button>
        </div>
        <div>
          <select
            className="rounded-md xs:text-sm select"
            onChange={(e) => seletingCabinSort(e.target.value)}
          >
            <option value="high-price">Sort by high price</option>
            <option value="low-price">Sort By Low price</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CabinSorting;
