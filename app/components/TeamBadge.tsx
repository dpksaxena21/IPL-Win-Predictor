'use client';
import { motion } from 'framer-motion';

interface TeamBadgeProps {
  id: string;
  name: string;
  gradientStart: string;
  gradientEnd: string;
  captain?: string;
  keyBowler?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDetails?: boolean;
}

const sizeMap = { sm: 40, md: 56, lg: 80, xl: 96 };
const fontMap = { sm: 11, md: 14, lg: 18, xl: 22 };

export default function TeamBadge({ id, name, gradientStart, gradientEnd, captain, keyBowler, size = 'md', showDetails = false }: TeamBadgeProps) {
  const px = sizeMap[size];
  const fs = fontMap[size];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, height: showDetails ? '100%' : 'auto' }}>
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        style={{
          width: px, height: px, borderRadius: '50%',
          background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: fs, fontWeight: 900, color: '#fff',
          fontFamily: '"Barlow Condensed", sans-serif',
          boxShadow: `0 0 24px ${gradientStart}88, 0 0 48px ${gradientStart}33`,
          border: `2px solid ${gradientEnd}66`,
          flexShrink: 0, userSelect: 'none', cursor: 'default',
        }}
      >{id}</motion.div>
      {showDetails && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          style={{ width: '100%', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: `1px solid ${gradientEnd}33`, borderRadius: 12, padding: '14px 16px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${gradientStart}, ${gradientEnd})` }} />
          <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: gradientStart, opacity: 0.15, filter: 'blur(20px)' }} />
          <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: 13, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{name}</div>
          {captain && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginBottom: 4, fontFamily: 'Barlow, sans-serif' }}>⚡ {captain}</div>}
          {keyBowler && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'Barlow, sans-serif' }}>🎯 {keyBowler}</div>}
        </motion.div>
      )}
    </div>
  );
}
