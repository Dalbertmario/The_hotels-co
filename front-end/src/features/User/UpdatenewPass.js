import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const api = import.meta.env.VITE_API_URL;
async function newPasswordSetting(val) {
  const formdata = new FormData();
  formdata.append('fullname', val.fullname);
  formdata.append('password', val.password);
  console.log(val);

  const res = await fetch(`${api}/hotel/newPassword`, {
    method: 'PUT',
    body: formdata,
  });

  if (!res.ok) {
    throw new Error('Failed to update password');
  }
}

function UseRePassword() {
  const { mutate: updatePassword, isLoading } = useMutation({
    mutationFn: (data) => newPasswordSetting(data),
    onSuccess: () => {
      toast.success('Password updated successfully');
    },
    onError: (error) => {
      toast.error(`Error updating password: ${error.message}`);
    },
  });

  return { updatePassword, isLoading };
}

export default UseRePassword;
