import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const api = import.meta.env.VITE_API_URL;
async function getCabin() {
  try {
    const result = await fetch(`${api}/hotel/cabins`);
    if (!result.ok) throw new Error("Couldn't able to fetch cabin");
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function UseGetCabins() {
  const { data: cabindata, isLoading: isLoadingcabin } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabin,
  });
  return { cabindata, isLoadingcabin };
}
export default UseGetCabins;
