from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
import os

app = FastAPI(title="IPL Win Predictor API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, '..', 'models')

xgb_model = joblib.load(os.path.join(MODELS_DIR, 'xgb_v2_model.pkl'))
rf_model = joblib.load(os.path.join(MODELS_DIR, 'rf_v2_model.pkl'))
le_team = joblib.load(os.path.join(MODELS_DIR, 'le_team.pkl'))
le_venue = joblib.load(os.path.join(MODELS_DIR, 'le_venue.pkl'))
feature_cols = joblib.load(os.path.join(MODELS_DIR, 'feature_cols_v2.pkl'))
features_df = joblib.load(os.path.join(MODELS_DIR, 'features_df.pkl'))

team_wins = {}
team_matches = {}
for _, row in features_df.iterrows():
    t1, t2 = row['team1'], row['team2']
    team_matches[t1] = team_matches.get(t1, 0) + 1
    team_matches[t2] = team_matches.get(t2, 0) + 1
    if row['team1_won'] == 1:
        team_wins[t1] = team_wins.get(t1, 0) + 1
    else:
        team_wins[t2] = team_wins.get(t2, 0) + 1

venue_winrate = features_df.groupby('venue')['team1_won'].mean().to_dict()

TEAMS = sorted(le_team.classes_.tolist())
VENUES = sorted(le_venue.classes_.tolist())

class PredictRequest(BaseModel):
    team1: str
    team2: str
    venue: str
    toss_winner: str
    toss_decision: str

class PredictResponse(BaseModel):
    team1: str
    team2: str
    team1_win_probability: float
    team2_win_probability: float
    predicted_winner: str
    model_used: str
    confidence: str

@app.get("/")
def root():
    return {"message": "IPL Win Predictor API", "status": "running", "version": "1.0.0"}

@app.get("/teams")
def get_teams():
    return {"teams": TEAMS}

@app.get("/venues")
def get_venues():
    return {"venues": VENUES}

@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    t1_enc = le_team.transform([req.team1])[0]
    t2_enc = le_team.transform([req.team2])[0]
    v_enc = le_venue.transform([req.venue])[0]
    toss_is_t1 = 1 if req.toss_winner == req.team1 else 0
    toss_bat = 1 if req.toss_decision == 'bat' else 0
    t1_wr = team_wins.get(req.team1, 0) / max(team_matches.get(req.team1, 1), 1)
    t2_wr = team_wins.get(req.team2, 0) / max(team_matches.get(req.team2, 1), 1)
    wr_diff = t1_wr - t2_wr
    venue_wr = venue_winrate.get(req.venue, 0.5)
    t1_titles = features_df[features_df['team1'] == req.team1]['team1_titles'].iloc[0] if len(features_df[features_df['team1'] == req.team1]) > 0 else 0
    t2_titles = features_df[features_df['team1'] == req.team2]['team1_titles'].iloc[0] if len(features_df[features_df['team1'] == req.team2]) > 0 else 0
    title_diff = t1_titles - t2_titles

    h2h_key = tuple(sorted([req.team1, req.team2]))
    h2h_data = features_df[
        ((features_df['team1'] == req.team1) & (features_df['team2'] == req.team2)) |
        ((features_df['team1'] == req.team2) & (features_df['team2'] == req.team1))
    ]
    t1_h2h = len(h2h_data[h2h_data['match_won_by'] == req.team1]) if 'match_won_by' in h2h_data.columns else 0
    total_h2h = len(h2h_data)
    h2h_wr = t1_h2h / max(total_h2h, 1)

    input_data = pd.DataFrame([[
        t1_enc, t2_enc, v_enc, toss_is_t1, toss_bat,
        t1_wr, t2_wr, wr_diff, venue_wr,
        t1_titles, t2_titles, title_diff, h2h_wr
    ]], columns=feature_cols)

    xgb_prob = xgb_model.predict_proba(input_data)[0]
    rf_prob = rf_model.predict_proba(input_data)[0]
    ensemble_prob = (xgb_prob + rf_prob) / 2

    t1_prob = round(float(ensemble_prob[1]) * 100, 1)
    t2_prob = round(float(ensemble_prob[0]) * 100, 1)
    winner = req.team1 if t1_prob > 50 else req.team2
    confidence = "High" if abs(t1_prob - 50) > 15 else "Medium" if abs(t1_prob - 50) > 8 else "Low"

    return PredictResponse(
        team1=req.team1,
        team2=req.team2,
        team1_win_probability=t1_prob,
        team2_win_probability=t2_prob,
        predicted_winner=winner,
        model_used="XGBoost + Random Forest Ensemble",
        confidence=confidence
    )

@app.get("/health")
def health():
    return {"status": "healthy", "models_loaded": True}