import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { decodeToken } from '../jwt_utils'; // You need to define your own `decodeToken` function

function useRole() {
  const router = useRouter();
  const [userRole, setUserRole] = useState(null); // State to hold the user's role

  useEffect(() => {
    if (!router.isReady) return;

    const token = localStorage.getItem('token');

    if (token) {
      const decoded = decodeToken(token);
      const role = decoded.user.role;

      setUserRole(role); // Set the user's role in the state
    }
  }, [router.isReady]);

  return userRole; // Return the user's role
}

export default useRole;
