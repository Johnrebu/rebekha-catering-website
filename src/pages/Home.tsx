import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, easeOut } from "framer-motion";
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
import { Heart, Users, Utensils, Award, Phone, MessageCircle, Star, Quote, BadgeCheck } from "lucide-react";
import heroImage from "@/assets/hero-catering.jpg";

// High-quality images for catering services
const weddingImage = "https://images.pexels.com/photos/2306277/pexels-photo-2306277.jpeg?auto=compress&cs=tinysrgb&w=1200";
const birthdayImage = "https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=1200";
const corporateImage = "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1200";
const aboutImage = "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1200";
const privateDinnerImage = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Home = () => {
  const plugin = React.useRef(
    Autoplay({ 
      delay: 3000, 
      stopOnInteraction: false, 
      stopOnMouseEnter: true 
    })
  );

  const highlights = [
    // Placeholder image for the 'About' section. Replace with your own image in src/assets.
    // Using the imported aboutImage from assets instead of declaring it inline here.

    { icon: <Utensils className="h-8 w-8" />, title: "Veg & Non-Veg Catering" },
    { icon: <Users className="h-8 w-8" />, title: "Custom Menu Options" },
    { icon: <Award className="h-8 w-8" />, title: "Serving Love Since 1998" },
    { icon: <Heart className="h-8 w-8" />, title: "Hygienic & Authentic" },
  ];

  const services = [
    { image: weddingImage, title: "Weddings", path: "/services" },
    { image: birthdayImage, title: "Birthdays", path: "/services" },
    { image: corporateImage, title: "Corporate Events", path: "/services" },
    { image: privateDinnerImage, title: "Private Dinners", path: "/services" },
  ];

  const testimonials = [
    {
      name: "Antony Raj",
      event: "Wedding Reception",
      text: "The food was absolutely delicious and the presentation was stunning! Our guests are still talking about the amazing feast. Thank you for making our special day even more memorable!",
      initials: "AR",
      color: "from-pink-500 to-rose-500",
      rating: 5,
    },
    {
      name: "Rajesh Kumar",
      event: "Corporate Event",
      text: "Professional service and authentic taste. Rebekha Catering made our company anniversary celebration a huge success. Highly recommended!",
      initials: "RK",
      color: "from-blue-500 to-cyan-500",
      rating: 5,
    },
    {
      name: "Anjali",
      event: "Birthday Party",
      text: "The variety and quality of food exceeded our expectations. The team was punctual and the setup was beautiful. Will definitely book again!",
      initials: "AJ",
      color: "from-purple-500 to-pink-500",
      rating: 5,
    },
    {
      name: "Suresh",
      event: "50th Anniversary",
      text: "We wanted authentic South Indian food and Rebekha Catering delivered beyond expectations. The banana leaf meal reminded us of traditional family gatherings.",
      initials: "S",
      color: "from-amber-500 to-orange-500",
      rating: 5,
    },
    {
      name: "Mohammed Farhan",
      event: "Office Inauguration",
      text: "The non-veg spread was phenomenal! The chicken biryani and mutton dishes were restaurant-quality. Best catering service in Chennai!",
      initials: "MF",
      color: "from-green-500 to-emerald-500",
      rating: 5,
    },
  ];
  // Animation variants for Framer Motion
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  const listVariants = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
        
        {/* Decorative gradient border at top */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
        
        {/* Warm glow effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-transparent to-amber-950/30"></div>
        
        <motion.div
          className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.25 } },
          }}
        >
          {/* Main Headline - Serif Font */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent drop-shadow-2xl">
              Authentic Tastes,
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent drop-shadow-2xl">
              Unforgettable Memories.
            </span>
          </motion.h1>
          
          {/* Decorative divider */}
          <motion.div 
            variants={itemVariants}
            className="w-32 h-1 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 mx-auto mb-6 rounded-full"
          ></motion.div>
          
          {/* Subtext */}
          <motion.p 
            variants={itemVariants} 
            className="text-xl md:text-2xl lg:text-3xl mb-10 text-amber-100 font-light tracking-wide"
          >
            Premier Catering Services in West Tambaram & Chennai
          </motion.p>
          
          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            {/* Primary Button - View Menu */}
            <Link to="/menu">
              <button className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-amber-400 text-amber-950 font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-yellow-500/60 flex items-center gap-3 overflow-hidden border-2 border-yellow-400/50 min-w-[200px] justify-center magic-hover">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Utensils className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:rotate-12" />
                <span className="relative z-10">View Menu</span>
              </button>
            </Link>
            
            {/* Secondary Button - Get a Quote (Outline) */}
            <Link to="/contact">
              <button className="group relative px-8 py-4 rounded-full bg-transparent border-2 border-amber-300 text-amber-100 font-semibold text-lg transition-all duration-300 hover:scale-105 hover:bg-amber-100/10 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-500/30 flex items-center gap-3 min-w-[200px] justify-center backdrop-blur-sm magic-hover">
                <Phone className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                <span>Get a Quote</span>
              </button>
            </Link>
          </motion.div>
          
          {/* Trust badge */}
          <motion.p 
            variants={itemVariants}
            className="mt-10 text-amber-200 text-sm md:text-base flex items-center justify-center gap-2"
          >
            <Award className="h-5 w-5" />
            <span className="italic">Serving Love Since 1998 • 25+ Years of Excellence</span>
          </motion.p>
        </motion.div>
        
        {/* Floating scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="w-6 h-10 border-2 border-amber-300/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-amber-300 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Highlights Section */}
      <motion.section
        className="py-16 bg-card"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" variants={listVariants}>
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <Card className="text-center h-full hover:shadow-warm transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="pt-8 pb-6 flex flex-col items-center justify-center">
                    <div className="text-primary mb-4">{item.icon}</div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* About Preview */}
      <motion.section
        className="py-20 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
            >
              <img src={aboutImage} alt="Our Kitchen" className="rounded-lg shadow-lg w-full h-auto object-cover" />
            </motion.div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Founded in 1998 by Christopher Durairaj & Nancy Navaneetham, Rebekha
                Catering Services started in a small home kitchen at West Tambaram —
                driven by love, passion, and authentic recipes passed down through
                generations.
              </p>
              <Link to="/about">
                <Button variant="default" size="lg">
                  Read Our Full Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Services Preview */}
      <motion.section
        className="py-20 bg-muted"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              Catering for Every Occasion
            </h2>
            <p className="text-lg text-muted-foreground">
              From intimate gatherings to grand celebrations
            </p>
          </div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" variants={listVariants}>
            {services.map((service, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link to={service.path}>
                  <Card className="group overflow-hidden hover:shadow-warm transition-all duration-300">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <h3 className="text-white text-2xl font-bold font-serif p-6">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link to="/services">
              <Button variant="default" size="lg">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Preview */}
      <motion.section
        className="py-20 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Serving love, creating memories
            </p>
          </div>

          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto relative px-12"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="h-full relative overflow-hidden border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                      {/* Gradient top border */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.color}`}></div>
                      
                      <CardContent className="pt-8 pb-6 flex flex-col h-full">
                        {/* Quote Icon */}
                        <Quote className="h-8 w-8 text-amber-600/20 mb-3" />
                        
                        {/* Rating Stars */}
                        <div className="flex gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                          ))}
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-muted-foreground mb-6 italic text-sm leading-relaxed flex-grow">
                          "{testimonial.text}"
                        </p>

                        {/* Client Info with Avatar */}
                        <div className="flex items-center gap-3 border-t border-border pt-4 mt-auto">
                          <div className={`flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                            {testimonial.initials}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-1">
                              <p className="font-semibold text-sm">{testimonial.name}</p>
                              <BadgeCheck className="h-4 w-4 text-blue-500 fill-blue-500" />
                            </div>
                            <p className="text-xs text-muted-foreground">{testimonial.event}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-gradient-to-r from-red-700 to-amber-600 text-white border-none hover:from-red-800 hover:to-amber-700 shadow-lg -left-4 lg:-left-6" />
            <CarouselNext className="bg-gradient-to-r from-red-700 to-amber-600 text-white border-none hover:from-red-800 hover:to-amber-700 shadow-lg -right-4 lg:-right-6" />
          </Carousel>

          <div className="text-center mt-10">
            <Link to="/testimonials">
              <Button variant="default" size="lg">
                Read More Reviews
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">
            Let Us Serve Love at Your Next Event
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Experience the perfect blend of tradition and taste. Contact us
            today for a customized menu that will make your celebration
            unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="secondary" size="lg">
                Get a Quote Now
              </Button>
            </Link>
            <a
              href="https://wa.me/918925477007"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Home;

