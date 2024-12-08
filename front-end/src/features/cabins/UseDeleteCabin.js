import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useMatch } from 'react-router-dom';
import { toggelFromBtn } from '../../ui/uiStore';

async function DeleteCabin(params) {
  console.log(params);
  try {
    const result = await fetch(`http://3.84.86.239/hotel/cabins/${params}`, {
      method: 'DELETE',
    });
    if (!result.ok) throw new Error('Could not Delete Cabin');
  } catch (error) {
    throw new Error(
      "Cabin can't be deleted because the cabin is attached to the booking",
    );
  }
}

function UseDeleteCabin() {
  const client = useQueryClient();
  const mutate = useMutation({
    mutationFn: (value) => DeleteCabin(value),
    onSuccess: () => {
      toast.success('Cabin deleted Successfully');
      client.invalidateQueries(['cabins'], {
        refetchAcitve: true,
      });
    },
    onError: () => {
      toast.error(
        "Cabin can't be deleted because the cabin is attached to the booking",
      );
    },
  });
  return mutate;
}
export default UseDeleteCabin;
