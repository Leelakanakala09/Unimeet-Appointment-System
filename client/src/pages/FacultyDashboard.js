import React, { useEffect, useState } from 'react';
import { getFacultyAppointments, updateStatus, addSlot, deleteSlot, getFacultySlots } from '../services/api';
import { toast } from 'react-toastify';
import AppointmentCard from '../components/AppointmentCard';

const FacultyDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [mySlots,  setMySlots]   = useState([]);
  const [slot,     setSlot]      = useState({ date: '', startTime: '', endTime: '' });
  const [filter,   setFilter]    = useState('All');
  const [loading,  setLoading]   = useState(true);
  const [activeTab, setActiveTab] = useState('appointments');
  const user = JSON.parse(localStorage.getItem('userInfo'));

  const fetchAppointments = () => {
    getFacultyAppointments()
      .then(res => setAppointments(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAppointments(); }, []);

  const handleApprove = async (id) => {
    try { await updateStatus(id, 'Approved'); toast.success('Appointment Approved!'); fetchAppointments(); }
    catch { toast.error('Failed.'); }
  };
  const handleReject = async (id) => {
    try { await updateStatus(id, 'Rejected'); toast.info('Appointment Rejected.'); fetchAppointments(); }
    catch { toast.error('Failed.'); }
  };

  const handleAddSlot = async () => {
    if (!slot.date || !slot.startTime || !slot.endTime) return toast.error('Fill all slot fields.');
    try {
      await addSlot(slot);
      toast.success('Slot added!');
      setSlot({ date: '', startTime: '', endTime: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add slot.');
    }
  };

  const statuses = ['All', 'Pending', 'Approved', 'Rejected'];
  const filtered = filter === 'All' ? appointments : appointments.filter(a => a.status === filter);

  const counts = {
    Total:    appointments.length,
    Pending:  appointments.filter(a => a.status === 'Pending').length,
    Approved: appointments.filter(a => a.status === 'Approved').length,
    Rejected: appointments.filter(a => a.status === 'Rejected').length,
  };

  return (
    <div style={{ padding: '36px 40px' }}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Faculty Dashboard</h2>
          <p style={styles.sub}>Welcome, {user?.name} 👋</p>
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsRow}>
        {Object.entries(counts).map(([k, v]) => (
          <div key={k} style={{ ...styles.statCard, borderTop: `4px solid ${statColor(k)}` }}>
            <h2 style={{ color: statColor(k), fontSize: '28px', fontWeight: '800' }}>{v}</h2>
            <p style={{ color: '#666', fontSize: '13px', marginTop: '4px' }}>{k}</p>
          </div>
        ))}
      </div>

      {/* Tab Nav */}
      <div style={styles.tabNav}>
        <button onClick={() => setActiveTab('appointments')} style={{ ...styles.tabBtn, borderBottom: activeTab === 'appointments' ? '3px solid #1a73e8' : 'none', color: activeTab === 'appointments' ? '#1a73e8' : '#555' }}>
          📋 Appointment Requests
        </button>
        <button onClick={() => setActiveTab('slots')} style={{ ...styles.tabBtn, borderBottom: activeTab === 'slots' ? '3px solid #1a73e8' : 'none', color: activeTab === 'slots' ? '#1a73e8' : '#555' }}>
          ⏰ Manage Slots
        </button>
      </div>

      {/* Appointments Tab */}
      {activeTab === 'appointments' && (
        <>
          <div style={styles.tabs}>
            {statuses.map(s => (
              <button key={s} onClick={() => setFilter(s)}
                style={{ ...styles.tab, background: filter === s ? '#1a73e8' : '#fff', color: filter === s ? '#fff' : '#555' }}>
                {s}
              </button>
            ))}
          </div>
          {loading ? <p style={{ color: '#888' }}>Loading...</p> :
           filtered.length === 0 ? <p style={{ color: '#888', padding: '20px' }}>No requests found.</p> :
           filtered.map(a => (
             <AppointmentCard key={a._id} appointment={a} showActions onApprove={handleApprove} onReject={handleReject} />
           ))
          }
        </>
      )}

      {/* Slots Tab */}
      {activeTab === 'slots' && (
        <div style={styles.slotSection}>
          <h3 style={{ marginBottom: '18px', fontWeight: '700' }}>➕ Add New Slot</h3>
          <div style={styles.slotForm}>
            <div>
              <label style={styles.label}>Date</label>
              <input type="date" style={styles.input} value={slot.date} onChange={e => setSlot({ ...slot, date: e.target.value })} />
            </div>
            <div>
              <label style={styles.label}>Start Time</label>
              <input type="time" style={styles.input} value={slot.startTime} onChange={e => setSlot({ ...slot, startTime: e.target.value })} />
            </div>
            <div>
              <label style={styles.label}>End Time</label>
              <input type="time" style={styles.input} value={slot.endTime} onChange={e => setSlot({ ...slot, endTime: e.target.value })} />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button style={styles.addBtn} onClick={handleAddSlot}>Add Slot</button>
            </div>
          </div>
          <p style={{ color: '#888', fontSize: '13px', marginTop: '8px' }}>
            ℹ️ Added slots will appear in student booking page immediately.
          </p>
        </div>
      )}
    </div>
  );
};

const statColor = (s) => ({ Total: '#1a73e8', Pending: '#f59e0b', Approved: '#10b981', Rejected: '#ef4444' }[s] || '#888');

const styles = {
  header:   { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' },
  title:    { fontSize: '26px', fontWeight: '800', color: '#111' },
  sub:      { color: '#777', marginTop: '4px' },
  statsRow: { display: 'flex', gap: '16px', marginBottom: '28px', flexWrap: 'wrap' },
  statCard: { background: '#fff', padding: '18px 24px', borderRadius: '12px', minWidth: '130px', boxShadow: '0 2px 10px rgba(0,0,0,0.07)' },
  tabNav:   { display: 'flex', gap: '0', borderBottom: '2px solid #eee', marginBottom: '24px' },
  tabBtn:   { padding: '12px 24px', background: 'none', border: 'none', fontWeight: '700', fontSize: '15px', cursor: 'pointer' },
  tabs:     { display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' },
  tab:      { padding: '7px 18px', border: '1.5px solid #ddd', borderRadius: '20px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' },
  slotSection: { background: '#fff', padding: '28px', borderRadius: '14px', boxShadow: '0 2px 10px rgba(0,0,0,0.07)' },
  slotForm: { display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-start' },
  label:    { display: 'block', fontSize: '12px', fontWeight: '600', color: '#555', marginBottom: '6px' },
  input:    { padding: '10px 12px', border: '1.5px solid #ddd', borderRadius: '8px', fontSize: '14px' },
  addBtn:   { padding: '10px 24px', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' },
};

export default FacultyDashboard;
