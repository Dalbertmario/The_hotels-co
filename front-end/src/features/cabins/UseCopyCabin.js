import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

async function copyCabin(params) {
  const formdata = new FormData();
  formdata.append('img', params.img);
  formdata.append('discount', params.discount);
  formdata.append('price', params.price);
  formdata.append('description', params.description);
  console.log(params);
  try {
    const result = await fetch(`http://3.84.86.239/hotel/cabins`, {
      method: 'POST',
      body: formdata,
    });
    if (!result.ok) throw new Error('Failed to copy cabin');
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

function UseCopyCabin() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: (val) => copyCabin(val),
    onSuccess: () => {
      queryClient.invalidateQueries(['cabins'], {
        refetchActive: true,
        refetchInactive: true,
      });
      toast.success('Cabin copied successfully');
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to copy cabin');
      console.log(err.message);
    },
  });

  return mutate; // Ensure the mutation object is returned
}

export default UseCopyCabin;
