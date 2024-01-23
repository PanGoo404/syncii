import { useState } from 'react';
import { useNavigate } from 'react-router';
import useUserContext from '../hooks/useUserContext';

const Login = () => {
  const [_, setUser] = useUserContext();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password }),
    });
    if (!res.ok) {
      alert('Something went wrong!');
      setPassword('');
      setLogin('');
      return;
    }
    const data = await res.json();
    setUser(data);
    navigate('/');
  };

  return (
    <article>
      <h1 className="title">Login</h1>
      <form className="form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Login"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setLogin(e.target.value)}
        />
        <button>Login</button>
      </form>
    </article>
  );
};

export default Login;
