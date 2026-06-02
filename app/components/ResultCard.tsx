'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, TrendingUp, MapPin, Coins } from 'lucide-react';
import TeamBadge from './TeamBadge';
import { PredictResponse } from '@/lib/api';
import { useEffect, useState } from 'react';

function Confetti() {
  const colors = ['#F5B800', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
  const pieces = Array.from({ length: 40 }, (_, i) => i);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 100, overflow: 'hidden' }}>
      {pieces.map(i => (
        <motion.div
          key={i}
          initial={{ y: -20, x: Math.random() * window.innerWidth, opacity: 1, rotate: 0 }}
          animate={{ y: window.innerHeight + 20, opacity: 0, rotate: Math.random() * 720 }}
          transition={{ duration: 2.5 + Math.random() * 2, delay: Math.random() * 1.5, ease: 'linear' }}
          style={{
            position: 'absolute', width: 8 + Math.random() * 8, height: 8 + Math.random() * 8,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          }}
        />
      ))}
    </div>
  );
}

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplay(Math.round(progress * value * 10) / 10);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);
  return <span>{display.toFixed(1)}</span>;
}

export default function ResultCard({ result }: { result: PredictResponse }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const t1 = result.team1_win_probability;
  const t2 = result.team2_win_probability;

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, [result]);

  const confidenceBadge = {
    High:   { bg: 'rgba(34,197,94,0.15)',  text: '#4ade80', label: 'High confidence' },
    Medium: { bg: 'rgba(251,191,36,0.15)', text: '#fbbf24', label: 'Medium confidence' },
    Low:    { bg: 'rgba(239,68,68,0.15)',  text: '#f87171', label: 'Low confidence' },
  }[result.confidence] || { bg: 'rgba(255,255,255,0.1)', text: '#fff', label: result.confidence };

  return (
    <AnimatePresence>
      {showConfetti && <Confetti />}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{
          marginTop: 24,
          borderRadius: 20,
          overflow: 'hidden',
          border: '1px solid rgba(245,184,0,0.2)',
          background: 'linear-gradient(135deg, #13131a 0%, #1c1c28 100%)',
        }}
      >
        <div style={{
          padding: '12px 20px',
          background: 'linear-gradient(90deg, rgba(245,184,0,0.15), rgba(245,184,0,0.05))',
          borderBottom: '1px solid rgba(245,184,0,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Trophy size={16} color="#F5B800" />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#F5B800' }}>Prediction Result</span>
          </div>
          <span style={{
            fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20,
            background: confidenceBadge.bg, color: confidenceBadge.text
          }}>
            {confidenceBadge.label}
          </span>
        </div>

        <div style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, minWidth: 90 }}>
              <TeamBadge team={result.team1} size="lg" />
              <span style={{ fontSize: 11, color: '#a0a0b8', textAlign: 'center', lineHeight: 1.3 }}>{result.team1}</span>
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                style={{ fontSize: 28, fontWeight: 800, color: t1 > 50 ? '#F5B800' : '#ffffff' }}
              >
                <AnimatedNumber value={t1} />%
              </motion.span>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 11, color: '#5a5a7a', textAlign: 'center', letterSpacing: '0.1em', fontWeight: 600 }}>
                WIN PROBABILITY
              </div>
              <div style={{ height: 12, borderRadius: 6, overflow: 'hidden', background: 'rgba(255,255,255,0.05)', display: 'flex' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${t1}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                  style={{ height: '100%', background: 'linear-gradient(90deg, #F5B800, #FFD84D)', borderRadius: '6px 0 0 6px' }}
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${t2}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                  style={{ height: '100%', background: 'linear-gradient(90deg, #3a3a5a, #252535)', borderRadius: '0 6px 6px 0' }}
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{ fontSize: 11, color: '#5a5a7a', marginBottom: 4 }}>Predicted winner</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#F5B800' }}>{result.predicted_winner}</div>
              </motion.div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, minWidth: 90 }}>
              <TeamBadge team={result.team2} size="lg" />
              <span style={{ fontSize: 11, color: '#a0a0b8', textAlign: 'center', lineHeight: 1.3 }}>{result.team2}</span>
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                style={{ fontSize: 28, fontWeight: 800, color: t2 > 50 ? '#F5B800' : '#ffffff' }}
              >
                <AnimatedNumber value={t2} />%
              </motion.span>
            </div>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
            borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16
          }}>
            {[
              { icon: <TrendingUp size={14} />, label: 'Model', value: 'XGB + RF Ensemble' },
              { icon: <Coins size={14} />, label: 'Confidence', value: result.confidence },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                style={{
                  padding: '10px 14px', borderRadius: 10,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', gap: 8
                }}
              >
                <span style={{ color: '#F5B800' }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 10, color: '#5a5a7a' }}>{item.label}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#ffffff' }}>{item.value}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}