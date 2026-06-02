'use client';

import { motion } from 'framer-motion';

const TEAMS: Record<string, { bg: string; accent: string; short: string; gradient: string }> = {
  'Mumbai Indians':                { bg: '#004BA0', accent: '#00BFFF', short: 'MI',   gradient: 'linear-gradient(135deg, #004BA0, #00BFFF)' },
  'Chennai Super Kings':           { bg: '#FDB913', accent: '#FF6B00', short: 'CSK',  gradient: 'linear-gradient(135deg, #FDB913, #FF6B00)' },
  'Royal Challengers Bengaluru':   { bg: '#C8102E', accent: '#FFD700', short: 'RCB',  gradient: 'linear-gradient(135deg, #C8102E, #FFD700)' },
  'Kolkata Knight Riders':         { bg: '#3A225D', accent: '#F0C040', short: 'KKR',  gradient: 'linear-gradient(135deg, #3A225D, #F0C040)' },
  'Delhi Capitals':                { bg: '#0078BC', accent: '#EF1C25', short: 'DC',   gradient: 'linear-gradient(135deg, #0078BC, #EF1C25)' },
  'Rajasthan Royals':              { bg: '#EA1A85', accent: '#004BA0', short: 'RR',   gradient: 'linear-gradient(135deg, #EA1A85, #004BA0)' },
  'Punjab Kings':                  { bg: '#ED1B24', accent: '#A7A9AC', short: 'PBKS', gradient: 'linear-gradient(135deg, #ED1B24, #A7A9AC)' },
  'Sunrisers Hyderabad':           { bg: '#F7A721', accent: '#EF1C25', short: 'SRH',  gradient: 'linear-gradient(135deg, #F7A721, #EF1C25)' },
  'Gujarat Titans':                { bg: '#1C4E9D', accent: '#00BFFF', short: 'GT',   gradient: 'linear-gradient(135deg, #1C4E9D, #00BFFF)' },
  'Lucknow Super Giants':          { bg: '#A72056', accent: '#00BFFF', short: 'LSG',  gradient: 'linear-gradient(135deg, #A72056, #00BFFF)' },
};

const sizes = {
  sm:  { outer: 32,  font: 10 },
  md:  { outer: 52,  font: 14 },
  lg:  { outer: 72,  font: 18 },
  xl:  { outer: 96,  font: 22 },
};

export default function TeamBadge({ team, size = 'md', animate = true }: {
  team: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
}) {
  const t = TEAMS[team] || { bg: '#333', accent: '#888', short: team.slice(0,2).toUpperCase(), gradient: 'linear-gradient(135deg, #333, #888)' };
  const s = sizes[size];

  return (
    <motion.div
      whileHover={animate ? { scale: 1.1, rotate: 5 } : {}}
      whileTap={animate ? { scale: 0.95 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      style={{
        width: s.outer,
        height: s.outer,
        borderRadius: '50%',
        background: t.gradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: s.font,
        fontWeight: 800,
        color: '#fff',
        flexShrink: 0,
        boxShadow: `0 0 20px ${t.bg}66, 0 0 40px ${t.bg}33`,
        border: `2px solid ${t.accent}44`,
        letterSpacing: '0.05em',
        cursor: 'default',
        userSelect: 'none',
      }}
    >
      {t.short}
    </motion.div>
  );
}