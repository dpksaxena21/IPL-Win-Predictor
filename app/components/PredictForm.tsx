'use client';

import { useState, useEffect } from 'react';
import { getTeams, getVenues, predictMatch, PredictResponse } from '@/lib/api';
import ResultCard from './ResultCard';

export default function PredictForm() {
  const [teams, setTeams] = useState<string[]>([]);
  const [venues, setVenues] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    team1: '',
    team2: '',
    venue: '',
    toss_winner: '',
    toss_decision: 'bat',
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
      setError('Failed to get prediction. Make sure the API is running.');
    } finally {
      setLoading(false);
    }
  };

  const selectClass = "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  const labelClass = "block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide";

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelClass}>Team 1 (batting first)</label>
          <select name="team1" value={form.team1} onChange={handleChange} className={selectClass}>
            <option value="">Select team</option>
            {teams.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Team 2 (chasing)</label>
          <select name="team2" value={form.team2} onChange={handleChange} className={selectClass}>
            <option value="">Select team</option>
            {teams.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className={labelClass}>Venue</label>
        <select name="venue" value={form.venue} onChange={handleChange} className={selectClass}>
          <option value="">Select venue</option>
          {venues.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className={labelClass}>Toss winner</label>
          <select name="toss_winner" value={form.toss_winner} onChange={handleChange} className={selectClass}>
            <option value="">Select toss winner</option>
            {form.team1 && <option value={form.team1}>{form.team1}</option>}
            {form.team2 && <option value={form.team2}>{form.team2}</option>}
          </select>
        </div>
        <div>
          <label className={labelClass}>Toss decision</label>
          <select name="toss_decision" value={form.toss_decision} onChange={handleChange} className={selectClass}>
            <option value="bat">Bat first</option>
            <option value="field">Field first</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3.5 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-700 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Predicting...' : 'Predict Winner →'}
      </button>

      {result && <ResultCard result={result} />}
    </div>
  );
}