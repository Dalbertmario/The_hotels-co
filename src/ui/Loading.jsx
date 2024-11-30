import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
const Loading = ({ size }) => {
  return (
    <div className="flex justify-center ">
      <div className="text-violet-500 animate-spin m-[10px]">
        <AiOutlineLoading size={size ? size : 40} />
      </div>
    </div>
  );
};

export default Loading;
