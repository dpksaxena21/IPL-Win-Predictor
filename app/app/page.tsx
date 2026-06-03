'use client';

import { motion } from 'framer-motion';
import PredictForm from '@/components/PredictForm';

const TEAMS: Record<string, { captain: string; bowler: string; color: string; accent: string; short: string }> = {
  'Mumbai Indians':              { captain: 'Rohit Sharma',     bowler: 'Jasprit Bumrah',    color: '#004BA0', accent: '#00BFFF', short: 'MI'   },
  'Chennai Super Kings':         { captain: 'MS Dhoni',         bowler: 'Deepak Chahar',     color: '#FDB913', accent: '#FF6B00', short: 'CSK'  },
  'Royal Challengers Bengaluru': { captain: 'Virat Kohli',      bowler: 'Mohammed Siraj',    color: '#C8102E', accent: '#FFD700', short: 'RCB'  },
  'Kolkata Knight Riders':       { captain: 'Shreyas Iyer',     bowler: 'Sunil Narine',      color: '#3A225D', accent: '#F0C040', short: 'KKR'  },
  'Delhi Capitals':              { captain: 'Rishabh Pant',     bowler: 'Axar Patel',        color: '#0078BC', accent: '#EF1C25', short: 'DC'   },
  'Rajasthan Royals':            { captain: 'Sanju Samson',     bowler: 'Yuzvendra Chahal',  color: '#EA1A85', accent: '#004BA0', short: 'RR'   },
  'Punjab Kings':                { captain: 'Shikhar Dhawan',   bowler: 'Arshdeep Singh',    color: '#ED1B24', accent: '#A7A9AC', short: 'PBKS' },
  'Sunrisers Hyderabad':         { captain: 'Pat Cummins',      bowler: 'Bhuvneshwar Kumar', color: '#F7A721', accent: '#EF1C25', short: 'SRH'  },
  'Gujarat Titans':              { captain: 'Shubman Gill',     bowler: 'Mohit Sharma',      color: '#1C4E9D', accent: '#00BFFF', short: 'GT'   },
  'Lucknow Super Giants':        { captain: 'KL Rahul',         bowler: 'Avesh Khan',        color: '#A72056', accent: '#00BFFF', short: 'LSG'  },
};

function TeamCard({ name }: { name: string }) {
  const t = TEAMS[name];
  if (!name || !t) return null;
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: `1px solid ${t.accent}44`, borderRadius: 14, padding: '18px 16px', position: 'relative', overflow: 'hidden', flex: 1 }}>
      <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: t.color, opacity: 0.15, filter: 'blur(24px)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${t.color}, ${t.accent})` }} />
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: `linear-gradient(135deg, ${t.color}, ${t.accent}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, color: '#fff', fontFamily: 'Barlow Condensed, sans-serif', boxShadow: `0 0 20px ${t.color}66`, border: `2px solid ${t.accent}66`, marginBottom: 10 }}>{t.short}</div>
      <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 13, fontWeight: 800, color: '#fff', letterSpacing: '0.04em', marginBottom: 8 }}>{name}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: t.accent, flexShrink: 0 }} />
          <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>⚡ {t.captain}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
          <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>🎯 {t.bowler}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#060612', position: 'relative', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600;700;800&family=Barlow:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060612; font-family: 'Barlow', sans-serif; }
        select option { background: #13131f; color: #fff; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #F5B800; border-radius: 2px; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes drift { 0%{transform:translate(0,0)} 50%{transform:translate(30px,-20px)} 100%{transform:translate(0,0)} }
        .live { animation: pulse 1.5s ease-in-out infinite; }
        .drift1 { animation: drift 8s ease-in-out infinite; }
        .drift2 { animation: drift 10s ease-in-out infinite reverse; }
      `}</style>

      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div className="drift1" style={{ position: 'absolute', top: '-10%', left: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,184,0,0.1) 0%, transparent 70%)' }} />
        <div className="drift2" style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,75,180,0.1) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: '40%', left: '30%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,16,46,0.05) 0%, transparent 70%)' }} />
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.02 }}>
          <defs><pattern id="g" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M 50 0 L 0 0 0 50" fill="none" stroke="#F5B800" strokeWidth="0.5"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 940, margin: '0 auto', padding: '0 16px 80px' }}>

        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          style={{ background: 'linear-gradient(90deg, #F5B800, #FFD84D, #F5B800)', padding: '8px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 12, fontWeight: 800, color: '#060612', letterSpacing: '0.18em' }}>🏏 IPL WIN PREDICTOR · AI-POWERED</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div className="live" style={{ width: 7, height: 7, borderRadius: '50%', background: '#060612' }} />
            <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 11, fontWeight: 800, color: '#060612', letterSpacing: '0.15em' }}>LIVE</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(245,184,0,0.12)', borderTop: 'none', padding: '48px 36px 36px', position: 'relative', overflow: 'hidden', marginBottom: 3 }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: 60, height: 60, borderLeft: '2px solid rgba(245,184,0,0.5)', borderTop: '2px solid rgba(245,184,0,0.5)' }} />
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: 60, height: 60, borderRight: '2px solid rgba(245,184,0,0.5)', borderBottom: '2px solid rgba(245,184,0,0.5)' }} />
          <div style={{ fontSize: 11, letterSpacing: '0.22em', color: '#F5B800', marginBottom: 16, fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600 }}>TATA IPL · SEASON 2026 · MACHINE LEARNING ENGINE</div>
          <h1 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(44px, 8vw, 88px)', fontWeight: 800, lineHeight: 0.88, color: '#fff', marginBottom: 20 }}>
            WHO WINS<br /><span style={{ color: '#F5B800', textShadow: '0 0 40px rgba(245,184,0,0.5)' }}>TONIGHT?</span>
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', maxWidth: 500, lineHeight: 1.7, marginBottom: 36, fontWeight: 300 }}>XGBoost + Random Forest ensemble. 283,000+ deliveries across 19 IPL seasons. Select your match and get instant AI win probability.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {[
              { num: '70.5%', label: 'Model Accuracy', sub: 'XGB + RF Ensemble', color: '#4ade80' },
              { num: '283K',  label: 'Balls Analyzed',  sub: '19 Seasons Data',   color: '#60a5fa' },
              { num: '1,169', label: 'Matches Trained', sub: 'Stratified Split',  color: '#F5B800' },
              { num: '13',    label: 'Features Built',  sub: 'SHAP Explainability',color: '#c084fc' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.08 }}
                style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: `1px solid ${s.color}33`, borderRadius: 12, padding: '16px 14px', position: 'relative', overflow: 'hidden', boxShadow: `0 4px 20px ${s.color}15` }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 32, fontWeight: 800, color: s.color, lineHeight: 1, marginBottom: 6 }}>{s.num}</div>
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.06em', marginBottom: 3 }}>{s.label}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'Barlow Condensed, sans-serif' }}>{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(245,184,0,0.18)', padding: '28px 36px', boxShadow: '0 0 60px rgba(245,184,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div style={{ width: 3, height: 24, background: 'linear-gradient(180deg, #F5B800, #C49200)', borderRadius: 2 }} />
            <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '0.1em' }}>SELECT MATCH</span>
          </div>
          <PredictForm showTeamCards={true} teamData={TEAMS} />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          style={{ marginTop: 20, textAlign: 'center' }}>
          <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.12em' }}>DEEPAK SAXENA · MSC DATA SCIENCE · CHANDIGARH UNIVERSITY</span>
        </motion.div>
      </div>
    </main>
  );
}
