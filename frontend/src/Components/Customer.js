import React, { useState } from 'react';

const ChatbotInterface = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I assist you today?", isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Sample product recommendations
  const recommendations = [
    { id: 1, name: "Premium Headphones", price: "$99.99", rating: 4.5 },
    { id: 2, name: "Wireless Mouse", price: "$29.99", rating: 4.2 },
    { id: 3, name: "Mechanical Keyboard", price: "$79.99", rating: 4.7 }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setMessages(prev => [
      ...prev,
      { id: prev.length + 1, text: inputMessage, isBot: false }
    ]);
    setInputMessage('');
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: prev.length + 1, text: "I'm processing your request. How else can I help?", isBot: true }
      ]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col min-h-screen relative">
      {/* Main Product Content */}
      <div className="flex-1 bg-white rounded-lg shadow-lg p-6 mb-20">
        <h2 className="text-2xl font-bold mb-6">Recommended Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map(product => (
            <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-blue-500 font-bold mt-2">{product.price}</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500">★</span>
                <span className="ml-1">{product.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Help Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition-colors"
        >
          Need Help?
        </button>
      )}

      {/* Chat Overlay */}
      {isChatOpen && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-10">
          <div className="max-w-4xl mx-auto">
            {/* Chat Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold">Chat Support</h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>

            {/* Chat Messages */}
            <div className="p-4 max-h-64 overflow-y-auto">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[70%] rounded-lg px-4 py-2 ${message.isBot ? 'bg-gray-100' : 'bg-blue-500 text-white'}`}>
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="border-t p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-lg border p-2 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotInterface;