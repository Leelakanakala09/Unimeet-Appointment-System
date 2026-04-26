import React, { useEffect, useState } from 'react';
import { getAllUsers, getAllAppointmentsAdmin, getAdminStats, deleteUser } from '../services/api';
import { toast } from 'react-toastify';

const roleColor = { student: '#1a73e8', faculty: '#10b981', admin: '#9333ea' };

const AdminDashboard = () => {
  const [users,        setUsers]        = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [stats,        setStats]        = useState({});
  const [activeTab,    setActiveTab]    = useState('overview');
  const [search,       setSearch]       = useState('');

  useEffect(() => {
    getAllUsers().then(r => setUsers(r.data)).catch(console.error);
    getAllAppointmentsAdmin().then(r => setAppointments(r.data)).catch(console.error);
    getAdminStats().then(r => setStats(r.data)).catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user permanently?')) return;
    try {
      await deleteUser(id);
      toast.success('User deleted.');
      setUsers(users.filter(u => u._id !== id));
    } catch { toast.error('Failed to delete.'); }
  };

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const statCards = [
    { label: 'Total Users',        value: stats.totalUsers,        color: '#1a73e8', icon: '👥' },
    { label: 'Students',           value: stats.totalStudents,     color: '#3b82f6', icon: '🎓' },
    { label: 'Faculty',            value: stats.totalFaculty,      color: '#10b981', icon: '👨‍🏫' },
    { label: 'Total Appointments', value: stats.totalAppointments, color: '#f59e0b', icon: '📅' },
    { label: 'Pending',            value: stats.pendingAppts,      color: '#f97316', icon: '⏳' },
    { label: 'Approved',           value: stats.approvedAppts,     color: '#22c55e', icon: '✅' },
    { label: 'Rejected',           value: stats.rejectedAppts,     color: '#ef4444', icon: '❌' },
    { label: 'Cancelled',          value: stats.cancelledAppts,    color: '#9ca3af', icon: '🚫' },
  ];

  return (
    <div style={{ padding: '36px 40px' }}>
      <h2 style={styles.title}>Admin Dashboard</h2>
      <p style={styles.sub}>Monitor users, appointments, and system activity</p>

      {/* Tab Nav */}
      <div style={styles.tabNav}>
        {['overview', 'users', 'appointments'].map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            style={{ ...styles.tabBtn, borderBottom: activeTab === t ? '3px solid #1a73e8' : 'none', color: activeTab === t ? '#1a73e8' : '#555' }}>
            {t === 'overview' ? '📊 Overview' : t === 'users' ? '👥 Users' : '📋 Appointments'}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div style={styles.statGrid}>
          {statCards.map(s => (
            <div key={s.label} style={{ ...styles.statCard, borderTop: `4px solid ${s.color}` }}>
              <span style={{ fontSize: '28px' }}>{s.icon}</span>
              <h2 style={{ color: s.color, fontSize: '32px', fontWeight: '800', margin: '8px 0 4px' }}>{s.value ?? '...'}</h2>
              <p style={{ color: '#666', fontSize: '13px' }}>{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <>
          <input
            style={styles.search}
            type="text"
            placeholder="🔍 Search users by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr style={{ background: '#1a73e8', color: '#fff' }}>
                  {['Name', 'Email', 'Role', 'Department', 'Action'].map(h => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u, i) => (
                  <tr key={u._id} style={{ background: i % 2 === 0 ? '#fff' : '#f9fafb' }}>
                    <td style={styles.td}>{u.name}</td>
                    <td style={styles.td}>{u.email}</td>
                    <td style={styles.td}>
                      <span style={{ ...styles.roleBadge, background: roleColor[u.role] || '#888' }}>{u.role}</span>
                    </td>
                    <td style={styles.td}>{u.department || '—'}</td>
                    <td style={styles.td}>
                      {u.role !== 'admin' && (
                        <button onClick={() => handleDelete(u._id)} style={styles.delBtn}>Delete</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Appointments Tab */}
      {activeTab === 'appointments' && (
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr style={{ background: '#1a73e8', color: '#fff' }}>
                {['Student', 'Faculty', 'Date', 'Time', 'Purpose', 'Status'].map(h => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {appointments.map((a, i) => (
                <tr key={a._id} style={{ background: i % 2 === 0 ? '#fff' : '#f9fafb' }}>
                  <td style={styles.td}>{a.studentId?.name}</td>
                  <td style={styles.td}>{a.facultyId?.facultyName}</td>
                  <td style={styles.td}>{a.slotId?.date}</td>
                  <td style={styles.td}>{a.slotId?.startTime}</td>
                  <td style={styles.td}>{a.purpose}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.roleBadge, background: statusColor(a.status) }}>{a.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const statusColor = (s) => ({ Pending: '#f59e0b', Approved: '#10b981', Rejected: '#ef4444', Cancelled: '#9ca3af' }[s] || '#888');

const styles = {
  title:    { fontSize: '26px', fontWeight: '800', color: '#111', marginBottom: '4px' },
  sub:      { color: '#777', marginBottom: '28px' },
  tabNav:   { display: 'flex', gap: '0', borderBottom: '2px solid #eee', marginBottom: '28px' },
  tabBtn:   { padding: '12px 24px', background: 'none', border: 'none', fontWeight: '700', fontSize: '15px', cursor: 'pointer' },
  statGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '18px' },
  statCard: { background: '#fff', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.07)' },
  search:   { width: '100%', maxWidth: '440px', padding: '11px 16px', border: '1.5px solid #ddd', borderRadius: '10px', fontSize: '14px', marginBottom: '20px', display: 'block' },
  table:    { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.07)' },
  th:       { padding: '13px 16px', textAlign: 'left', fontWeight: '600', fontSize: '13px' },
  td:       { padding: '12px 16px', borderBottom: '1px solid #f0f0f0', fontSize: '14px' },
  roleBadge:{ color: '#fff', padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' },
  delBtn:   { padding: '6px 14px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' },
};

export default AdminDashboard;
