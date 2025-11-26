import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini AI
  const getGeminiResponse = async (userMessage: string): Promise<string> => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey || apiKey === "your_api_key_here") {
        return "⚠️ API key not configured. Please add your Gemini API key to the .env file. Visit https://makersuite.google.com/app/apikey to get your free key!";
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // System prompt with catering business context
      const systemPrompt = `You are a helpful customer support assistant for Rebekha Caterers, a premium catering service based in Tamil Nadu, India.

Business Information:
- Company: Rebekha Caterers
- Services: Full-service catering for weddings, corporate events, birthday parties, and all special occasions
- Specialties: Both vegetarian and non-vegetarian menus with authentic South Indian, North Indian, and fusion cuisines
- Menu Options: Traditional South Indian dishes, North Indian curries, Chinese fusion, live counters (dosa, chaat, etc.)
- Contact: Phone/WhatsApp: +91 89254 77007
- Service Area: Tamil Nadu and surrounding regions
- Experience: Professional team with years of experience in event catering

Your Role:
- Answer questions about our catering services, menus, pricing, and availability
- Be friendly, professional, and helpful
- Provide specific information when possible
- Encourage customers to contact us via WhatsApp or phone for bookings and detailed quotes
- If you don't know specific pricing or availability, politely direct them to contact us directly

Tone: Warm, professional, and enthusiastic about helping customers plan their perfect event.`;

      const fullPrompt = `${systemPrompt}\n\nCustomer Question: ${userMessage}\n\nAssistant Response:`;

      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I apologize, but I'm having trouble connecting right now. Please try again in a moment, or contact us directly at +91 89254 77007 (WhatsApp available).";
    }
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Add welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: "Hello! 👋 Welcome to Rebekha Caterers. How can we help you today? Feel free to ask about our menu, pricing, or event services!",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (message.trim() && !isLoading) {
      const userMessage: Message = {
        role: "user",
        content: message.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setMessage("");
      setIsLoading(true);

      // Get AI response
      const aiResponse = await getGeminiResponse(userMessage.content);

      const assistantMessage: Message = {
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSend();
    }
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50">
        {/* Chat Window */}
        <div
          className={`
            absolute bottom-20 left-0
            w-80 sm:w-96 h-[500px]
            bg-white rounded-2xl shadow-2xl
            flex flex-col
            transition-all duration-300 ease-in-out
            ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}
          `}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary via-accent to-primary bg-size-200 animate-gradient px-6 py-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-white text-lg">
                  Rebekha Caterers Support
                </h3>
                <p className="text-white/90 text-xs">AI-Powered Assistance</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="
                w-8 h-8 rounded-full
                bg-white/20 hover:bg-white/30
                flex items-center justify-center
                transition-all duration-200
                hover:rotate-90
                magic-hover
              "
              aria-label="Close chat"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-background to-muted/30">
            <div className="flex flex-col gap-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-3 shadow-elegant max-w-[85%] ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-primary to-accent text-white rounded-tr-sm"
                        : "bg-white rounded-tl-sm"
                    }`}
                  >
                    <p className={`text-sm whitespace-pre-wrap ${msg.role === "user" ? "text-white" : "text-foreground"}`}>
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-elegant">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-primary animate-spin" />
                      <p className="text-sm text-muted-foreground">Typing...</p>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="
                  flex-1 px-4 py-3
                  bg-muted/50 rounded-xl
                  border border-border
                  focus:outline-none focus:ring-2 focus:ring-primary/50
                  text-sm
                  transition-all duration-200
                  placeholder:text-muted-foreground
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              />
              <button
                onClick={handleSend}
                className="
                  px-4 py-3 rounded-xl
                  bg-gradient-to-r from-primary to-accent
                  text-white
                  hover:shadow-warm
                  transition-all duration-200
                  hover:scale-105
                  disabled:opacity-50 disabled:cursor-not-allowed
                  magic-hover
                  flex items-center justify-center
                "
                disabled={!message.trim() || isLoading}
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Floating Chat Bubble */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-16 h-16 rounded-full
            bg-gradient-to-br from-primary to-accent
            hover:from-accent hover:to-primary
            flex items-center justify-center
            shadow-2xl hover:shadow-warm
            transition-all duration-300
            hover:scale-110
            animate-bounce-subtle
            group
            magic-hover
            ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
          `}
          aria-label="Open chat"
        >
          <MessageCircle className="w-8 h-8 text-white transition-transform duration-300 group-hover:rotate-12" />
        </button>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes bounce-subtle {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 0 hsla(32, 45%, 55%, 0.7);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 10px hsla(32, 45%, 55%, 0);
          }
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .bg-size-200 {
          background-size: 200% 200%;
        }
      `}</style>
    </>
  );
};

export default ChatBot;
