'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import TeamBadge from './TeamBadge';
import { PredictResponse } from '@/lib/api';
import { Team } from './PredictForm';
import confetti from 'canvas-confetti';

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      setDisplay(Math.round(p * value * 10) / 10);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);
  return <span>{display.toFixed(1)}</span>;
}

export default function ResultCard({ result, team1obj, team2obj }: {
  result: PredictResponse;
  team1obj?: Team;
  team2obj?: Team;
}) {
  const t1 = result.team1_win_probability;
  const t2 = result.team2_win_probability;

  useEffect(() => {
    const winnerColors = t1 > t2
      ? (team1obj?.colors ?? ['#F5B800', '#FFD84D'])
      : (team2obj?.colors ?? ['#F5B800', '#FFD84D']);
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: winnerColors });
  }, []);

  const confBadge = {
    High:   { bg: 'rgba(74,222,128,0.12)',  color: '#4ade80', border: 'rgba(74,222,128,0.3)'  },
    Medium: { bg: 'rgba(251,191,36,0.12)',  color: '#fbbf24', border: 'rgba(251,191,36,0.3)'  },
    Low:    { bg: 'rgba(248,113,113,0.12)', color: '#f87171', border: 'rgba(248,113,113,0.3)' },
  }[result.confidence] || { bg: 'rgba(255,255,255,0.05)', color: '#fff', border: 'rgba(255,255,255,0.2)' };

  const g1s = team1obj?.colors[0] ?? '#444';
  const g1e = team1obj?.colors[1] ?? '#666';
  const g2s = team2obj?.colors[0] ?? '#444';
  const g2e = team2obj?.colors[1] ?? '#666';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
        style={{ marginTop: 24, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 24, padding: 32, position: 'relative', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)', pointerEvents: 'none' }} />

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: 28, fontWeight: 700, color: '#fff', letterSpacing: '0.15em' }}>MATCH PREDICTION</h2>
          <div style={{ width: 80, height: 4, background: '#F5B800', borderRadius: 2, margin: '12px auto 0', boxShadow: '0 0 10px #F5B800' }} />
        </div>

        {/* Teams VS layout */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40, gap: 16 }}>
          {/* Team 1 */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            {team1obj ? (
              <TeamBadge id={team1obj.id} name={team1obj.name} gradientStart={g1s} gradientEnd={g1e} size="xl" />
            ) : (
              <div style={{ width: 96, height: 96, borderRadius: '50%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#fff', fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800 }}>{result.team1.slice(0,3).toUpperCase()}</div>
            )}
            <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: 48, fontWeight: 700, color: '#fff', lineHeight: 1 }}>
              <AnimatedNumber value={t1} />%
            </div>
            <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>{result.team1.toUpperCase()}</div>
          </div>

          {/* Center */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, minWidth: 120 }}>
            <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: 36, fontWeight: 900, color: 'rgba(255,255,255,0.2)', fontStyle: 'italic' }}>VS</div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
              style={{ background: '#F5B800', color: '#000', fontFamily: '"Barlow Condensed", sans-serif', fontSize: 16, fontWeight: 700, padding: '8px 16px', borderRadius: 8, textAlign: 'center', boxShadow: '0 0 20px rgba(245,184,0,0.5)', whiteSpace: 'nowrap' }}>
              {result.predicted_winner.split(' ').slice(-2).join(' ')} TO WIN
            </motion.div>
            <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: 11, fontWeight: 700, padding: '4px 12px', border: `1px solid ${confBadge.border}`, background: confBadge.bg, color: confBadge.color, borderRadius: 20, letterSpacing: '0.08em' }}>
              {result.confidence.toUpperCase()} CONFIDENCE
            </span>
          </div>

          {/* Team 2 */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            {team2obj ? (
              <TeamBadge id={team2obj.id} name={team2obj.name} gradientStart={g2s} gradientEnd={g2e} size="xl" />
            ) : (
              <div style={{ width: 96, height: 96, borderRadius: '50%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#fff', fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800 }}>{result.team2.slice(0,3).toUpperCase()}</div>
            )}
            <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: 48, fontWeight: 700, color: '#fff', lineHeight: 1 }}>
              <AnimatedNumber value={t2} />%
            </div>
            <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>{result.team2.toUpperCase()}</div>
          </div>
        </div>

        {/* Probability bar */}
        <div style={{ width: '100%', height: 16, background: 'rgba(255,255,255,0.1)', borderRadius: 8, overflow: 'hidden', marginBottom: 32, display: 'flex' }}>
          <motion.div initial={{ width: '50%' }} animate={{ width: `${t1}%` }} transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ height: '100%', background: `linear-gradient(90deg, ${g1s}, ${g1e})` }} />
          <motion.div initial={{ width: '50%' }} animate={{ width: `${t2}%` }} transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ height: '100%', background: `linear-gradient(90deg, ${g2s}, ${g2e})` }} />
        </div>

        {/* Stat chips */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          {[
            { dot: '#4ade80', label: 'Model: XGBoost v2' },
            { dot: '#60a5fa', label: `Confidence: ${result.confidence}` },
            { dot: '#c084fc', label: 'Explainability: SHAP' },
          ].map((item, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', padding: '8px 16px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Barlow, sans-serif' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: item.dot, flexShrink: 0 }} />
              {item.label}
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
