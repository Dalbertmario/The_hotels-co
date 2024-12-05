import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { redirect } from 'react-router-dom';

async function Editusers(data) {
  const formdata = new FormData();
  console.log(data);
  if (data.img && data.img[0]) {
    console.log(data.img[0]);
    formdata.append('img', data.img[0]);
  } else {
    console.log(data.img);
    formdata.append('img', data.img);
  }
  formdata.append('fullname', data.fullname);

  try {
    const result = await fetch('http://localhost:3000/hotel/fileupload', {
      method: 'PUT',
      body: formdata,
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
