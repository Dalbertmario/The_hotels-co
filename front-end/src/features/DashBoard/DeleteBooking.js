import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { redirect, useNavigate } from 'react-router-dom';

async function Deletebookings(params) {
  console.log(params);
  try {
    const result = await fetch(`http://3.84.86.239/hotel/bookings/${params}`, {
      method: 'DELETE',
    });
  } catch (err) {
    console.log(err);
  }
}

function UseDeleteBookings() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (val) => Deletebookings(val),
    onSuccess: () => {
      toast.success('Details deleted successfully');
      navigate('/');
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { mutate };
}

export default UseDeleteBookings;
