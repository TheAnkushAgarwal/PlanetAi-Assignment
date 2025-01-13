from .database import SessionLocal, PDFDocument
from .utils import extract_text_from_pdf
from langchain_openai import ChatOpenAI  # Updated import
from langchain.prompts import PromptTemplate
from langchain.schema import HumanMessage
from langchain.memory import ConversationBufferMemory

from dotenv import load_dotenv
import os

load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

if not openai_api_key:
    raise ValueError("OPENAI_API_KEY not found")

# Dictionary to store conversation memories for each document
document_memories = {}

# Database operations for retrieving documents
def get_document_by_id(document_id: str):
    db = SessionLocal()
    document = db.query(PDFDocument).filter(PDFDocument.id == document_id).first()
    db.close()
    return document

# Handles PDF upload and text extraction
def save_pdf_and_extract_text(file_path: str, filename: str):
    text_content = extract_text_from_pdf(file_path)
    db = SessionLocal()
    new_doc = PDFDocument(filename=filename, text_content=text_content)
    db.add(new_doc)
    db.commit()
    db.refresh(new_doc)
    return new_doc

# Processes user questions using ChatGPT with conversation memory
def process_question(document_id: str, question: str):
    # Initialize ChatOpenAI with conservative temperature
    llm = ChatOpenAI(
        model_name="gpt-3.5-turbo",
        api_key=openai_api_key,
        temperature=0
    )

    # Maintain conversation history per document
    if document_id not in document_memories:
        document_memories[document_id] = ConversationBufferMemory()
    
    # Load your document
    document = get_document_by_id(document_id)
    if not document:
        return {"error": "Document not found"}

    try:
        # Get or create memory for this document
        memory = document_memories[document_id]

        # Get conversation history
        conversation_history = memory.load_memory_variables({})
        history = conversation_history.get("history", "")

        # Prepare the prompt with conversation history
        prompt = PromptTemplate(
            input_variables=["context", "history", "question"],
            template="Context: {context}\n\nConversation History: {history}\n\nCurrent Question: {question}\n\nAnswer the current question based on the context and previous conversation if relevant."
        )
        
        formatted_prompt = prompt.format(
            context=document.text_content,
            history=history,
            question=question
        )

        # Create a chat message
        message = HumanMessage(content=formatted_prompt)

        # Generate the response
        response = llm.invoke([message])
        
        # Save the interaction to memory
        memory.save_context(
            {"input": question},
            {"output": response.content}
        )

        return {
            "answer": response.content,
            "has_conversation_history": bool(history)
        }
    except Exception as e:
        return {"error": f"Error processing question: {str(e)}"}
