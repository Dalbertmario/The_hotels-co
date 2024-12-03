import React from 'react';
import UseAccountDetails from '../features/account/account';
import { useForm } from 'react-hook-form';
import useEdituser from '../features/User/Edituser';

const AccountDetails = () => {
  const { data } = UseAccountDetails();
  const { datamutate } = useEdituser();
  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      email: data?.user?.email,
      fullname: data?.user?.user,
    },
  });
  function first(data) {
    console.log(data);
    datamutate(data);
  }
  function second(data) {
    datamutate(data);
  }
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
              defaultValue={data?.user?.user}
              type="email"
              className="outline outline-2 outline-slate-300 focus:outline-violet-500 p-1 rounded-md "
            />
          </div>
          <div className="flex justify-between">
            <label>Avatar image</label>
            <input {...register('img')} type="file" />
          </div>

          <div className="flex flex-row gap-3">
            <button className="outline outline-2 hover:bg-slate-200 text-slate-600 font-semibold hover:text-slate-700 outline-slate-300 p-2 rounded-md">
              Cancel
            </button>
            <button className="btn">Update account</button>
          </div>
        </form>
      </div>
      <h1 h1 className="text-[16px] text-slate-700 font-bold ">
        Update password
      </h1>
      <form
        onSubmit={handleSubmit(second)}
        className="bg-white flex flex-col gap-7 text-slate-500 font-semibold inneraccountForm p-7  shadow-1 rounded-md"
      >
        <div className="flex  justify-between">
          <label>New Password</label>
          <input
            {...register('password')}
            type="text"
            className="outline outline-2 outline-slate-300 focus:outline-violet-500 p-1 rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <label>Confirm password</label>
          <input
            type="text"
            className="outline outline-2 outline-slate-300 focus:outline-violet-500 p-1 rounded-md"
          />
        </div>
        <div className="flex gap-3">
          <button className="outline outline-2 hover:bg-slate-200 text-slate-600 font-semibold hover:text-slate-700 outline-slate-300 p-2 rounded-md">
            Cancel
          </button>
          <button className="btn">Update password</button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;
