import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

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

  // Knowledge-based response system
  const getKnowledgeBasedResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Company Information
    const companyInfo = {
      name: "Rebekha Caterers",
      address: "#19, Perumal Koil Street, Irumbuliyur, Tambaram (W), Chennai - 600045",
      mobile: ["9445435102", "9445435103"],
      email: "rebekhacaterers@gmail.com",
      proprietor: "Rebekha Raj",
      founded: 1998,
      experience: "Over 25 years",
      location: "West Tambaram, Chennai",
      founders: {
        cofounder1: "Christopher Durairaj",
        cofounder2: "Nancy Navaneetham"
      },
      philosophy: "We don't just serve food. We serve love, tradition, and unforgettable memories."
    };

    // Core Values
    const coreValues = [
      {
        title: "Family Legacy",
        description: "Family-driven legacy of taste and tradition spanning over 25 years"
      },
      {
        title: "Hygienic Standards",
        description: "Strict hygiene protocols and fresh, quality ingredients in every dish"
      },
      {
        title: "Veg & Non-Veg",
        description: "Comprehensive menu options for all dietary preferences and needs"
      },
      {
        title: "Custom Menus",
        description: "Personalized menu creation for your unique event requirements"
      },
      {
        title: "Professional Team",
        description: "Experienced staff ensuring flawless execution and presentation"
      },
      {
        title: "Excellence",
        description: "Committed to exceeding expectations in every catering experience"
      }
    ];

    // Company Journey
    const journey = [
      {
        year: 1998,
        milestone: "The Beginning",
        description: "Started in a small home kitchen with a dream to bring authentic, homemade taste to celebrations"
      },
      {
        year: 2005,
        milestone: "Growing Recognition",
        description: "Expanded services to include corporate events and large-scale weddings"
      },
      {
        year: 2015,
        milestone: "Culinary Innovation",
        description: "Introduced fusion menus and specialized dietary options while maintaining traditional roots"
      },
      {
        year: 2025,
        milestone: "Today & Beyond",
        description: "Continuing to serve love with over 25 years of experience, thousands of satisfied clients, and a commitment to excellence"
      }
    ];

    // Menu Items
    const menuItems = {
      mainCourse: [
        "Biryani Base (Depends on package chosen)",
        "Mutton Biryani",
        "Vegetarian Biryani",
        "Leghorn Chicken Biryani"
      ],
      sideDishs: [
        "Chicken 65",
        "Chicken Gravy",
        "Brinjal Gravy",
        "Onion Raitha"
      ],
      desserts: [
        "Fruit Salad",
        "Ice Cream (Unlimited Self-service)"
      ]
    };

    // Package Rates (Per Person Basis)
    const packages = [
      {
        name: "Mutton Biryani Package",
        rate: "₹380 per person",
        features: "Includes full menu with Mutton Biryani as the base",
        example: "For 1500 guests: ₹5,70,000 (Rupees Five Lakhs Seventy Thousand Only)"
      },
      {
        name: "Veg / Leghorn Chicken Biryani Package",
        rate: "₹320 per person",
        features: "Includes full menu with either Veg or Leghorn Chicken Biryani as the base",
        example: "For 1500 guests: ₹4,80,000 (Rupees Four Lakhs Eighty Thousand Only)"
      }
    ];

    // Bulk Quantity Options
    const bulkOptions = [
      {
        name: "Bulk Mutton Rate",
        quantity: "120 kg",
        rate: "₹750 per kg",
        total: "₹90,000 (Rupees Ninety Thousand Only)"
      },
      {
        name: "Bulk Leghorn Chicken Rate",
        quantity: "200 kg (Total Price)",
        total: "₹40,000 (Rupees Forty Thousand Only)"
      }
    ];

    // Response patterns
    
    // About Us / Company History
    if (lowerMessage.includes("about") || lowerMessage.includes("history") || lowerMessage.includes("story") || lowerMessage.includes("who are you") || lowerMessage.includes("tell me about")) {
      return `🏛️ About Rebekha Caterers\n\n` +
        `📜 Our Story:\n` +
        `Founded in ${companyInfo.founded}, Rebekha Catering Services began as a small family venture with a big vision: to create exceptional catering experiences that blend traditional flavors with modern culinary techniques.\n\n` +
        `👨‍🍳 Our Founders:\n` +
        `${companyInfo.founders.cofounder1} and ${companyInfo.founders.cofounder2} started this journey in a modest kitchen in ${companyInfo.location}, crafting signature dishes using recipes passed down through generations.\n\n` +
        `⏳ Experience: ${companyInfo.experience} of serving love, tradition, and unforgettable memories\n\n` +
        `💭 Our Philosophy:\n` +
        `"${companyInfo.philosophy}"\n\n` +
        `📍 Location: ${companyInfo.location}\n\n` +
        `Want to know more? Ask about our values, journey, or services!`;
    }

    // Founders
    if (lowerMessage.includes("founder") || lowerMessage.includes("owner") || lowerMessage.includes("christopher") || lowerMessage.includes("nancy")) {
      return `👨‍🍳 Meet Our Founders\n\n` +
        `👤 ${companyInfo.founders.cofounder1} - Co-Founder\n` +
        `The visionary behind our authentic recipes and quality standards. Christopher's passion for traditional cooking methods combined with innovative presentation has been the cornerstone of our success.\n\n` +
        `👤 ${companyInfo.founders.cofounder2} - Co-Founder\n` +
        `The heart of our operations and customer relations. Nancy's attention to detail and commitment to hygiene has set the gold standard for our catering services.\n\n` +
        `Together, they started Rebekha Caterers in ${companyInfo.founded} in ${companyInfo.location}, bringing authentic flavors and genuine hospitality to celebrations across Chennai.\n\n` +
        `📱 Contact: ${companyInfo.mobile[0]}`;
    }

    // Values / Why Choose Us
    if (lowerMessage.includes("value") || lowerMessage.includes("why choose") || lowerMessage.includes("why rebekha") || lowerMessage.includes("what makes you")) {
      return `✨ Why Choose Rebekha Caterers?\n\n` +
        `🏆 Our Core Values:\n\n` +
        `💝 Family Legacy\n` +
        `   ${coreValues[0].description}\n\n` +
        `🛡️ Hygienic Standards\n` +
        `   ${coreValues[1].description}\n\n` +
        `🍽️ Veg & Non-Veg Options\n` +
        `   ${coreValues[2].description}\n\n` +
        `✨ Custom Menus\n` +
        `   ${coreValues[3].description}\n\n` +
        `👥 Professional Team\n` +
        `   ${coreValues[4].description}\n\n` +
        `🏅 Excellence\n` +
        `   ${coreValues[5].description}\n\n` +
        `💭 "${companyInfo.philosophy}"\n\n` +
        `With ${companyInfo.experience} of experience, we've served thousands of satisfied clients!`;
    }

    // Journey / Milestones
    if (lowerMessage.includes("journey") || lowerMessage.includes("milestone") || lowerMessage.includes("growth") || lowerMessage.includes("evolution")) {
      return `📅 Our Journey Through the Years\n\n` +
        `🎯 ${journey[0].year} - ${journey[0].milestone}\n` +
        `   ${journey[0].description}\n\n` +
        `🎯 ${journey[1].year} - ${journey[1].milestone}\n` +
        `   ${journey[1].description}\n\n` +
        `🎯 ${journey[2].year} - ${journey[2].milestone}\n` +
        `   ${journey[2].description}\n\n` +
        `🎯 ${journey[3].year} - ${journey[3].milestone}\n` +
        `   ${journey[3].description}\n\n` +
        `From a small home kitchen to serving thousands of events - our commitment to quality and authenticity remains unchanged! 🌟\n\n` +
        `📱 Be part of our story: ${companyInfo.mobile[0]}`;
    }

    // Experience / How long
    if (lowerMessage.includes("experience") || lowerMessage.includes("how long") || lowerMessage.includes("years") || lowerMessage.includes("established")) {
      return `⏳ Our Experience\n\n` +
        `📅 Founded: ${companyInfo.founded}\n` +
        `🎊 Experience: ${companyInfo.experience}\n` +
        `📍 Location: ${companyInfo.location}\n\n` +
        `Since ${companyInfo.founded}, we've been serving authentic flavors and creating unforgettable memories for thousands of events across Chennai.\n\n` +
        `From intimate family gatherings to grand weddings and corporate events, we bring the same dedication and quality to every occasion.\n\n` +
        `Want to know more about our journey? Just ask!`;
    }
    
    // Greetings
    if (lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon|good evening|namaste)/)) {
      return `Hello! 👋 Welcome to Rebekha Caterers!\n\nWe're Chennai's premier catering service specializing in memorable events.\n\nHow can I help you today?\n• Package pricing\n• Menu options\n• Bulk orders\n• Contact information\n\nFeel free to ask me anything!`;
    }

    // Contact information
    if (lowerMessage.includes("contact") || lowerMessage.includes("phone") || lowerMessage.includes("mobile") || lowerMessage.includes("call") || lowerMessage.includes("email") || lowerMessage.includes("address")) {
      return `📞 Contact Information:\n\n` +
        `📱 Mobile: ${companyInfo.mobile.join(" / ")}\n` +
        `📧 Email: ${companyInfo.email}\n` +
        `📍 Address: ${companyInfo.address}\n` +
        `👤 Proprietor: ${companyInfo.proprietor}\n\n` +
        `Feel free to reach out via phone or WhatsApp for bookings and detailed quotes!`;
    }

    // Pricing and packages
    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("rate") || lowerMessage.includes("package") || lowerMessage.includes("quote") || lowerMessage.includes("quotation")) {
      return `💰 Our Catering Packages:\n\n` +
        `📦 OPTION 1: Mutton Biryani Package\n` +
        `   Rate: ₹380 per person\n` +
        `   Example: For 1500 guests = ₹5,70,000\n\n` +
        `📦 OPTION 2: Veg / Leghorn Chicken Biryani Package\n` +
        `   Rate: ₹320 per person\n` +
        `   Example: For 1500 guests = ₹4,80,000\n\n` +
        `✨ Package rates include service charges\n\n` +
        `💡 Note: All packages include the complete menu with appetizers, main course, sides, and unlimited ice cream!\n\n` +
        `For a customized quote for your event, please contact us at ${companyInfo.mobile[0]}.`;
    }

    // Menu queries
    if (lowerMessage.includes("menu") || lowerMessage.includes("food") || lowerMessage.includes("dish") || lowerMessage.includes("item")) {
      return `🍽️ Our Catering Menu:\n\n` +
        `🍛 MAIN COURSE:\n` +
        `   • Biryani Base (Mutton/Veg/Leghorn Chicken)\n\n` +
        `🥘 NON-VEG SIDE DISH (Choose one):\n` +
        `   • Chicken 65 OR\n` +
        `   • Chicken Gravy\n\n` +
        `🍆 VEGETARIAN SIDES:\n` +
        `   • Brinjal Gravy\n` +
        `   • Onion Raitha\n\n` +
        `🍨 DESSERTS:\n` +
        `   • Fruit Salad\n` +
        `   • Ice Cream (Unlimited Self-service)\n\n` +
        `✅ All menu items are included in our package rates!\n\n` +
        `Want to customize your menu? Contact us at ${companyInfo.mobile[0]}.`;
    }

    // Bulk orders
    if (lowerMessage.includes("bulk") || lowerMessage.includes("wholesale") || lowerMessage.includes("large quantity")) {
      return `📦 Bulk Quantity Options:\n\n` +
        `(These are for bulk supply only, outside of per-person packages)\n\n` +
        `🍖 Bulk Mutton Rate:\n` +
        `   Quantity: 120 kg\n` +
        `   Rate: ₹750 per kg\n` +
        `   Total: ₹90,000\n\n` +
        `🍗 Bulk Leghorn Chicken Rate:\n` +
        `   Quantity: 200 kg\n` +
        `   Total Price: ₹40,000\n\n` +
        `For bulk orders or special requirements, please contact us at ${companyInfo.mobile[0]}.`;
    }

    // Mutton specific
    if (lowerMessage.includes("mutton") || lowerMessage.includes("lamb")) {
      return `🍖 Mutton Options:\n\n` +
        `📦 Mutton Biryani Package:\n` +
        `   ₹380 per person (includes full menu)\n` +
        `   Example: 1500 guests = ₹5,70,000\n\n` +
        `📦 Bulk Mutton Rate:\n` +
        `   120 kg @ ₹750 per kg\n` +
        `   Total: ₹90,000\n\n` +
        `Our mutton biryani is prepared with authentic spices and premium quality meat!\n\n` +
        `Contact us for bookings: ${companyInfo.mobile[0]}`;
    }

    // Chicken specific
    if (lowerMessage.includes("chicken")) {
      return `🍗 Chicken Options:\n\n` +
        `📦 Leghorn Chicken Biryani Package:\n` +
        `   ₹320 per person (includes full menu)\n\n` +
        `🥘 Non-Veg Side Dishes:\n` +
        `   • Chicken 65\n` +
        `   • Chicken Gravy\n` +
        `   (Choose one with your package)\n\n` +
        `📦 Bulk Leghorn Chicken:\n` +
        `   200 kg - ₹40,000 (total price)\n\n` +
        `Fresh, tender chicken prepared with our signature recipes!\n\n` +
        `Call us for more details: ${companyInfo.mobile[0]}`;
    }

    // Vegetarian specific
    if (lowerMessage.includes("veg") || lowerMessage.includes("vegetarian")) {
      return `🥗 Vegetarian Options:\n\n` +
        `📦 Vegetarian Biryani Package:\n` +
        `   ₹320 per person\n` +
        `   Example: 1500 guests = ₹4,80,000\n\n` +
        `🥘 Included Vegetarian Items:\n` +
        `   • Vegetarian Biryani (Main Course)\n` +
        `   • Brinjal Gravy\n` +
        `   • Onion Raitha\n` +
        `   • Fruit Salad\n` +
        `   • Ice Cream (Unlimited)\n\n` +
        `Delicious vegetarian cuisine with authentic flavors!\n\n` +
        `Contact: ${companyInfo.mobile[0]}`;
    }

    // Ice cream
    if (lowerMessage.includes("ice cream") || lowerMessage.includes("icecream") || lowerMessage.includes("dessert")) {
      return `🍨 Dessert Offerings:\n\n` +
        `✨ Unlimited Self-Service Ice Cream included in all packages!\n\n` +
        `We also serve:\n` +
        `   • Fresh Fruit Salad\n\n` +
        `All desserts are included in our per-person package rates.\n\n` +
        `Sweet endings for your special occasions! 🎉`;
    }

    // Event types
    if (lowerMessage.includes("wedding") || lowerMessage.includes("marriage") || lowerMessage.includes("event") || lowerMessage.includes("party") || lowerMessage.includes("function")) {
      return `🎉 We Cater All Types of Events!\n\n` +
        `Our services are perfect for:\n` +
        `   • Weddings & Receptions\n` +
        `   • Corporate Events\n` +
        `   • Birthday Parties\n` +
        `   • Anniversary Celebrations\n` +
        `   • Family Gatherings\n` +
        `   • Religious Functions\n\n` +
        `📊 Sample Pricing:\n` +
        `   • Mutton Biryani Package: ₹380/person\n` +
        `   • Veg/Chicken Biryani Package: ₹320/person\n\n` +
        `Package rates include service charges and full menu!\n\n` +
        `Let's make your event memorable! Call: ${companyInfo.mobile[0]}`;
    }

    // Guest count / capacity
    if (lowerMessage.includes("guest") || lowerMessage.includes("people") || lowerMessage.includes("person") || lowerMessage.includes("capacity") || lowerMessage.match(/\d+/)) {
      const numbers = lowerMessage.match(/\d+/);
      if (numbers) {
        const guestCount = parseInt(numbers[0]);
        const muttonTotal = guestCount * 380;
        const vegChickenTotal = guestCount * 320;
        
        return `📊 Pricing for ${guestCount} Guests:\n\n` +
          `📦 OPTION 1: Mutton Biryani Package\n` +
          `   ₹380 × ${guestCount} = ₹${muttonTotal.toLocaleString('en-IN')}\n\n` +
          `📦 OPTION 2: Veg/Chicken Biryani Package\n` +
          `   ₹320 × ${guestCount} = ₹${vegChickenTotal.toLocaleString('en-IN')}\n\n` +
          `✅ Includes complete menu with unlimited ice cream!\n` +
          `✅ Service charges included\n\n` +
          `For a detailed quotation, contact us:\n` +
          `📱 ${companyInfo.mobile[0]} / ${companyInfo.mobile[1]}`;
      }
    }

    // Service charges
    if (lowerMessage.includes("service") || lowerMessage.includes("charge") || lowerMessage.includes("include")) {
      return `✅ What's Included in Our Packages:\n\n` +
        `📋 Package rates include:\n` +
        `   ✓ Service charges\n` +
        `   ✓ Complete menu items\n` +
        `   ✓ Unlimited ice cream (self-service)\n` +
        `   ✓ Professional serving staff\n\n` +
        `💰 Our Packages:\n` +
        `   • Mutton Biryani: ₹380/person\n` +
        `   • Veg/Chicken Biryani: ₹320/person\n\n` +
        `No hidden charges - transparent pricing!\n\n` +
        `Contact: ${companyInfo.mobile[0]}`;
    }

    // Booking process
    if (lowerMessage.includes("book") || lowerMessage.includes("reserve") || lowerMessage.includes("order") || lowerMessage.includes("how to")) {
      return `📞 How to Book Our Services:\n\n` +
        `1️⃣ Contact us via:\n` +
        `   📱 Phone/WhatsApp: ${companyInfo.mobile[0]}\n` +
        `   📱 Alternate: ${companyInfo.mobile[1]}\n` +
        `   📧 Email: ${companyInfo.email}\n\n` +
        `2️⃣ Share your event details:\n` +
        `   • Date & Time\n` +
        `   • Guest count\n` +
        `   • Preferred package\n` +
        `   • Location\n\n` +
        `3️⃣ Receive a detailed quotation\n\n` +
        `4️⃣ Confirm your booking\n\n` +
        `We're here to make your event special! 🎉`;
    }

    // Thank you / appreciation
    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
      return `You're welcome! 😊\n\n` +
        `Thank you for choosing Rebekha Caterers!\n\n` +
        `For bookings or queries:\n` +
        `📱 ${companyInfo.mobile[0]} / ${companyInfo.mobile[1]}\n` +
        `📧 ${companyInfo.email}\n\n` +
        `We look forward to serving you! 🎉`;
    }

    // Default response with comprehensive information
    return `I'm here to help you with Rebekha Caterers services! 😊\n\n` +
      `🔍 I can provide information about:\n\n` +
      `💰 Pricing & Packages:\n` +
      `   • Mutton Biryani: ₹380/person\n` +
      `   • Veg/Chicken Biryani: ₹320/person\n\n` +
      `🍽️ Menu Items:\n` +
      `   • Biryani varieties\n` +
      `   • Side dishes\n` +
      `   • Unlimited ice cream\n\n` +
      `📦 Bulk Orders:\n` +
      `   • Mutton: 120kg @ ₹750/kg\n` +
      `   • Chicken: 200kg @ ₹40,000\n\n` +
      `📞 Contact Details:\n` +
      `   • ${companyInfo.mobile[0]} / ${companyInfo.mobile[1]}\n` +
      `   • ${companyInfo.email}\n\n` +
      `What would you like to know? Ask me about pricing, menu, bulk orders, or bookings!`;
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

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      const userMessage: Message = {
        role: "user",
        content: message.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setMessage("");
      setIsLoading(true);

      // Get knowledge-based response
      const aiResponse = getKnowledgeBasedResponse(userMessage.content);

      const assistantMessage: Message = {
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };

      // Add a small delay to make it feel more natural
      setTimeout(() => {
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSend();
    }
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-[100]">
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
