import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import UseCopyCabin from './UseCopyCabin';
import UseDeleteCabin from './UseDeleteCabin';
import { useDispatch } from 'react-redux';
import { EditBtn, FormEditData, toggelFromBtn } from '../../ui/uiStore';
import Moneyformate from '../../helper/Moneyformate';
import { MdOutlineContentCopy } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';

const Cabinrow = ({ cabin, len }) => {
  const { mutate: Copycabin } = UseCopyCabin();
  const { mutate: DeleteCabin } = UseDeleteCabin();
  const { id, img, description, price, discount } = cabin;
  const [position, setPosition] = useState({});
  const btnref = useRef(null);
  const [treeBtn, setClick] = useState(false);
  const dispatch = useDispatch();
  function handelTreeClick(e) {
    const rect = e.target.getBoundingClientRect();
    console.log(rect);
    setPosition({
      x: window.innerWidth - rect.width - rect.x + 20,
      y: rect.y - rect.height + 2,
    });
    setClick((e) => (e = !e));
  }
  function handelRefBtn(e) {
    if (btnref.current && !btnref.current.contains(e.target)) {
      setClick((e) => (e = !e));
    }
  }

  function handelCopy() {
    Copycabin({
      id: id,
      img: img,
      description: description,
      price: price,
      discount: discount,
    });
  }
  function handelDelete() {
    DeleteCabin(id);
  }
  function handelEdit() {
    dispatch(
      FormEditData({
        Editid: id,
        discount: discount,
        price: price,
        description: description,
        img: img,
      }),
    );
    dispatch(toggelFromBtn());
  }

  useEffect(
    function () {
      if (treeBtn) {
        document.addEventListener('click', handelRefBtn);
      } else {
        document.removeEventListener('click', handelRefBtn);
      }
      return () => document.removeEventListener('click', handelRefBtn);
    },
    [treeBtn],
  );

  return (
    <>
      <div className="grid grid-cols-[1fr_1fr_2fr_1fr_1fr_0.1fr] items-center py-2 border border-slate-200 gap-2 bg-white ">
        {!img && !description && !price && !discount && !id && (
          <h1>There no cabins available</h1>
        )}
        <div className="flex justify-center">
          <h1>{id}</h1>
        </div>
        <div className="flex justify-center max-w-[200px] min-w-[70px] m-auto ">
          <img
            src={img}
            className="rounded-md box-shadow-md min-h-[50px] max-h-[100px] 
            "
          />
        </div>
        <div className="flex justify-center text-center  max-w-[200px] m-auto xs:text-xs">
          <h1>{description}</h1>
        </div>
        <div className="flex justify-center">
          <h1 className="text-xs">{Moneyformate(price)}</h1>
        </div>
        <div className="flex justify-center">
          <h1 className="text-green-500 font-semibold text-xs">
            {(discount === 0 && (
              <h1 className="text-green-600 text-xs">---</h1>
            )) ||
              Moneyformate(discount)}
          </h1>
        </div>

        <button
          ref={btnref}
          className={clsx(
            `p-1 rounded-md font-semibold ${treeBtn && 'outline outline-2 outline-violet-500'}`,
          )}
          onClick={handelTreeClick}
        >
          ...
        </button>
      </div>
      {treeBtn && (
        <div
          style={{
            position: 'fixed',
            right: `${position.x}px`,
            top: `${position.y}px`,
          }}
          className={clsx(
            `fixed flex flex-col bg-slate-300 rounded-md transition-all`,
          )}
        >
          <button
            className="hover:bg-slate-400 p-2 rounded-md font-medium"
            onClick={handelCopy}
          >
            <span className="flex items-center gap-1">
              <MdOutlineContentCopy size={20} />

              <h1>Copy</h1>
            </span>
          </button>
          <button
            className="hover:bg-slate-400 p-2 font-medium"
            onClick={handelDelete}
          >
            <span className="flex items-center gap-1">
              <MdDeleteOutline size={20} /> <h1>Delete</h1>{' '}
            </span>
          </button>
          <button
            className="hover:bg-slate-400 p-2 rounded-md font-medium"
            onClick={handelEdit}
          >
            <span className="flex items-center gap-1">
              <CiEdit size={20} /> <h1> Edit</h1>
            </span>
          </button>
        </div>
      )}
    </>
  );
};

export default Cabinrow;
