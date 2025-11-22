import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Heart, Cake, Briefcase, Users, Sparkles, ChefHat } from "lucide-react";

const Services = () => {
  const services = [
    {
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80",
      icon: <Heart className="h-8 w-8" />,
      iconColor: "text-pink-500",
      title: "Wedding & Engagement Catering",
      description:
       "Make your special day unforgettable with our exquisite wedding catering services. We handle everything from intimate ceremonies to grand celebrations with elegance and precision.",
      features: [
        "Customized wedding menus tailored to your taste",
        "Traditional & fusion options",
        "Elegant presentation & venue setup",
        "Professional uniformed service staff",
        "Floral decoration coordination",
        "Multi-cuisine offerings (Indian, Continental, Chinese)",
      ],
    },
    {
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80",
      icon: <Cake className="h-8 w-8" />,
      iconColor: "text-yellow-500",
      title: "Birthday Party Catering",
      description:
        "Celebrate life's special moments with delicious food and joyful service. From kids' parties to milestone celebrations, we create memorable experiences filled with fun and flavor.",
      features: [
        "Age-appropriate customized menus",
        "Theme-based food presentation",
        "Kids-friendly delicious options",
        "Cake & dessert bar coordination",
        "Party setup & decoration assistance",
        "Fun & interactive service experience",
      ],
    },
    {
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80",
      icon: <Briefcase className="h-8 w-8" />,
      iconColor: "text-blue-500",
      title: "Corporate & Office Events",
      description:
        "Professional catering for business events, conferences, product launches, and office celebrations. We ensure smooth, efficient service that lets you focus on your event's success.",
      features: [
        "Timely & efficient punctual service",
        "Professional corporate presentation",
        "Conference meal packages",
        "Working lunch box options",
        "Coffee, tea & snack break stations",
        "Complete dietary accommodations",
      ],
    },
    {
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
      icon: <Users className="h-8 w-8" />,
      iconColor: "text-amber-600",
      title: "Private Dinners & Family Gatherings",
      description:
        "Intimate dining experiences for your family and close friends. Enjoy restaurant-quality gourmet food in the comfort of your home or chosen venue with personalized attention.",
      features: [
        "Intimate dining setups & arrangement",
        "Chef's special signature menus",
        "Personalized dedicated service",
        "Multi-course fine dining meals",
        "Elegant table decoration",
        "Wine & beverage pairing suggestions",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section with Background Image */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1555244162-803834f70033?w=1600&q=80" 
            alt="Catering services" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
        </div>
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 animate-fade-in text-white">
            Our Services
          </h1>
          <p className="text-xl text-amber-100 animate-fade-in">
            Comprehensive catering solutions for every occasion
          </p>
        </div>
      </section>

      {/* Services Grid with Enhanced Design */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <div className="relative group">
                    {/* Gradient border effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-700 to-amber-600 rounded-2xl opacity-50 blur transition-all duration-300 group-hover:opacity-100"></div>
                    
                    <Card className="relative overflow-hidden shadow-2xl h-full rounded-2xl border-none">
                      <div className="relative h-[450px] overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        
                        {/* Icon badge */}
                        <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                          <div className={service.iconColor}>
                            {service.icon}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>

                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold font-serif bg-gradient-to-r from-red-700 to-amber-600 bg-clip-text text-transparent">
                      {service.title}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 group/item">
                          <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-gradient-to-r from-red-700 to-amber-600 flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-base group-hover/item:text-foreground transition-colors">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link to="/contact">
                      <button className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-red-700 to-amber-600 text-white font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/50 flex items-center gap-3 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <Sparkles className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:rotate-12" />
                        <span className="relative z-10">Get Quote for This Event</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services with Images */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              Additional Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Customized solutions for all your catering needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80" 
                  alt="Dietary Specializations" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 text-amber-700">Dietary Specializations</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <ChefHat className="h-4 w-4 text-amber-600" />
                    Jain meals (no onion/garlic)
                  </li>
                  <li className="flex items-center gap-2">
                    <ChefHat className="h-4 w-4 text-amber-600" />
                    Vegan options
                  </li>
                  <li className="flex items-center gap-2">
                    <ChefHat className="h-4 w-4 text-amber-600" />
                    Diabetic-friendly menus
                  </li>
                  <li className="flex items-center gap-2">
                    <ChefHat className="h-4 w-4 text-amber-600" />
                    Gluten-free dishes
                  </li>
                  <li className="flex items-center gap-2">
                    <ChefHat className="h-4 w-4 text-amber-600" />
                    Allergy-conscious preparation
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80" 
                  alt="Cuisine Varieties" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 text-amber-700">Cuisine Varieties</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <ChefHat className="h-4 w-4 text-amber-600" />
                    South Indian traditional
                  </li>
                  <li className="flex items-center gap-2">
                    <ChefHat className="h-4 w-4 text-amber-600" />
                    North Indian specialties
                  </li>
                  <li className="flex items-center gap-2">
                    <ChefHat className="h-4 w-4 text-amber-600" />
                    Continental cuisine
                  </li>
                  <li className="flex items-center gap-2">
                    <ChefHat className="h-4 w-4 text-amber-600" />
                    Indo-Chinese fusion
                  </li>
                  <li className="flex items-center gap-2">
                    <ChefHat className="h-4 w-4 text-amber-600" />
                    Authentic regional dishes
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80" 
                  alt="Event Support" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 text-amber-700">Event Support</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <ChefHat className="h-4 w-4 text-amber-600" />
                    Professional service staff
                  </li>
                  <li className="flex items-center gap-2">
                    <ChefHat className="h-4 w-4 text-amber-600" />
                    Buffet setup & decoration
                  </li>
                  <li className="flex items-center gap-2">
                    <ChefHat className="h-4 w-4 text-amber-600" />
                    Tableware & cutlery
                  </li>
                  <li className="flex items-center gap-2">
                    <ChefHat className="h-4 w-4 text-amber-600" />
                    On-site cooking options
                  </li>
                  <li className="flex items-center gap-2">
                    <ChefHat className="h-4 w-4 text-amber-600" />
                    Post-event cleanup
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-red-950 via-amber-950 to-red-950 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6 bg-gradient-to-r from-amber-200 to-yellow-300 bg-clip-text text-transparent">
            Ready to Plan Your Event?
          </h2>
          <p className="text-lg mb-8 text-amber-100">
            Let's discuss your requirements and create a customized catering experience that
            exceeds your expectations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-amber-400 text-amber-950 font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-yellow-500/60 border-2 border-yellow-400/50">
                Contact Us Now
              </button>
            </Link>
            <Link to="/menu">
              <button className="px-8 py-4 rounded-full bg-transparent border-2 border-amber-300 text-amber-100 font-semibold text-lg transition-all duration-300 hover:scale-105 hover:bg-amber-100/10 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-500/30">
                View Our Menu
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
