'use client';

import { motion } from 'framer-motion';
import PredictForm from '@/components/PredictForm';

const stats = [
  { value: '19', label: 'Seasons', sub: '2008 - 2026' },
  { value: '283K', label: 'Balls', sub: 'analyzed' },
  { value: '70.5%', label: 'Accuracy', sub: 'test set' },
  { value: '13', label: 'Features', sub: 'engineered' },
];

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0f', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(245,184,0,0.08) 0%, transparent 60%)' }} />
      <div style={{ position: 'fixed', top: '60%', left: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(200,16,46,0.04)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', top: '30%', right: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(0,75,160,0.05)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto', padding: '48px 20px 80px' }}>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <motion.div animate={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #F5B800, #C49200)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color: '#0a0a0f', boxShadow: '0 0 20px rgba(245,184,0,0.4)', letterSpacing: '0.05em' }}>IPL</motion.div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#F5B800', textTransform: 'uppercase' }}>Win Predictor</div>
            <div style={{ fontSize: 10, padding: '2px 8px', borderRadius: 20, background: 'rgba(34,197,94,0.15)', color: '#4ade80', fontWeight: 600, border: '1px solid rgba(34,197,94,0.2)' }}>Live</div>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, marginBottom: 12, color: '#ffffff' }}>
            Predict any{' '}
            <span style={{ background: 'linear-gradient(90deg, #F5B800, #FFD84D, #C49200)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>IPL match</span>
            {' '}winner
          </h1>
          <p style={{ fontSize: 15, color: '#a0a0b8', lineHeight: 1.7, maxWidth: 520, marginBottom: 0 }}>XGBoost + Random Forest ensemble trained on 19 seasons of ball-by-ball IPL data. Select teams, venue and toss to get instant win probability with SHAP explainability.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 24 }}>
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1, type: 'spring' }} style={{ padding: '16px 12px', borderRadius: 14, textAlign: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#F5B800', marginBottom: 2 }}>{s.value}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#ffffff', marginBottom: 1 }}>{s.label}</div>
              <div style={{ fontSize: 10, color: '#5a5a7a' }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, type: 'spring', stiffness: 100 }} style={{ borderRadius: 20, padding: 28, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #F5B800, #C49200)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🎯</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#ffffff' }}>Match predictor</div>
              <div style={{ fontSize: 12, color: '#5a5a7a' }}>Fill in match details below</div>
            </div>
          </div>
          <PredictForm />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} style={{ marginTop: 32, textAlign: 'center', fontSize: 12, color: '#3a3a5a' }}>
          Built by Deepak Saxena · MSc Data Science · Chandigarh University
        </motion.div>
      </div>
    </main>
  );
}
