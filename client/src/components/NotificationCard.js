import React from 'react';

const NotificationCard = ({ notification, onMarkRead }) => {
  const { _id, message, isRead, createdAt } = notification;
  return (
    <div style={{ ...styles.card, background: isRead ? '#f9fafb' : '#e8f0fe' }}>
      <div style={styles.dot(isRead)} />
      <div style={{ flex: 1 }}>
        <p style={styles.msg}>{message}</p>
        <p style={styles.time}>{new Date(createdAt).toLocaleString()}</p>
      </div>
      {!isRead && (
        <button onClick={() => onMarkRead(_id)} style={styles.btn}>Mark Read</button>
      )}
    </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px 18px',
    borderRadius: '10px',
    marginBottom: '10px',
    boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
  },
  dot: (isRead) => ({
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: isRead ? '#ccc' : '#1a73e8',
    flexShrink: 0,
  }),
  msg:  { fontSize: '14px', color: '#333', marginBottom: '4px' },
  time: { fontSize: '11px', color: '#999' },
  btn:  {
    padding: '5px 12px',
    background: '#1a73e8',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
};

export default NotificationCard;
