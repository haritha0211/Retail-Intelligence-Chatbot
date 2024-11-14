import React, { useState } from 'react'; 
import {
  MessageSquare, X, Send, ShoppingBag, Mic, Search, User, ShoppingCart, Star, TrendingUp
} from 'lucide-react';
import './customer.css';

const EcommerceInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I can help you find the perfect product. What are you looking for today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [loading, setLoading] = useState(0); 
  const [product, setProduct] = useState(null); 

  const apiUrl = "http://127.0.0.1:8000"; // Replace with your FastAPI URL

  const products = [
    { id: 1, name: "WORLD WAR 2 GLIDERS ASSTD DESIGNS", description: "Vintage collection of assorted WW2 model gliders", price: "$24.99", rating: 4.5, trending: true, category: "Vintage" },
    //...other products
  ];

  // Function to send text input to API
  const askTextQuestion = async (question) => {
    setLoading(1);
    try {
      const response = await fetch(`${apiUrl}/ask/text`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });
      const data = await response.json();
      setLoading(2);
      setProduct(data);
      setMessages(prevMessages => [...prevMessages, { type: 'bot', content: data.answer }]);
    } catch (error) {
      console.error("Error sending text question:", error);
    }
  };

  // Function to handle "Enter" key press in the search bar
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      askTextQuestion(searchQuery);
      setSearchQuery(''); // Clear the input field after sending the question
    }
  };

  // Function to handle voice input and send it to the API
  const handleVoiceInput = () => {
    setIsRecording(true);
    setTimeout(async () => {
      setIsRecording(false);
      const simulatedQuestion = "Show me kitchen products"; 
      await askTextQuestion(simulatedQuestion);
    }, 2000);
  };

  const getSearchSuggestions = (query) => {
    return products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="navbar sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 flex-shrink-0">
            <ShoppingBag className="icon" />
            <span className="text-xl font-bold logo-text">RetroShop</span>
          </div>

          {/* Search Bar */}
          <div className="search_bar">
            <div className="relative flex items-center">
              <Search className="icon left-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchSuggestions(e.target.value.length > 0);
                }}
                onKeyDown={handleKeyDown} // Detect "Enter" key press
                placeholder="product assistant..."
                className="search-input"
              />
              <button onClick={handleVoiceInput} className="voice-button">
                <Mic className={`icon ${isRecording ? 'text-red-500' : 'text-gray-400'}`} />
              </button>
            </div>
            
            {/* Search Suggestions */}
            {/* {showSearchSuggestions && (
              <div className="suggestions">
                {getSearchSuggestions(searchQuery).map(product => (
                  <div key={product.id} className="suggestion-item">
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.category} • {product.price}</p>
                  </div>
                ))}
              </div>
            )} */}
          </div>

          <div className="flex items-center gap-4">
            <button className="icon-button"><ShoppingCart className="icon" /></button>
            <button className="icon-button"><User className="icon" /></button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {loading === 0 ? (
        <main className="container mx-auto px-4 py-8 main-content">
          <section>
            <div className="section-title">
              <TrendingUp className="icon" />
              <h2>Trending Now</h2>
            </div>
            <div className="product-grid">
              {products.filter(product => product.trending).map(product => (
                <div key={product.id} className="product-card">
                  <div className="card-content">
                    <div className="category-tag">{product.category}</div>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="card-footer">
                      <span className="product-price">{product.price}</span>
                      <div className="rating">
                        <Star className="icon star-icon" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    <button className="add-to-cart-button">
                      <ShoppingCart className="icon" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      ) : loading === 2 && product ? (
        <div key={product.id} className="product-card mt-10">
                  <div className="card-content">
                    <div className="category-tag">{product.category}</div>
                    <div className=" flex flex-row"><h2 className='mr-4'>Question:{"  "} </h2>{product.question}</div>
                    <div className="product-description flex flex-row"><h2 className='mr-4'>Answer: </h2>{product.answer}</div>
                    <div className="card-footer">
                      <span className="product-price">{product.price}</span>
                      <div className="rating">
                        <Star className="icon star-icon" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                   
                  </div>
                </div>
      ) : null}
    </div>
  );
};

export default EcommerceInterface;