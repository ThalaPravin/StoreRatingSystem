import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function StoreList() {
  const [stores, setStores] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [addressFilter, setAddressFilter] = useState('');
  const [err, setErr] = useState('');

  const fetchStores = async () => {
    try {
      const res = await api.get('/stores', { params: { name: nameFilter, address: addressFilter }});
      setStores(res.data);
    } catch (e) {
      setErr('Failed to load stores');
    }
  };

  useEffect(()=>{ fetchStores(); }, []);

  const submitRating = async (storeId, value) => {
    try {
      await api.post('/user/submit-rating', { storeId, rating: parseInt(value,10) });
      await fetchStores();
    } catch (e) {
      setErr('Failed to submit rating');
    }
  };

  return (
    <div>
      <h2>Stores</h2>
      <div>
        <input placeholder="Search name" value={nameFilter} onChange={e=>setNameFilter(e.target.value)} />
        <input placeholder="Search address" value={addressFilter} onChange={e=>setAddressFilter(e.target.value)} />
        <button onClick={fetchStores}>Search</button>
      </div>
      {err && <div style={{ color:'red' }}>{err}</div>}
      <table border="1" cellPadding="6">
        <thead><tr><th>Name</th><th>Address</th><th>Overall Rating</th><th>Your Rating</th><th>Action</th></tr></thead>
        <tbody>
          {stores.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.address}</td>
              <td>{s.averageRating ?? 'N/A'}</td>
              <td>{s.userRating ?? 'Not Rated'}</td>
              <td>
                <select defaultValue={s.userRating ?? ''} onChange={e=>submitRating(s.id, e.target.value)}>
                  <option value="">-- rate --</option>
                  <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option>
                </select>
                <small> (choose to submit/update)</small>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
