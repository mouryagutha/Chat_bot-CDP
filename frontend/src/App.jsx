import { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatMessage from './components/ChatMessage';
import LoadingDots from './components/LoadingDots';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isIndexed, setIsIndexed] = useState(false);
  const [selectedCDP, setSelectedCDP] = useState('segment');
  const messagesEndRef = useRef(null);

  const CDP_OPTIONS = {
    segment: 'Segment',
    mparticle: 'mParticle',
    lytics: 'Lytics',
    zeotap: 'Zeotap'
  };

  const indexDocumentation = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://chat-bot-cdp.vercel.app/api/index/${selectedCDP}`);
      if (response.data.success) {
        setIsIndexed(true);
        setMessages(prev => [...prev, {
          type: 'bot',
          content: `Documentation for ${CDP_OPTIONS[selectedCDP]} indexed successfully! You can now ask questions.`
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Error indexing documentation. Please try again.'
      }]);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!isIndexed) {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Please index the documentation first!'
      }]);
      return;
    }

    const userMessage = input.trim();
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.get(`https://chat-bot-cdp.vercel.app/api/ask?query=${encodeURIComponent(userMessage)}`);
      setMessages(prev => [...prev, { type: 'bot', content: response.data.answer }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto p-4 overflow-auto">
        {!isIndexed && (
          <div className="text-center my-4 space-y-4">
            <div className="flex justify-center items-center gap-4">
              <select
                value={selectedCDP}
                onChange={(e) => setSelectedCDP(e.target.value)}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              >
                {Object.entries(CDP_OPTIONS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <button
                onClick={indexDocumentation}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={isLoading}
              >
                {isLoading ? 'Indexing...' : 'Index Documentation'}
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4 mb-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {isLoading && <LoadingDots />}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="sticky bottom-0 bg-white p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ask a question..."
              disabled={isLoading || !isIndexed}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
              disabled={isLoading || !isIndexed}
            >
              Send
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default App;
