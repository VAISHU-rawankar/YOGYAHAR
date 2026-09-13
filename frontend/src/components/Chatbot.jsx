import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Sparkles, RefreshCw, User } from "lucide-react";
import { API_BASE_URL } from "../lib/apiClient";
import { useLanguage } from "../context/LanguageContext";

const SUGGESTIONS = [
  "🥗 What subscription plans do you offer?",
  "🌿 Are your juices 100% natural?",
  "🚚 Do you deliver across Nashik?",
  "📞 How can I connect or place an order?"
];

function renderFormattedMessage(text) {
  if (!text) return null;

  const lines = text.split("\n");

  return lines.map((line, lineIdx) => {
    let cleaned = line.trim();

    // Check if bullet point (starts with *, -, or •)
    const isBullet = /^[*\-•]\s+/.test(cleaned);
    if (isBullet) {
      cleaned = cleaned.replace(/^[*\-•]\s+/, "");
    }

    // Format **bold** text inside line
    const parts = cleaned.split(/(\*\*.*?\*\*)/g);
    const formattedLine = parts.map((part, partIdx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={partIdx} className="font-bold text-current">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });

    if (isBullet) {
      return (
        <div key={lineIdx} className="flex items-start gap-1.5 my-1 pl-1">
          <span className="font-bold text-xs shrink-0 mt-0.5">•</span>
          <span>{formattedLine}</span>
        </div>
      );
    }

    if (!cleaned) {
      return <div key={lineIdx} className="h-1.5" />;
    }

    return (
      <p key={lineIdx} className="my-0.5">
        {formattedLine}
      </p>
    );
  });
}

export default function Chatbot() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Namaste! 🙏 Welcome to Yogyahar! I'm your AI Health Assistant. How can I help you with our fresh diet meals, fruit bowls, or subscription plans today?"
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener('open-chatbot', handler);
    return () => window.removeEventListener('open-chatbot', handler);
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const query = textToSend || input.trim();
    if (!query || isLoading) return;

    const newMessages = [...messages, { role: "user", content: query }];
    setMessages(newMessages);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      // Send message history to backend AI route
      const formattedHistory = newMessages.map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: formattedHistory })
      });

      if (!res.ok) {
        throw new Error("Server response error");
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply }
      ]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I am having trouble connecting right now. Please feel free to click 'Connect Now!' to message us on WhatsApp directly!"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat cleared! How else can I assist your healthy lifestyle today?"
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[90vw] max-w-[380px] h-[540px] bg-[#fcfaef] rounded-3xl shadow-2xl border border-[#e2dbc0] flex flex-col overflow-hidden animate-fadeInUp mb-4 transition-all">
          {/* Header */}
          <div className="bg-[#2a3818] px-5 py-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#cfe04a] flex items-center justify-center text-[#1f2b12] shadow-inner relative overflow-hidden p-1">
                <img src="/logo.png" alt={t("Yogyahar Logo")} className="w-full h-full object-contain" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#2a3818]" />
              </div>
              <div>
                <h3 style={{color: '#ffffff', margin: 0}} className="font-semibold text-sm flex items-center gap-1.5">
                  {t("Yogyahar AI Assistant")} <Sparkles className="w-3.5 h-3.5" style={{color: '#cfe04a'}} />
                </h3>
                <p style={{color: '#c8dcaa', margin: 0}} className="text-[11px]">{t("Online • Instant Health Answers")}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title={t("Reset Chat")}
                style={{color: 'rgba(255,255,255,0.8)'}}
                className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title={t("Close Chat")}
                style={{color: 'rgba(255,255,255,0.8)'}}
                className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#fbf9f0]/60">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 items-start ${
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs overflow-hidden ${
                    msg.role === "user"
                      ? "bg-[#3d5223] text-white"
                      : "bg-[#cfe04a] text-[#1f2b12] p-0.5"
                  }`}
                >
                  {msg.role === "user" ? <User className="w-4 h-4" /> : <img src="/logo.png" alt={t("Yogyahar Logo")} className="w-full h-full object-contain" />}
                </div>
                <div
                  className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-[#3d5223] text-white rounded-tr-none"
                      : "bg-[#f3f6d7] text-[#1f2b12] border border-[#e4ecbe] rounded-tl-none"
                  }`}
                >
                  {msg.role === "user" ? renderFormattedMessage(msg.content) : renderFormattedMessage(t(msg.content))}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 items-start">
                <div className="w-7 h-7 rounded-full bg-[#cfe04a] text-[#1f2b12] flex items-center justify-center shrink-0 overflow-hidden p-0.5">
                  <img src="/logo.png" alt="Yogyahar Logo" className="w-full h-full object-contain" />
                </div>
                <div className="bg-[#f3f6d7] border border-[#e4ecbe] px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#5f7a3a] rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-[#5f7a3a] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 bg-[#5f7a3a] rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length <= 2 && !isLoading && (
            <div className="px-3 py-2 bg-[#f4f1e1]/80 border-t border-[#e8e2c8] flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(sug)}
                  className="text-[11px] bg-white border border-[#d8d1b2] hover:bg-[#cfe04a]/30 hover:border-[#5f7a3a] text-[#2a3818] px-2.5 py-1 rounded-full transition-all text-left shadow-2xs"
                >
                  {t(sug)}
                </button>
              ))}
            </div>
          )}

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#fcfaef] border-t border-[#e8e2c8] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("Ask about diet, plans, juices...")}
              disabled={isLoading}
              className="flex-1 bg-[#f4f1e1] text-[#1f2b12] placeholder-[#8a9277] text-xs sm:text-sm px-4 py-2.5 rounded-full border border-[#dcd5b9] focus:outline-none focus:border-[#5f7a3a] transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 rounded-full bg-[#cfe04a] hover:bg-[#c2d43c] disabled:opacity-50 text-[#1f2b12] flex items-center justify-center transition-all shadow-md active:scale-95 shrink-0"
            >
              <Send className="w-4 h-4 -mr-0.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 bg-[#2a3818] hover:bg-[#1f2b12] text-white px-4 py-3 rounded-full shadow-2xl border-2 border-[#cfe04a] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <div className="w-8 h-8 rounded-full bg-[#cfe04a] text-[#1f2b12] flex items-center justify-center font-bold overflow-hidden p-1">
            <img src="/logo.png" alt={t("Yogyahar Logo")} className="w-full h-full object-contain" />
          </div>
          <span className="text-xs sm:text-sm font-semibold text-[#f5f8d8] pr-1">
            {t("Chat with AI")}
          </span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#2a3818] animate-pulse" />
        </button>
      )}
    </div>
  );
}
