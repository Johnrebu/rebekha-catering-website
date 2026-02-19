import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Check, Heart, Cake, Briefcase, Users, ChefHat } from "lucide-react";

const Services = () => {
  const services = [
    {
      image: "https://images.pexels.com/photos/2306277/pexels-photo-2306277.jpeg?auto=compress&cs=tinysrgb&w=800",
      icon: <Heart className="h-6 w-6" />,
      title: "Wedding & Engagement",
      description: "Make your special day unforgettable with our exquisite wedding catering services.",
      features: [
        "Customized wedding menus",
        "Traditional & fusion options",
        "Elegant presentation",
        "Professional service staff",
        "Multi-cuisine offerings",
      ],
    },
    {
      image: "https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=800",
      icon: <Cake className="h-6 w-6" />,
      title: "Birthday Parties",
      description: "Celebrate life's special moments with delicious food and joyful service.",
      features: [
        "Age-appropriate menus",
        "Theme-based presentation",
        "Kids-friendly options",
        "Cake coordination",
        "Party setup assistance",
      ],
    },
    {
      image: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800",
      icon: <Briefcase className="h-6 w-6" />,
      title: "Corporate Events",
      description: "Professional catering for business events, conferences, and office celebrations.",
      features: [
        "Timely & efficient service",
        "Corporate presentation",
        "Conference meal packages",
        "Box meal options",
        "Dietary accommodations",
      ],
    },
    {
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
      icon: <Users className="h-6 w-6" />,
      title: "Private Dinners",
      description: "Intimate dining experiences for your family and close friends.",
      features: [
        "Intimate dining setups",
        "Chef's special menus",
        "Personalized service",
        "Multi-course meals",
        "Elegant decoration",
      ],
    },
  ];

  const additionalServices = [
    {
      title: "Dietary Specializations",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      items: ["Jain meals", "Vegan options", "Diabetic-friendly", "Gluten-free dishes"],
    },
    {
      title: "Cuisine Varieties",
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400",
      items: ["South Indian", "North Indian", "Continental", "Indo-Chinese"],
    },
    {
      title: "Event Support",
      image: "https://images.pexels.com/photos/2306277/pexels-photo-2306277.jpeg?auto=compress&cs=tinysrgb&w=400",
      items: ["Service staff", "Buffet setup", "Tableware", "On-site cooking"],
    },
  ];

  return (
    <div className="min-h-screen bg-[hsl(45,40%,94%)]">
      <SEO 
        title="Catering Services in Chennai | Wedding, Corporate & Birthday Events"
        description="Professional catering services for all occasions in Chennai. Wedding catering, corporate events, birthday parties, private dining. Customized menus, hygienic preparation, affordable prices."
        keywords="wedding catering Chennai, corporate catering services, birthday catering, private event catering, professional caterers Tamil Nadu"
      />
      <StructuredData />
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/2306277/pexels-photo-2306277.jpeg?auto=compress&cs=tinysrgb&w=1920')`
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
            Our Services
          </h1>
          <p className="text-xl font-light tracking-wide">
            Comprehensive catering solutions for every occasion
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl text-[hsl(30,20%,15%)] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
              What We Offer
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-[hsl(45,40%,94%)] overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300" />
                  <div className="absolute top-4 right-4 w-12 h-12 bg-[hsl(43,76%,58%)] flex items-center justify-center text-[hsl(30,20%,15%)]">
                    {service.icon}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl text-[hsl(30,20%,15%)] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {service.title}
                  </h3>
                  <p className="text-[hsl(30,10%,45%)] mb-6">{service.description}</p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-[hsl(30,10%,35%)]">
                        <Check className="h-4 w-4 text-[hsl(43,76%,58%)]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact">
                    <button className="text-sm font-medium tracking-wider uppercase text-[hsl(43,76%,58%)] hover:text-[hsl(38,70%,45%)] transition-colors flex items-center gap-2">
                      Get Quote →
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-[hsl(43,76%,58%)]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl text-[hsl(30,20%,15%)] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Additional Services
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(30,20%,15%)] mx-auto opacity-50" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-20 h-20 mx-auto mb-4 overflow-hidden rounded-full">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-medium text-[hsl(30,20%,15%)] mb-4 uppercase tracking-wide text-sm">
                  {service.title}
                </h3>
                <ul className="space-y-2">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-[hsl(30,10%,45%)] flex items-center justify-center gap-2">
                      <ChefHat className="h-3 w-3 text-[hsl(43,76%,58%)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl text-[hsl(30,20%,15%)] mb-6" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Ready to Plan Your Event?
            </h2>
            <p className="text-lg text-[hsl(30,10%,35%)] mb-10 max-w-xl mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Let's discuss your requirements and create a customized catering experience
              that exceeds your expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <button className="px-10 py-4 text-sm font-medium tracking-widest uppercase bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)] hover:bg-[hsl(38,70%,45%)] hover:border-[hsl(38,70%,45%)] transition-all duration-300">
                  Contact Us Now
                </button>
              </Link>
              <Link to="/menu">
                <button className="px-10 py-4 text-sm font-medium tracking-widest uppercase bg-transparent text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)] hover:bg-[hsl(43,76%,58%)] transition-all duration-300">
                  View Our Menu
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
