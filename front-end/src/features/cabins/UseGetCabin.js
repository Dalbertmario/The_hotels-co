import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

async function getCabin() {
  try {
    const result = await fetch('http://3.84.86.239/hotel/cabins');
    if (!result.ok) throw new Error("Couldn't able to fetch cabin");
    const data = await result.json();
    console.log(data);
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
