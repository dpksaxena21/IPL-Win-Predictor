'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTeams, getVenues, predictMatch, PredictResponse } from '@/lib/api';
import ResultCard from './ResultCard';
import TeamBadge from './TeamBadge';

export interface Team {
  id: string;
  name: string;
  colors: string[];
  captain: string;
  keyBowler: string;
}

const selectStyle = {
  width: '100%', padding: '12px 14px',
  background: 'rgba(0,0,0,0.4)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8, color: '#fff', fontSize: 14,
  fontFamily: 'Barlow, sans-serif',
  outline: 'none', cursor: 'pointer',
  appearance: 'none' as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='%23666' d='M5 7L0 2h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: 36,
  transition: 'border-color 0.2s',
};

const labelStyle = {
  display: 'block' as const,
  color: 'rgba(255,255,255,0.6)',
  fontSize: 11, fontWeight: 600,
  letterSpacing: '0.1em',
  marginBottom: 6,
  textTransform: 'uppercase' as const,
  fontFamily: 'Barlow Condensed, sans-serif',
};

export default function PredictForm({ teams }: { teams: Team[] }) {
  const [venues, setVenues] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ team1: '', team2: '', venue: '', toss_winner: '', toss_decision: 'bat' });

  const team1obj = teams.find(t => t.name === form.team1);
  const team2obj = teams.find(t => t.name === form.team2);

  useEffect(() => {
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
    <div style={{ width: '100%', maxWidth: 800, margin: '0 auto', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '28px 28px', position: 'relative', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
      {/* Corner brackets */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 32, height: 32, borderTop: '2px solid rgba(245,184,0,0.5)', borderLeft: '2px solid rgba(245,184,0,0.5)', borderRadius: '12px 0 0 0' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: 32, height: 32, borderTop: '2px solid rgba(245,184,0,0.5)', borderRight: '2px solid rgba(245,184,0,0.5)', borderRadius: '0 12px 0 0' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 32, height: 32, borderBottom: '2px solid rgba(245,184,0,0.5)', borderLeft: '2px solid rgba(245,184,0,0.5)', borderRadius: '0 0 0 12px' }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, borderBottom: '2px solid rgba(245,184,0,0.5)', borderRight: '2px solid rgba(245,184,0,0.5)', borderRadius: '0 0 12px 0' }} />

      <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: 24, fontWeight: 600, color: '#fff', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ display: 'inline-block', width: 6, height: 24, background: '#F5B800', borderRadius: 3 }} />
        SELECT MATCH
      </h2>

      {/* Team selectors + cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={labelStyle}>Home Team</label>
            <select name="team1" value={form.team1} onChange={handleChange} style={selectStyle}>
              <option value="">Select Team 1</option>
              {teams.filter(t => t.name !== form.team2).map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
            </select>
          </div>
          <AnimatePresence>
            {team1obj && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <TeamBadge id={team1obj.id} name={team1obj.name} gradientStart={team1obj.colors[0]} gradientEnd={team1obj.colors[1]} captain={team1obj.captain} keyBowler={team1obj.keyBowler} showDetails={true} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={labelStyle}>Away Team</label>
            <select name="team2" value={form.team2} onChange={handleChange} style={selectStyle}>
              <option value="">Select Team 2</option>
              {teams.filter(t => t.name !== form.team1).map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
            </select>
          </div>
          <AnimatePresence>
            {team2obj && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <TeamBadge id={team2obj.id} name={team2obj.name} gradientStart={team2obj.colors[0]} gradientEnd={team2obj.colors[1]} captain={team2obj.captain} keyBowler={team2obj.keyBowler} showDetails={true} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Venue</label>
        <select name="venue" value={form.venue} onChange={handleChange} style={selectStyle}>
          <option value="">Select venue</option>
          {venues.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div>
          <label style={labelStyle}>Toss Winner</label>
          <select name="toss_winner" value={form.toss_winner} onChange={handleChange} style={selectStyle}>
            <option value="">Select</option>
            {form.team1 && <option value={form.team1}>{form.team1}</option>}
            {form.team2 && <option value={form.team2}>{form.team2}</option>}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Toss Decision</label>
          <select name="toss_decision" value={form.toss_decision} onChange={handleChange} style={selectStyle}>
            <option value="bat">Bat First</option>
            <option value="field">Bowl First</option>
          </select>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ marginBottom: 14, padding: '10px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontSize: 13, borderRadius: 8 }}>
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={handleSubmit} disabled={!form.team1 || !form.team2 || loading}
        style={{ width: '100%', padding: '16px 24px', border: 'none', borderRadius: 8, cursor: (!form.team1 || !form.team2 || loading) ? 'not-allowed' : 'pointer', background: '#F5B800', color: '#000', fontFamily: '"Barlow Condensed", sans-serif', fontSize: 20, fontWeight: 700, letterSpacing: '0.1em', boxShadow: '0 0 20px rgba(245,184,0,0.4)', opacity: (!form.team1 || !form.team2) ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s' }}>
        {loading ? (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            style={{ width: 20, height: 20, border: '2px solid #000', borderTopColor: 'transparent', borderRadius: '50%' }} />
        ) : <><span>🏏</span> PREDICT WINNER</>}
      </button>

      {result && <ResultCard result={result} team1obj={team1obj} team2obj={team2obj} />}
    </div>
  );
}
