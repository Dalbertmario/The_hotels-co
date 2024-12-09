import { useMutation, useQueryClient } from '@tanstack/react-query';
const api = import.meta.env.VITE_API_URL;
async function checkIn(params) {
  console.log(params);
  try {
    const response = await fetch(`${api}/bookings/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json(); // Assuming the response is JSON
    return result; // Return the result for further processing
  } catch (error) {
    console.error('Check-in failed:', error); // Log the error for debugging
    throw error; // Rethrow the error to be caught in the mutation
  }
}

function UseCheckIn() {
  const query = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (val) => checkIn(val),
    onSuccess: () => {
      query.invalidateQueries(['bookings']);
      // query.invalidateQueries(['guests']);
      // window.location.reload();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return { mutate };
}

export default UseCheckIn;
