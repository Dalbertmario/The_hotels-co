import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toggelFromBtn } from './uiStore';
import UseCreateCabin from '../features/cabins/UseCreateCabin';
import UseEditCabin from '../features/cabins/UseEditCabin';

const CabinForm = ({ edit }) => {
  const { mutate: mutateCabin } = UseCreateCabin();
  const { mutate: editCabins } = UseEditCabin();
  const dispatch = useDispatch();
  const EditTrue = Boolean(edit);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: EditTrue ? edit : {},
  });

  function handelform(data) {
    const value = data;
    if (EditTrue) {
      editCabins(value);
      console.log(value);
    } else {
      mutateCabin(value);
    }
  }
  function handelCancel() {
    dispatch(toggelFromBtn());
  }
  return (
    <div
      className={clsx(
        `bg-slate-200 rounded-md ${'xs:max-w-[400px] h-[400px]'} w-[1000px] h-[600px] xs:min-w-[0px] `,
      )}
    >
      <form onSubmit={handleSubmit(handelform)}>
        <div className=" gap-5 m-auto ">
          <div className="flex justify-between p-4">
            <label className="font-semibold text-md ">Cabin price</label>
            <input
              className="outline-focus"
              type="number"
              {...register('price', { required: 'Cabin price is required' })}
            />
          </div>
          <p className="errmsg">{errors?.price?.message}</p>
          <div className="flex justify-between p-4">
            <label className="font-semibold text-md">Discount</label>
            <input
              className="outline-focus"
              type="number"
              {...register('discount')}
            />
          </div>

          <div className="flex justify-between p-4">
            <label className="font-semibold text-md">Description</label>
            <input
              type="textarea"
              className="outline-focus"
              {...register('description', {
                required: 'Cabin description is required',
              })}
            />
          </div>
          <p className="errmsg">{errors?.description?.message}</p>
          <div className="flex justify-between p-4">
            <label className="font-semibold text-md">img</label>
            <input
              type="file"
              {...register(
                'img',
                EditTrue ? '' : { required: 'Image is requiredd' },
              )}
            />
          </div>
          <p className="errmsg">{errors?.img?.message}</p>
          <div className="flex gap-4 p-2">
            <button className="btn">
              {EditTrue ? 'Edit Cabin' : 'Create Cabin'}{' '}
            </button>
            <button onClick={handelCancel} className="btn">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CabinForm;
