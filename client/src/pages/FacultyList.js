import React, { useEffect, useState } from 'react';
import { getAllFaculty } from '../services/api';
import FacultyCard from '../components/FacultyCard';

const FacultyList = () => {
  const [faculty, setFaculty]   = useState([]);
  const [search, setSearch]     = useState('');
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    getAllFaculty()
      .then(res => setFaculty(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = faculty.filter(f =>
    f.facultyName?.toLowerCase().includes(search.toLowerCase()) ||
    f.department?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '36px 40px' }}>
      <h2 style={styles.heading}>Our Faculty Members</h2>
      <p style={styles.sub}>Search and book appointments with your faculty</p>

      <input
        style={styles.search}
        type="text"
        placeholder="🔍  Search by name or department..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {loading ? (
        <p style={{ textAlign: 'center', color: '#888', marginTop: '40px' }}>Loading faculty...</p>
      ) : filtered.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888', marginTop: '40px' }}>No faculty found.</p>
      ) : (
        <div style={styles.grid}>
          {filtered.map(f => <FacultyCard key={f._id} faculty={f} />)}
        </div>
      )}
    </div>
  );
};

const styles = {
  heading: { fontSize: '28px', fontWeight: '800', color: '#111', marginBottom: '6px' },
  sub:     { color: '#777', marginBottom: '24px', fontSize: '15px' },
  search:  {
    width: '100%', maxWidth: '480px', padding: '12px 18px',
    border: '1.5px solid #ddd', borderRadius: '10px', fontSize: '15px',
    marginBottom: '32px', display: 'block',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '24px',
  },
};

export default FacultyList;
