import React, { useState } from 'react';
import UseAccountDetails from '../features/account/account';
import { useForm } from 'react-hook-form';
import useEdituser from '../features/User/Edituser';
import UseRePassword from '../features/User/UpdatenewPass';
import Updatepassword from '../ui/Updatepassword';

const AccountDetails = () => {
  const { data = [] } = UseAccountDetails();
  const { datamutate, isLoading } = useEdituser();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: data.user.email,
      fullname: data.user.user,
      img: '',
    },
  });
  const photo = watch('img');
  function first(datas, e) {
    const filteredData = Object.fromEntries(
      Object.entries(datas).filter(([_, value]) => value),
    );

    datamutate(filteredData);
  }
  console.log(photo.length);
  console.log(errors);
  return (
    <div className="h-[89vh] flex gap-4 flex-col">
      <h1 className="text-[16px] text-slate-700 font-bold">
        Update your account
      </h1>
      <h1 h1 className="text-[16px] text-slate-700 font-bold">
        update user data
      </h1>
      <div className="bg-white inneraccountForm text-slate-500 font-semibold shadow-1 rounded-md">
        <form
          className="flex flex-col gap-5 p-7"
          onSubmit={handleSubmit(first)}
        >
          <div className="flex justify-between ">
            <label>Email address</label>
            <input
              {...register('email')}
              className="outline outline-2 outline-slate-300 focus:outline-violet-500 p-1 rounded-md"
              type="email"
            />
          </div>
          <div className="flex justify-between">
            <label>Full name</label>
            <input
              {...register('fullname')}
              disabled={true}
              // defaultValue={data?.user?.user}
              type="text"
              className="outline outline-2 outline-slate-300 focus:outline-violet-500 p-1 rounded-md "
            />
          </div>
          <div className="flex justify-between">
            <label>Avatar image</label>
            <div>
              <input
                {...register('img', {
                  register: 'required photo',
                  validate: (val) =>
                    (val.length === 0 && 'Should contain a file') || val,
                })}
                type="file"
              />
              <h1 className="text-red-500 text-semibold">
                {errors?.img?.message}
              </h1>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn">Update account</button>
          </div>
        </form>
      </div>
      <Updatepassword fullname={data.user.user} />
    </div>
  );
};

export default AccountDetails;
