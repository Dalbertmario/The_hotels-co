import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { GiConsoleController } from 'react-icons/gi';
import { useDispatch } from 'react-redux';
import { toggelFromBtn } from '../../ui/uiStore';

const api = import.meta.env.VITE_API_URL;
async function uploadCabin(params) {
  const formData = new FormData();
  formData.append('img', params.img[0]);
  formData.append('discount', params.discount);
  formData.append('price', params.price);
  formData.append('description', params.description);

  console.log(params.img);
  try {
    const send = await fetch(`${api}/hotel/cabins`, {
      method: 'POST',
      body: formData,
    });

    if (!send.ok) throw new Error('failed to create cabin');
    const data = send.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function UseCreateCabin() {
  const dispatch = useDispatch();
  const querty = useQueryClient();
  const mutate = useMutation({
    mutationFn: (value) => uploadCabin(value),
    onSuccess: () => {
      console.log("Cabin's  fetched");
      toast.success('Cabin uploaded successfully');
      querty.invalidateQueries(['cabins'], { refetchActive: true });
      dispatch(toggelFromBtn());
    },
    onError: () => {
      toast.success("Cabins can't be created ");
    },
  });
  return mutate;
}

export default UseCreateCabin;
