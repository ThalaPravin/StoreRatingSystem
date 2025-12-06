import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import StoreList from './pages/StoreList';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Header />
      <div style={{ padding: 20 }}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/stores" element={<PrivateRoute><StoreList /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute role="ADMIN"><AdminDashboard /></PrivateRoute>} />
        <Route path="/user" element={<PrivateRoute role="USER"><UserDashboard /></PrivateRoute>} />
        <Route path="/owner" element={<PrivateRoute role="OWNER"><OwnerDashboard /></PrivateRoute>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
