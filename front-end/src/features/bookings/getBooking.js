import { useQuery } from '@tanstack/react-query';

const api = import.meta.env.VITE_API_URL;
async function getBooking(params) {
  try {
    const result = await fetch(`${api}/hotel/bookings`);
    if (!result.ok) throw new Error('Cloud not fetch bookings');
    const data = await result.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

function UseGetBooking() {
  const { data: bookingdata, isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBooking,
  });
  return { bookingdata, isLoading };
}

export default UseGetBooking;
