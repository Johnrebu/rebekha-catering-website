import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What types of events do you cater to?",
      answer: "We cater to a wide range of events including weddings, corporate events, birthday parties, house warmings, private dinners, and large social gatherings. Whether it's an intimate group of 50 or a grand celebration of 5000, we've got you covered."
    },
    {
      question: "Do you offer both Vegetarian and Non-Vegetarian menus?",
      answer: "Yes, absolutely! We specialize in both authentic South Indian vegetarian and non-vegetarian cuisines. We can also provide a mix of both for your event to cater to all your guests' preferences."
    },
    {
      question: "How far in advance should I book your services?",
      answer: "We recommend booking as early as possible to secure your desired date, especially for wedding seasons which fill up quickly. Ideally, booking 3-6 months in advance is best, but we do accommodate last-minute requests depending on our availability."
    },
    {
      question: "Can I customize the menu?",
      answer: "Yes! We believe every event is unique. We work closely with you to curate a personalized menu that fits your taste, dietary requirements, and budget. You can choose from our extensive list of dishes or request special items."
    },
    {
      question: "Do you provide tasting sessions?",
      answer: "Yes, we offer complimentary food tasting sessions for confirmed wedding bookings. This allows you to experience our quality and flavors firsthand before finalizing the menu."
    },
    {
      question: "What areas do you serve?",
      answer: "We are based in West Tambaram, Chennai, and serve clients across Chennai and surrounding districts. Contact us to check if we can travel to your specific venue location."
    },
    {
      question: "Do you provide serving staff and cutlery?",
      answer: "Yes, we provide a full-service experience which includes professional serving staff, high-quality cutlery, crockery, and buffet setup. We ensure everything is handled seamlessly so you can enjoy your event."
    },
    {
      question: "What is your cancellation policy?",
      answer: "Our cancellation policy varies based on how close the cancellation is to the event date. We understand that plans can change, and we try to be as flexible as possible. Please refer to your booking contract for specific details."
    }
  ];

  return (
    <div className="min-h-screen bg-[hsl(45,40%,94%)]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920')`
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <motion.div
          className="relative z-10 text-center text-white px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
            FAQ
          </h1>
          <p className="text-xl font-light tracking-wide">
            Common questions about our services
          </p>
        </motion.div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl text-[hsl(30,20%,15%)] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
                Find Answers
              </h2>
              <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto" />
            </motion.div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-[hsl(40,20%,85%)] px-6"
                >
                  <AccordionTrigger className="hover:no-underline py-6 group">
                    <span className="text-left text-lg font-medium text-[hsl(30,20%,15%)] group-hover:text-[hsl(43,76%,58%)] transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[hsl(30,10%,35%)] leading-relaxed pb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem' }}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[hsl(43,76%,58%)]">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl text-[hsl(30,20%,15%)] mb-6" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Still have questions?
            </h3>
            <p className="text-[hsl(30,20%,15%)]/80 mb-8 max-w-lg mx-auto">
              We're here to help you plan your perfect event. Feel free to reach out to us directly.
            </p>
            <Link to="/contact">
              <button className="px-10 py-4 text-sm font-medium tracking-widest uppercase bg-[hsl(30,20%,15%)] text-white border-2 border-[hsl(30,20%,15%)] hover:bg-transparent hover:text-[hsl(30,20%,15%)] transition-all duration-300 flex items-center gap-2 mx-auto">
                <MessageCircle className="h-4 w-4" />
                Contact Us
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
