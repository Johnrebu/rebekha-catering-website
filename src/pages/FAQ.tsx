import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { MessageCircle, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqCategories = [
    {
      title: "Booking and Availability",
      items: [
        {
          question: "How far in advance should I book your services?",
          answer: "For weddings and peak season dates, we recommend booking at least 2 to 6 months in advance. For birthdays and small functions, we can support shorter notice based on availability."
        },
        {
          question: "What is the minimum and maximum guest count you cater?",
          answer: "We cater both small and large gatherings, from intimate family events to large celebrations. Share your expected guest count and venue details for an accurate recommendation."
        },
        {
          question: "Do you take last-minute catering orders?",
          answer: "Yes, we do our best to support urgent requests for Chennai events. Confirmation depends on date, guest count, and menu complexity."
        }
      ]
    },
    {
      title: "Menu and Customization",
      items: [
        {
          question: "Do you offer both Vegetarian and Non-Vegetarian menus?",
          answer: "Yes. We provide complete vegetarian, complete non-vegetarian, and mixed menu options with South Indian and multi-cuisine selections."
        },
        {
          question: "Can I customize the menu based on my budget?",
          answer: "Absolutely. We build custom menu plans by balancing must-have dishes, service style, and guest profile so you stay within budget without compromising quality."
        },
        {
          question: "Do you provide tasting sessions before finalizing?",
          answer: "Yes, tasting support is available for confirmed major bookings, especially weddings. This helps you finalize taste, spice level, and presentation."
        },
        {
          question: "Can you handle dietary requirements like Jain or low-spice food?",
          answer: "Yes. We can accommodate special dietary preferences such as Jain options, low-spice dishes, and no-onion/no-garlic requests when informed in advance."
        }
      ]
    },
    {
      title: "Event Service and Setup",
      items: [
        {
          question: "Do you provide serving staff and buffet setup?",
          answer: "Yes. Our full-service packages include trained service staff, buffet arrangement, and event-time coordination so your function runs smoothly."
        },
        {
          question: "Do you provide cutlery, vessels, and service equipment?",
          answer: "Yes. We provide the required service equipment for the selected package, including buffet vessels and serving essentials."
        },
        {
          question: "Can you manage catering at outdoor and marriage hall venues?",
          answer: "Yes. We cater at marriage halls, banquet spaces, corporate venues, and outdoor setups across Chennai, subject to venue permissions and logistics."
        }
      ]
    },
    {
      title: "Pricing, Area and Policy",
      items: [
        {
          question: "What areas do you serve?",
          answer: "We are based in West Tambaram and serve most locations across Chennai and nearby districts. Share your venue pin code to confirm coverage."
        },
        {
          question: "How is catering pricing calculated?",
          answer: "Pricing depends on guest count, selected dishes, service style, and venue logistics. We provide clear quotation options after understanding your requirements."
        },
        {
          question: "What is your cancellation or rescheduling policy?",
          answer: "Policy terms depend on how close the event is to the service date and procurement stage. Detailed cancellation and reschedule terms are shared during booking confirmation."
        },
        {
          question: "Do you offer seasonal specials or promotional packages?",
          answer: "Yes. We periodically run seasonal and event-specific menu bundles. Contact us for current offers available for your date."
        }
      ]
    }
  ];

  const flatFaqs = faqCategories.flatMap((category) => category.items);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: flatFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const quickFaqs = [
    {
      question: "What types of events do you cater to?",
      answer: "We cater to a wide range of events including weddings, corporate events, birthday parties, house warmings, private dinners, and large social gatherings. Whether it's an intimate group of 50 or a grand celebration of 5000, we've got you covered."
    },
    {
      question: "Do you provide both veg and non-veg catering?",
      answer: "Yes. We provide vegetarian, non-vegetarian, and mixed menu services for weddings, birthdays, and corporate events."
    },
    {
      question: "Do you provide setup and serving staff?",
      answer: "Yes. Our team handles buffet setup, service flow, and guest-facing support during your event."
    },
    {
      question: "Do you provide service in all areas of Chennai?",
      answer: "We cover most areas in and around Chennai. Contact us with your venue location to confirm."
    }
  ];

  return (
    <div className="min-h-screen bg-[hsl(45,40%,94%)]">
      <SEO
        title="FAQ - Rebekha Catering Services Chennai | Booking, Menu, Pricing"
        description="Frequently asked questions about Rebekha Catering Services in Chennai. Get answers on booking, menu customization, pricing, serving staff, and event coverage."
        keywords="catering FAQ Chennai, wedding catering questions, menu customization catering, catering pricing Chennai, corporate catering FAQ"
        canonical="https://rebekhacaterers.online/faq"
        ogUrl="https://rebekhacaterers.online/faq"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
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
            Answers for booking, menu, pricing and event planning
          </p>
        </motion.div>
      </section>

      {/* Quick Answer Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl text-[hsl(30,20%,15%)] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
                Quick Answers
              </h2>
              <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto mb-6" />
              <p className="text-[hsl(30,10%,45%)] max-w-2xl mx-auto">
                Most requested questions from families and event organizers in Chennai.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {quickFaqs.map((faq, index) => (
                <motion.article
                  key={index}
                  className="border border-[hsl(40,20%,85%)] p-6 bg-[hsl(45,40%,94%)]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                >
                  <h3 className="text-xl text-[hsl(30,20%,15%)] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {faq.question}
                  </h3>
                  <p className="text-[hsl(30,10%,35%)] leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.article>
              ))}
            </div>

            <div className="space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.1 }}
                >
                  <h3 className="text-3xl text-[hsl(30,20%,15%)] mb-5" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {category.title}
                  </h3>
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {category.items.map((faq, index) => (
                      <AccordionItem
                        key={faq.question}
                        value={`${categoryIndex}-item-${index}`}
                        className="border border-[hsl(40,20%,85%)] px-6 bg-white"
                      >
                        <AccordionTrigger className="hover:no-underline py-6 group">
                          <span className="text-left text-lg font-medium text-[hsl(30,20%,15%)] group-hover:text-[hsl(43,76%,58%)] transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-[hsl(30,10%,35%)] leading-relaxed pb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.08rem' }}>
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              ))}
            </div>

            <div className="mt-14 border border-[hsl(40,20%,85%)] bg-[hsl(45,40%,94%)] p-7">
              <h3 className="text-2xl text-[hsl(30,20%,15%)] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Need a custom quote for your event?
              </h3>
              <p className="text-[hsl(30,10%,35%)] mb-4">
                Share your event date, guest count, and preferred menu style. We will suggest a suitable plan with transparent pricing.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <button className="px-7 py-3 text-sm font-medium tracking-widest uppercase bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)] hover:bg-[hsl(38,70%,45%)] hover:border-[hsl(38,70%,45%)] transition-all duration-300 flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Request Quote
                  </button>
                </Link>
                <a href="tel:+919445435102">
                  <button className="px-7 py-3 text-sm font-medium tracking-widest uppercase bg-transparent text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)] hover:bg-[hsl(43,76%,58%)] transition-all duration-300 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Call Now
                  </button>
                </a>
              </div>
            </div>
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
