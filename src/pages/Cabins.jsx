import React from 'react';
import Cabinrow from '../features/cabins/Cabinrow';
import CabinSortig from '../ui/CabinSorting';
import UseGetCabins from '../features/cabins/UseGetCabin';
import CabinRowHead from '../ui/CabinRowHead';
import { useDispatch, useSelector } from 'react-redux';
import { toggelFromBtn, FormEditData, noDisocunt } from '../ui/uiStore';
import CabinFormLayout from '../ui/CabinFormLayout';
import CabinSorting from '../ui/CabinSorting';

const Cabins = () => {
  const { cabindata = [], isLoadingcabin } = UseGetCabins();
  const {
    formBtn,
    editCabin,
    editFromBtn,
    wDiscount,
    noDiscountbtn,
    allCabin,
    selectingSort,
  } = useSelector((state) => state.uistore);
  console.log(selectingSort);
  //   console.log(wDiscount, noDiscount);
  const dispatch = useDispatch();
  function handleFormClick() {
    dispatch(toggelFromBtn());
    dispatch(FormEditData(''));
  }
  const cabinFil = cabindata.filter((val) => val.discount > 1);
  const cabinNoDis = cabindata.filter((val) => val.discount === 0);
  const cabinlenDis = cabinNoDis.length;
  console.log(cabinlenDis);
  return (
    <div className="flex flex-col gap-5  max-w-[1400px] m-auto">
      <CabinSorting />
      <div>
        <div className="bg-slate-300 p-3 rounded-t-lg">
          <CabinRowHead />
        </div>
        <div className="min-h-[50vh] outline outline-1 outline-slate-300">
          {noDiscountbtn && cabinlenDis === 0 && (
            <h1 className="text-center flex justify-center font-semibold pt-10 text-violet-500">
              There is no cabin available
            </h1>
          )}
          {wDiscount &&
            cabinFil
              .sort((a, b) => {
                if (selectingSort == 'high-price') return b.price - a.price;
                if (selectingSort == 'low-price') return a.price - b.price;
              })
              .map((el) => <Cabinrow cabin={el} key={el.id} />)}

          {noDiscountbtn &&
            cabinNoDis
              .sort((a, b) => {
                if (selectingSort == 'high-price') return b.price - a.price;
                if (selectingSort == 'low-price') return a.price - b.price;
              })
              .map((el) => (
                <Cabinrow cabin={el} key={el.id} len={cabinlenDis} />
              ))}

          {allCabin &&
            cabindata
              .sort((a, b) => {
                if (selectingSort == 'high-price') return b.price - a.price;
                if (selectingSort == 'low-price') return a.price - b.price;
              })
              .map((el) => <Cabinrow cabin={el} key={el.id} />)}
        </div>
      </div>
      {formBtn ? (
        <CabinFormLayout edit={editCabin} />
      ) : (
        <button className="btn" onClick={handleFormClick}>
          Add New Cabin
        </button>
      )}
    </div>
  );
};

export default Cabins;
