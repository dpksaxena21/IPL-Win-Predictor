const TEAM_COLORS: Record<string, { bg: string; text: string; short: string }> = {
  'Mumbai Indians': { bg: '#004BA0', text: '#FFFFFF', short: 'MI' },
  'Chennai Super Kings': { bg: '#FDB913', text: '#1A1A1A', short: 'CSK' },
  'Royal Challengers Bengaluru': { bg: '#C8102E', text: '#FFFFFF', short: 'RCB' },
  'Kolkata Knight Riders': { bg: '#3A225D', text: '#F0C040', short: 'KKR' },
  'Delhi Capitals': { bg: '#0078BC', text: '#FFFFFF', short: 'DC' },
  'Rajasthan Royals': { bg: '#EA1A85', text: '#FFFFFF', short: 'RR' },
  'Punjab Kings': { bg: '#ED1B24', text: '#FFFFFF', short: 'PBKS' },
  'Sunrisers Hyderabad': { bg: '#F7A721', text: '#1A1A1A', short: 'SRH' },
  'Gujarat Titans': { bg: '#1C4E9D', text: '#FFFFFF', short: 'GT' },
  'Lucknow Super Giants': { bg: '#A72056', text: '#FFFFFF', short: 'LSG' },
};

export default function TeamBadge({ team, size = 'md' }: { team: string; size?: 'sm' | 'md' | 'lg' }) {
  const colors = TEAM_COLORS[team] || { bg: '#888', text: '#fff', short: team.slice(0, 2).toUpperCase() };
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-12 h-12 text-sm', lg: 'w-16 h-16 text-base' };

  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-bold flex-shrink-0`}
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {colors.short}
    </div>
  );
}