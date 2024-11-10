import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, ShoppingBag, Mic, Search, User, ShoppingCart, Star, TrendingUp } from 'lucide-react';
import './customer.css';
const [text, setText] = useState("");
  
    const [response, setResponse] = useState("");

    //api request.
    
    const sendRequest = async () => {
        if (!text) {
          alert("Please provide text ");
          return;
        }
    
       
        const formData = new FormData();
        formData.append("prompt", text);
       
    
    
        try {
          const res = await axios.get(
            "http://localhost:8000/"
            // formData,
            // {
            //   headers: {
            //     "Content-Type": "multipart/form-data",
            //   },
            // }
          );

          console.log("Response from backend:", res.data); 
          setResponse(res.data.response);
    
        } catch (error) {
          console.error("Error sending request:", error); // Add this line
          alert("Error sending request");
        }
      };
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

  // Filtered products based on searchQuery
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          className="w-full p-2 border rounded-lg focus:outline-none"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSearchSuggestions(true)}
          onBlur={() => setShowSearchSuggestions(false)}
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <Mic className={`mic-button ${isRecording ? 'recording' : ''}`} onClick={() => setIsRecording(!isRecording)} />
        </div>
        {showSearchSuggestions && (
          <div className="search-suggestions">
            {filteredProducts.map((product) => (
              <div key={product.id} className="p-2 hover:bg-gray-100">
                {product.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.price}</p>
              <div className="flex items-center gap-2">
                {[...Array(Math.round(product.rating))].map((_, i) => (
                  <Star key={i} className="text-yellow-400" />
                ))}
                <span className="text-gray-400 text-sm">({product.rating})</span>
                {product.trending && <TrendingUp className="text-red-500" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
