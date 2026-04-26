import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  { icon: '📅', title: 'Easy Scheduling',        desc: 'Book appointments in just a few clicks without any confusion.' },
  { icon: '🔔', title: 'Instant Notifications',  desc: 'Get notified immediately when your appointment is approved.' },
  { icon: '✅', title: 'Conflict-Free Booking',  desc: 'Smart slot management prevents double-booking automatically.' },
  { icon: '📊', title: 'Appointment History',    desc: 'Access complete records of all your past and upcoming meetings.' },
];

const Home = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  return (
    <div>
      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.badge}>🎓 Faculty Appointment System</div>
        <h1 style={styles.title}>Welcome to <span style={{ color: '#1a73e8' }}>Unimeet</span></h1>
        <p style={styles.subtitle}>
          Skip the long waits and messy emails. Book faculty appointments in minutes
          — from anywhere, at any time.
        </p>
        <div style={styles.btnGroup}>
          {!user ? (
            <>
              <Link to="/register" style={styles.primaryBtn}>Get Started Free</Link>
              <Link to="/login"    style={styles.secondaryBtn}>Login</Link>
            </>
          ) : (
            <Link to="/faculty" style={styles.primaryBtn}>Browse Faculty →</Link>
          )}
        </div>
      </div>

      {/* Features */}
      <div style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Why Unimeet?</h2>
        <div style={styles.grid}>
          {features.map((f) => (
            <div key={f.title} style={styles.featureCard}>
              <div style={styles.featureIcon}>{f.icon}</div>
              <h3 style={styles.featureTitle}>{f.title}</h3>
              <p style={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={styles.stepsSection}>
        <h2 style={styles.sectionTitle}>How It Works</h2>
        <div style={styles.stepsRow}>
          {[
            { step: '1', label: 'Register / Login',       icon: '🔐' },
            { step: '2', label: 'Search Faculty',          icon: '🔍' },
            { step: '3', label: 'Pick a Time Slot',        icon: '📅' },
            { step: '4', label: 'Confirm Appointment',     icon: '✅' },
          ].map((s) => (
            <div key={s.step} style={styles.stepCard}>
              <div style={styles.stepNum}>{s.step}</div>
              <div style={styles.stepIcon}>{s.icon}</div>
              <p style={styles.stepLabel}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2026 Unimeet — Faculty Appointment Management System | Built with MERN Stack</p>
      </footer>
    </div>
  );
};

const styles = {
  hero: {
    textAlign: 'center',
    padding: '80px 20px 60px',
    background: 'linear-gradient(160deg, #e8f0fe 0%, #f0f4f8 100%)',
  },
  badge: {
    display: 'inline-block',
    background: '#e8f0fe',
    color: '#1a73e8',
    padding: '6px 18px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '20px',
  },
  title: { fontSize: '48px', fontWeight: '800', color: '#111', marginBottom: '18px', lineHeight: 1.2 },
  subtitle: { fontSize: '18px', color: '#555', maxWidth: '560px', margin: '0 auto 36px', lineHeight: 1.7 },
  btnGroup: { display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' },
  primaryBtn: {
    background: '#1a73e8',
    color: '#fff',
    padding: '14px 32px',
    borderRadius: '10px',
    fontWeight: '700',
    fontSize: '16px',
  },
  secondaryBtn: {
    background: '#fff',
    color: '#1a73e8',
    padding: '14px 32px',
    borderRadius: '10px',
    fontWeight: '700',
    fontSize: '16px',
    border: '2px solid #1a73e8',
  },
  featuresSection: { padding: '60px 40px', background: '#fff' },
  sectionTitle: { textAlign: 'center', fontSize: '30px', fontWeight: '800', color: '#111', marginBottom: '40px' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '24px',
    maxWidth: '960px',
    margin: '0 auto',
  },
  featureCard: {
    background: '#f8faff',
    padding: '28px 22px',
    borderRadius: '14px',
    border: '1px solid #e0eaff',
    textAlign: 'center',
  },
  featureIcon:  { fontSize: '36px', marginBottom: '14px' },
  featureTitle: { fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: '#222' },
  featureDesc:  { fontSize: '13px', color: '#666', lineHeight: 1.6 },
  stepsSection: { padding: '60px 40px', background: '#f0f4f8' },
  stepsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    flexWrap: 'wrap',
    maxWidth: '900px',
    margin: '0 auto',
  },
  stepCard: {
    background: '#fff',
    padding: '30px 24px',
    borderRadius: '14px',
    textAlign: 'center',
    width: '180px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
  },
  stepNum: {
    width: '36px',
    height: '36px',
    background: '#1a73e8',
    color: '#fff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    fontSize: '16px',
    margin: '0 auto 12px',
  },
  stepIcon:  { fontSize: '32px', marginBottom: '10px' },
  stepLabel: { fontSize: '14px', fontWeight: '600', color: '#333' },
  footer: {
    textAlign: 'center',
    padding: '24px',
    background: '#1a73e8',
    color: '#fff',
    fontSize: '13px',
  },
};

export default Home;
