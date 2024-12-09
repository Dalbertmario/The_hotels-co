import { useMutation, useQuery } from '@tanstack/react-query';

const api = import.meta.env.VITE_API_URL;
async function pastdate(val) {
  try {
    const result = await fetch(`${api}/hotel/dashboard/${val}`);
    if (!result.ok) throw new Error(`Could not fetch the dates`);
    const dat = await result.json();
    return dat;
  } catch (err) {
    console.log(err);
  }
}

function useDatefunction(val) {
  const { data, isLoading: pastdataloading } = useQuery({
    queryKey: ['dashdata', val],
    queryFn: () => pastdate(val),
    enabled: !!val,
  });
  return { data, pastdataloading };
}
export default useDatefunction;
