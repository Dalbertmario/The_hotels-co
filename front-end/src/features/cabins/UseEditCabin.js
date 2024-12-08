import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { toggelFromBtn } from '../../ui/uiStore';

async function editCabin(params) {
  const formData = new FormData();
  const id = params.Editid;

  console.log('Cabin ID:', id);

  if (params.img) {
    const image = params.img.startsWith('http') ? params.img : params.img[0];
    formData.append('img', image);
  } else {
    console.log('Image is missing!');
  }

  formData.append('description', params.description);
  formData.append('discount', params.discount);
  formData.append('price', params.price);

  console.log('FormData Entries:');
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    const res = await fetch(`http://3.84.86.239/hotel/cabins/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(errorMessage || "The Cabin can't be updated");
    }

    const data = await res.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

function UseEditCabin() {
  const dispatch = useDispatch();
  const query = useQueryClient();
  const mutate = useMutation({
    mutationFn: (val) => editCabin(val),
    onSuccess: () => {
      dispatch(toggelFromBtn());
      toast.success('Cabin edited successfully');
      query.invalidateQueries(['cabins'], { refetchActive: true });
    },
    onError: () => {
      toast.error("Cabin can't be uploaded");
    },
  });
  return mutate;
}

export default UseEditCabin;
