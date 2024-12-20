import React from 'react';
import { Outlet } from 'react-router-dom';
import Aside from './Aside';
import Header from './Header';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import LoginCred from '../pages/LoginCred';

const Applayout = () => {
  const { treeBtn, formBtn } = useSelector((state) => state.uistore);
  const token = localStorage.getItem('token');

  if (!token) return <LoginCred />;
  return (
    <div className={clsx(`flex flex-row ${formBtn && 'blur fixed'} `)}>
      <div
        className={clsx(
          `${(treeBtn && 'xs:block z-10') || 'xs:hidden'} transition-all xl:block h-screen`,
        )}
      >
        <Aside />
      </div>
      <div
        className={clsx(
          `${treeBtn && 'xs:blur-sm xl:blur-none md:blur-sm md:fixed xs:fixed'} w-screen h-screen overflow-scroll `,
        )}
      >
        <div>
          <Header />
        </div>
        <div className={clsx(` p-5 xs:text-sm m-auto bg-slate-100`)}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Applayout;
