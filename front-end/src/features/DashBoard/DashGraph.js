import { useQuery } from '@tanstack/react-query';

const api = import.meta.env.VITE_API_URL;
async function DispGraph() {
  try {
    const result = await fetch(`${api}/hotel/graph/dashboard`);
    if (!result.ok) throw new Error('The value could not be found');
    const data = await result.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

function UseGraph() {
  const { data: graphdata, isLoading: graphloading } = useQuery({
    queryKey: ['graph'],
    queryFn: DispGraph,
  });
  return { graphdata, graphloading };
}

export default UseGraph;
