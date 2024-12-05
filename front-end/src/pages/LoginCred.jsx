import React from 'react';
import { useForm } from 'react-hook-form';
import pass from '../features/User/login';

const LoginCred = () => {
  const { register, reset, handleSubmit } = useForm();
  const { mutate: loginMutate, isLoading, isError, error } = pass();
  function forming(data) {
    console.log(data);
    loginMutate(data);
  }

  console.log(isLoading);
  const errorhandeling = { error: error };
  console.log(errorhandeling);
  return (
    <div className="bg-slate-100 h-screen flex flex-row ">
      <div className="flex flex-col gap-10 m-auto rounded-md p-2 text-slate-500 font-semibold bg-slate-200 login">
        <div className="flex justify-center text-md">
          <h1>D&M.Co hotels</h1>
        </div>
        <form
          onSubmit={handleSubmit(forming)}
          className="flex flex-col gap-5 justify-between"
        >
          <div className="flex justify-between gap-10">
            <label>Username</label>
            <input
              {...register('fullname')}
              type="text"
              className="outline-focus"
              defaultValue={'dalbertmario'}
            />
          </div>
          {/* <p>{error}</p> */}
          <div className="flex focus:outline-2 focus:outline-violet-200 justify-between">
            <label>Password</label>
            <input
              {...register('password')}
              type="password"
              className="outline-focus"
              defaultValue={1234567890}
            />
          </div>
          <div className="flex justify-center">
            <button className="btn w-[200px]">Sign In</button>
          </div>
        </form>
        <p>{isError}</p>
      </div>
    </div>
  );
};

export default LoginCred;
