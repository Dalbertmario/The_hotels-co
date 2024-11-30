import { useMutation, useQuery } from '@tanstack/react-query';

async function pastdate(val) {
  try {
    const result = await fetch(`http://localhost:3000/hotel/dashboard/${val}`);
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
