from pydantic import BaseModel

# Response schema for successful PDF uploads
class PDFUploadResponse(BaseModel):
    id: int
    filename: str
    upload_date: str

# Request schema for document questions
class QuestionRequest(BaseModel):
    document_id: int
    question: str
