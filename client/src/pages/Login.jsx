import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="p-4">
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} className="border p-2 mb-2 block" />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="border p-2 mb-2 block" />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2">Login</button>
    </div>
  );
}
