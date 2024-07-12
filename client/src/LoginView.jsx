import React, { useState } from 'react';
import { fb_auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './index.css'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(fb_auth, email, password);
      alert('Logged in successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='h-screen w-screen'>
      <h2 className='font-bold text-2xl w-full text-center font-inter '>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;

