# Employee Management Full Stack

React + FastAPI + PostgreSQL + SQLAlchemy + Alembic + Docker.

## Local backend

```bash
cp .env.example .env
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

API docs: http://localhost:8000/docs

## Local frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173

## Docker

```bash
docker compose up --build
```

Then open:
- Frontend: http://localhost:5173
- API: http://localhost:8000
- Swagger: http://localhost:8000/docs

## Architecture

Browser -> React -> FastAPI -> SQLAlchemy -> PostgreSQL

Docker Compose runs three services:
- frontend
- backend
- db

Alembic creates the database schema.
