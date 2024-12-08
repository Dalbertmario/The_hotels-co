import { useQueries, useQuery } from '@tanstack/react-query';

async function piedata() {
  try {
    const result = await fetch('http://3.84.86.239/hotel/piechart/dashboard');
    if (!result.ok) throw new Error(result.message);
    const data = await result.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

function UsePieChart() {
  const { data: piedatas, isLoading: piechartLoading } = useQuery({
    queryKey: ['piechart'],
    queryFn: piedata,
  });

  return { piedatas, piechartLoading };
}

export default UsePieChart;
