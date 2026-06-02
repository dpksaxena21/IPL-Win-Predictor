import TeamBadge from './TeamBadge';
import { PredictResponse } from '@/lib/api';

export default function ResultCard({ result }: { result: PredictResponse }) {
  const t1 = result.team1_win_probability;
  const t2 = result.team2_win_probability;
  const confidenceColor = {
    High: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-red-100 text-red-800',
  }[result.confidence] || 'bg-gray-100 text-gray-800';

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Prediction Result</h2>
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${confidenceColor}`}>
          {result.confidence} confidence
        </span>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex flex-col items-center gap-2 w-28">
          <TeamBadge team={result.team1} size="lg" />
          <span className="text-xs text-center text-gray-600 font-medium leading-tight">{result.team1}</span>
          <span className="text-2xl font-bold text-gray-900">{t1}%</span>
        </div>

        <div className="flex-1 flex flex-col items-center gap-3">
          <div className="text-xs text-gray-400 font-medium">WIN PROBABILITY</div>
          <div className="w-full h-4 rounded-full overflow-hidden bg-gray-100 flex">
            <div
              className="h-full rounded-l-full transition-all duration-700"
              style={{ width: `${t1}%`, backgroundColor: '#004BA0' }}
            />
            <div
              className="h-full rounded-r-full transition-all duration-700"
              style={{ width: `${t2}%`, backgroundColor: '#FDB913' }}
            />
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-500">Predicted winner</span>
            <span className="text-sm font-semibold text-gray-900">{result.predicted_winner}</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 w-28">
          <TeamBadge team={result.team2} size="lg" />
          <span className="text-xs text-center text-gray-600 font-medium leading-tight">{result.team2}</span>
          <span className="text-2xl font-bold text-gray-900">{t2}%</span>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Model: {result.model_used}</span>
          <span>IPL Win Predictor v1.0</span>
        </div>
      </div>
    </div>
  );
}