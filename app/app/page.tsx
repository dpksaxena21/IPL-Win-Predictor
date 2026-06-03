'use client';
import { motion } from 'framer-motion';
import PredictForm from '@/components/PredictForm';

export const TEAMS = [
  { id: 'MI',   name: 'Mumbai Indians',              colors: ['#004BA0', '#00A1FF'], captain: 'Hardik Pandya',    keyBowler: 'Jasprit Bumrah'      },
  { id: 'CSK',  name: 'Chennai Super Kings',          colors: ['#F9CD05', '#F25C19'], captain: 'Ruturaj Gaikwad', keyBowler: 'Matheesha Pathirana' },
  { id: 'RCB',  name: 'Royal Challengers Bengaluru',  colors: ['#C8102E', '#EC1C24'], captain: 'Virat Kohli',     keyBowler: 'Mohammed Siraj'      },
  { id: 'KKR',  name: 'Kolkata Knight Riders',        colors: ['#3A225D', '#B3A123'], captain: 'Shreyas Iyer',    keyBowler: 'Sunil Narine'        },
  { id: 'SRH',  name: 'Sunrisers Hyderabad',          colors: ['#F26522', '#F9A01B'], captain: 'Pat Cummins',     keyBowler: 'Bhuvneshwar Kumar'   },
  { id: 'RR',   name: 'Rajasthan Royals',             colors: ['#EA1A85', '#001D48'], captain: 'Sanju Samson',    keyBowler: 'Yuzvendra Chahal'    },
  { id: 'DC',   name: 'Delhi Capitals',               colors: ['#0078BC', '#EF1C25'], captain: 'Rishabh Pant',    keyBowler: 'Axar Patel'          },
  { id: 'PBKS', name: 'Punjab Kings',                 colors: ['#ED1B24', '#A7A9AC'], captain: 'Shikhar Dhawan',  keyBowler: 'Arshdeep Singh'      },
  { id: 'GT',   name: 'Gujarat Titans',               colors: ['#1C4E9D', '#00BFFF'], captain: 'Shubman Gill',    keyBowler: 'Mohit Sharma'        },
  { id: 'LSG',  name: 'Lucknow Super Giants',         colors: ['#A72056', '#00BFFF'], captain: 'KL Rahul',        keyBowler: 'Avesh Khan'          },
];

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#060612', position: 'relative', overflowX: 'hidden', paddingBottom: 80 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600;700;800&family=Barlow:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060612; font-family: 'Barlow', sans-serif; }
        select option { background: #13131f; color: #fff; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #F5B800; border-radius: 2px; }
        @keyframes blob { 0%,100%{transform:scale(1);opacity:0.15} 50%{transform:scale(1.1);opacity:0.25} }
        .blob1 { animation: blob 10s ease-in-out infinite; }
        .blob2 { animation: blob 12s ease-in-out infinite; }
        .blob3 { animation: blob 8s ease-in-out infinite; }
      `}</style>

      {/* Animated background blobs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div className="blob1" style={{ position: 'absolute', top: '10%', left: '-10%', width: '50%', height: '50%', borderRadius: '50%', background: '#F5B800', filter: 'blur(150px)' }} />
        <div className="blob2" style={{ position: 'absolute', top: '20%', right: '-10%', width: '50%', height: '50%', borderRadius: '50%', background: '#004BA0', filter: 'blur(150px)' }} />
        <div className="blob3" style={{ position: 'absolute', bottom: '-10%', right: '20%', width: '40%', height: '40%', borderRadius: '50%', background: '#EC1C24', filter: 'blur(150px)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.2, backgroundImage: 'linear-gradient(rgba(245,184,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(245,184,0,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', padding: '60px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

        {/* HERO */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 48, textAlign: 'center' }}>
          <h1 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: 'clamp(52px, 8vw, 96px)', fontWeight: 700, color: '#fff', lineHeight: 0.9, letterSpacing: '0.02em', marginBottom: 20 }}>
            WHO WINS <br /><span style={{ color: '#F5B800' }}>TONIGHT?</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, maxWidth: 420, lineHeight: 1.7, fontWeight: 300 }}>
            Advanced ML model analyzing historical IPL data, pitch conditions, and team form to predict match outcomes.
          </p>
        </motion.div>

        {/* PREDICT FORM */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <PredictForm teams={TEAMS} />
        </motion.div>

      </div>
    </main>
  );
}
