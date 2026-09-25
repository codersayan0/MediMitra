# MediMitra Backend

FastAPI + MongoDB Atlas backend for MediMitra — Phase 1 (Patient auth).

## Setup
\`\`\`bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env       # fill in MONGODB_URI, JWT_SECRET_KEY, EMAILJS_* etc.
uvicorn app.main:app --reload --port 8000
\`\`\`

Docs: http://localhost:8000/docs · http://localhost:8000/redoc

## Deploy (Render)
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Add all `.env` vars in Render's Environment tab (never commit `.env`).