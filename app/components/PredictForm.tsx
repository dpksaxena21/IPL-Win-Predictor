'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTeams, getVenues, predictMatch, PredictResponse } from '@/lib/api';
import ResultCard from './ResultCard';

const selectStyle = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: 12,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.04)',
  color: '#ffffff',
  fontSize: 14,
  outline: 'none',
  cursor: 'pointer',
  appearance: 'none' as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 14px center',
  paddingRight: 40,
  transition: 'border-color 0.2s, background 0.2s',
};

const labelStyle = {
  display: 'block' as const,
  fontSize: 11,
  fontWeight: 600,
  color: '#5a5a7a',
  marginBottom: 8,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
};

export default function PredictForm() {
  const [teams, setTeams] = useState<string[]>([]);
  const [venues, setVenues] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    team1: '', team2: '', venue: '', toss_winner: '', toss_decision: 'bat',
  });

  useEffect(() => {
    getTeams().then(setTeams);
    getVenues().then(setVenues);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setResult(null);
    setError('');
  };

  const handleSubmit = async () => {
    if (!form.team1 || !form.team2 || !form.venue || !form.toss_winner) {
      setError('Please fill all fields.');
      return;
    }
    if (form.team1 === form.team2) {
      setError('Team 1 and Team 2 cannot be the same.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await predictMatch(form);
      setResult(res);
    } catch {
      setError('Failed to connect to API. Make sure the backend is running on port 8001.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <div>
          <label style={labelStyle}>Team 1 — batting first</label>
          <select name="team1" value={form.team1} onChange={handleChange} style={selectStyle}>
            <option value="">Select team</option>
            {teams.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Team 2 — chasing</label>
          <select name="team2" value={form.team2} onChange={handleChange} style={selectStyle}>
            <option value="">Select team</option>
            {teams.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={labelStyle}>Venue</label>
        <select name="venue" value={form.venue} onChange={handleChange} style={selectStyle}>
          <option value="">Select venue</option>
          {[...new Set(venues)].map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <div>
          <label style={labelStyle}>Toss winner</label>
          <select name="toss_winner" value={form.toss_winner} onChange={handleChange} style={selectStyle}>
            <option value="">Select</option>
            {form.team1 && <option value={form.team1}>{form.team1}</option>}
            {form.team2 && <option value={form.team2}>{form.team2}</option>}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Toss decision</label>
          <select name="toss_decision" value={form.toss_decision} onChange={handleChange} style={selectStyle}>
            <option value="bat">Bat first</option>
            <option value="field">Field first</option>
          </select>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              marginBottom: 16, padding: '12px 16px', borderRadius: 10,
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              color: '#f87171', fontSize: 13,
            }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleSubmit}
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        style={{
          width: '100%', padding: '14px 24px', borderRadius: 12, border: 'none',
          background: loading ? 'rgba(245,184,0,0.3)' : 'linear-gradient(135deg, #F5B800, #C49200)',
          color: '#0a0a0f', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
          letterSpacing: '0.02em', transition: 'background 0.2s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}
      >
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            style={{ width: 18, height: 18, border: '2px solid #0a0a0f', borderTopColor: 'transparent', borderRadius: '50%' }}
          />
        ) : '🏏 Predict Winner'}
      </motion.button>

      {result && <ResultCard result={result} />}
    </div>
  );
}