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
Please contact our customer service team to initiate a return. We will provide you with a return shipping label.
You may exchange unworn and unwashed items within 30 days of purchase for a different size or color.
You can track your order using the tracking number provided in your shipping confirmation email.   
We accept cards payments from like Visa, Mastercard, American Express, Discover, and PayPal.
Yes, your payment information is secure. We use SSL encryption to protect your information.
You may be able to modify or cancel your order if it has not yet shipped. Please contact our customer service team as soon as possible.
Please refer to our sizing chart for accurate measurements.
Our products are made from high-quality materials, such as cotton, linen, and wool.
Please follow the care instructions on the garment label.
Yes, we offer gift wrapping for an additional fee.
Please see our privacy policy for more information.
You can contact our customer service team by email at [email address], by phone at [phone number], or by live chat on our website.
Our customer service team is available Monday-Friday, 9am-5pm EST
We offer sizes S, M, L, XL, and XXL. You can find the size guide on the product page for more details.
They are made from 100% cotton with a soft, breathable finish, making it comfortable for all-day wear.
Yes, it is available in multiple colors, including Black, Navy Blue, White, and Red. You can choose the color on the product page.
Sure! You can view additional images of the product from different angles on the product page. We also offer a 360-degree view.
We have a detailed size guide available on each product page. It will help you select the best size based on your measurements.
If a size is out of stock, you can sign up for a restock notification. We’ll let you know as soon as the size becomes available again.
If the item doesn't fit, we offer free exchanges or returns within 30 days from the date of delivery. Please ensure the product is unworn, unwashed, and in its original condition.
Yes, we ship worldwide. International shipping charges will apply, and delivery times vary depending on your location.
Orders are usually processed within 2-3 business days. Standard shipping typically takes 5-7 business days, while express shipping takes 2-3 business days.
Absolutely! Once your order is shipped, you'll receive a tracking number via email, which you can use to track your package.
If your order hasn’t been shipped yet, you can update the shipping address by contacting our customer service team. If the order is already dispatched, we may not be able to change the address.
Yes, your payment information is processed securely through a payment gateway with industry-standard encryption. We never store your credit card information.
Unfortunately, only one promo code can be used per order. If you have multiple codes, we recommend using the one with the highest discount.
To initiate a return or exchange, please visit the Returns & Exchanges page, where you can print a return label. Simply pack the item(s) in the original packaging and drop it off at your nearest courier.
Returns are typically processed within 7-10 business days once we receive the item. You’ll receive an email confirmation once your return has been processed.
Sale or discounted items are only eligible for return if they are in unused, unworn condition with all tags attached. Please refer to our return policy for specific terms.
Yes, refunds will be issued to your original payment method. 
You can reach our customer service team by clicking on the "Contact Us" link at the bottom of the page. 
If there’s an issue with your order, please contact us through our Contact Us page with your order number, and we’ll help resolve the issue as quickly as possible.
Yes, we offer gift wrapping for most products. You can select the gift wrap option during checkout.
Yes, we regularly run promotions and sales. You can check our Sales page for current discounts. Don’t forget to sign up for our newsletter to receive updates about future sales!
At checkout, you’ll see an option to enter your discount code. Simply input the code and click "Apply" to see the discount applied to your total order.
We strive to offer eco-friendly and sustainable products. Many of our clothing lines use organic cotton, recycled fabrics, and low-impact dyes. Look for the Sustainable Collection label for more details.
Yes, we ensure that all our clothes are ethically produced. Our manufacturers comply with fair labor practices and adhere to strict environmental guidelines.
Yes, we accept old clothes for recycling.
Yes, we offer both physical and digital gift cards. You can purchase them on our website and send them to friends or family.
the payment methods used are card, UPI and Netbanking
Based on the average sales growth and upcoming promotional campaigns, next month's revenue is expected to be around 200,000
he most loyal customer is John, who has made 20 purchases in the last 6 months and spent an average of rupees 5000 per order
Based on our analysis, Jane Smith, who hasn’t made a purchase in the last 3 months, is at risk of churn
The highest-selling item for the past month is the ‘Classic White T-shirt’, with 500 units sold
The lowest-selling item is the ‘Red Denim Jacket’, with only 5 units sold last month
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
