import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/admin/dashboard');
        setStats(res.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {stats ? (
        <div>
          <p>Total Users: {stats.totalUsers}</p>
          <p>Total Stores: {stats.totalStores}</p>
          <p>Total Ratings: {stats.totalRatings}</p>
        </div>
      ) : <p>Loading...</p>}
      <p>Use API to add users and view lists via admin routes.</p>
    </div>
  );
}
