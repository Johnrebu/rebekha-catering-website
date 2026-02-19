import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Heart, Users, Utensils, Award, Shield, Sparkles, ChefHat, Clock } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Family Legacy",
      description: "Family-driven legacy of taste and tradition spanning over 25 years",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Hygienic Standards",
      description: "Strict hygiene protocols and fresh, quality ingredients in every dish",
    },
    {
      icon: <Utensils className="h-8 w-8" />,
      title: "Veg & Non-Veg",
      description: "Comprehensive menu options for all dietary preferences and needs",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Custom Menus",
      description: "Personalized menu creation for your unique event requirements",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Professional Team",
      description: "Experienced staff ensuring flawless execution and presentation",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description: "Committed to exceeding expectations in every catering experience",
    },
  ];

  const journey = [
    {
      year: "1998",
      title: "The Beginning",
      description: "Started in a small home kitchen with a dream to bring authentic, homemade taste to celebrations",
      image: "https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      year: "2005",
      title: "Growing Recognition",
      description: "Expanded services to include corporate events and large-scale weddings",
      image: "https://images.pexels.com/photos/2306277/pexels-photo-2306277.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      year: "2015",
      title: "Culinary Innovation",
      description: "Introduced fusion menus and specialized dietary options while maintaining traditional roots",
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      year: "2025",
      title: "Today & Beyond",
      description: "Continuing to serve with over 25 years of experience and thousands of satisfied clients",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
  ];

  return (
    <div className="min-h-screen bg-[hsl(45,40%,94%)]">
      <SEO 
        title="About Rebekha Catering Services - 25+ Years Experience Since 1998"
        description="Learn the story of Rebekha Catering Services - a family-run catering business in Chennai serving love and authentic Indian cuisine for 25+ years. 10,000+ happy clients."
        keywords="about catering Chennai, catering company history, family catering business, professional catering since 1998"
      />
      <StructuredData />
      <Navigation />

      {/* Hero Section - Eden Style */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1920')`
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
            About Us
          </h1>
          <p className="text-xl font-light tracking-wide">
            A Journey of Love, Tradition, and Authentic Flavors
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/founders.jpg"
                alt="Our Founders - Christopher Durairaj & Nancy Navaneetham"
                className="w-full h-[500px] object-cover object-top"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800';
                }}
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl text-[hsl(30,20%,15%)] mb-6" style={{ fontFamily: "'Great Vibes', cursive" }}>
                Our Story
              </h2>
              <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mb-8" />

              <div className="space-y-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem' }}>
                <p className="text-[hsl(30,10%,35%)] leading-relaxed">
                  Founded in 1998, Rebekha Catering Services began as a small family venture
                  with a big vision: to create exceptional catering experiences that blend
                  traditional flavors with genuine hospitality.
                </p>

                <p className="text-[hsl(30,10%,35%)] leading-relaxed">
                  Our journey started in a modest kitchen in West Tambaram, where our founders,{" "}
                  <span className="font-semibold text-[hsl(38,70%,45%)]">Christopher Durairaj</span> and{" "}
                  <span className="font-semibold text-[hsl(38,70%,45%)]">Nancy Navaneetham</span>, began
                  crafting their signature dishes using recipes passed down through generations.
                </p>

                <p className="text-[hsl(30,10%,35%)] leading-relaxed">
                  What began as a passion project quickly evolved into something much larger.
                  Their commitment to quality, authentic flavors, and genuine hospitality
                  resonated deeply with the community.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-[hsl(40,20%,85%)]">
                <p className="text-2xl italic text-[hsl(30,10%,35%)]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  "We don't just serve food. We serve love, tradition, and unforgettable memories."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-[hsl(43,76%,58%)]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl text-[hsl(30,20%,15%)] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Our Values
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(30,20%,15%)] mx-auto opacity-50" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 text-center hover:-translate-y-1 transition-transform duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-[hsl(43,76%,58%)] mb-4 flex justify-center">{value.icon}</div>
                <h3 className="font-medium text-lg mb-3 text-[hsl(30,20%,15%)] uppercase tracking-wide text-sm">
                  {value.title}
                </h3>
                <p className="text-sm text-[hsl(30,10%,45%)]">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Founders */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl text-[hsl(30,20%,15%)] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Meet Our Founders
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto" />
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto bg-[hsl(45,40%,94%)] overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2">
              <div>
                <img
                  src="/founders.jpg"
                  alt="Our Founders"
                  className="w-full h-full object-cover min-h-[400px]"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />
              </div>
              <div className="p-10 flex flex-col justify-center">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl text-[hsl(30,20%,15%)] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      Christopher Durairaj
                    </h3>
                    <p className="text-[hsl(43,76%,58%)] text-sm uppercase tracking-wider">Co-Founder & Head Chef</p>
                  </div>

                  <div className="w-12 h-0.5 bg-[hsl(43,76%,58%)]" />

                  <div>
                    <h3 className="text-2xl text-[hsl(30,20%,15%)] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      Nancy Navaneetham
                    </h3>
                    <p className="text-[hsl(43,76%,58%)] text-sm uppercase tracking-wider">Co-Founder & Operations Head</p>
                  </div>

                  <div className="w-12 h-0.5 bg-[hsl(43,76%,58%)]" />

                  <p className="text-[hsl(30,10%,35%)]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem' }}>
                    Together, they have built Rebekha Catering Services from a humble home kitchen
                    into one of Chennai's most trusted catering brands. Their passion for authentic
                    flavors and commitment to quality has served over 10,000+ happy events.
                  </p>

                  <div className="flex items-center gap-2 text-[hsl(43,76%,58%)]">
                    <Award className="h-5 w-5" />
                    <span className="text-sm uppercase tracking-wider">Serving Love Since 1998</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-[hsl(45,40%,94%)]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl text-[hsl(30,20%,15%)] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Our Journey
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto" />
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-12">
            {journey.map((item, index) => (
              <motion.div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="md:w-1/3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className={`md:w-2/3 text-center ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <span className="text-4xl font-light text-[hsl(43,76%,58%)]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {item.year}
                  </span>
                  <h3 className="text-2xl text-[hsl(30,20%,15%)] mt-2 mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-[hsl(30,10%,35%)]">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl text-[hsl(30,20%,15%)] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
              The Team
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto mb-8" />

            <p className="text-lg text-[hsl(30,10%,35%)] max-w-2xl mx-auto mb-10" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Behind every successful event is our dedicated team of over 50 professionals -
              including expert chefs, experienced service staff, and meticulous event coordinators.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-10">
              {[
                { icon: ChefHat, label: "Expert Chefs", count: "10+" },
                { icon: Users, label: "Service Staff", count: "30+" },
                { icon: Clock, label: "Coordinators", count: "5+" },
                { icon: Award, label: "Years Experience", count: "25+" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <item.icon className="h-8 w-8 text-[hsl(43,76%,58%)] mx-auto mb-3" />
                  <div className="text-3xl font-light text-[hsl(30,20%,15%)]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {item.count}
                  </div>
                  <p className="text-xs uppercase tracking-wider text-[hsl(30,10%,45%)] mt-1">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[hsl(43,76%,58%)]">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl text-[hsl(30,20%,15%)] mb-6" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Ready to Create Memories?
            </h2>
            <p className="text-[hsl(30,20%,15%)]/80 mb-8 max-w-xl mx-auto">
              Let us be part of your special occasion. Get in touch to discuss your event.
            </p>
            <Link to="/contact">
              <button className="px-10 py-4 text-sm font-medium tracking-widest uppercase bg-[hsl(30,20%,15%)] text-white border-2 border-[hsl(30,20%,15%)] hover:bg-transparent hover:text-[hsl(30,20%,15%)] transition-all duration-300">
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

export default About;
