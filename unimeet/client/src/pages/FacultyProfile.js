import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFacultyById, getFacultySlots } from '../services/api';

const FacultyProfile = () => {
  const { id } = useParams();
  const [faculty, setFaculty] = useState(null);
  const [slots,   setSlots]   = useState([]);

  useEffect(() => {
    getFacultyById(id).then(r => setFaculty(r.data)).catch(console.error);
    getFacultySlots(id).then(r => setSlots(r.data)).catch(console.error);
  }, [id]);

  if (!faculty) return <p style={{ padding: '40px', textAlign: 'center' }}>Loading...</p>;

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={styles.profileCard}>
        <div style={styles.avatar}>{faculty.facultyName?.charAt(0).toUpperCase()}</div>
        <div>
          <h2 style={styles.name}>{faculty.facultyName}</h2>
          <p style={styles.info}>🏫 {faculty.department}</p>
          <p style={styles.info}>👤 {faculty.designation}</p>
          <p style={styles.info}>✉️ {faculty.email}</p>
          <Link to={`/book/${faculty._id}`} style={styles.bookBtn}>Book Appointment</Link>
        </div>
      </div>

      <h3 style={{ marginBottom: '16px', marginTop: '32px' }}>Available Time Slots</h3>
      {slots.length === 0 ? (
        <p style={{ color: '#888' }}>No available slots at the moment.</p>
      ) : (
        <div style={styles.slotGrid}>
          {slots.map(s => (
            <div key={s._id} style={styles.slotCard}>
              <p style={{ fontWeight: '700', color: '#1a73e8' }}>📅 {s.date}</p>
              <p style={{ color: '#555', marginTop: '4px' }}>⏰ {s.startTime} – {s.endTime}</p>
              <span style={styles.available}>Available</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  profileCard: {
    display: 'flex', gap: '28px', alignItems: 'center',
    background: '#fff', padding: '30px', borderRadius: '14px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)', flexWrap: 'wrap',
  },
  avatar: {
    width: '90px', height: '90px', borderRadius: '50%',
    background: 'linear-gradient(135deg,#1a73e8,#0d47a1)',
    color: '#fff', fontSize: '40px', fontWeight: '700',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  name:    { fontSize: '24px', fontWeight: '800', marginBottom: '10px' },
  info:    { color: '#555', margin: '4px 0', fontSize: '15px' },
  bookBtn: {
    display: 'inline-block', marginTop: '16px', padding: '10px 24px',
    background: '#1a73e8', color: '#fff', borderRadius: '9px', fontWeight: '700',
  },
  slotGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px',
  },
  slotCard: {
    background: '#fff', padding: '16px', borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
  },
  available: {
    display: 'inline-block', marginTop: '8px', padding: '3px 10px',
    background: '#d1fae5', color: '#065f46', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
  },
};

export default FacultyProfile;
