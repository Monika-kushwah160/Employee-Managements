from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routes.employees import router as employee_router

app = FastAPI(title="Employee Management API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employee_router)


@app.get("/")
def root():
    return {"message": "Employee API is running"}


@app.get("/health")
def health():
    return {"status": "ok"}
