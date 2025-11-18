import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Utensils, Award, Phone, MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-catering.jpg";
import weddingImage from "@/assets/wedding-catering.jpg";
import birthdayImage from "@/assets/birthday-catering.jpg";
import corporateImage from "@/assets/corporate-catering.jpg";
import privateDinnerImage from "@/assets/private-dinner.jpg";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Home = () => {
  const highlights = [
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
      name: "Priya Sharma",
      event: "Wedding Reception",
      text: "The food was absolutely delicious and the presentation was stunning! Our guests are still talking about the amazing feast. Thank you for making our special day even more memorable!",
    },
    {
      name: "Rajesh Kumar",
      event: "Corporate Event",
      text: "Professional service and authentic taste. Rebekha Catering made our company anniversary celebration a huge success. Highly recommended!",
    },
    {
      name: "Anjali Menon",
      event: "Birthday Party",
      text: "The variety and quality of food exceeded our expectations. The team was punctual and the setup was beautiful. Will definitely book again!",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroImage})`,
          }}
        />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-4">
            Rebekha Catering Services
          </h1>
          <p className="text-2xl md:text-3xl mb-6 italic">
            Serving Love for Every Occasion
          </p>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Homemade, hygienic veg & non-veg catering from West Tambaram since
            1998, blending traditional recipes with modern culinary love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu">
              <Button variant="hero" size="lg">
                Explore Menu
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Get Free Quote
              </Button>
            </Link>
            <a href="tel:+919876543210">
              <Button variant="secondary" size="lg">
                <Phone className="h-5 w-5" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-warm transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="pt-8 pb-6">
                  <div className="text-primary mb-4 flex justify-center">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl text-center animate-fade-in">
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
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              Catering for Every Occasion
            </h2>
            <p className="text-lg text-muted-foreground">
              From intimate gatherings to grand celebrations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link key={index} to={service.path}>
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
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/services">
              <Button variant="default" size="lg">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Serving love, creating memories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="hover:shadow-elegant transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="text-primary text-4xl mb-4">"</div>
                  <p className="text-muted-foreground mb-4 italic">
                    {testimonial.text}
                  </p>
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.event}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/testimonials">
              <Button variant="default" size="lg">
                Read More Reviews
              </Button>
            </Link>
          </div>
        </div>
      </section>

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
              href="https://wa.me/919876543210"
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
