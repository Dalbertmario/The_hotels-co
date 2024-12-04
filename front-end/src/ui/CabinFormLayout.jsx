import React from 'react';
import CabinForm from './CabinForm';
import { createPortal } from 'react-dom';

const CabinFormLayout = ({edit}) => {
    return createPortal(
        <div
          className="absolute bottom-1

        flex justify-center  overflow-hidden w-screen top-[150px]"
        >
          <div>
            <CabinForm edit={edit}/>
          </div>
        </div>,
        document.body
      );
}

export default CabinFormLayout;
