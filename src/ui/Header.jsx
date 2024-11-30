import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { toggelBtntree } from './uiStore';
import { useDispatch } from 'react-redux';
const Header = () => {
  const dispatch = useDispatch();
  function handelClick() {
    dispatch(toggelBtntree());
  }

  return (
    <div className="flex flex-row justify-between bg-white p-3 flex-1">
      <h1 className="xs:hidden xl:block ">header</h1>
      <h1 className="xl:hidden cursor-pointer" onClick={handelClick}>
        <BsThreeDotsVertical />
      </h1>
      <h1>adadasdasd</h1>
    </div>
  );
};

export default Header;
