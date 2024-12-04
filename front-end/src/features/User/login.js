import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

async function login(params) {
  const fromdata = new FormData();
  fromdata.append('password', params.password);
  fromdata.append('fullname', params.fullname);
  try {
    const res = await fetch('http://localhost:3000/hotel/login', {
      method: 'POST',
      body: fromdata,
    });
    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(errorMessage);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
}
// Example of storing the token and redirecting

function pass() {
  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (data) => login(data),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      window.location.href = '/';
    },
    onError: (err) => {
      console.error(err.message);
      toast.error(err.message);
    },
  });
  return { mutate, isLoading, isError, error };
}

export default pass;
