import { useQuery } from '@tanstack/react-query';

const api = import.meta.env.VITE_API_URL;
async function fetchingAccountDetails() {
  const token = localStorage.getItem('token');

  try {
    const result = await fetch(`${api}/hotel/protected`, {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
      },
    });
    if (!result.ok) throw new Error(result);
    const data = await result.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

function UseAccountDetails() {
  const { data, isLoading } = useQuery({
    queryKey: ['account'],
    queryFn: fetchingAccountDetails,
  });
  return { data, isLoading };
}

export default UseAccountDetails;
