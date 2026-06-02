import PredictForm from '@/components/PredictForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
              <span className="text-white text-xs font-bold">IPL</span>
            </div>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Win Predictor</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            IPL match prediction
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            XGBoost + Random Forest ensemble trained on 19 seasons of IPL data (2008–2026). 
            Select two teams, venue and toss details to get win probability.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-500">70.5% accuracy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-xs text-gray-500">1,169 matches</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-xs text-gray-500">SHAP explainability</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <PredictForm />
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">19</div>
            <div className="text-xs text-gray-400 mt-1">Seasons</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">283K</div>
            <div className="text-xs text-gray-400 mt-1">Balls analyzed</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">13</div>
            <div className="text-xs text-gray-400 mt-1">Features</div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          Built by Deepak Saxena · MSc Data Science · Chandigarh University
        </div>

      </div>
    </main>
  );
}