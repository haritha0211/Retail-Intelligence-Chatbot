import React, { useState } from 'react';
import { MessageSquare, X, Send, ShoppingBag, Mic, Search, User, ShoppingCart, Star, TrendingUp } from 'lucide-react';

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

  const products = [
    { id: 1, name: "WORLD WAR 2 GLIDERS ASSTD DESIGNS", description: "Vintage collection of assorted WW2 model gliders", price: "$24.99", rating: 4.5, trending: true, category: "Vintage" },
    { id: 2, name: "JUMBO BAG RED RETROSPOT", description: "Large capacity retro-styled shopping bag", price: "$19.99", rating: 4.8, trending: true, category: "Bags" },
    { id: 3, name: "ASSORTED COLOUR BIRD ORNAMENT", description: "Decorative ceramic bird collection", price: "$12.99", rating: 4.3, trending: false, category: "Decor" },
    { id: 4, name: "POPCORN HOLDER", description: "Vintage-style popcorn container", price: "$9.99", rating: 4.6, trending: true, category: "Kitchen" },
    { id: 5, name: "PACK OF 72 RETROSPOT CAKE CASES", description: "Retro-designed cupcake liners", price: "$7.99", rating: 4.7, trending: true, category: "Kitchen" }
  ];

  const handleVoiceInput = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      handleChatbotMessage("Show me kitchen products");
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
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 flex-shrink-0">
            <ShoppingBag className="icon" />
            <span className="text-xl font-bold">RetroShop</span>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-xl mx-4">
            <div className="relative flex items-center">
              <Search className="icon left-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchSuggestions(e.target.value.length > 0);
                }}
                placeholder="Search products..."
                className="search-input"
              />
              <button onClick={handleVoiceInput} className="voice-button">
                <Mic className={`icon ${isRecording ? 'text-red-500' : 'text-gray-400'}`} />
              </button>
            </div>

            {/* Search Suggestions */}
            {showSearchSuggestions && (
              <div className="suggestions">
                {getSearchSuggestions(searchQuery).map(product => (
                  <div key={product.id} className="suggestion-item">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.category} • {product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button className="icon-button"><ShoppingCart className="icon" /></button>
            <button className="icon-button"><User className="icon" /></button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
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
    </div>
  );
};

export default EcommerceInterface;
