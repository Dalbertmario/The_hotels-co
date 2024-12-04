import React from 'react';
import { useForm } from 'react-hook-form';
import UseRegister from '../features/User/register';
const UserFrom = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { mutate: formmutate, isLoading } = UseRegister();
  function datas(data) {
    formmutate(data);
  }

  const password = watch('password');
  function handelCancel() {
    reset();
  }
  return (
    <>
      <form className="userform" onSubmit={handleSubmit(datas)}>
        <div className="innerform">
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-slate-600 flex flex-row justify-between p-2">
              <lable>Full name</lable>
              <input
                disabled={isLoading}
                {...register('fullname')}
                className="outline outline-2 outline-slate-200 p-1 rounded-md py-2 focus-outline-3 focus:outline-violet-500"
                type="text"
              />
            </div>
            <div className="font-semibold text-slate-600 flex flex-row justify-between p-2">
              <lable>Email address</lable>
              <input
                disabled={isLoading}
                {...register('email', { required: 'email is required' })}
                className="outline outline-2 outline-slate-200 p-1 rounded-md py-2 focus-outline-3 focus:outline-violet-500"
                type="email"
              />
            </div>
            <div className="font-semibold text-slate-600  flex flex-row justify-between p-2 focus-outline-3 focus:outline-violet-500">
              <lable>Password (min 8 charaters)</lable>
              <div>
                <input
                  disabled={isLoading}
                  {...register('password', {
                    required: 'password is required',
                    validate: (value) =>
                      value.length >= 8 || 'The password should be atleast 8',
                  })}
                  className="outline outline-2 outline-slate-200 p-1 rounded-md py-2 focus-outline-3 focus:outline-violet-500"
                  type="password"
                />
                <h1 className="text-red-400">{errors.password?.message}</h1>
              </div>
            </div>
            <div className="font-semibold text-slate-600  flex flex-row justify-between p-2">
              <lable>Repeat password</lable>
              <div className="flex flex-col justify-center gap-2">
                <input
                  disabled={isLoading}
                  {...register('repeatpass', {
                    validate: (value) =>
                      value === password || 'Password does not match',
                  })}
                  className="outline outline-2 outline-slate-200 p-1 rounded-md py-2 focus-outline-3 focus:outline-violet-500"
                  type="password"
                />
                <h1 className="text-red-400">{errors?.repeatpass?.message}</h1>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-row">
            <button className="btn">Create new user</button>
            <button
              onClick={handelCancel}
              className="outline outline-2 outline-slate-400 font-semibold hover:bg-slate-100 transition-all rounded-md px-4 text-slate-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UserFrom;
