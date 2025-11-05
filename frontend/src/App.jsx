import { useState, useRef } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatMessage from "./components/ChatMessage";
import LoadingDots from "./components/LoadingDots";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isIndexed, setIsIndexed] = useState(false);
  const [selectedCDP, setSelectedCDP] = useState("segment");
  const [previousCDP, setPreviousCDP] = useState("segment");
  const messagesEndRef = useRef(null);

  const CDP_OPTIONS = {
    segment: "Segment",
    mparticle: "mParticle",
    lytics: "Lytics",
    zeotap: "Zeotap",
  };

  // Handle CDP Selection Change
  const handleCDPChange = (e) => {
    const newCDP = e.target.value;
    setSelectedCDP(newCDP);

    if (newCDP !== previousCDP) {
      setIsIndexed(false); // Reset indexing state if a new CDP is selected
    }
  };

  // Clear chat messages only
  const handleClearChat = () => {
    setMessages([]); // Clear all messages
  };

  const indexDocumentation = async () => {
    if (isIndexed && selectedCDP === previousCDP) {
      return; // Do nothing if the same CDP is already indexed
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:4000/api/index/${selectedCDP}`
      );
      if (response.data.success) {
        setIsIndexed(true);
        setPreviousCDP(selectedCDP);
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content: `Documentation for ${CDP_OPTIONS[selectedCDP]} indexed successfully! You can now ask questions.`,
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: "Error indexing documentation. Please try again.",
        },
      ]);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!isIndexed) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", content: "Please index the documentation first!" },
      ]);
      return;
    }

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { type: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:4000/api/ask?query=${encodeURIComponent(
          userMessage
        )}`
      );
      setMessages((prev) => [
        ...prev,
        { type: "bot", content: response.data.answer },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header with Clear Chat Button */}
      <Header>
        <button
          onClick={handleClearChat}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg ml-auto"
        >
          Clear Chat
        </button>
      </Header>

      {/* CDP Selection & Indexing - Positioned Under Header */}
      <div className="bg-gray-100 p-4 flex justify-center items-center gap-4 shadow-md">
        <select
          value={selectedCDP}
          onChange={handleCDPChange}
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
          {isIndexed && selectedCDP === previousCDP
            ? "Indexed ✓"
            : "Index Documentation"}
        </button>
      </div>

      {/* Chat Messages */}
      <main className="flex-1 container mx-auto p-4 overflow-auto">
        <div className="space-y-4 mb-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {isLoading && <LoadingDots />}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Footer - Search Bar & Send Button */}
     <Footer 
  input={input}
  setInput={setInput}
  handleSubmit={handleSubmit}
  isLoading={isLoading}
  isIndexed={isIndexed}
/>
    </div>
  );
}

export default App;
