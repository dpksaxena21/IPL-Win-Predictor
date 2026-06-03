'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import TeamBadge from './TeamBadge';
import { PredictResponse } from '@/lib/api';

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1000, 1);
      setDisplay(Math.round(p * value * 10) / 10);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);
  return <span>{display.toFixed(1)}</span>;
}

function Confetti() {
  const colors = ['#F5B800', '#FFD84D', '#fff', '#4ade80', '#60a5fa'];
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 999, overflow: 'hidden' }}>
      {Array.from({ length: 36 }).map((_, i) => (
        <motion.div key={i}
          initial={{ y: -10, x: Math.random() * 800, opacity: 1, rotate: 0 }}
          animate={{ y: 900, opacity: 0, rotate: Math.random() * 540 }}
          transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 1.2, ease: 'linear' }}
          style={{ position: 'absolute', width: 6 + Math.random() * 8, height: 6 + Math.random() * 8,
            borderRadius: Math.random() > 0.5 ? '50%' : '1px',
            backgroundColor: colors[Math.floor(Math.random() * colors.length)] }} />
      ))}
    </div>
  );
}

export default function ResultCard({ result }: { result: PredictResponse }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const t1 = result.team1_win_probability;
  const t2 = result.team2_win_probability;

  useEffect(() => {
    setShowConfetti(true);
    const t = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(t);
  }, [result]);

  const confBadge = {
    High:   { bg: 'rgba(74,222,128,0.12)',  color: '#4ade80', border: 'rgba(74,222,128,0.3)' },
    Medium: { bg: 'rgba(251,191,36,0.12)',  color: '#fbbf24', border: 'rgba(251,191,36,0.3)' },
    Low:    { bg: 'rgba(248,113,113,0.12)', color: '#f87171', border: 'rgba(248,113,113,0.3)' },
  }[result.confidence] || { bg: 'rgba(255,255,255,0.05)', color: '#fff', border: 'rgba(255,255,255,0.2)' };

  return (
    <AnimatePresence>
      {showConfetti && <Confetti />}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
        style={{ marginTop: 20, border: '1px solid rgba(245,184,0,0.25)', background: 'rgba(8,8,16,0.98)', overflow: 'hidden' }}
      >
        <div style={{ background: 'linear-gradient(90deg, rgba(245,184,0,0.12), rgba(245,184,0,0.04))', borderBottom: '1px solid rgba(245,184,0,0.12)', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 3, height: 16, background: '#F5B800' }} />
            <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 13, fontWeight: 700, color: '#F5B800', letterSpacing: '0.12em' }}>MATCH PREDICTION</span>
          </div>
          <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 11, fontWeight: 700, padding: '3px 10px', border: `1px solid ${confBadge.border}`, background: confBadge.bg, color: confBadge.color, letterSpacing: '0.08em' }}>
            {result.confidence.toUpperCase()} CONFIDENCE
          </span>
        </div>
        <div style={{ padding: '28px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <TeamBadge team={result.team1} size="xl" />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: 2 }}>{result.team1.toUpperCase()}</div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: 'spring' }}
                  style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 48, fontWeight: 800, color: t1 > 50 ? '#F5B800' : '#fff', lineHeight: 1 }}>
                  <AnimatedNumber value={t1} />%
                </motion.div>
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>WIN PROBABILITY</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, minWidth: 80 }}>
              <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 22, fontWeight: 800, color: 'rgba(255,255,255,0.15)' }}>VS</div>
              <div style={{ textAlign: 'center', padding: '8px 16px', background: 'rgba(245,184,0,0.08)', border: '1px solid rgba(245,184,0,0.2)' }}>
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 9, color: '#F5B800', letterSpacing: '0.12em', marginBottom: 4 }}>PREDICTED WINNER</div>
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 13, fontWeight: 800, color: '#fff', letterSpacing: '0.05em' }}>{result.predicted_winner}</div>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <TeamBadge team={result.team2} size="xl" />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: 2 }}>{result.team2.toUpperCase()}</div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }}
                  style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 48, fontWeight: 800, color: t2 > 50 ? '#F5B800' : '#fff', lineHeight: 1 }}>
                  <AnimatedNumber value={t2} />%
                </motion.div>
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>WIN PROBABILITY</div>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.05)', display: 'flex', overflow: 'hidden' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${t1}%` }} transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                style={{ height: '100%', background: 'linear-gradient(90deg, #F5B800, #FFD84D)' }} />
              <motion.div initial={{ width: 0 }} animate={{ width: `${t2}%` }} transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                style={{ height: '100%', background: 'rgba(255,255,255,0.1)' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              { label: 'MODEL', value: 'XGB + RF' },
              { label: 'CONFIDENCE', value: result.confidence },
              { label: 'EXPLAINABILITY', value: 'SHAP' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 + i * 0.1 }}
                style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 14, fontWeight: 700, color: '#F5B800', letterSpacing: '0.05em' }}>{item.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
