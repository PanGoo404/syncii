import { useState } from 'react';
import { useNavigate } from 'react-router';
import useUserContext from '../hooks/useUserContext';

const Register = () => {
  const [_, setUser] = useUserContext();

  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password || password != passwordConfirm) {
      alert('Passwords do not match!');
      setPassword('');
      setPasswordConfirm('');
      return;
    }
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password, name }),
    });
    if (!res.ok) {
      alert('Something went wrong!');
      setPassword('');
      setPasswordConfirm('');
      setLogin('');
      return;
    }
    const data = await res.json();
    setUser(data);
    navigate('/');
  };

  return (
    <article>
      <h1 className="title">Register</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <input
          onChange={(e) => setLogin(e.target.value)}
          type="text"
          placeholder="Login"
        />
        <input
          onChange={(e) => setPasswordConfirm(e.target.value)}
          type="password"
          placeholder="Confirm Password"
        />
        <button>Register</button>
      </form>
    </article>
  );
};

export default Register;
