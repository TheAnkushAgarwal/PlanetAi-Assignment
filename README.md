# PDF Question Answering Application

## Overview

This application allows users to upload PDF documents and ask questions related to the content of these documents. It leverages natural language processing (NLP) with LangChain  to process questions and provide accurate answers. The application consists of a FastAPI backend and a React.js frontend, with SQLite for metadata storage and local storage for uploaded PDFs.

---

## Features

1. **PDF Upload**:

   - Users can upload PDF documents.
   - Extracts and stores text content from uploaded PDFs for processing.

2. **Question Answering**:

   - Users can ask questions related to the uploaded PDFs.
   - The system provides answers based on the document content.
   - Includes the ability to ask follow-up questions on the same document.

3. **Responsive UI**:

   - A clean and interactive frontend built with React.js.
   - Feedback mechanisms during uploads and question processing.

---

## Architecture

### Components

1. **Backend** (FastAPI):

   - Handles PDF uploads, text extraction, and question processing.
   - Utilizes LangChain for NLP.
   - Stores metadata in SQLite

2. **Frontend** (React.js):

   - Provides an interface for uploading PDFs and asking questions.
   - Displays answers and handles user interactions.

3. **Database**:

   - Stores document metadata (e.g., filenames, extracted text).
   - SQLite for local development&#x20;

4. **File Storage**:

   - Stores uploaded PDFs locally

---

## Setup Instructions

### Prerequisites

1. **Backend Requirements**:

   - Python 3.8 or above
   - FastAPI
   - SQLite or PostgreSQL

2. **Frontend Requirements**:

   - Node.js 16 or above
   - npm 

3. **Environment Variables**:

   - `OPENAI_API_KEY`: Your OpenAI API key for LangChain integration.
   - Optional: Database connection string for PostgreSQL (if applicable).

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/TheAnkushAgarwal/PlanetAi-Assignment.git
   cd PlanetAi-Assignment
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory:
     ```env
     OPENAI_API_KEY=your_openai_api_key

     ```

4. Start the backend server:

   ```bash
   uvicorn app.main:app --reload
   ```

The backend will be accessible at `http://localhost:8000`.

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React development server:

   ```bash
   npm start
   ```

The frontend will be accessible at `http://localhost:3000`.

---

## API Documentation

### Endpoints

#### 1. **Upload PDF**

- **Endpoint**: `POST /upload/`
- **Description**: Upload a PDF document.
- **Request**:
  - Form Data: `file` (PDF file)
- **Response**:
  ```json
  {
    "id": "document_id",
    "filename": "uploaded_filename"
  }
  ```

#### 2. **Ask Question**

- **Endpoint**: `POST /ask/`
- **Description**: Ask a question about an uploaded document.
- **Request**:
  ```json
  {
    "document_id": "document_id",
    "question": "What is the content of the first section?"
  }
  ```
- **Response**:
  ```json
  {
    "answer": "The first section discusses...",
    "has_conversation_history": true
  }
  ```

---

## Future Improvements

1. **Cloud Storage**:
   - Integrate AWS S3 for storing PDFs.
2. **Authentication**:
   - Add user authentication for document privacy.

---

## Contact

For any questions or feedback, please reach out to:

- **Name**: Ankush Agarwal
- **Email**: [[ankush.agarwal.202@example.com](mailto\:ankush.agarwal.202@example.com)]
- **GitHub**: [https\://github.com/TheAnkushAgarwal]

