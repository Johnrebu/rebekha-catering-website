import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { 
  Heart, Users, Utensils, Award, Phone, MessageCircle, Star, Quote, 
  BadgeCheck, ChefHat, Sparkles, ArrowRight, Calendar, MapPin, Clock,
  Leaf, Flame
} from "lucide-react";
import heroImage from "@/assets/hero-catering.jpg";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

// High-quality images for catering services
const weddingImage = "https://images.pexels.com/photos/2306277/pexels-photo-2306277.jpeg?auto=compress&cs=tinysrgb&w=1200";
const birthdayImage = "https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=1200";
const corporateImage = "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1200";
const aboutImage = "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1200";
const privateDinnerImage = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200";

// Featured dishes images
const dishes = [
  { name: "Biryani Royale", image: "https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=800", type: "non-veg" },
  { name: "Paneer Tikka", image: "https://images.pexels.com/photos/9609838/pexels-photo-9609838.jpeg?auto=compress&cs=tinysrgb&w=800", type: "veg" },
  { name: "Butter Chicken", image: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=800", type: "non-veg" },
  { name: "Masala Dosa", image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800", type: "veg" },
  { name: "Chicken 65", image: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=800", type: "non-veg" },
  { name: "Gulab Jamun", image: "https://images.pexels.com/photos/666988/pexels-photo-666988.jpeg?auto=compress&cs=tinysrgb&w=800", type: "veg" },
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
  const plugin = React.useRef(
    Autoplay({ 
      delay: 3000, 
      stopOnInteraction: false, 
      stopOnMouseEnter: true 
    })
  );

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Stats counters
  const yearsCounter = useCounter(25, 2000);
  const eventsCounter = useCounter(10000, 2500);
  const familiesCounter = useCounter(500, 2000);
  const dishesCounter = useCounter(200, 2000);

  const services = [
    { 
      image: weddingImage, 
      title: "Wedding Celebrations", 
      description: "Exquisite menus for your perfect day",
      icon: Heart,
      path: "/services" 
    },
    { 
      image: birthdayImage, 
      title: "Birthday Parties", 
      description: "Make every birthday special",
      icon: Sparkles,
      path: "/services" 
    },
    { 
      image: corporateImage, 
      title: "Corporate Events", 
      description: "Professional catering for business",
      icon: Users,
      path: "/services" 
    },
    { 
      image: privateDinnerImage, 
      title: "Private Dinners", 
      description: "Intimate gatherings, grand flavors",
      icon: ChefHat,
      path: "/services" 
    },
  ];

  const testimonials = [
    {
      name: "Antony Raj",
      event: "Wedding Reception",
      text: "The food was absolutely delicious and the presentation was stunning! Our guests are still talking about the amazing feast.",
      initials: "AR",
      color: "from-pink-500 to-rose-500",
      rating: 5,
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Rajesh Kumar",
      event: "Corporate Event",
      text: "Professional service and authentic taste. Rebekha Catering made our company anniversary celebration a huge success!",
      initials: "RK",
      color: "from-blue-500 to-cyan-500",
      rating: 5,
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Anjali Sharma",
      event: "Birthday Party",
      text: "The variety and quality of food exceeded our expectations. The team was punctual and the setup was beautiful!",
      initials: "AS",
      color: "from-purple-500 to-pink-500",
      rating: 5,
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Mohammed Farhan",
      event: "Office Inauguration",
      text: "The non-veg spread was phenomenal! The chicken biryani and mutton dishes were restaurant-quality. Best in Chennai!",
      initials: "MF",
      color: "from-green-500 to-emerald-500",
      rating: 5,
      image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />

      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION - Cinematic Fullscreen Experience
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div
          className="absolute inset-0"
          style={{ y: heroY }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
        </motion.div>
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/40 via-transparent to-amber-950/40" />
        
        {/* Animated Grain Texture */}
        <div className="absolute inset-0 opacity-20" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")` 
          }} 
        />

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto"
          style={{ opacity: heroOpacity }}
        >
          {/* Decorative Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 backdrop-blur-sm mb-8"
          >
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-amber-200 text-sm font-medium">Premium Catering Since 1998</span>
            <Sparkles className="h-4 w-4 text-amber-400" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif mb-6 leading-tight"
          >
            <span className="block bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
              Crafting
            </span>
            <span className="block text-white mt-2">
              Culinary
            </span>
            <span className="block bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent mt-2">
              Masterpieces
            </span>
          </motion.h1>

          {/* Decorative Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-40 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-8"
          />

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-amber-100/90 mb-12 max-w-2xl mx-auto font-light"
          >
            Where every dish tells a story and every event becomes an
            <span className="text-amber-300 font-medium"> unforgettable memory</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/menu">
              <button className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 font-bold text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/40 flex items-center gap-3 overflow-hidden min-w-[220px] justify-center">
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Utensils className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:rotate-12" />
                <span className="relative z-10">Explore Menu</span>
                <ArrowRight className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Link>
            
            <Link to="/contact">
              <button className="group relative px-8 py-4 rounded-full border-2 border-amber-400/50 text-amber-100 font-semibold text-lg transition-all duration-500 hover:border-amber-400 hover:bg-amber-500/10 hover:scale-105 flex items-center gap-3 min-w-[220px] justify-center backdrop-blur-sm">
                <Calendar className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                <span>Book Your Event</span>
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-amber-300/60 text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-10 border-2 border-amber-400/30 rounded-full flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-3 bg-amber-400 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STATS SECTION - Animated Counters
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 bg-gradient-to-r from-red-950 via-amber-950 to-red-950 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(251,191,36,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Years of Excellence */}
            <motion.div
              ref={yearsCounter.ref}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center group"
            >
              <div className="relative inline-flex items-center justify-center mb-4">
                <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl group-hover:bg-amber-500/30 transition-all duration-500" />
                <Award className="h-12 w-12 text-amber-400 relative z-10" />
              </div>
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                {yearsCounter.count}<span className="text-amber-400">+</span>
              </div>
              <div className="text-amber-200/80 text-sm uppercase tracking-wider">Years of Excellence</div>
            </motion.div>

            {/* Events Catered */}
            <motion.div
              ref={eventsCounter.ref}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center group"
            >
              <div className="relative inline-flex items-center justify-center mb-4">
                <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl group-hover:bg-amber-500/30 transition-all duration-500" />
                <Calendar className="h-12 w-12 text-amber-400 relative z-10" />
              </div>
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                {eventsCounter.count.toLocaleString()}<span className="text-amber-400">+</span>
              </div>
              <div className="text-amber-200/80 text-sm uppercase tracking-wider">Events Catered</div>
            </motion.div>

            {/* Happy Families */}
            <motion.div
              ref={familiesCounter.ref}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center group"
            >
              <div className="relative inline-flex items-center justify-center mb-4">
                <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl group-hover:bg-amber-500/30 transition-all duration-500" />
                <Heart className="h-12 w-12 text-amber-400 relative z-10" />
              </div>
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                {familiesCounter.count}<span className="text-amber-400">+</span>
              </div>
              <div className="text-amber-200/80 text-sm uppercase tracking-wider">Happy Families</div>
            </motion.div>

            {/* Signature Dishes */}
            <motion.div
              ref={dishesCounter.ref}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center group"
            >
              <div className="relative inline-flex items-center justify-center mb-4">
                <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl group-hover:bg-amber-500/30 transition-all duration-500" />
                <ChefHat className="h-12 w-12 text-amber-400 relative z-10" />
              </div>
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                {dishesCounter.count}<span className="text-amber-400">+</span>
              </div>
              <div className="text-amber-200/80 text-sm uppercase tracking-wider">Signature Dishes</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          ABOUT SECTION - Premium Split Layout
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-100/50 to-transparent" />
        
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <img 
                  src="/founders.jpg" 
                  alt="Our Founders - Christopher Durairaj & Nancy Navaneetham" 
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="font-semibold text-lg">Our Founders</p>
                  <p className="text-amber-200 text-sm">Christopher & Nancy</p>
                </div>
              </div>
              
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-6 -right-6 bg-gradient-to-br from-amber-500 to-red-600 text-white p-6 rounded-2xl shadow-xl"
              >
                <div className="text-4xl font-bold">25+</div>
                <div className="text-sm opacity-90">Years of Trust</div>
              </motion.div>
            </motion.div>

            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <span className="text-amber-600 font-semibold uppercase tracking-wider text-sm">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-bold font-serif mt-4 mb-6 text-gray-900">
                A Legacy of <span className="text-amber-600">Love</span> & <span className="text-red-700">Flavor</span>
              </h2>
              
              <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-red-600 mb-8" />
              
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Founded in 1998 by <strong>Christopher Durairaj & Nancy Navaneetham</strong>, 
                Rebekha Catering Services began in a humble kitchen in West Tambaram — 
                driven by passion, authenticity, and generations of treasured recipes.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Today, we continue that legacy, serving love on every plate and transforming 
                your celebrations into unforgettable culinary experiences.
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Leaf, text: "Fresh Ingredients" },
                  { icon: ChefHat, text: "Expert Chefs" },
                  { icon: Clock, text: "Timely Service" },
                  { icon: Heart, text: "Made with Love" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-gray-700">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <item.icon className="h-5 w-5 text-amber-600" />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              <Link to="/about">
                <Button size="lg" className="bg-gradient-to-r from-red-700 to-amber-600 hover:from-red-800 hover:to-amber-700 text-white">
                  Discover Our Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SERVICES SECTION - Interactive Cards
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-600 font-semibold uppercase tracking-wider text-sm">What We Offer</span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif mt-4 mb-6 text-gray-900">
              Catering for Every <span className="text-amber-600">Occasion</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-red-600 mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From intimate gatherings to grand celebrations, we bring the perfect blend 
              of taste, presentation, and service to every event.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={service.path}>
                  <Card className="group h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="relative h-72 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500" />
                      
                      {/* Icon Badge */}
                      <div className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 group-hover:bg-amber-500 group-hover:border-amber-500 transition-all duration-500">
                        <service.icon className="h-5 w-5 text-white" />
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold text-white font-serif mb-2 group-hover:text-amber-300 transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-white/80 text-sm mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          {service.description}
                        </p>
                        <div className="flex items-center text-amber-400 text-sm font-semibold transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                          <span>Learn More</span>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/services">
              <Button size="lg" variant="outline" className="border-2 border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FEATURED MENU SECTION - Horizontal Scroll
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-r from-red-950 via-amber-950 to-red-950 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-400 font-semibold uppercase tracking-wider text-sm">Taste The Best</span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif mt-4 mb-6 text-white">
              Our <span className="text-amber-400">Signature</span> Dishes
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-red-600 mx-auto mb-6" />
            <p className="text-lg text-amber-100/80 max-w-2xl mx-auto">
              Handcrafted with love, seasoned with tradition, and served with pride
            </p>
          </motion.div>

          {/* Dishes Carousel */}
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {dishes.map((dish, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group relative"
                    >
                      <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
                        
                        {/* Type Badge */}
                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                          dish.type === 'veg' 
                            ? 'bg-green-500/90 text-white' 
                            : 'bg-red-500/90 text-white'
                        }`}>
                          {dish.type === 'veg' ? <Leaf className="h-3 w-3" /> : <Flame className="h-3 w-3" />}
                          {dish.type === 'veg' ? 'Veg' : 'Non-Veg'}
                        </div>

                        {/* Dish Name */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-2xl font-bold text-white font-serif">{dish.name}</h3>
                        </div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-amber-500 text-white border-none hover:bg-amber-600 -left-4" />
              <CarouselNext className="bg-amber-500 text-white border-none hover:bg-amber-600 -right-4" />
            </Carousel>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/menu">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 hover:from-amber-400 hover:to-yellow-300 font-bold">
                View Full Menu
                <Utensils className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          TESTIMONIALS SECTION - Premium Design
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-600 font-semibold uppercase tracking-wider text-sm">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif mt-4 mb-6 text-gray-900">
              What Our <span className="text-amber-600">Clients</span> Say
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-red-600 mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it — hear from the families who trusted us with their celebrations
            </p>
          </motion.div>

          {/* Testimonials Carousel */}
          <Carousel
            plugins={[plugin.current]}
            opts={{ align: "start", loop: true }}
            className="w-full max-w-6xl mx-auto relative px-8"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full"
                  >
                    <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white relative overflow-hidden group">
                      {/* Gradient Border Top */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.color}`} />
                      
                      <CardContent className="p-8">
                        {/* Quote Icon */}
                        <Quote className="h-12 w-12 text-amber-200 mb-4" />
                        
                        {/* Rating */}
                        <div className="flex gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-gray-600 text-lg italic leading-relaxed mb-8">
                          "{testimonial.text}"
                        </p>

                        {/* Client Info */}
                        <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-14 h-14 rounded-full object-cover ring-4 ring-amber-100"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                              <BadgeCheck className="h-5 w-5 text-blue-500 fill-blue-500" />
                            </div>
                            <p className="text-sm text-gray-500">{testimonial.event}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-gradient-to-r from-red-700 to-amber-600 text-white border-none hover:from-red-800 hover:to-amber-700 -left-4" />
            <CarouselNext className="bg-gradient-to-r from-red-700 to-amber-600 text-white border-none hover:from-red-800 hover:to-amber-700 -right-4" />
          </Carousel>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/testimonials">
              <Button size="lg" variant="outline" className="border-2 border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white">
                Read More Reviews
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FINAL CTA SECTION - Immersive Design
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${weddingImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/95 via-amber-950/90 to-red-950/95" />

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-amber-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Sparkles className="h-12 w-12 text-amber-400 mx-auto mb-6" />
            
            <h2 className="text-4xl md:text-6xl font-bold font-serif mb-6 text-white leading-tight">
              Ready to Create 
              <span className="block text-amber-400 mt-2">Unforgettable Memories?</span>
            </h2>
            
            <p className="text-xl text-amber-100/90 mb-10 max-w-2xl mx-auto">
              Let us bring the magic of exceptional cuisine to your next celebration. 
              Contact us today for a personalized quote.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact">
                <button className="group px-10 py-5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 font-bold text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/50 flex items-center gap-3">
                  <Phone className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Get Your Free Quote</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>
              
              <a href="https://wa.me/918925477007" target="_blank" rel="noopener noreferrer">
                <button className="group px-10 py-5 rounded-full border-2 border-green-400 text-green-400 font-bold text-lg transition-all duration-500 hover:bg-green-500 hover:text-white hover:border-green-500 hover:scale-105 flex items-center gap-3">
                  <MessageCircle className="h-6 w-6" />
                  <span>WhatsApp Us</span>
                </button>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-6 mt-12 text-amber-200/60 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>West Tambaram, Chennai</span>
              </div>
              <div className="w-1 h-4 bg-amber-500/30" />
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 89254 77007</span>
              </div>
              <div className="w-1 h-4 bg-amber-500/30" />
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Available 24/7</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Home;
