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
    watch,
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
  const price = watch('price');
  console.log(price);
  console.log(errors);
  return (
    <div className={clsx(`formms`)}>
      <form onSubmit={handleSubmit(handelform)}>
        <div className=" gap-5 m-auto ">
          <div className="flex justify-between p-5">
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
            <div className="flex flex-col gap-2">
              <input
                className="outline-focus"
                type="number"
                {...register('discount', {
                  validate: (value) =>
                    value < price ||
                    'The discount should be less then the price value',
                })}
              />
              <h1 className="errmsg text-xs">{errors?.discount?.message}</h1>
            </div>
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
          <p className="errmsg text-xs">{errors?.img?.message}</p>
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
