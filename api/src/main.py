from fastapi import FastAPI, Request, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from typing import Optional

from api.src.services.rag_service import query_rag_system, query_rag_system_with_selection

app = FastAPI()

origins = [
    "http://localhost:3000",  # Allow Docusaurus frontend
    # Add other allowed origins if necessary
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Exception handler for validation errors
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=jsonable_encoder({"detail": exc.errors(), "body": exc.body}),
    )

# General exception handler
@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An unexpected error occurred."},
    )

class QueryRequest(BaseModel):
    query: str

class QuerySelectionRequest(BaseModel):
    selected_text: str
    query: Optional[str] = None

@app.get("/")
async def read_root():
    return {"message": "RAG Chatbot API is running"}

@app.post("/query")
async def query_chatbot(request: QueryRequest):
    try:
        response = await query_rag_system(request.query)
        return response
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@app.post("/query-selection")
async def query_chatbot_selection(request: QuerySelectionRequest):
    try:
        response = await query_rag_system_with_selection(request.selected_text, request.query)
        return response
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))



