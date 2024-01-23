import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useUserContext from '../hooks/useUserContext';

const Logout = () => {
  const [_, setUser] = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogout = async () => {
      await fetch('/api/auth/', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      navigate('/');
    };
    fetchLogout();
    setUser(null);
  }, []);

  return (
    <article>
      <h1 className="title">Logout</h1>
      <p>You have been logged out.</p>
    </article>
  );
};

export default Logout;
