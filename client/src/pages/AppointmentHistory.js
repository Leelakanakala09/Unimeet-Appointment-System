import React, { useEffect, useState } from 'react';
import { getMyAppointments } from '../services/api';

const statusColor = { Pending: '#f59e0b', Approved: '#10b981', Rejected: '#ef4444', Cancelled: '#9ca3af' };

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyAppointments()
      .then(res => setAppointments(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '36px 40px' }}>
      <h2 style={styles.title}>Appointment History</h2>
      <p style={styles.sub}>All your past and upcoming appointments</p>

      {loading ? (
        <p style={{ color: '#888' }}>Loading...</p>
      ) : appointments.length === 0 ? (
        <p style={{ color: '#888', marginTop: '20px' }}>No appointments found.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr style={{ background: '#1a73e8', color: '#fff' }}>
                {['#', 'Faculty', 'Department', 'Date', 'Time', 'Purpose', 'Status', 'Booked On'].map(h => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {appointments.map((a, i) => (
                <tr key={a._id} style={{ background: i % 2 === 0 ? '#fff' : '#f9fafb' }}>
                  <td style={styles.td}>{i + 1}</td>
                  <td style={styles.td}>{a.facultyId?.facultyName || '—'}</td>
                  <td style={styles.td}>{a.facultyId?.department || '—'}</td>
                  <td style={styles.td}>{a.slotId?.date || '—'}</td>
                  <td style={styles.td}>{a.slotId?.startTime ? `${a.slotId.startTime} – ${a.slotId.endTime}` : '—'}</td>
                  <td style={styles.td}>{a.purpose}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, background: statusColor[a.status] }}>{a.status}</span>
                  </td>
                  <td style={styles.td}>{new Date(a.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  title: { fontSize: '26px', fontWeight: '800', color: '#111', marginBottom: '6px' },
  sub:   { color: '#777', marginBottom: '28px' },
  table: {
    width: '100%', borderCollapse: 'collapse',
    background: '#fff', borderRadius: '14px', overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)', minWidth: '700px',
  },
  th:    { padding: '13px 16px', textAlign: 'left', fontWeight: '600', fontSize: '13px' },
  td:    { padding: '12px 16px', borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#333' },
  badge: { color: '#fff', padding: '3px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' },
};

export default AppointmentHistory;
