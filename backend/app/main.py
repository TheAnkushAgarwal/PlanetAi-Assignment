from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from .database import SessionLocal
from .services import save_pdf_and_extract_text, process_question
from .schemas import PDFUploadResponse, QuestionRequest
import shutil
import os

# FastAPI application setup with CORS middleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directory for storing uploaded PDF files
UPLOAD_FOLDER = "./uploaded_pdfs/"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Endpoint for handling PDF file uploads
@app.post("/upload/", response_model=PDFUploadResponse)
async def upload_pdf(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    pdf_doc = save_pdf_and_extract_text(file_path, file.filename)
    return PDFUploadResponse(id=pdf_doc.id, filename=pdf_doc.filename, upload_date=pdf_doc.upload_date.isoformat())

# Endpoint for processing questions about uploaded documents
@app.post("/ask/")
def ask_question(request: QuestionRequest):
    response = process_question(request.document_id, request.question)
    if "error" in response:
        raise HTTPException(status_code=404, detail=response["error"])
    return response
