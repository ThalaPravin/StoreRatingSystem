import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function OwnerDashboard() {
  const [data, setData] = useState([]);
  useEffect(()=> {
    (async () => {
      try {
        const res = await api.get('/stores/owner/ratings');
        setData(res.data);
      } catch (err) { console.error(err); }
    })();
  }, []);
  return (
    <div>
      <h2>Owner Dashboard</h2>
      {data.map(s => (
        <div key={s.storeId}>
          <h3>{s.storeName} — Average: {s.averageRating ?? 'N/A'}</h3>
          <ul>
            {s.ratings.map(r => <li key={r.userId}>{r.userName} ({r.userEmail}): {r.rating}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
