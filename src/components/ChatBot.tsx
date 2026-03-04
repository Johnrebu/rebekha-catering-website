import React, { useEffect, useRef, useState } from "react";
import { Loader2, MessageCircle, Send, X } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

type Intent =
  | "greeting"
  | "pricing"
  | "menu"
  | "bulk"
  | "contact"
  | "booking"
  | "events"
  | "about"
  | "founders"
  | "values"
  | "journey"
  | "experience"
  | "thanks"
  | "fallback";

interface ChatContext {
  guestCount?: number;
  packageChoice?: "mutton" | "vegChicken";
  lastIntent?: Intent;
}

const COMPANY = {
  name: "Rebekha Caterers",
  address: "#19, Perumal Koil Street, Irumbuliyur, Tambaram (W), Chennai - 600045",
  mobile: ["9445435102", "9445435103"],
  email: "rebekhacaterers@gmail.com",
  proprietor: "Rebekha Raj",
  founded: 1998,
  experience: "Over 25 years",
  location: "West Tambaram, Chennai",
  founders: ["Christopher Durairaj", "Nancy Navaneetham"],
  philosophy: "We don't just serve food. We serve love, tradition, and unforgettable memories.",
};

const RATES = {
  mutton: 380,
  vegChicken: 320,
  bulkMuttonPerKg: 750,
  bulkMuttonQtyKg: 120,
  bulkChickenQtyKg: 200,
  bulkChickenTotal: 40000,
};

const QUICK_PROMPTS = [
  "Price for 500 guests",
  "Show full menu",
  "How to book",
  "Contact details",
];

const KEYWORDS: Record<Intent, string[]> = {
  greeting: ["hi", "hello", "hey", "namaste", "good morning", "good evening", "good afternoon"],
  pricing: ["price", "cost", "rate", "package", "quote", "quotation", "budget", "amount"],
  menu: ["menu", "food", "dish", "item", "biryani", "raitha", "dessert", "ice cream"],
  bulk: ["bulk", "wholesale", "kg", "large quantity"],
  contact: ["contact", "phone", "mobile", "call", "email", "address", "whatsapp"],
  booking: ["book", "booking", "reserve", "order", "how to", "confirm"],
  events: ["wedding", "marriage", "event", "party", "function", "corporate", "birthday", "anniversary"],
  about: ["about", "story", "who are you", "tell me about", "company"],
  founders: ["founder", "owner", "christopher", "nancy"],
  values: ["value", "why choose", "why rebekha", "what makes you", "hygiene", "quality"],
  journey: ["journey", "milestone", "growth", "evolution", "timeline"],
  experience: ["experience", "how long", "years", "established", "since when"],
  thanks: ["thank", "thanks", "appreciate"],
  fallback: [],
};

const normalize = (value: string): string =>
  value.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();

const formatINR = (amount: number): string => `Rs ${amount.toLocaleString("en-IN")}`;

const extractGuestCount = (input: string): number | undefined => {
  const match = input.match(/\b(\d{2,5})\b/);
  if (!match) return undefined;
  const value = Number(match[1]);
  if (Number.isNaN(value) || value <= 0 || value > 50000) return undefined;
  return value;
};

const detectPackageChoice = (input: string): ChatContext["packageChoice"] | undefined => {
  if (input.includes("mutton") || input.includes("lamb")) return "mutton";
  if (input.includes("veg") || input.includes("vegetarian") || input.includes("chicken")) return "vegChicken";
  return undefined;
};

const scoreIntent = (normalizedInput: string, intent: Intent): number => {
  if (intent === "fallback") return 0;
  return KEYWORDS[intent].reduce((score, phrase) => {
    if (normalizedInput === phrase) return score + 3;
    if (normalizedInput.includes(phrase)) return score + 1;
    return score;
  }, 0);
};

const buildPricingMessage = (guestCount?: number, packageChoice?: ChatContext["packageChoice"]): string => {
  if (guestCount && packageChoice) {
    const rate = packageChoice === "mutton" ? RATES.mutton : RATES.vegChicken;
    const label = packageChoice === "mutton" ? "Mutton Biryani Package" : "Veg / Chicken Biryani Package";
    const total = guestCount * rate;
    return [
      `Pricing for ${guestCount} guests (${label}):`,
      `Rate: ${formatINR(rate)} per person`,
      `Estimated total: ${formatINR(total)}`,
      "",
      "This includes complete menu items, service charges, and unlimited ice cream.",
      `Call ${COMPANY.mobile[0]} for final quotation and date confirmation.`,
    ].join("\n");
  }

  if (guestCount) {
    const muttonTotal = guestCount * RATES.mutton;
    const vegChickenTotal = guestCount * RATES.vegChicken;
    return [
      `Pricing for ${guestCount} guests:`,
      `1. Mutton Biryani Package: ${formatINR(RATES.mutton)} x ${guestCount} = ${formatINR(muttonTotal)}`,
      `2. Veg / Chicken Biryani Package: ${formatINR(RATES.vegChicken)} x ${guestCount} = ${formatINR(vegChickenTotal)}`,
      "",
      "Tell me your preferred package (mutton or veg/chicken) and I will narrow it down.",
    ].join("\n");
  }

  return [
    "Our package pricing:",
    `1. Mutton Biryani Package: ${formatINR(RATES.mutton)} per person`,
    `2. Veg / Leghorn Chicken Biryani Package: ${formatINR(RATES.vegChicken)} per person`,
    "",
    "Share guest count for instant estimate.",
  ].join("\n");
};

const generateResponse = (userInput: string, context: ChatContext): { message: string; nextContext: ChatContext } => {
  const normalizedInput = normalize(userInput);
  const guestCount = extractGuestCount(normalizedInput) ?? context.guestCount;
  const packageChoice = detectPackageChoice(normalizedInput) ?? context.packageChoice;

  const scores: Array<{ intent: Intent; score: number }> = [
    "greeting",
    "pricing",
    "menu",
    "bulk",
    "contact",
    "booking",
    "events",
    "about",
    "founders",
    "values",
    "journey",
    "experience",
    "thanks",
  ].map((intent) => ({
    intent: intent as Intent,
    score: scoreIntent(normalizedInput, intent as Intent),
  }));

  const best = scores.sort((a, b) => b.score - a.score)[0];
  const intent: Intent =
    best.score > 0
      ? best.intent
      : guestCount || packageChoice || context.lastIntent === "pricing"
        ? "pricing"
        : "fallback";

  const nextContext: ChatContext = {
    guestCount,
    packageChoice,
    lastIntent: intent,
  };

  if (intent === "greeting") {
    return {
      message: [
        `Hello. Welcome to ${COMPANY.name}.`,
        "I can help with package prices, menu details, booking steps, and contact information.",
        "Try: Price for 500 guests",
      ].join("\n\n"),
      nextContext,
    };
  }

  if (intent === "thanks") {
    return {
      message: [
        "Happy to help.",
        `For bookings, call ${COMPANY.mobile[0]} or ${COMPANY.mobile[1]}.`,
      ].join("\n"),
      nextContext,
    };
  }

  if (intent === "pricing") {
    return { message: buildPricingMessage(guestCount, packageChoice), nextContext };
  }

  if (intent === "menu") {
    return {
      message: [
        "Our catering menu:",
        "Main course: Biryani base (Mutton / Veg / Leghorn Chicken)",
        "Non-veg side (choose one): Chicken 65 or Chicken Gravy",
        "Veg sides: Brinjal Gravy, Onion Raitha",
        "Dessert: Fruit Salad + Unlimited Ice Cream",
        "",
        "Customizations are available based on event needs.",
      ].join("\n"),
      nextContext,
    };
  }

  if (intent === "bulk") {
    return {
      message: [
        "Bulk quantity options:",
        `1. Mutton: ${RATES.bulkMuttonQtyKg} kg at ${formatINR(RATES.bulkMuttonPerKg)} per kg`,
        `   Estimated total: ${formatINR(RATES.bulkMuttonQtyKg * RATES.bulkMuttonPerKg)}`,
        `2. Leghorn Chicken: ${RATES.bulkChickenQtyKg} kg total for ${formatINR(RATES.bulkChickenTotal)}`,
        "",
        "Call for current availability and lead time.",
      ].join("\n"),
      nextContext,
    };
  }

  if (intent === "contact") {
    return {
      message: [
        "Contact information:",
        `Mobile: ${COMPANY.mobile.join(" / ")}`,
        `Email: ${COMPANY.email}`,
        `Address: ${COMPANY.address}`,
        `Proprietor: ${COMPANY.proprietor}`,
      ].join("\n"),
      nextContext,
    };
  }

  if (intent === "booking") {
    return {
      message: [
        "Booking process:",
        `1. Call or WhatsApp: ${COMPANY.mobile[0]} / ${COMPANY.mobile[1]}`,
        "2. Share date, venue, guest count, and package preference",
        "3. Receive detailed quotation",
        "4. Confirm booking",
      ].join("\n"),
      nextContext,
    };
  }

  if (intent === "events") {
    return {
      message: [
        "We cater for weddings, receptions, birthdays, corporate events, anniversaries, and family functions.",
        `Current base package rates: ${formatINR(RATES.mutton)} and ${formatINR(RATES.vegChicken)} per person.`,
        "Share your guest count for an instant estimate.",
      ].join("\n"),
      nextContext,
    };
  }

  if (intent === "about") {
    return {
      message: [
        `${COMPANY.name} started in ${COMPANY.founded} in ${COMPANY.location}.`,
        `Experience: ${COMPANY.experience}.`,
        COMPANY.philosophy,
      ].join("\n"),
      nextContext,
    };
  }

  if (intent === "founders") {
    return {
      message: [
        "Founders:",
        `1. ${COMPANY.founders[0]}`,
        `2. ${COMPANY.founders[1]}`,
        "",
        `${COMPANY.name} has been serving Chennai since ${COMPANY.founded}.`,
      ].join("\n"),
      nextContext,
    };
  }

  if (intent === "values") {
    return {
      message: [
        "Why choose us:",
        "1. Family legacy and trusted taste",
        "2. Strong hygiene standards",
        "3. Veg and non-veg options",
        "4. Custom menu support",
        "5. Experienced service team",
      ].join("\n"),
      nextContext,
    };
  }

  if (intent === "journey") {
    return {
      message: [
        "Journey highlights:",
        "1998: Started as a family kitchen operation",
        "2005: Expanded into large weddings and corporate events",
        "2015: Added fusion and dietary menu options",
        "2025+: Continuing with 25+ years of service",
      ].join("\n"),
      nextContext,
    };
  }

  if (intent === "experience") {
    return {
      message: [
        `Founded in ${COMPANY.founded}.`,
        `Experience: ${COMPANY.experience}.`,
        `Location: ${COMPANY.location}.`,
      ].join("\n"),
      nextContext,
    };
  }

  return {
    message: [
      "I can help with:",
      "1. Package pricing and guest-count estimates",
      "2. Full menu details",
      "3. Bulk order options",
      "4. Booking and contact details",
      "",
      "Try: Price for 300 guests",
    ].join("\n"),
    nextContext,
  };
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatContext, setChatContext] = useState<ChatContext>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hello. Welcome to Rebekha Caterers. Ask me about pricing, menu, booking, or contact details.",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length]);

  const pushUserMessage = (content: string) => {
    const userMessage: Message = { role: "user", content, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const { message: reply, nextContext } = generateResponse(content, chatContext);
    const assistantMessage: Message = { role: "assistant", content: reply, timestamp: new Date() };

    setTimeout(() => {
      setMessages((prev) => [...prev, assistantMessage]);
      setChatContext(nextContext);
      setIsLoading(false);
    }, 350);
  };

  const handleSend = () => {
    const text = message.trim();
    if (!text || isLoading) return;
    setMessage("");
    pushUserMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) handleSend();
  };

  const sendQuickPrompt = (prompt: string) => {
    if (isLoading) return;
    pushUserMessage(prompt);
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-[100]">
        <div
          className={`
            absolute bottom-20 left-0
            w-80 sm:w-96 h-[500px]
            bg-white rounded-2xl shadow-2xl
            flex flex-col
            transition-all duration-300 ease-in-out
            ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"}
          `}
        >
          <div className="bg-gradient-to-r from-primary via-accent to-primary bg-size-200 animate-gradient px-6 py-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-white text-lg">Rebekha Caterers Support</h3>
                <p className="text-white/90 text-xs">Smart Assistant</p>
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

          <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-background to-muted/30">
            <div className="flex flex-col gap-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
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

          <div className="px-4 pt-3 flex flex-wrap gap-2 border-t border-border bg-white">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendQuickPrompt(prompt)}
                disabled={isLoading}
                className="text-xs px-3 py-1.5 rounded-full border border-border bg-muted/40 hover:bg-muted transition-colors disabled:opacity-60"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="p-4 bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
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
            ${isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"}
          `}
          aria-label="Open chat"
        >
          <MessageCircle className="w-8 h-8 text-white transition-transform duration-300 group-hover:rotate-12" />
        </button>
      </div>

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
