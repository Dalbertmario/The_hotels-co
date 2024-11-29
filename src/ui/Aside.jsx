import React, { useEffect, useRef } from 'react';
import { FiAlignJustify } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toggelBtntree } from './uiStore';
import clsx from 'clsx';
import { isAction } from '@reduxjs/toolkit';
const Aside = () => {
  const dispatch = useDispatch();
  const ref = useRef();
  const { treeBtn } = useSelector((state) => state.uistore);

  function handelClick() {
    dispatch(toggelBtntree());
  }
  function handelAsideClick() {
    dispatch(toggelBtntree());
  }
  return (
    <aside className="flex flex-col bg-white h-screen gap-10 w-[200px] p-5">
      <button onClick={handelClick} className="xl:hidden 2xl:hidden">
        <FiAlignJustify />
      </button>
      <div>logo</div>
      <div className="flex flex-col gap-3">
        <NavLink
          className={({ isActive }) =>
            isActive ? 'Activetrue' : 'Activefalse'
          }
          to="/"
          onClick={handelAsideClick}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'Activetrue' : 'Activefalse'
          }
          to="/bookings"
          onClick={handelAsideClick}
        >
          Bookings
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'Activetrue' : 'Activefalse'
          }
          to="/cabins"
          onClick={handelAsideClick}
        >
          Cabins
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'Activetrue' : 'Activefalse'
          }
          to="/setting"
          onClick={handelAsideClick}
        >
          Settings
        </NavLink>
      </div>
    </aside>
  );
};

export default Aside;
