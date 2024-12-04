import { useQueries, useQuery } from '@tanstack/react-query';

async function newPasswordSetting() {
  try {
    const res = await fetch('http://localhost:3000/hotel/newPassword', {
      method: 'PUT',
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

function UseRePassword(val) {
  const query = useQuery({
    queryKey: ['resetpassword', val],
    queryFn: () => newPasswordSetting(val),
  });
  return query;
}

export default UseRePassword;
