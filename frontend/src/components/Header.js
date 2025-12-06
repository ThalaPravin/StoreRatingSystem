import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header(){
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{ padding: 10, background: '#eee', display:'flex', justifyContent:'space-between' }}>
      <div>
        <Link to="/stores">Stores</Link> {' | '}
        { token ? <a onClick={logout} style={{ cursor:'pointer' }}>Logout</a> : <><Link to="/login">Login</Link> | <Link to="/signup">Signup</Link></>}
      </div>
      <div>
        {user ? <span>{user.name} ({user.role})</span> : null}
      </div>
    </div>
  );
}
