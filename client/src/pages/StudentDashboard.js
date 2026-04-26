import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyAppointments, cancelAppointment } from '../services/api';
import { toast } from 'react-toastify';

const statusConfig = {
  Pending:   { color: '#f59e0b', bg: '#fffbeb', border: '#fde68a', icon: '⏳' },
  Approved:  { color: '#10b981', bg: '#ecfdf5', border: '#6ee7b7', icon: '✅' },
  Rejected:  { color: '#ef4444', bg: '#fef2f2', border: '#fca5a5', icon: '❌' },
  Cancelled: { color: '#9ca3af', bg: '#f9fafb', border: '#e5e7eb', icon: '🚫' },
};

const StudentDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter]             = useState('All');
  const [loading, setLoading]           = useState(true);
  const user = JSON.parse(localStorage.getItem('userInfo'));

  const fetchData = () => {
    getMyAppointments()
      .then(res => setAppointments(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this appointment?')) return;
    try {
      await cancelAppointment(id);
      toast.success('Appointment cancelled.');
      fetchData();
    } catch { toast.error('Failed to cancel.'); }
  };

  const statuses = ['All', 'Pending', 'Approved', 'Rejected', 'Cancelled'];
  const filtered = filter === 'All' ? appointments : appointments.filter(a => a.status === filter);

  const counts = {
    Pending:   appointments.filter(a => a.status === 'Pending').length,
    Approved:  appointments.filter(a => a.status === 'Approved').length,
    Rejected:  appointments.filter(a => a.status === 'Rejected').length,
    Cancelled: appointments.filter(a => a.status === 'Cancelled').length,
  };

  return (
    <div style={styles.page}>

      {/* ── Hero Banner ── */}
      <div style={styles.hero}>
        <div style={styles.heroLeft}>
          <div style={styles.avatarBig}>{user?.name?.charAt(0).toUpperCase()}</div>
          <div>
            <h2 style={styles.heroName}>Welcome back, {user?.name}! 👋</h2>
            <p style={styles.heroSub}>📧 {user?.email}</p>
            <p style={styles.heroSub}>🎓 Student · {user?.department || 'Unimeet'}</p>
          </div>
        </div>
        <Link to="/faculty" style={styles.newBtn}>+ New Appointment</Link>
      </div>

      {/* ── Stat Cards ── */}
      <div style={styles.statsRow}>
        {Object.entries(counts).map(([k, v]) => {
          const cfg = statusConfig[k];
          return (
            <div
              key={k}
              onClick={() => setFilter(k)}
              style={{
                ...styles.statCard,
                background: cfg.bg,
                border: `2px solid ${filter === k ? cfg.color : cfg.border}`,
                cursor: 'pointer',
                transform: filter === k ? 'translateY(-4px)' : 'none',
                boxShadow: filter === k ? `0 8px 24px ${cfg.color}33` : '0 2px 10px rgba(0,0,0,0.06)',
              }}
            >
              <span style={styles.statIcon}>{cfg.icon}</span>
              <h2 style={{ color: cfg.color, fontSize: '36px', fontWeight: '800', margin: '6px 0 2px' }}>{v}</h2>
              <p style={{ color: cfg.color, fontSize: '13px', fontWeight: '600', opacity: 0.8 }}>{k}</p>
            </div>
          );
        })}
      </div>

      {/* ── Filter Pills ── */}
      <div style={styles.filterRow}>
        <span style={styles.filterLabel}>Filter by status:</span>
        <div style={styles.pills}>
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                ...styles.pill,
                background: filter === s ? '#1a73e8' : '#fff',
                color:      filter === s ? '#fff'    : '#555',
                border:     filter === s ? '2px solid #1a73e8' : '2px solid #e5e7eb',
              }}
            >
              {s} {s !== 'All' && <span style={{ opacity: 0.7 }}>({counts[s] || 0})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* ── Appointments ── */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>
            {filter === 'All' ? '📋 All Appointments' : `${statusConfig[filter]?.icon} ${filter} Appointments`}
          </h3>
          <span style={styles.countBadge}>{filtered.length} record{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {loading ? (
          <div style={styles.emptyBox}>
            <div style={styles.spinner} />
            <p style={{ color: '#888', marginTop: '16px' }}>Loading your appointments...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={styles.emptyBox}>
            <p style={{ fontSize: '56px', marginBottom: '12px' }}>📭</p>
            <p style={{ color: '#666', fontSize: '16px', fontWeight: '600' }}>No {filter !== 'All' ? filter.toLowerCase() : ''} appointments found</p>
            <p style={{ color: '#aaa', fontSize: '14px', margin: '8px 0 20px' }}>Book an appointment with a faculty member to get started</p>
            <Link to="/faculty" style={styles.emptyBtn}>Browse Faculty →</Link>
          </div>
        ) : (
          <div style={styles.cardGrid}>
            {filtered.map(a => {
              const cfg = statusConfig[a.status] || statusConfig.Pending;
              return (
                <div key={a._id} style={{ ...styles.apptCard, borderLeft: `5px solid ${cfg.color}` }}>

                  {/* Card Top */}
                  <div style={styles.cardTop}>
                    <div style={styles.facultyAva}>
                      {a.facultyId?.facultyName?.charAt(0).toUpperCase() || 'F'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={styles.facultyName}>{a.facultyId?.facultyName || 'Faculty'}</h4>
                      <p style={styles.deptText}>🏫 {a.facultyId?.department || '—'}</p>
                    </div>
                    <span style={{ ...styles.statusBadge, background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
                      {cfg.icon} {a.status}
                    </span>
                  </div>

                  {/* Divider */}
                  <div style={styles.divider} />

                  {/* Card Details */}
                  <div style={styles.detailsGrid}>
                    <div style={styles.detailItem}>
                      <span style={styles.detailIcon}>📅</span>
                      <div>
                        <p style={styles.detailLabel}>Date</p>
                        <p style={styles.detailVal}>{a.slotId?.date || '—'}</p>
                      </div>
                    </div>
                    <div style={styles.detailItem}>
                      <span style={styles.detailIcon}>⏰</span>
                      <div>
                        <p style={styles.detailLabel}>Time</p>
                        <p style={styles.detailVal}>{a.slotId?.startTime ? `${a.slotId.startTime} – ${a.slotId.endTime}` : '—'}</p>
                      </div>
                    </div>
                    <div style={styles.detailItem}>
                      <span style={styles.detailIcon}>📝</span>
                      <div>
                        <p style={styles.detailLabel}>Purpose</p>
                        <p style={styles.detailVal}>{a.purpose}</p>
                      </div>
                    </div>
                    <div style={styles.detailItem}>
                      <span style={styles.detailIcon}>🕐</span>
                      <div>
                        <p style={styles.detailLabel}>Booked On</p>
                        <p style={styles.detailVal}>{new Date(a.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Cancel Button */}
                  {(a.status === 'Pending' || a.status === 'Approved') && (
                    <div style={styles.cardFooter}>
                      <button onClick={() => handleCancel(a._id)} style={styles.cancelBtn}>
                        🚫 Cancel Appointment
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: { padding: '32px 40px', minHeight: 'calc(100vh - 60px)', background: '#f0f4f8' },

  /* Hero */
  hero: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    background: 'linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%)',
    borderRadius: '18px', padding: '28px 36px', marginBottom: '28px',
    flexWrap: 'wrap', gap: '16px',
    boxShadow: '0 8px 32px rgba(26,115,232,0.3)',
  },
  heroLeft:  { display: 'flex', alignItems: 'center', gap: '18px' },
  avatarBig: {
    width: '64px', height: '64px', borderRadius: '50%',
    background: 'rgba(255,255,255,0.25)', color: '#fff',
    fontSize: '28px', fontWeight: '800',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: '3px solid rgba(255,255,255,0.5)',
  },
  heroName: { fontSize: '22px', fontWeight: '800', color: '#fff', margin: '0 0 4px' },
  heroSub:  { fontSize: '13px', color: 'rgba(255,255,255,0.8)', margin: '2px 0' },
  newBtn: {
    background: '#fff', color: '#1a73e8',
    padding: '12px 24px', borderRadius: '10px',
    fontWeight: '800', fontSize: '14px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },

  /* Stats */
  statsRow: { display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' },
  statCard: {
    flex: '1', minWidth: '130px', padding: '22px 20px',
    borderRadius: '14px', textAlign: 'center',
    transition: 'all 0.2s ease',
  },
  statIcon: { fontSize: '28px' },

  /* Filter */
  filterRow:   { display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px', flexWrap: 'wrap' },
  filterLabel: { fontSize: '13px', fontWeight: '700', color: '#555', whiteSpace: 'nowrap' },
  pills:       { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  pill: {
    padding: '7px 16px', borderRadius: '20px',
    fontWeight: '600', fontSize: '13px', cursor: 'pointer',
    transition: 'all 0.15s ease',
  },

  /* Section */
  section:       { background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  sectionTitle:  { fontSize: '17px', fontWeight: '800', color: '#111' },
  countBadge: {
    background: '#e8f0fe', color: '#1a73e8',
    padding: '4px 12px', borderRadius: '20px',
    fontSize: '12px', fontWeight: '700',
  },

  /* Empty */
  emptyBox: {
    textAlign: 'center', padding: '60px 20px',
    background: '#f9fafb', borderRadius: '12px',
    border: '2px dashed #e5e7eb',
  },
  emptyBtn: {
    display: 'inline-block', padding: '10px 24px',
    background: '#1a73e8', color: '#fff',
    borderRadius: '9px', fontWeight: '700', fontSize: '14px',
  },

  /* Card Grid */
  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '16px' },

  /* Appointment Card */
  apptCard: {
    background: '#fff', borderRadius: '12px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    overflow: 'hidden',
    transition: 'box-shadow 0.2s',
  },
  cardTop:     { display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 20px 14px' },
  facultyAva: {
    width: '46px', height: '46px', borderRadius: '50%', flexShrink: 0,
    background: 'linear-gradient(135deg,#1a73e8,#0d47a1)',
    color: '#fff', fontSize: '20px', fontWeight: '700',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  facultyName:  { fontSize: '15px', fontWeight: '800', color: '#111', margin: '0 0 3px' },
  deptText:     { fontSize: '12px', color: '#777', margin: 0 },
  statusBadge:  { padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', whiteSpace: 'nowrap' },
  divider:      { height: '1px', background: '#f0f0f0', margin: '0 20px' },

  detailsGrid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr',
    gap: '12px', padding: '14px 20px',
  },
  detailItem:  { display: 'flex', alignItems: 'flex-start', gap: '10px' },
  detailIcon:  { fontSize: '18px', marginTop: '2px' },
  detailLabel: { fontSize: '11px', color: '#999', fontWeight: '600', margin: '0 0 2px', textTransform: 'uppercase' },
  detailVal:   { fontSize: '13px', color: '#333', fontWeight: '600', margin: 0 },

  cardFooter: { padding: '12px 20px 16px', borderTop: '1px solid #f5f5f5' },
  cancelBtn: {
    padding: '8px 18px', background: '#fff',
    color: '#ef4444', border: '1.5px solid #fca5a5',
    borderRadius: '8px', fontWeight: '700', fontSize: '13px',
    cursor: 'pointer', transition: 'all 0.15s',
  },

  spinner: {
    width: '36px', height: '36px', margin: '0 auto',
    border: '4px solid #e5e7eb',
    borderTop: '4px solid #1a73e8',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
};

export default StudentDashboard;
