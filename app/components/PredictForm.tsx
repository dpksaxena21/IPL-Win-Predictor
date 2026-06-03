'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTeams, getVenues, predictMatch, PredictResponse } from '@/lib/api';
import ResultCard from './ResultCard';

const inputStyle = {
  width: '100%', padding: '11px 14px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff', fontSize: 13,
  fontFamily: 'Barlow Condensed, sans-serif',
  fontWeight: 500, letterSpacing: '0.05em',
  outline: 'none', cursor: 'pointer',
  appearance: 'none' as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='%23666' d='M5 7L0 2h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: 36,
};

const labelStyle = {
  display: 'block' as const,
  fontFamily: 'Barlow Condensed, sans-serif',
  fontSize: 10, fontWeight: 700,
  color: 'rgba(255,255,255,0.35)',
  letterSpacing: '0.15em', marginBottom: 6,
  textTransform: 'uppercase' as const,
};

type TeamInfo = { captain: string; bowler: string; color: string; accent: string; short: string };

function TeamCard({ name, info }: { name: string; info: TeamInfo }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: `1px solid ${info.accent}44`, borderRadius: 12, padding: '16px 14px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -16, right: -16, width: 80, height: 80, borderRadius: '50%', background: info.color, opacity: 0.15, filter: 'blur(20px)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${info.color}, ${info.accent})` }} />
      <div style={{ width: 48, height: 48, borderRadius: '50%', background: `linear-gradient(135deg, ${info.color}, ${info.accent}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color: '#fff', fontFamily: 'Barlow Condensed, sans-serif', boxShadow: `0 0 16px ${info.color}55`, border: `2px solid ${info.accent}55`, marginBottom: 8 }}>{info.short}</div>
      <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 12, fontWeight: 800, color: '#fff', marginBottom: 6 }}>{name}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>⚡ {info.captain}</span>
        <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>🎯 {info.bowler}</span>
      </div>
    </motion.div>
  );
}

export default function PredictForm({ showTeamCards = false, teamData = {} }: {
  showTeamCards?: boolean;
  teamData?: Record<string, TeamInfo>;
}) {
  const [teams, setTeams] = useState<string[]>([]);
  const [venues, setVenues] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ team1: '', team2: '', venue: '', toss_winner: '', toss_decision: 'bat' });

  useEffect(() => {
    getTeams().then(setTeams);
    getVenues().then(v => setVenues([...new Set(v)]));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setResult(null); setError('');
  };

  const handleSubmit = async () => {
    if (!form.team1 || !form.team2 || !form.venue || !form.toss_winner) { setError('Please fill all fields.'); return; }
    if (form.team1 === form.team2) { setError('Team 1 and Team 2 cannot be the same.'); return; }
    setLoading(true); setError('');
    try {
      const res = await predictMatch(form);
      setResult(res);
    } catch {
      setError('Cannot connect to API. Make sure the backend is running.');
    } finally { setLoading(false); }
  };

  return (
    <div>
      {/* Team cards shown after selection */}
      <AnimatePresence>
        {showTeamCards && (form.team1 || form.team2) && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20, overflow: 'hidden' }}>
            {form.team1 && teamData[form.team1] && <TeamCard name={form.team1} info={teamData[form.team1]} />}
            {form.team2 && teamData[form.team2] && <TeamCard name={form.team2} info={teamData[form.team2]} />}
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <div>
          <label style={labelStyle}>Team 1 — Batting First</label>
          <select name="team1" value={form.team1} onChange={handleChange} style={inputStyle}>
            <option value="">Select team</option>
            {teams.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Team 2 — Chasing</label>
          <select name="team2" value={form.team2} onChange={handleChange} style={inputStyle}>
            <option value="">Select team</option>
            {teams.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={labelStyle}>Venue</label>
        <select name="venue" value={form.venue} onChange={handleChange} style={inputStyle}>
          <option value="">Select venue</option>
          {venues.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <div>
          <label style={labelStyle}>Toss Winner</label>
          <select name="toss_winner" value={form.toss_winner} onChange={handleChange} style={inputStyle}>
            <option value="">Select</option>
            {form.team1 && <option value={form.team1}>{form.team1}</option>}
            {form.team2 && <option value={form.team2}>{form.team2}</option>}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Toss Decision</label>
          <select name="toss_decision" value={form.toss_decision} onChange={handleChange} style={inputStyle}>
            <option value="bat">Bat First</option>
            <option value="field">Field First</option>
          </select>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ marginBottom: 14, padding: '10px 14px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171', fontSize: 12, fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '0.05em', borderRadius: 6 }}>
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button onClick={handleSubmit} disabled={loading}
        whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
        style={{ width: '100%', padding: '14px 24px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', background: loading ? 'rgba(245,184,0,0.3)' : 'linear-gradient(90deg, #F5B800, #C49200)', color: '#060612', fontFamily: 'Barlow Condensed, sans-serif', fontSize: 16, fontWeight: 800, letterSpacing: '0.15em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, borderRadius: 4 }}>
        {loading ? (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            style={{ width: 18, height: 18, border: '2px solid #060612', borderTopColor: 'transparent', borderRadius: '50%' }} />
        ) : '🏏 PREDICT WINNER'}
      </motion.button>

      {result && <ResultCard result={result} />}
    </div>
  );
}
