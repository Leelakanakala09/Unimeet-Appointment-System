import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFacultySlots, getFacultyById, bookAppointment } from '../services/api';
import { toast } from 'react-toastify';

const purposeOptions = [
  'Project Discussion', 'Attendance Issue', 'Exam / Marks Clarification',
  'Career Guidance', 'Academic Doubt', 'Personal Mentoring', 'Other',
];

const BookAppointment = () => {
  const { facultyId } = useParams();
  const navigate      = useNavigate();
  const [faculty,  setFaculty]  = useState(null);
  const [slots,    setSlots]    = useState([]);
  const [selected, setSelected] = useState('');
  const [purpose,  setPurpose]  = useState('');
  const [custom,   setCustom]   = useState('');
  const [loading,  setLoading]  = useState(false);

  useEffect(() => {
    getFacultyById(facultyId).then(r => setFaculty(r.data)).catch(console.error);
    getFacultySlots(facultyId).then(r => setSlots(r.data)).catch(console.error);
  }, [facultyId]);

  const handleBook = async () => {
    const finalPurpose = purpose === 'Other' ? custom : purpose;
    if (!selected || !finalPurpose) return toast.error('Please select a slot and enter the purpose.');
    setLoading(true);
    try {
      await bookAppointment({ facultyId, slotId: selected, purpose: finalPurpose });
      toast.success('Appointment booked successfully!');
      navigate('/student-dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>📅 Book Appointment</h2>
        {faculty && (
          <div style={styles.facultyBanner}>
            <div style={styles.ava}>{faculty.facultyName?.charAt(0).toUpperCase()}</div>
            <div>
              <p style={{ fontWeight: '700', color: '#111' }}>{faculty.facultyName}</p>
              <p style={{ color: '#777', fontSize: '13px' }}>{faculty.department} · {faculty.designation}</p>
            </div>
          </div>
        )}

        <label style={styles.label}>Select Available Slot *</label>
        {slots.length === 0 ? (
          <p style={{ color: '#e53e3e', marginBottom: '16px', fontSize: '14px' }}>
            ⚠️ No slots available for this faculty right now.
          </p>
        ) : (
          <select style={styles.input} value={selected} onChange={e => setSelected(e.target.value)}>
            <option value="">-- Choose a time slot --</option>
            {slots.map(s => (
              <option key={s._id} value={s._id}>
                📅 {s.date}  |  ⏰ {s.startTime} – {s.endTime}
              </option>
            ))}
          </select>
        )}

        <label style={styles.label}>Purpose of Meeting *</label>
        <select style={styles.input} value={purpose} onChange={e => setPurpose(e.target.value)}>
          <option value="">-- Select purpose --</option>
          {purposeOptions.map(p => <option key={p} value={p}>{p}</option>)}
        </select>

        {purpose === 'Other' && (
          <>
            <label style={styles.label}>Describe your purpose *</label>
            <textarea
              style={{ ...styles.input, height: '90px', resize: 'vertical' }}
              placeholder="Briefly describe your reason for the meeting..."
              value={custom}
              onChange={e => setCustom(e.target.value)}
            />
          </>
        )}

        <button style={styles.btn} onClick={handleBook} disabled={loading || slots.length === 0}>
          {loading ? 'Booking...' : '✅ Confirm Appointment'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex', justifyContent: 'center', padding: '40px 20px',
    background: 'linear-gradient(160deg, #e8f0fe 0%, #f0f4f8 100%)',
    minHeight: 'calc(100vh - 60px)',
  },
  card: {
    background: '#fff', padding: '40px', borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.10)', width: '100%', maxWidth: '520px',
    height: 'fit-content',
  },
  title: { fontSize: '22px', fontWeight: '800', color: '#111', marginBottom: '20px', textAlign: 'center' },
  facultyBanner: {
    display: 'flex', gap: '14px', alignItems: 'center',
    background: '#f0f4ff', padding: '14px 18px', borderRadius: '10px', marginBottom: '24px',
  },
  ava: {
    width: '44px', height: '44px', borderRadius: '50%',
    background: '#1a73e8', color: '#fff', fontSize: '20px', fontWeight: '700',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  label: { display: 'block', fontSize: '13px', fontWeight: '700', color: '#444', marginBottom: '7px' },
  input: {
    width: '100%', padding: '11px 14px', marginBottom: '20px',
    border: '1.5px solid #ddd', borderRadius: '9px', fontSize: '14px',
    display: 'block', boxSizing: 'border-box',
  },
  btn: {
    width: '100%', padding: '13px', background: '#1a73e8', color: '#fff',
    border: 'none', borderRadius: '9px', fontSize: '16px', fontWeight: '700',
    cursor: 'pointer', opacity: 1,
  },
};

export default BookAppointment;
