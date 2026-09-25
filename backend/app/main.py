import logging

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import ValidationError

from app.api.routes import auth as auth_routes
from app.api.routes import health as health_routes
from app.core.config import get_settings
from app.core.database import close_connection, connect_and_init_indexes
from app.schemas.common import ApiResponse

logging.basicConfig(level=logging.INFO)
settings = get_settings()

app = FastAPI(
    title="MediMitra API",
    description="Backend for the MediMitra healthcare platform — Patient auth (Phase 1).",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(status_code=exc.status_code, content=ApiResponse(success=False, message=str(exc.detail)).model_dump())


@app.exception_handler(ValidationError)
async def validation_exception_handler(request: Request, exc: ValidationError):
    return JSONResponse(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, content=ApiResponse(success=False, message="Validation failed.").model_dump())


@app.on_event("startup")
async def on_startup():
    await connect_and_init_indexes()


@app.on_event("shutdown")
async def on_shutdown():
    await close_connection()


app.include_router(health_routes.router, prefix="/api")
app.include_router(auth_routes.router, prefix="/api")


@app.post("/api/auth/logout", response_model=ApiResponse[dict])
async def logout():
    # Stateless JWT — logout is enforced client-side by discarding the token.
    return ApiResponse(success=True, message="Logged out.")