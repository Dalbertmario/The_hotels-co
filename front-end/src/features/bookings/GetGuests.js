import { useQuery } from '@tanstack/react-query';

const api = import.meta.env.VITE_API_URL;
async function bookings() {
  try {
    const result = await fetch(`${api}/hotel/guests`);
    if (!result.ok) throw new Error('There is an error in fetching cabin');
    const data = result.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

function UseFetchGuest() {
  const { data: guestFetch, isLoading } = useQuery({
    queryKey: ['guests'],
    queryFn: bookings,
  });
  return { guestFetch };
}

export default UseFetchGuest;
