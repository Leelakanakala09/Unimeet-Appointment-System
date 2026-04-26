import React, { useEffect, useState } from 'react';
import { getNotifications, markRead, markAllRead } from '../services/api';
import { toast } from 'react-toastify';
import NotificationCard from '../components/NotificationCard';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    getNotifications()
      .then(res => setNotifications(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleRead = async (id) => {
    await markRead(id);
    setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
  };

  const handleReadAll = async () => {
    try {
      await markAllRead();
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
      toast.success('All notifications marked as read.');
    } catch { toast.error('Failed.'); }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div style={{ padding: '36px 40px', maxWidth: '760px', margin: '0 auto' }}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>🔔 Notifications</h2>
          <p style={styles.sub}>{unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={handleReadAll} style={styles.readAllBtn}>✓ Mark All Read</button>
        )}
      </div>

      {loading ? (
        <p style={{ color: '#888' }}>Loading...</p>
      ) : notifications.length === 0 ? (
        <div style={styles.empty}>
          <p style={{ fontSize: '48px' }}>🔕</p>
          <p style={{ color: '#888', marginTop: '10px' }}>No notifications yet.</p>
        </div>
      ) : (
        notifications.map(n => (
          <NotificationCard key={n._id} notification={n} onMarkRead={handleRead} />
        ))
      )}
    </div>
  );
};

const styles = {
  header:     { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' },
  title:      { fontSize: '26px', fontWeight: '800', color: '#111' },
  sub:        { color: '#777', marginTop: '4px', fontSize: '14px' },
  readAllBtn: { padding: '9px 20px', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' },
  empty:      { textAlign: 'center', padding: '60px', background: '#fff', borderRadius: '14px', boxShadow: '0 2px 10px rgba(0,0,0,0.07)' },
};

export default Notifications;
