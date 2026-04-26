import React from 'react';
import { Link } from 'react-router-dom';

const FacultyCard = ({ faculty }) => {
  return (
    <div style={styles.card}>
      <div style={styles.avatar}>{faculty.facultyName?.charAt(0).toUpperCase()}</div>
      <h3 style={styles.name}>{faculty.facultyName}</h3>
      <p style={styles.dept}>🏫 {faculty.department}</p>
      <p style={styles.desig}>👤 {faculty.designation}</p>
      <p style={styles.email}>✉️ {faculty.email}</p>
      <div style={styles.btnRow}>
        <Link to={`/faculty/${faculty._id}`} style={styles.viewBtn}>View Profile</Link>
        <Link to={`/book/${faculty._id}`}    style={styles.bookBtn}>Book Now</Link>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: '#fff',
    padding: '28px 24px',
    borderRadius: '14px',
    boxShadow: '0 2px 14px rgba(0,0,0,0.08)',
    textAlign: 'center',
    transition: 'transform 0.2s',
  },
  avatar: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg,#1a73e8,#0d47a1)',
    color: '#fff',
    fontSize: '28px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 14px',
  },
  name:  { fontSize: '17px', fontWeight: '700', marginBottom: '8px', color: '#222' },
  dept:  { color: '#555', margin: '4px 0', fontSize: '14px' },
  desig: { color: '#777', margin: '4px 0', fontSize: '13px' },
  email: { color: '#999', margin: '4px 0', fontSize: '12px' },
  btnRow: { display: 'flex', gap: '10px', marginTop: '18px', justifyContent: 'center' },
  viewBtn: {
    padding: '8px 16px',
    border: '2px solid #1a73e8',
    color: '#1a73e8',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '13px',
  },
  bookBtn: {
    padding: '8px 16px',
    background: '#1a73e8',
    color: '#fff',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '13px',
  },
};

export default FacultyCard;
