import React, { useEffect, useRef } from 'react';
import { FiAlignJustify } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toggelBtntree } from './uiStore';
import clsx from 'clsx';
import { RiHome4Line } from 'react-icons/ri';
import { isAction } from '@reduxjs/toolkit';
import { PiBookOpenText } from 'react-icons/pi';
import { MdOutlineCabin } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';
import { FaUsers } from 'react-icons/fa';
const Aside = () => {
  const dispatch = useDispatch();
  const ref = useRef();
  const { treeBtn } = useSelector((state) => state.uistore);
  function handelAsideClick() {
    if (treeBtn) {
      dispatch(toggelBtntree());
    }
  }
  return (
    <aside className="aside">
      <button onClick={handelAsideClick} className="xl:hidden 2xl:hidden">
        <FiAlignJustify />
      </button>
      <div className="font-semibold text-slate-500 text-xl">D&M.co Hotel</div>
      <div className="flex flex-col gap-3 justify-center">
        <NavLink
          className={({ isActive }) =>
            isActive ? 'Activetrue' : 'Activefalse'
          }
          to="/"
          onClick={handelAsideClick}
        >
          <span className="flex justify-center gap-2 p-2 hover:text-violet-600">
            <RiHome4Line size={20} />
            <h1>Home</h1>
          </span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'Activetrue' : 'Activefalse'
          }
          to="/bookings"
          onClick={handelAsideClick}
        >
          <span className="flex justify-center gap-2 p-2 hover:text-violet-600">
            <PiBookOpenText size={20} />
            <h1>Bookings</h1>
          </span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'Activetrue' : 'Activefalse'
          }
          to="/cabins"
          onClick={handelAsideClick}
        >
          <span className="flex justify-center gap-4 p-2 hover:text-violet-600 ">
            <MdOutlineCabin size={20} />
            <h1>Cabins</h1>
          </span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? 'Activetrue' : 'Activefalse'
          }
          to="/users"
          onClick={handelAsideClick}
        >
          <span className="flex justify-center gap-2 p-2 hover:text-violet-600 ">
            <FaUsers size={20} />
            <h1>Users</h1>
          </span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Aside;
