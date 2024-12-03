import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { redirect } from 'react-router-dom';

async function Editusers(data) {
  const fromdata = new FormData();
  fromdata.append('img', data.img[0]);
  fromdata.append('fullname', data.fullname);
  fromdata.append('email', data.email);
  fromdata.append('password', data.password);
  try {
    const result = await fetch('http://localhost:3000/hotel/login', {
      method: 'PUT',
      body: fromdata,
    });
    if (!result.ok) throw new Error('Error in edit value of user');
  } catch (err) {
    throw new Error(err.message);
  }
}

function useEdituser() {
  const { mutate: datamutate, isLoading } = useMutation({
    mutationFn: (val) => Editusers(val),
    onSuccess: () => {
      toast.success('Successfully edited user');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { datamutate, isLoading };
}

export default useEdituser;
