import { useQuery } from '@tanstack/react-query';

async function getBooking(params) {
  try {
    const result = await fetch('http://localhost:3000/hotel/bookings');
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
  return { bookingdata };
}

export default UseGetBooking;
