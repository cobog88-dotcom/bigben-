import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  RotateCcw, 
  Check, 
  HelpCircle, 
  Package, 
  Truck,
  AlertCircle
} from 'lucide-react';
import { User } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface AIChatbotProps {
  currentUser: User | null;
  onNavigate: (view: any) => void;
  onOpenProductModal?: (productSlug: string) => void;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({
  currentUser,
  onNavigate,
  onOpenProductModal
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: "Hello and welcome to Big Ben Global Limited! I am your Wellness & Botanical Specialist. I can assist with our Beetroot & Hibiscus Tea, Herbal Infused Tea, Virgin Coconut Oil, Cocoa Butter, and Peanut Oil, or check your order status. How may I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickQuestions = [
    "How to brew Beetroot & Hibiscus Tea?",
    "Tell me about Virgin Coconut & Peanut Oil",
    "How to use 100% Pure Cocoa Butter?",
    "Check order status BBG-2026-4819"
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || loading) return;

    const userMsg: Message = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          customerEmail: currentUser?.email
        })
      });

      if (!response.ok) throw new Error('Network error');
      const data = await response.json();

      const assistantMsg: Message = {
        id: 'asst-' + Date.now(),
        sender: 'assistant',
        text: data.reply || "Thank you for reaching out to Big Ben Global Limited. Please let us know if you need any additional assistance.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      // Reliable client fallback if offline or backend unavailable
      const lower = messageText.toLowerCase();
      let reply = "Thank you for contacting Big Ben Global Limited. Our customer care team is available to help at info@bigbenglobal.co.uk or via the Contact page.";

      if (lower.includes('brew') || lower.includes('steep') || lower.includes('prepare')) {
        reply = "To brew Big Ben Beetroot Tea: use 1-2 teaspoons (around 4g) per 250ml cup. Pour freshly boiled water (95°C-100°C) and steep for 5 to 7 minutes for a deep ruby infusion. Excellent hot or served over ice with fresh lemon!";
      } else if (lower.includes('caffeine')) {
        reply = "Big Ben Beetroot Tea is 100% naturally caffeine-free! It is a pure herbal infusion suitable for any time of the day.";
      } else if (lower.includes('shipping') || lower.includes('delivery')) {
        reply = "UK Standard Tracked delivery takes 2-3 business days (£3.50, or FREE on orders over £35). Next-day express is available for £6.50.";
      }

      setMessages(prev => [
        ...prev,
        {
          id: 'asst-' + Date.now(),
          sender: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'm-reset',
        sender: 'assistant',
        text: "Conversation refreshed. How may I assist your beetroot tea journey today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating Chat Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#881337] hover:bg-[#9F1239] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl flex items-center gap-2.5 transition-all transform hover:scale-105 border-2 border-white/60 min-h-[48px]"
          aria-label="Open Big Ben Tea AI Specialist Assistant"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#881337]" />
          </div>
          <span className="font-semibold text-xs hidden sm:inline">Ask Tea Specialist</span>
          <span className="text-[10px] bg-rose-950/60 px-1.5 py-0.5 rounded text-rose-200 font-mono hidden md:inline">
            Grounded AI
          </span>
        </button>
      )}

      {/* Chat Dialog Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[400px] bg-white rounded-3xl shadow-2xl border border-[#EFE8DC] overflow-hidden flex flex-col h-[560px] max-h-[85vh] animate-in fade-in slide-in-from-bottom-4">
          
          {/* Header */}
          <div className="bg-[#4C0519] text-white px-5 py-4 flex items-center justify-between border-b border-rose-950">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-rose-800 border border-rose-400/40 flex items-center justify-center font-serif font-bold text-sm text-rose-100">
                BB
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-bold text-sm text-white">Big Ben Specialist</h3>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-700/60 px-1.5 rounded">
                    Verified
                  </span>
                </div>
                <p className="text-[11px] text-rose-200">Grounded in approved company facts</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-1.5 text-rose-300 hover:text-white rounded-lg hover:bg-rose-900/60 min-h-[36px] min-w-[36px] flex items-center justify-center"
                title="Clear conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-rose-300 hover:text-white rounded-lg hover:bg-rose-900/60 min-h-[36px] min-w-[36px] flex items-center justify-center"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Privacy & Compliance Notification Bar */}
          <div className="bg-[#FAF7F2] px-4 py-2 border-b border-[#EFE8DC] text-[10px] text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>Answers follow compliant wellness facts. No medical claims made.</span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAF7F2]/60">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#881337] text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-[#EFE8DC] rounded-bl-xs'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-3 rounded-2xl border border-slate-200 w-fit">
                <span className="w-2 h-2 rounded-full bg-rose-900 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-rose-900 animate-bounce delay-100"></span>
                <span className="w-2 h-2 rounded-full bg-rose-900 animate-bounce delay-200"></span>
                <span className="text-[11px] text-slate-400 ml-1">Consulting company records...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Prompts */}
          <div className="p-2.5 bg-white border-t border-[#EFE8DC] overflow-x-auto flex gap-1.5 text-[11px]">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="whitespace-nowrap px-2.5 py-1 bg-slate-50 hover:bg-rose-50 text-slate-700 hover:text-rose-900 rounded-lg border border-slate-200 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-[#EFE8DC] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about steeping, ingredients, or order..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-[#FAF7F2] border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-800"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 bg-[#881337] hover:bg-[#9F1239] disabled:bg-slate-200 text-white rounded-xl transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center shadow-xs"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
