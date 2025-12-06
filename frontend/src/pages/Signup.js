import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Signup(){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [address,setAddress] = useState('');
  const [password,setPassword] = useState('');
  const [err,setErr] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    // simple client validation
    if (name.length < 20 || name.length > 60) { setErr('Name must be 20-60 chars'); return; }
    if (password.length < 8 || password.length > 16) { setErr('Password length 8-16'); return; }
    try {
      await api.post('/auth/signup', { name, email, address, password });
      navigate('/login');
    } catch (error) {
      setErr(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h2>Signup (Normal User)</h2>
      <form onSubmit={submit}>
        <div><input placeholder="Full name (20-60 chars)" value={name} onChange={e=>setName(e.target.value)} required/></div>
        <div><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
        <div><input placeholder="Address" value={address} onChange={e=>setAddress(e.target.value)} /></div>
        <div><input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></div>
        {err && <div style={{ color:'red' }}>{err}</div>}
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
