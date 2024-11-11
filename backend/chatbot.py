from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
from transformers import pipeline
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import speech_recognition as sr
import tempfile



# Initialize the app and the pipeline
app = FastAPI()
qa_pipeline = pipeline("question-answering")

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust as necessary
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the context for the chatbot
context = """
Standard shipping takes 5-7 business days within the US.
Express shipping takes 2-3 business days within the US.
Yes, we ship to most countries worldwide, like India, Madagascar, SA, etc. 
You may return unworn and unwashed items within 30 days of purchase for a full refund or exchange.
... (other FAQs go here)
"""

# Define the request body model for text input
class QuestionRequest(BaseModel):
    question: str

@app.post("/ask/text")
async def ask_question_text(request: QuestionRequest):
    question = request.question
    print(question)
    try:
        # Use the pipeline to answer the question
        result = qa_pipeline(question=question, context=context)
        return {"question": question, "answer": result['answer']}
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while processing the question.")

@app.post("/ask/audio")
async def ask_question_audio(file: UploadFile = File(...)):
    recognizer = sr.Recognizer()
    try:
        # Save the uploaded audio file to a temporary file
        with tempfile.NamedTemporaryFile(delete=True) as temp_audio:
            temp_audio.write(file.file.read())
            temp_audio.flush()
            
            # Load the audio file for processing
            with sr.AudioFile(temp_audio.name) as source:
                audio_data = recognizer.record(source)

            # Recognize speech using Google Web Speech API
            text = recognizer.recognize_google(audio_data)

        # Use the pipeline to answer the question
        result = qa_pipeline(question=text, context=context)
        return {"question": text, "answer": result['answer']}
    except sr.UnknownValueError:
        raise HTTPException(status_code=400, detail="Could not understand the audio.")
    except sr.RequestError as e:
        raise HTTPException(status_code=500, detail=f"Speech recognition service error: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while processing the audio question.")
