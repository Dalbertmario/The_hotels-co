import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { toggelBtntree } from './uiStore';
import { useDispatch } from 'react-redux';
import { IoIosLogOut } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { Navigate, NavLink } from 'react-router-dom';
import UseAccountDetails from '../features/account/account';
const Header = () => {
  const dispatch = useDispatch();
  const { data } = UseAccountDetails();
  function handelClick() {
    dispatch(toggelBtntree());
  }
  function handelLogout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return (
    <div className="flex flex-row justify-between bg-white p-3 flex-1">
      <h1 className="xl:hidden cursor-pointer" onClick={handelClick}>
        <BsThreeDotsVertical />
      </h1>
      <h1 className="text-violet-700 flex gap-6 items-center">
        <h1 className="font-semibold">{data?.user?.user}</h1>
        <NavLink to="/account">
          <button className="hover:bg-slate-200 transition-all p-2 rounded-md">
            <CgProfile size={25} />
          </button>
        </NavLink>
        <button
          className="hover:bg-slate-200 transition-all p-2 rounded-md"
          onClick={handelLogout}
        >
          <IoIosLogOut size={25} />
        </button>
      </h1>
    </div>
  );
};

export default Header;
