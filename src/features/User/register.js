import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

async function register(data) {
  const formData = new FormData();
  formData.append('email', data.email);
  formData.append('fullname', data.fullname);
  formData.append('password', data.password);
  formData.append('img', data.img[0]);
  console.log(data);
  const response = await fetch('http://localhost:3000/hotel/register', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to register');
  }

  const result = await response.json();
  console.log('Registration successful:', result);
  return result.detail;
}

function UseRegister() {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => register(data),
    onSuccess: () => {
      toast.success('The credentials have been uploaded successfully');
    },
    onError: (err) => {
      console.error('Registration failed:', err.message);
      toast.error(err.message);
    },
  });

  return { mutate, isLoading };
}

export default UseRegister;
