import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  Heart, Users, ChefHat, Award, Phone, ArrowRight,
  Leaf, Clock, Star, Quote, MapPin, Send, Check
} from "lucide-react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

// Food images for gallery
const foodImages = [
  { src: "https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Biryani", category: "Main Course" },
  { src: "https://images.pexels.com/photos/9609838/pexels-photo-9609838.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Paneer Tikka", category: "Starters" },
  { src: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Butter Chicken", category: "Main Course" },
  { src: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Masala Dosa", category: "South Indian" },
  { src: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Chicken 65", category: "Starters" },
  { src: "https://images.pexels.com/photos/666988/pexels-photo-666988.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Desserts", category: "Sweets" },
  { src: "https://images.pexels.com/photos/2306277/pexels-photo-2306277.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Wedding Setup", category: "Events" },
  { src: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Fresh Ingredients", category: "Quality" },
];

// Menu categories
const menuCategories = [
  { name: "Breakfast", image: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400", link: "/menu" },
  { name: "Lunch", image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400", link: "/menu" },
  { name: "Dinner", image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400", link: "/menu" },
  { name: "Wedding", image: "https://images.pexels.com/photos/2306277/pexels-photo-2306277.jpeg?auto=compress&cs=tinysrgb&w=400", link: "/services" },
  { name: "Corporate", image: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=400", link: "/services" },
  { name: "Birthday", image: "https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=400", link: "/services" },
];

const testimonials = [
  {
    name: "Antony Raj",
    event: "Wedding Reception",
    text: "The food was absolutely delicious and the presentation was stunning! Our guests are still talking about the amazing feast.",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    name: "Rajesh Kumar",
    event: "Corporate Event",
    text: "Professional service and authentic taste. Rebekha Catering made our company anniversary celebration a huge success!",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    name: "Anjali Sharma",
    event: "Birthday Party",
    text: "The variety and quality of food exceeded our expectations. The team was punctual and the setup was beautiful!",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
];

// Animated counter hook
const useCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return { count, ref };
};

const Home = () => {
  const yearsCounter = useCounter(25, 2000);
  const eventsCounter = useCounter(10000, 2500);
  const dishesCounter = useCounter(200, 2000);

  // Enquire form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const portalId = "244427242";

      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/8dab0ded-7cbd-495b-8690-f9b1615418ee`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: [
              { name: "firstname", value: formData.name.split(" ")[0] || formData.name },
              { name: "lastname", value: formData.name.split(" ").slice(1).join(" ") || "" },
              { name: "email", value: formData.email },
              { name: "phone", value: formData.phone },
              { name: "event_type", value: formData.eventType },
              { name: "message", value: formData.message },
            ],
            context: {
              pageUri: window.location.href,
              pageName: "Home Page Enquiry",
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: "",
          message: "",
        });
      }, 5000);
    } catch (err) {
      console.error("Form submission error:", err);
      setError("Failed to submit form. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(45,40%,94%)]">
      <Navigation />

      {/* Hero Section - Eden Style */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/2306277/pexels-photo-2306277.jpeg?auto=compress&cs=tinysrgb&w=1920')`
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal mb-6" style={{ fontFamily: "'Great Vibes', cursive" }}>
            Rebekha Caterers
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8 tracking-wide">
            Fresh, authentic catering for every occasion
          </p>
          <p className="text-lg opacity-90 mb-10 max-w-2xl mx-auto">
            Since 1998, we've been serving Chennai with delicious, homemade food
            that brings families together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu">
              <button className="px-10 py-4 text-sm font-medium tracking-widest uppercase bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)] hover:bg-[hsl(38,70%,45%)] hover:border-[hsl(38,70%,45%)] transition-all duration-300">
                Order Online
              </button>
            </Link>
            <Link to="/contact">
              <button className="px-10 py-4 text-sm font-medium tracking-widest uppercase bg-transparent text-white border-2 border-white hover:bg-white/10 transition-all duration-300">
                Enquire
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Our Food Section - Eden Style */}
      <section className="py-20 bg-[hsl(43,76%,58%)]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl text-[hsl(30,20%,15%)] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Our Food
            </h2>
            <div className="w-20 h-0.5 bg-[hsl(30,20%,15%)] mx-auto opacity-50" />
          </motion.div>

          {/* Food Grid - Masonry Style */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2">
            {foodImages.map((food, index) => (
              <motion.div
                key={index}
                className={`relative overflow-hidden cursor-pointer group ${index === 0 ? 'col-span-2 row-span-2' : ''
                  }`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <img
                  src={food.src}
                  alt={food.alt}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${index === 0 ? 'h-[400px] md:h-[500px]' : 'h-[180px] md:h-[240px]'
                    }`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {food.alt}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/menu">
              <button className="px-10 py-4 text-sm font-medium tracking-widest uppercase bg-[hsl(30,20%,15%)] text-white border-2 border-[hsl(30,20%,15%)] hover:bg-transparent hover:text-[hsl(30,20%,15%)] transition-all duration-300">
                View Full Menu
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Menu Categories Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {menuCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link to={category.link} className="block group">
                  <div className="relative overflow-hidden rounded-full aspect-square mb-3">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                  </div>
                  <p className="text-center text-sm font-medium tracking-wide uppercase text-[hsl(30,20%,15%)] group-hover:text-[hsl(38,70%,45%)] transition-colors">
                    {category.name}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Event Banner */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=1920')`
          }}
        />
        <div className="absolute inset-0 bg-[hsl(43,76%,58%)]/90" />

        <motion.div
          className="relative z-10 container mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl text-[hsl(30,20%,15%)] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
            Wedding Season
          </h2>
          <p className="text-4xl md:text-5xl font-light text-[hsl(30,20%,15%)] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            2026
          </p>
          <p className="text-lg text-[hsl(30,20%,15%)]/80 mb-8 max-w-xl mx-auto">
            Book your dream wedding catering now. Custom menus, professional service, unforgettable taste.
          </p>
          <Link to="/contact">
            <button className="px-10 py-4 text-sm font-medium tracking-widest uppercase bg-[hsl(30,20%,15%)] text-white border-2 border-[hsl(30,20%,15%)] hover:bg-transparent hover:text-[hsl(30,20%,15%)] transition-all duration-300">
              Book Now
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            <motion.div
              ref={yearsCounter.ref}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Award className="h-10 w-10 text-[hsl(43,76%,58%)] mx-auto mb-3" />
              <div className="text-4xl md:text-5xl font-light text-[hsl(30,20%,15%)]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {yearsCounter.count}+
              </div>
              <p className="text-sm text-[hsl(30,10%,45%)] uppercase tracking-wider mt-2">Years</p>
            </motion.div>

            <motion.div
              ref={eventsCounter.ref}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Users className="h-10 w-10 text-[hsl(43,76%,58%)] mx-auto mb-3" />
              <div className="text-4xl md:text-5xl font-light text-[hsl(30,20%,15%)]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {eventsCounter.count.toLocaleString()}+
              </div>
              <p className="text-sm text-[hsl(30,10%,45%)] uppercase tracking-wider mt-2">Events</p>
            </motion.div>

            <motion.div
              ref={dishesCounter.ref}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <ChefHat className="h-10 w-10 text-[hsl(43,76%,58%)] mx-auto mb-3" />
              <div className="text-4xl md:text-5xl font-light text-[hsl(30,20%,15%)]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {dishesCounter.count}+
              </div>
              <p className="text-sm text-[hsl(30,10%,45%)] uppercase tracking-wider mt-2">Dishes</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-[hsl(45,40%,94%)]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="overflow-hidden">
                <img
                  src="/founders.jpg"
                  alt="Our Founders"
                  className="w-full h-[500px] object-cover object-top"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl text-[hsl(30,20%,15%)] mb-6" style={{ fontFamily: "'Great Vibes', cursive" }}>
                About Us
              </h2>
              <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mb-8" />

              <p className="text-lg text-[hsl(30,10%,35%)] leading-relaxed mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem' }}>
                Rebekha Caterers is one of Chennai's most trusted catering services,
                providing fresh, authentic and delicious food since 1998.
              </p>

              <p className="text-lg text-[hsl(30,10%,35%)] leading-relaxed mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem' }}>
                Founded by Christopher Durairaj & Nancy Navaneetham, we bring
                traditional recipes passed through generations to your celebrations.
                Be it a wedding for 1000 or a birthday for 50, we have the experience
                and passion to make your event memorable.
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Leaf, text: "Fresh Ingredients" },
                  { icon: ChefHat, text: "Expert Chefs" },
                  { icon: Clock, text: "Timely Service" },
                  { icon: Heart, text: "Made with Love" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-[hsl(30,20%,15%)]">
                    <item.icon className="h-5 w-5 text-[hsl(43,76%,58%)]" />
                    <span className="text-sm uppercase tracking-wide">{item.text}</span>
                  </div>
                ))}
              </div>

              <Link to="/about">
                <button className="px-8 py-3 text-sm font-medium tracking-widest uppercase bg-transparent text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)] hover:bg-[hsl(43,76%,58%)] transition-all duration-300 flex items-center gap-2">
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl text-[hsl(30,20%,15%)] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
              The Team
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto mb-6" />
            <p className="text-lg text-[hsl(30,10%,35%)] mb-8 max-w-xl mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Our dedicated team of chefs, service staff, and coordinators work together
              to make your events exceptional.
            </p>
            <Link to="/about">
              <button className="px-8 py-3 text-sm font-medium tracking-widest uppercase bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)] hover:bg-[hsl(38,70%,45%)] hover:border-[hsl(38,70%,45%)] transition-all duration-300">
                Meet The Team
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[hsl(45,40%,94%)]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl text-[hsl(30,20%,15%)] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Testimonials
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Quote className="h-8 w-8 text-[hsl(43,76%,58%)] mx-auto mb-4" />
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[hsl(43,76%,58%)] text-[hsl(43,76%,58%)]" />
                  ))}
                </div>
                <p className="text-[hsl(30,10%,35%)] italic mb-6 leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem' }}>
                  "{testimonial.text}"
                </p>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mx-auto mb-3"
                />
                <h4 className="font-medium text-[hsl(30,20%,15%)]">{testimonial.name}</h4>
                <p className="text-sm text-[hsl(30,10%,45%)]">{testimonial.event}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/testimonials">
              <button className="px-8 py-3 text-sm font-medium tracking-widest uppercase bg-transparent text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)] hover:bg-[hsl(43,76%,58%)] transition-all duration-300">
                View All Reviews
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enquire Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl text-[hsl(30,20%,15%)] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Enquire
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto mb-6" />
            <p className="text-lg text-[hsl(30,10%,35%)] max-w-xl mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Ready to make your event memorable? Get in touch with us today.
            </p>
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto bg-[hsl(45,40%,94%)] p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl text-[hsl(30,20%,15%)] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Thank You!
                </h3>
                <p className="text-[hsl(30,10%,45%)]">
                  We've received your enquiry and will get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors disabled:opacity-50"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors disabled:opacity-50"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors disabled:opacity-50"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">Event Type</label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors disabled:opacity-50"
                  >
                    <option value="">Select event type</option>
                    <option value="wedding">Wedding</option>
                    <option value="birthday">Birthday</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors resize-none disabled:opacity-50"
                    placeholder="Tell us about your event"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-sm font-medium tracking-widest uppercase bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)] hover:bg-[hsl(38,70%,45%)] hover:border-[hsl(38,70%,45%)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Enquiry
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Contact Info */}
            <div className="mt-8 pt-8 border-t border-[hsl(40,20%,85%)] text-center">
              <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-sm text-[hsl(30,10%,35%)]">
                <a href="tel:+919445435102" className="flex items-center gap-2 hover:text-[hsl(38,70%,45%)] transition-colors">
                  <Phone className="h-4 w-4" />
                  <span>+91 94454 35102</span>
                </a>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>West Tambaram, Chennai</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Business Card Section - Home Page */}
      <section className="py-20 bg-[hsl(45,40%,94%)]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-4xl text-[hsl(30,20%,15%)] mb-6" style={{ fontFamily: "'Great Vibes', cursive" }}>
                Connect With Us
              </h2>
              <p className="text-[hsl(30,10%,35%)] mb-8 leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem' }}>
                Save our contact details for your next event. We are dedicated to providing the best catering and transport services in Chennai.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <button className="px-6 py-3 text-xs font-bold uppercase tracking-widest bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] hover:bg-[hsl(38,70%,45%)] transition-all">
                    Get in Touch
                  </button>
                </Link>
                <a href="/catering-card.jpg" download className="px-6 py-3 text-xs font-bold uppercase tracking-widest border-2 border-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] hover:bg-[hsl(43,76%,58%)] transition-all text-center">
                  Save Card
                </a>
              </div>
            </div>
            <div className="md:w-1/2 relative group">
              <div className="absolute -inset-2 bg-[hsl(43,76%,58%)]/20 blur-lg group-hover:bg-[hsl(43,76%,58%)]/30 transition-all"></div>
              <img
                src="/catering-card.jpg"
                alt="Rebekha Caterers Card"
                className="relative z-10 w-full shadow-2xl transition-transform duration-500 group-hover:scale-[1.05]"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Home;
