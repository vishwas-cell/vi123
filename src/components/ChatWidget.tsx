import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Minimize2, X } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! 👋 I'm Vera, Vishwas's AI Assistant! Ask me anything - about his work, lifestyle, technology, or anything else you're curious about!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [animate, setAnimate] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Make character walk around when idle
  useEffect(() => {
    if (!isOpen && animate) {
      const interval = setInterval(() => {
        setPosition({
          x: Math.random() * 200 - 100,
          y: Math.random() * 100 - 50,
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isOpen, animate]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      
      // Add timeout to the fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`${apiUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.text }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error:", errorData);
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      
      // Handle both OpenAI and Fallback modes
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.message || "I couldn't generate a response. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (err: any) {
      console.error("Chat error:", err);
      
      let errorMessage = "Sorry, I encountered an error. ";
      
      if (err.name === "AbortError") {
        errorMessage += "The request timed out. Please try again.";
      } else if (err.message.includes("Failed to fetch")) {
        errorMessage += "Unable to reach the server. Make sure the backend is running.";
      } else {
        errorMessage += "Make sure the backend server is configured properly.";
      }
      
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: errorMessage,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  // Animated female cartoon character
  const CartoonCharacter = ({ isWalking = false }: { isWalking?: boolean }) => (
    <motion.div
      animate={isWalking ? { x: position.x, y: position.y } : {}}
      transition={{ duration: 2, ease: "easeInOut" }}
      className="flex flex-col items-center"
    >
      {/* Character Container */}
      <div className="relative">
        {/* Head */}
        <motion.div
          animate={{ y: isWalking ? [0, -8, 0] : 0 }}
          transition={{ duration: 0.6, repeat: isWalking ? Infinity : 0 }}
          className="w-16 h-16 rounded-full bg-gradient-to-b from-amber-200 to-amber-100 mx-auto relative mb-[-8px]"
        >
          {/* Hair */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-pink-400 to-pink-300 rounded-t-full" />

          {/* Eyes */}
          <div className="absolute top-6 left-3 w-2 h-3 bg-gray-900 rounded-full" />
          <div className="absolute top-6 right-3 w-2 h-3 bg-gray-900 rounded-full" />

          {/* Smile */}
          <svg
            className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4 h-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9c0 3 2.5 5 6 5s6-2 6-5" />
          </svg>
        </motion.div>

        {/* Body */}
        <motion.div
          animate={{ y: isWalking ? [0, -4, 0] : 0 }}
          transition={{ duration: 0.6, repeat: isWalking ? Infinity : 0, delay: 0.1 }}
          className="w-12 h-12 bg-gradient-to-b from-purple-400 to-purple-500 rounded-lg mx-auto relative"
        >
          {/* Arms */}
          <motion.div
            animate={
              isWalking
                ? {
                    rotate: [0, 20, 0, -20, 0],
                  }
                : {}
            }
            transition={{ duration: 0.8, repeat: isWalking ? Infinity : 0 }}
            className="absolute -left-6 top-2 w-5 h-2 bg-amber-200 rounded-full origin-right"
          />
          <motion.div
            animate={
              isWalking
                ? {
                    rotate: [0, -20, 0, 20, 0],
                  }
                : {}
            }
            transition={{ duration: 0.8, repeat: isWalking ? Infinity : 0 }}
            className="absolute -right-6 top-2 w-5 h-2 bg-amber-200 rounded-full origin-left"
          />
        </motion.div>

        {/* Legs */}
        <div className="flex gap-2 justify-center mt-1">
          <motion.div
            animate={
              isWalking
                ? {
                    rotateZ: [0, 15, 0, -15, 0],
                  }
                : {}
            }
            transition={{ duration: 0.8, repeat: isWalking ? Infinity : 0 }}
            className="w-2 h-4 bg-purple-600 rounded-full origin-top"
          />
          <motion.div
            animate={
              isWalking
                ? {
                    rotateZ: [0, -15, 0, 15, 0],
                  }
                : {}
            }
            transition={{ duration: 0.8, repeat: isWalking ? Infinity : 0 }}
            className="w-2 h-4 bg-purple-600 rounded-full origin-top"
          />
        </div>

        {/* Glow aura */}
        <div className="absolute inset-0 rounded-full opacity-30 blur-xl bg-gradient-to-r from-pink-400 to-purple-400 -z-10" />
      </div>

      {/* Name tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 px-3 py-1 bg-gradient-to-r from-pink-400 to-purple-400 text-gray-900 text-xs font-bold rounded-full"
      >
        Vera ✨
      </motion.div>
    </motion.div>
  );

  return (
    <>
      {/* Floating Character Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="character"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => {
              setIsOpen(true);
              setAnimate(false);
            }}
            className="fixed bottom-6 right-6 z-40 focus:outline-none hover:scale-110 transition-transform duration-300 group"
            title="Chat with Vera"
          >
            <CartoonCharacter isWalking={true} />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: [0, -8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -top-12 right-0 bg-black text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
            >
              Chat with me! 💬
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`fixed z-40 ${
              isMinimized
                ? "bottom-6 right-6 w-64"
                : "bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-96 h-4/5 sm:h-[600px]"
            } rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800`}
          >
            {/* Header with Character */}
            <motion.div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-4 text-gray-900 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center text-lg">
                  ✨
                </div>
                <div>
                  <h3 className="font-bold text-sm">Vera AI Assistant</h3>
                  <p className="text-xs text-gray-800">Always here to help!</p>
                </div>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <Minimize2 size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsOpen(false);
                    setAnimate(true);
                  }}
                  className="p-1 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <X size={18} />
                </motion.button>
              </div>
            </motion.div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
                >
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={`max-w-xs px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-pink-500 to-purple-500 text-gray-900 rounded-br-none"
                            : "bg-slate-700/60 text-gray-100 border border-slate-600 rounded-bl-none"
                        }`}
                      >
                        {message.text}
                        <div
                          className={`text-xs mt-1 ${
                            message.sender === "user"
                              ? "text-gray-800/70"
                              : "text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-slate-700/60 px-4 py-2 rounded-2xl rounded-bl-none border border-slate-600 flex gap-2">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                          className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                        />
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </motion.div>

                {/* Input Form */}
                <motion.form
                  onSubmit={handleSendMessage}
                  className="p-4 border-t border-slate-600 bg-slate-900/60 flex-shrink-0"
                >
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask Vera anything..."
                      disabled={isLoading}
                      className="flex-1 px-4 py-2 rounded-full border border-slate-600 bg-slate-800 text-gray-100 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-gray-900 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        <Send size={20} />
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.4);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.6);
        }
      `}</style>
    </>
  );
};

export default ChatWidget;
