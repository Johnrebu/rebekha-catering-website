import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Star, Quote, Award, Users, Calendar } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Antony Raj",
      event: "Wedding Reception",
      date: "December 2024",
      text: "The food was absolutely delicious and the presentation was stunning! Our guests are still talking about the amazing feast. Rebekha Caterers made our special day truly memorable.",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      event: "Corporate Event",
      date: "November 2024",
      text: "Professional service and authentic taste. Rebekha Catering made our company anniversary celebration a huge success! The team was punctual and the food quality was exceptional.",
      rating: 5
    },
    {
      name: "Anjali Sharma",
      event: "Birthday Party",
      date: "October 2024",
      text: "The variety and quality of food exceeded our expectations. The team was punctual and the setup was beautiful! My daughter's birthday was perfect thanks to their amazing service.",
      rating: 5
    },
    {
      name: "Suresh Babu",
      event: "Engagement Ceremony",
      date: "September 2024",
      text: "We chose Rebekha Caterers for our daughter's engagement and we couldn't be happier. The biryani was absolutely divine and the service was top-notch.",
      rating: 5
    },
    {
      name: "Lakshmi Narayanan",
      event: "House Warming",
      date: "August 2024",
      text: "From the initial consultation to the final cleanup, everything was handled professionally. The food was fresh, hot, and absolutely delicious. Highly recommend!",
      rating: 5
    },
    {
      name: "Vikram Sundaram",
      event: "Corporate Lunch",
      date: "July 2024",
      text: "Our team loved the variety of dishes. The vegetarian and non-vegetarian options were equally amazing. Will definitely book again for our next corporate event.",
      rating: 5
    },
  ];

  const stats = [
    { icon: <Users className="h-8 w-8" />, value: "10,000+", label: "Happy Clients" },
    { icon: <Award className="h-8 w-8" />, value: "25+", label: "Years Experience" },
    { icon: <Calendar className="h-8 w-8" />, value: "15,000+", label: "Events Catered" },
    { icon: <Star className="h-8 w-8" />, value: "4.9", label: "Average Rating" },
  ];

  return (
    <div className="min-h-screen bg-[hsl(45,40%,94%)]">
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
            Testimonials
          </h1>
          <p className="text-xl font-light tracking-wide">
            What our clients say about us
          </p>
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
                <div className="text-3xl md:text-4xl font-light text-[hsl(30,20%,15%)]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {stat.value}
                </div>
                <p className="text-xs uppercase tracking-wider text-[hsl(30,10%,45%)] mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-[hsl(45,40%,94%)]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl text-[hsl(30,20%,15%)] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Client Reviews
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[hsl(43,76%,58%)] text-[hsl(43,76%,58%)]" />
                  ))}
                </div>

                <p className="text-[hsl(30,10%,35%)] italic mb-6 leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem' }}>
                  "{testimonial.text}"
                </p>

                <h4 className="font-medium text-[hsl(30,20%,15%)]">{testimonial.name}</h4>
                <p className="text-sm text-[hsl(43,76%,58%)]">{testimonial.event}</p>
                <p className="text-xs text-[hsl(30,10%,55%)] mt-1">{testimonial.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Quote */}
      <section className="py-20 bg-[hsl(43,76%,58%)]">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Quote className="h-12 w-12 text-[hsl(30,20%,15%)] mx-auto mb-6 opacity-50" />
            <blockquote className="text-2xl md:text-3xl text-[hsl(30,20%,15%)] italic mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              "We don't just serve food. We serve love, tradition, and unforgettable memories."
            </blockquote>
            <p className="text-[hsl(30,20%,15%)]/70">— Rebekha Caterers Philosophy</p>
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
