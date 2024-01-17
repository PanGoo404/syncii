import { useState } from 'react';
import { useNavigate } from 'react-router';
import useUserContext from '../hooks/useUserContext';

const Register = () => {
  const [_, setUser] = useUserContext();

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
    const res = await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password }),
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
    <div>
      <h1 className="title">Register</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input type="password" placeholder="Password" />
        <input type="text" placeholder="Login" />
        <input type="password" placeholder="Confirm Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
