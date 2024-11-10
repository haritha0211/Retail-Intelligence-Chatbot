import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, ShoppingBag, Mic, Search, User, ShoppingCart, Star, TrendingUp } from 'lucide-react';
import './customer.css';
// You can use both Tailwind classes and custom classes
const EcommerceInterface = () => {
  // States for different features
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

  // Product data with actual image URLs
  const products = [
    {
      id: 1,
      name: "WORLD WAR 2 GLIDERS ASSTD DESIGNS",
      price: "$24.99",
      image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e",
      rating: 4.5,
      trending: true,
      category: "Vintage"
    },
    {
      id: 2,
      name: "JUMBO BAG RED RETROSPOT",
      price: "$19.99",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
      rating: 4.8,
      trending: true,
      category: "Bags"
    },
    {
      id: 3,
      name: "ASSORTED COLOUR BIRD ORNAMENT",
      price: "$12.99",
      image: "https://images.unsplash.com/photo-1590075865003-5da53bc08a0d",
      rating: 4.3,
      trending: false,
      category: "Decor"
    },
    {
      id: 4,
      name: "POPCORN HOLDER",
      price: "$9.99",
      image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f",
      rating: 4.6,
      trending: true,
      category: "Kitchen"
    },
    {
      id: 5,
      name: "PACK OF 72 RETROSPOT CAKE CASES",
      price: "$7.99",
      image: "https://images.unsplash.com/photo-1557925923-cd4648e211a0",
      rating: 4.7,
      trending: true,
      category: "Kitchen"
    }
  ];

  // Simulated voice input handling
  const handleVoiceInput = () => {
    setIsRecording(true);
    // Simulate voice recognition delay
    setTimeout(() => {
      setIsRecording(false);
      handleChatbotMessage("Show me kitchen products");
    }, 2000);
  };

  // Search suggestions based on query
  const getSearchSuggestions = (query) => {
    return products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Chatbot product recommendations
  const recommendProducts = (preference) => {
    const recommendations = products.filter(product => 
      product.category.toLowerCase().includes(preference.toLowerCase())
    );
    return recommendations.slice(0, 2);
  };

  const handleChatbotMessage = (userMessage) => {
    const newUserMessage = {
      id: messages.length + 1,
      type: 'user',
      content: userMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newUserMessage]);

    setTimeout(() => {
      let botResponse;
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('kitchen') || lowerMessage.includes('cook')) {
        const recommendations = recommendProducts('Kitchen');
        botResponse = {
          id: messages.length + 2,
          type: 'bot',
          content: "Here are some great kitchen items you might like:",
          recommendations: recommendations,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      } else if (lowerMessage.includes('vintage') || lowerMessage.includes('retro')) {
        const recommendations = recommendProducts('Vintage');
        botResponse = {
          id: messages.length + 2,
          type: 'bot',
          content: "Check out these vintage-inspired products:",
          recommendations: recommendations,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      } else {
        botResponse = {
          id: messages.length + 2,
          type: 'bot',
          content: "I can help you find products in these categories: Kitchen, Vintage, Decor, or Bags. What interests you?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md px-4 py-3 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-xl">RetroShop</span>
          </div>

          {/* Search Bar with Voice Input */}
          <div className="relative flex-1 max-w-xl mx-4">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchSuggestions(e.target.value.length > 0);
                }}
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              <button 
                onClick={() => handleVoiceInput()}
                className={`absolute right-3 p-1 rounded-full ${isRecording ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>

            {/* Search Suggestions */}
            {showSearchSuggestions && (
              <div className="absolute top-full left-0 right-0 bg-white mt-1 rounded-lg shadow-lg border border-gray-100 max-h-96 overflow-y-auto z-50">
                {getSearchSuggestions(searchQuery).map(product => (
                  <div key={product.id} className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <img src="/api/placeholder/48/48" alt={product.name} className="w-12 h-12 rounded object-cover" />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.category}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ShoppingCart className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        {/* Trending Products Section */}
        <section className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold">Trending Now</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.filter(product => product.trending).map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img src="/api/placeholder/400/300" alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-600 font-bold">{product.price}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Chatbot */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 flex items-center gap-2"
        >
          <MessageSquare className="w-6 h-6" />
          <span>Need Help?</span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-2xl flex flex-col z-50">
          {/* Chatbot Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Product Assistant</h3>
                <p className="text-sm text-blue-100">Find the perfect product</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-blue-100 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: '400px' }}>
            {messages.map((message) => (
              <div key={message.id} className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block max-w-[80%] ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100'} rounded-lg px-4 py-2`}>
                  <p>{message.content}</p>
                  {message.recommendations && (
                    <div className="mt-2 space-y-2">
                      {message.recommendations.map(product => (
                        <div key={product.id} className="bg-white rounded-lg p-2 shadow-sm">
                          <div className="flex items-center gap-2">
                            <img src="/api/placeholder/48/48" alt={product.name} className="w-12 h-12 rounded object-cover" />
                            <div>
                              <p className="font-medium text-sm">{product.name}</p>
                              <p className="text-blue-600">{product.price}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input with Voice Button */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.target.elements.message;
              if (input.value.trim()) {
                handleChatbotMessage(input.value);
                input.value = '';
              }
            }}
            className="border-t p-4"
          >
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  name="message"
                  placeholder="Type your message..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full ${isRecording ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Mic className="w-5 h-5" />
                </button>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EcommerceInterface;