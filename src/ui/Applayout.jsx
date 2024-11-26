import React from 'react';
import { Outlet } from 'react-router-dom';
import Aside from './Aside';
import Header from './Header';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

const Applayout = () => {
  const { treeBtn, formBtn } = useSelector((state) => state.uistore);
  return (
    <div className={clsx(`flex flex-row ${formBtn && 'blur fixed'} `)}>
      <div
        className={clsx(
          `${(treeBtn && 'xs:block z-10 transition-all ease-in-out delay-200 ') || 'xs:hidden'} xl:block h-screen`,
        )}
      >
        <Aside />
      </div>
      <div
        className={clsx(
          `${(treeBtn && 'blur-sm xs:fixed') || ''} w-screen h-screen overflow-scroll`,
        )}
      >
        <div>
          <Header />
        </div>
        <div className="p-5 xs:text-sm m-auto bg-slate-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Applayout;
