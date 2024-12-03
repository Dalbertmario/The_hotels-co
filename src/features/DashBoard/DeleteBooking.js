import { useMutation } from '@tanstack/react-query';
import { redirect } from 'react-router-dom';

async function Deletebookings(params) {
  console.log(params);
  try {
    const result = await fetch(
      `http://localhost:3000/hotel/bookings/${params}`,
      {
        method: 'DELETE',
      },
    );
  } catch (err) {
    console.log(err);
  }
}

function UseDeleteBookings() {
  const { mutate } = useMutation({
    mutationFn: (val) => Deletebookings(val),
    onSuccess: () => {
      redirect('/');
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { mutate };
}

export default UseDeleteBookings;
