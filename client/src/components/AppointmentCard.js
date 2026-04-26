import React from 'react';

const statusColors = {
  Pending:   '#f59e0b',
  Approved:  '#10b981',
  Rejected:  '#ef4444',
  Cancelled: '#9ca3af',
};

const AppointmentCard = ({ appointment, onCancel, showActions = false, onApprove, onReject }) => {
  const { facultyId, studentId, slotId, purpose, status, _id } = appointment;

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          {facultyId && <h4 style={styles.title}>{facultyId.facultyName}</h4>}
          {studentId && <h4 style={styles.title}>{studentId.name} <span style={styles.email}>({studentId.email})</span></h4>}
          <p style={styles.sub}>📅 {slotId?.date} &nbsp;|&nbsp; ⏰ {slotId?.startTime} – {slotId?.endTime}</p>
          <p style={styles.purpose}>📝 {purpose}</p>
        </div>
        <span style={{ ...styles.badge, background: statusColors[status] }}>{status}</span>
      </div>

      <div style={styles.actions}>
        {showActions && status === 'Pending' && (
          <>
            <button onClick={() => onApprove(_id)} style={{ ...styles.btn, background: '#10b981' }}>✅ Approve</button>
            <button onClick={() => onReject(_id)}  style={{ ...styles.btn, background: '#ef4444' }}>❌ Reject</button>
          </>
        )}
        {onCancel && (status === 'Pending' || status === 'Approved') && (
          <button onClick={() => onCancel(_id)} style={{ ...styles.btn, background: '#9ca3af' }}>🚫 Cancel</button>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: '#fff',
    padding: '20px 24px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
    marginBottom: '14px',
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' },
  title:  { fontSize: '16px', fontWeight: '700', color: '#222', marginBottom: '4px' },
  email:  { fontSize: '13px', color: '#777', fontWeight: '400' },
  sub:    { color: '#666', fontSize: '13px', margin: '4px 0' },
  purpose:{ color: '#444', fontSize: '14px', marginTop: '4px' },
  badge:  { color: '#fff', padding: '4px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', whiteSpace: 'nowrap' },
  actions:{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' },
  btn:    { padding: '7px 16px', color: '#fff', border: 'none', borderRadius: '7px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' },
};

export default AppointmentCard;
