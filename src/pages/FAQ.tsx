import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-r from-amber-50 to-orange-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-100/50 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4 bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200">
              Support
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-gray-900 leading-tight">
              Frequently Asked <span className="text-amber-600">Questions</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Find answers to common questions about our catering services, menu planning, and event management.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b-amber-100">
                  <AccordionTrigger className="text-left text-lg font-semibold text-gray-800 hover:text-amber-700 hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed pb-6 text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-amber-900 text-white rounded-2xl p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
              <div className="relative z-10">
                <HelpCircle className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
                <p className="text-amber-100 mb-8 max-w-lg mx-auto">
                  Can't find the answer you're looking for? Please write to us or give us a call. We are happy to help!
                </p>
                <Link to="/contact">
                  <Button size="lg" className="bg-white text-amber-900 hover:bg-amber-50 font-bold">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default FAQ;
