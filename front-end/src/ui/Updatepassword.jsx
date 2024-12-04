import React from 'react';
import { useForm } from 'react-hook-form';

const Updatepassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch('password');
  function passs(data) {
    console.log(data);
  }
  return (
    <form
      onSubmit={handleSubmit(passs)}
      className="bg-white flex flex-col gap-5 p-5 inneraccountForm text-slate-500 font-semibold shadow-1 rounded-md"
    >
      <div className="flex justify-between">
        <label>New Password</label>
        <div>
          <input
            {...register('password', {
              required: 'password required',
              validate: (val) =>
                val.length < 7 || 'The password len should be greater then 8',
            })}
            type="text"
            className="outline outline-2 outline-slate-300 focus:outline-violet-500 p-1 rounded-md"
          />
          <h1 className="text-red-500 font-semibold">
            {errors?.password?.message}
          </h1>
        </div>
      </div>

      <div className="flex  justify-between">
        <label>Confirm password</label>
        <div>
          <input
            {...register('repassword', {
              required: 'required re-password',
              validate: (val) =>
                val === password || 'password should be same as new password',
            })}
            type="text"
            className="outline outline-2 outline-slate-300 focus:outline-violet-500 p-1 rounded-md"
          />
          <h1 className="font-semibold text-red-500">
            {errors?.repassword?.message}
          </h1>
        </div>
      </div>

      <div className="flex flex-row gap-3">
        <button className="btn">Update account</button>
      </div>
    </form>
  );
};

export default Updatepassword;
