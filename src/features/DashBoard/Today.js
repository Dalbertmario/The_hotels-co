import { useQuery, useQueryClient } from '@tanstack/react-query';

async function Today() {
  try {
    const res = await fetch('http://localhost:3000/hotel/dashboard');
    if (!res.ok) throw new Error('Could not find the dashboard values');
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

function UseToday() {
  const { data: todayData, isLoading: todaydataLoading } = useQuery({
    queryKey: ['today'],
    queryFn: Today,
  });
  return { todayData, todaydataLoading };
}

export default UseToday;
