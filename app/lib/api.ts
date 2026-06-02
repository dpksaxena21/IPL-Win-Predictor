const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001';

export interface PredictRequest {
  team1: string;
  team2: string;
  venue: string;
  toss_winner: string;
  toss_decision: string;
}

export interface PredictResponse {
  team1: string;
  team2: string;
  team1_win_probability: number;
  team2_win_probability: number;
  predicted_winner: string;
  model_used: string;
  confidence: string;
}

export async function getTeams(): Promise<string[]> {
  const res = await fetch(`${API_URL}/teams`);
  const data = await res.json();
  return data.teams;
}

export async function getVenues(): Promise<string[]> {
  const res = await fetch(`${API_URL}/venues`);
  const data = await res.json();
  return data.venues;
}

export async function predictMatch(req: PredictRequest): Promise<PredictResponse> {
  const res = await fetch(`${API_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error('Prediction failed');
  return res.json();
}