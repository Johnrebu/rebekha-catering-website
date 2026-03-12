import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import TestimonialsDemo from "@/components/ui/testimonials-demo";
import { Star, Award, Users, Calendar } from "lucide-react";

const Testimonials = () => {
  const stats = [
    { icon: <Users className="h-8 w-8" />, value: "10,000+", label: "Happy Clients" },
    { icon: <Award className="h-8 w-8" />, value: "25+", label: "Years Experience" },
    { icon: <Calendar className="h-8 w-8" />, value: "15,000+", label: "Events Catered" },
    { icon: <Star className="h-8 w-8" />, value: "4.9", label: "Average Rating" },
  ];

  return (
    <div className="min-h-screen bg-[hsl(45,40%,94%)]">
      <SEO
        title="Client Testimonials | Rebekha Catering Services - 4.9 Star Reviews"
        description="Read authentic customer reviews for Rebekha Catering Services in Chennai. Trusted for weddings, birthdays, and corporate catering with consistent quality and service."
        keywords="client reviews catering Chennai, catering testimonials, wedding catering reviews, corporate catering feedback"
      />
      <StructuredData />
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1920')",
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
            Testimonials
          </h1>
          <p className="text-xl font-light tracking-wide">Real stories from clients who trusted us for their events</p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-[hsl(43,76%,58%)] mb-3 flex justify-center">{stat.icon}</div>
                <div
                  className="text-3xl md:text-4xl font-light text-[hsl(30,20%,15%)]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {stat.value}
                </div>
                <p className="text-xs uppercase tracking-wider text-[hsl(30,10%,45%)] mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Marquee Testimonials */}
      <section className="py-20 bg-[hsl(45,40%,94%)]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl text-[hsl(30,20%,15%)] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Client Voices
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto" />
            <p className="mt-5 text-[hsl(30,10%,35%)] max-w-2xl mx-auto">
              Explore feedback from wedding, birthday, and corporate catering events. Hover to pause and read each review.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <TestimonialsDemo />
          </motion.div>
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
            <h2 className="text-4xl text-[hsl(30,20%,15%)] mb-6" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Ready to Create Your Own Story?
            </h2>
            <p className="text-lg text-[hsl(30,10%,35%)] mb-10 max-w-xl mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Join thousands of satisfied clients who trusted us with their special occasions.
            </p>
            <Link to="/contact">
              <button className="px-10 py-4 text-sm font-medium tracking-widest uppercase bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)] hover:bg-[hsl(38,70%,45%)] hover:border-[hsl(38,70%,45%)] transition-all duration-300">
                Get in Touch
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonials;
