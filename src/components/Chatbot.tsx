import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react"; // Add this line

type Message = {
  role: "user" | "assistant";
  content: string;
};

const PLACEHOLDER_MESSAGE = "Initializing AI assistant…";

const CHAT_API_URL =
  "https://ai-portfolio-chatbot-1.onrender.com/chat";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi 👋 I’m Ayushya’s AI assistant. Ask me anything about his experience, projects, or skills.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
  if (!input.trim() || loading) return;

  const userText = input;

  // 1️⃣ Add user message
  const userMessage: Message = { role: "user", content: userText };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setLoading(true);

  // 2️⃣ Add instant placeholder assistant message
  const placeholderIndex = messages.length + 1;
  setMessages((prev) => [
    ...prev,
    { role: "assistant", content: PLACEHOLDER_MESSAGE },
  ]);

  try {
    const response = await fetch(CHAT_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText }),
    });

    const data = await response.json();

    const finalAnswer =
      data.answer || "Sorry, I couldn’t find that information right now.";

    // 3️⃣ Replace placeholder with real answer
    setMessages((prev) =>
      prev.map((msg, idx) =>
        idx === placeholderIndex
          ? { role: "assistant", content: finalAnswer }
          : msg
      )
    );
  } catch (error) {
    // Replace placeholder with error
    setMessages((prev) =>
      prev.map((msg, idx) =>
        idx === placeholderIndex
          ? {
              role: "assistant",
              content:
                "⚠️ Something went wrong while connecting to the AI service.",
            }
          : msg
      )
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center p-4 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-500 transition-all hover:scale-110 hover:shadow-blue-500/50"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border border-gray-700 bg-gray-900/95 shadow-2xl backdrop-blur-md">

          {/* Header */}
          <div className="flex items-center justify-between bg-gray-900 border-b border-gray-700 px-4 py-3">
            <div className="flex items-center gap-2">
              <Bot className="text-blue-400" size={20} />
              <h3 className="text-sm font-bold text-gray-100">Ayushya’s AI</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-2 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-none"
              }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-blue-200 text-blue-900"

                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-700 bg-gray-900 p-3">
            <div className="flex gap-2 relative">
              <input
                type="text"
                value={input}
                disabled={loading}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !loading) sendMessage();
                }}
                placeholder={loading ? "Waiting for response..." : "Ask about projects..."}
                className="flex-1 rounded-xl border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-60"
              />

              <button
                onClick={sendMessage}
                disabled={loading}
                // Update button className:
                className="rounded-xl bg-blue-600 p-2 text-white hover:bg-blue-500 disabled:opacity-50 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
