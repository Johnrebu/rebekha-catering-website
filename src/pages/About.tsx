import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Heart, Users, Utensils, Award, Shield, Sparkles, ChefHat, Clock, CheckCircle2 } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Family Legacy",
      description: "A family-led catering journey rooted in recipes, culture, and hospitality passed down over generations.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Hygienic Standards",
      description: "Strict food-safety and cleanliness practices from ingredient sourcing to final service.",
    },
    {
      icon: <Utensils className="h-8 w-8" />,
      title: "Veg & Non-Veg Expertise",
      description: "Balanced vegetarian and non-vegetarian menus designed to serve diverse guest preferences.",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Tailored Menus",
      description: "Custom menu planning aligned to your event format, budget, and guest expectations.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Experienced Team",
      description: "Chefs, service professionals, and coordinators trained to deliver smooth event execution.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Consistent Quality",
      description: "A reputation built on taste consistency, punctual delivery, and reliable event support.",
    },
  ];

  const journey = [
    {
      year: "1998",
      title: "The Beginning",
      description: "Rebekha Catering Services started from a small home kitchen in West Tambaram with a clear mission: serve authentic food that feels personal and memorable.",
      image: "https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      year: "2005",
      title: "Growing with the Community",
      description: "As word of mouth spread, we expanded from family functions to weddings, corporate gatherings, and high-volume event service.",
      image: "https://images.pexels.com/photos/2306277/pexels-photo-2306277.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      year: "2015",
      title: "Expanding Culinary Range",
      description: "We introduced wider regional and fusion menu options while preserving the traditional flavors our clients trusted us for.",
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      year: "2026",
      title: "Today & Beyond",
      description: "Today, we continue serving Chennai with the same family values and modern event professionalism that shaped our journey.",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
  ];

  const differentiators = [
    "Event-first planning from guest count to flow of service",
    "Transparent package customization for weddings and corporate events",
    "On-time setup and coordinated execution by trained staff",
    "Consistent taste backed by standardized preparation workflows",
  ];

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Rebekha Catering Services",
    url: "https://rebekhacaterers.online/about",
    description:
      "Learn about Rebekha Catering Services in Chennai: our history since 1998, founders, values, team, and catering journey across weddings, corporate events, and private celebrations.",
    inLanguage: "en-IN",
    mainEntity: {
      "@type": "LocalBusiness",
      name: "Rebekha Catering Services",
      image: "https://rebekhacaterers.online/rebekha-logo.png",
      description:
        "Family-run veg and non-veg catering company in Chennai serving weddings, birthday parties, corporate events, and private functions since 1998.",
      url: "https://rebekhacaterers.online",
      telephone: "+91-9445435102",
      email: "reburr94@gmail.com",
      foundingDate: "1998",
      founders: [
        { "@type": "Person", name: "Christopher Durairaj" },
        { "@type": "Person", name: "Nancy Navaneetham" }
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "19, Perumal Koil Street, Irumbuliyur, West Tambaram",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        postalCode: "600045",
        addressCountry: "IN"
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: "+91-9445435102",
          areaServed: "Chennai",
          availableLanguage: ["English", "Tamil"]
        },
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: "+91-9445435103",
          areaServed: "Chennai",
          availableLanguage: ["English", "Tamil"]
        }
      ],
      areaServed: {
        "@type": "City",
        name: "Chennai"
      },
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Wedding Catering" }
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Corporate Event Catering" }
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Birthday Party Catering" }
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Private Event Catering" }
        }
      ]
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://rebekhacaterers.online"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: "https://rebekhacaterers.online/about"
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(45,40%,94%)]">
      <SEO
        title="About Rebekha Catering Services | Chennai Family Catering Since 1998"
        description="Discover Rebekha Catering Services in Chennai: our story since 1998, founders, values, team, and journey serving weddings, corporate events, and private celebrations with authentic veg and non-veg menus."
        keywords="about Rebekha Catering Services, catering company history Chennai, family catering business West Tambaram, wedding and corporate catering Chennai, veg and non-veg catering Chennai"
        ogUrl="https://rebekhacaterers.online/about"
        canonical="https://rebekhacaterers.online/about"
        type="article"
      />

      <Helmet>
        <script type="application/ld+json">{JSON.stringify(aboutPageSchema)}</script>
      </Helmet>

      <Navigation />

      {/* Hero Section - Eden Style */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center [background-image:url('https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1920')]" />
        <div className="absolute inset-0 bg-black/50" />

        <motion.div
          className="relative z-10 text-center text-white px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="heading-script text-5xl md:text-7xl mb-4">
            About Us
          </h1>
          <p className="text-xl font-light tracking-wide">
            Our Story, Values, Team, and Catering Journey in Chennai
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
                alt="Our Founders - Christopher Durairaj and Nancy Navaneetham"
                className="w-full h-[500px] object-cover object-top"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800";
                }}
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-script text-5xl text-[hsl(30,20%,15%)] mb-6">
                Our Story
              </h2>
              <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mb-8" />

              <div className="space-y-6 [font-family:'Cormorant_Garamond',serif] text-[1.15rem]">
                <p className="text-[hsl(30,10%,35%)] leading-relaxed">
                  Rebekha Catering Services was founded in 1998 with one simple idea: every celebration deserves food that feels meaningful, generous, and unforgettable.
                </p>

                <p className="text-[hsl(30,10%,35%)] leading-relaxed">
                  From a modest kitchen in West Tambaram, our founders, <span className="font-semibold text-[hsl(38,70%,45%)]">Christopher Durairaj</span> and <span className="font-semibold text-[hsl(38,70%,45%)]">Nancy Navaneetham</span>, built the company with handcrafted recipes, disciplined operations, and sincere customer care.
                </p>

                <p className="text-[hsl(30,10%,35%)] leading-relaxed">
                  Over the years, we have catered intimate family gatherings, large weddings, and corporate events across Chennai while staying true to the values that shaped our beginning.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-[hsl(40,20%,85%)]">
                <p className="text-2xl italic text-[hsl(30,10%,35%)] [font-family:'Cormorant_Garamond',serif]">
                  "We do not just serve meals. We help families and teams celebrate moments that matter."
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
            <h2 className="heading-script text-5xl text-[hsl(30,20%,15%)] mb-4">
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
            <h2 className="heading-script text-5xl text-[hsl(30,20%,15%)] mb-4">
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
                  alt="Founders of Rebekha Catering Services"
                  className="w-full h-full object-cover min-h-[400px]"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800";
                  }}
                />
              </div>
              <div className="p-10 flex flex-col justify-center">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl text-[hsl(30,20%,15%)] mb-1 [font-family:'Cormorant_Garamond',serif]">
                      Christopher Durairaj
                    </h3>
                    <p className="text-[hsl(43,76%,58%)] text-sm uppercase tracking-wider">Co-Founder & Head Chef</p>
                  </div>

                  <div className="w-12 h-0.5 bg-[hsl(43,76%,58%)]" />

                  <div>
                    <h3 className="text-2xl text-[hsl(30,20%,15%)] mb-1 [font-family:'Cormorant_Garamond',serif]">
                      Nancy Navaneetham
                    </h3>
                    <p className="text-[hsl(43,76%,58%)] text-sm uppercase tracking-wider">Co-Founder & Operations Head</p>
                  </div>

                  <div className="w-12 h-0.5 bg-[hsl(43,76%,58%)]" />

                  <p className="text-[hsl(30,10%,35%)] [font-family:'Cormorant_Garamond',serif] text-[1.1rem]">
                    Together, they shaped Rebekha Catering Services into a trusted Chennai brand by combining culinary authenticity with disciplined event execution and client-first service.
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
            <h2 className="heading-script text-5xl text-[hsl(30,20%,15%)] mb-4">
              Our Journey
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto" />
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-12">
            {journey.map((item, index) => (
              <motion.div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
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
                <div className={`md:w-2/3 text-center ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                  <span className="text-4xl font-light text-[hsl(43,76%,58%)] [font-family:'Cormorant_Garamond',serif]">
                    {item.year}
                  </span>
                  <h3 className="text-2xl text-[hsl(30,20%,15%)] mt-2 mb-3 [font-family:'Cormorant_Garamond',serif]">
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
            <h2 className="heading-script text-5xl text-[hsl(30,20%,15%)] mb-4">
              The Team
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto mb-8" />

            <p className="text-lg text-[hsl(30,10%,35%)] max-w-2xl mx-auto mb-10 [font-family:'Cormorant_Garamond',serif]">
              Our team includes experienced chefs, trained service staff, and event coordinators who collaborate closely to ensure every event is timely, tasteful, and stress-free for hosts.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12">
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
                  <div className="text-3xl font-light text-[hsl(30,20%,15%)] [font-family:'Cormorant_Garamond',serif]">
                    {item.count}
                  </div>
                  <p className="text-xs uppercase tracking-wider text-[hsl(30,10%,45%)] mt-1">{item.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-4 text-left">
              {differentiators.map((point, index) => (
                <div key={index} className="flex items-start gap-3 bg-[hsl(45,40%,94%)] p-4">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 text-[hsl(43,76%,58%)] shrink-0" />
                  <p className="text-sm text-[hsl(30,10%,35%)]">{point}</p>
                </div>
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
            <h2 className="heading-script text-4xl text-[hsl(30,20%,15%)] mb-6">
              Let Us Plan Your Next Event
            </h2>
            <p className="text-[hsl(30,20%,15%)]/85 mb-8 max-w-2xl mx-auto">
              Looking for wedding catering, corporate catering, or custom event menus in Chennai? Explore our services or contact our team for a personalized quote.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/services">
                <button className="px-10 py-4 text-sm font-medium tracking-widest uppercase bg-white text-[hsl(30,20%,15%)] border-2 border-white hover:bg-transparent hover:text-[hsl(30,20%,15%)] transition-all duration-300">
                  Explore Services
                </button>
              </Link>
              <Link to="/contact">
                <button className="px-10 py-4 text-sm font-medium tracking-widest uppercase bg-[hsl(30,20%,15%)] text-white border-2 border-[hsl(30,20%,15%)] hover:bg-transparent hover:text-[hsl(30,20%,15%)] transition-all duration-300">
                  Get in Touch
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

export default About;
