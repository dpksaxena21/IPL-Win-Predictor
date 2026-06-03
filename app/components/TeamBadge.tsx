'use client';

import { motion } from 'framer-motion';

const TEAMS: Record<string, { bg: string; accent: string; short: string; gradient: string }> = {
  'Mumbai Indians':              { bg: '#004BA0', accent: '#00BFFF', short: 'MI',   gradient: 'linear-gradient(135deg, #004BA0, #0066CC)' },
  'Chennai Super Kings':         { bg: '#FDB913', accent: '#FF6B00', short: 'CSK',  gradient: 'linear-gradient(135deg, #FDB913, #FF8C00)' },
  'Royal Challengers Bengaluru': { bg: '#C8102E', accent: '#FFD700', short: 'RCB',  gradient: 'linear-gradient(135deg, #C8102E, #8B0000)' },
  'Kolkata Knight Riders':       { bg: '#3A225D', accent: '#F0C040', short: 'KKR',  gradient: 'linear-gradient(135deg, #3A225D, #5C3D8F)' },
  'Delhi Capitals':              { bg: '#0078BC', accent: '#EF1C25', short: 'DC',   gradient: 'linear-gradient(135deg, #0078BC, #EF1C25)' },
  'Rajasthan Royals':            { bg: '#EA1A85', accent: '#004BA0', short: 'RR',   gradient: 'linear-gradient(135deg, #EA1A85, #C0006A)' },
  'Punjab Kings':                { bg: '#ED1B24', accent: '#A7A9AC', short: 'PBKS', gradient: 'linear-gradient(135deg, #ED1B24, #B01218)' },
  'Sunrisers Hyderabad':         { bg: '#F7A721', accent: '#EF1C25', short: 'SRH',  gradient: 'linear-gradient(135deg, #F7A721, #E8860A)' },
  'Gujarat Titans':              { bg: '#1C4E9D', accent: '#00BFFF', short: 'GT',   gradient: 'linear-gradient(135deg, #1C4E9D, #0A3070)' },
  'Lucknow Super Giants':        { bg: '#A72056', accent: '#00BFFF', short: 'LSG',  gradient: 'linear-gradient(135deg, #A72056, #7A1840)' },
};

const sizes = {
  sm: { outer: 36, font: 10 },
  md: { outer: 52, font: 13 },
  lg: { outer: 72, font: 17 },
  xl: { outer: 96, font: 22 },
};

export default function TeamBadge({ team, size = 'md', animate = true }: {
  team: string; size?: 'sm' | 'md' | 'lg' | 'xl'; animate?: boolean;
}) {
  const t = TEAMS[team] || { bg: '#333', accent: '#888', short: team.slice(0, 3).toUpperCase(), gradient: 'linear-gradient(135deg, #333, #555)' };
  const s = sizes[size];
  return (
    <motion.div
      whileHover={animate ? { scale: 1.08 } : {}}
      whileTap={animate ? { scale: 0.95 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      style={{
        width: s.outer, height: s.outer, borderRadius: '50%',
        background: t.gradient,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: s.font, fontWeight: 800, color: '#fff', flexShrink: 0,
        boxShadow: `0 0 24px ${t.bg}55, 0 0 48px ${t.bg}22`,
        border: `2px solid ${t.accent}55`,
        letterSpacing: '0.04em', cursor: 'default', userSelect: 'none',
        fontFamily: 'Barlow Condensed, sans-serif',
      }}
    >
      {t.short}
    </motion.div>
  );
}
