import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import {
  Heart,
  Users,
  Utensils,
  Award,
  Shield,
  Sparkles,
  ChefHat,
  Clock,
  CheckCircle2,
  ArrowRight,
  Star,
  Flame,
} from "lucide-react";
import businessBannerImage from "@/assets/business-banner.jpg";
import muttonShopBannerImage from "@/assets/mutton-shop-banner.jpg";

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const values = [
  {
    icon: Heart,
    title: "Family Legacy",
    description:
      "25 years of trusted taste. Recipes, culture, and hospitality passed down through generations.",
    accent: "hsl(0,70%,60%)",
  },
  {
    icon: Shield,
    title: "Hygienic Standards",
    description:
      "Strict food-safety and cleanliness from ingredient sourcing all the way to final service.",
    accent: "hsl(210,70%,55%)",
  },
  {
    icon: Utensils,
    title: "Veg & Non-Veg Expertise",
    description:
      "Balanced vegetarian and non-vegetarian menus designed to delight every guest.",
    accent: "hsl(140,60%,45%)",
  },
  {
    icon: Sparkles,
    title: "Tailored Menus",
    description:
      "Custom menu planning aligned to your event format, budget, and expectations.",
    accent: "hsl(43,76%,50%)",
  },
  {
    icon: Users,
    title: "Experienced Team",
    description:
      "Chefs, service professionals, and coordinators trained for flawless event execution.",
    accent: "hsl(270,60%,55%)",
  },
  {
    icon: Award,
    title: "Consistent Quality",
    description:
      "A reputation built on taste consistency, punctual delivery, and reliable support.",
    accent: "hsl(30,80%,50%)",
  },
];

const journey = [
  {
    year: "1998",
    title: "The Beginning",
    description:
      "Rebekha Catering Services was born from a small home kitchen in West Tambaram — a dream to serve authentic food that feels personal, generous, and unforgettable.",
    image:
      "https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "hsl(43,76%,58%)",
  },
  {
    year: "2005",
    title: "Growing with the Community",
    description:
      "Word of mouth spread naturally. We expanded from intimate family functions to large weddings and high-volume corporate events across Chennai.",
    image:
      "https://images.pexels.com/photos/2306277/pexels-photo-2306277.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "hsl(38,70%,45%)",
  },
  {
    year: "2015",
    title: "Expanding Culinary Range",
    description:
      "We introduced wider regional and fusion menus while preserving the traditional flavours our loyal clients had come to cherish over the years.",
    image:
      "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "hsl(43,76%,58%)",
  },
  {
    year: "2026",
    title: "Today & Beyond",
    description:
      "Serving Chennai with the same family values — now paired with modern event professionalism, a dedicated meat supply outlet, and government-licensed operations.",
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "hsl(38,70%,45%)",
  },
];

const stats = [
  { icon: ChefHat, label: "Expert Chefs", count: "10+" },
  { icon: Users, label: "Service Staff", count: "30+" },
  { icon: Clock, label: "Coordinators", count: "5+" },
  { icon: Award, label: "Years of Service", count: "25+" },
];

const differentiators = [
  "Event-first planning — from guest count to flow of service",
  "Transparent package customisation for weddings & corporates",
  "On-time setup and coordinated execution by trained staff",
  "Consistent taste backed by standardised preparation workflows",
];

/* ─────────────────────────────────────────
   About Page
───────────────────────────────────────── */
const About = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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
        { "@type": "Person", name: "Nancy Navaneetham" },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "19, Perumal Koil Street, Irumbuliyur, West Tambaram",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        postalCode: "600045",
        addressCountry: "IN",
      },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://rebekhacaterers.online",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: "https://rebekhacaterers.online/about",
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-[hsl(45,40%,94%)] overflow-x-hidden">
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

      {/* ── Cinematic Hero ── */}
      <section
        ref={heroRef}
        className="relative h-[90vh] min-h-[560px] flex items-center justify-center overflow-hidden"
      >
        {/* Parallax background */}
        <motion.div
          className="absolute inset-0 scale-110 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1920')",
            y: heroY,
          }}
        />

        {/* Rich overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

        {/* Decorative grain */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-xs uppercase tracking-[0.25em] text-[hsl(43,90%,75%)]"
          >
            <Star className="h-3 w-3 fill-current" />
            Serving Chennai Since 1998
            <Star className="h-3 w-3 fill-current" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="heading-script text-6xl md:text-8xl mb-6 leading-none"
            style={{ textShadow: "0 4px 40px rgba(0,0,0,0.4)" }}
          >
            Our Story
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl font-light tracking-wide text-white/80 max-w-2xl mx-auto mb-10"
          >
            A family kitchen that became Chennai's most trusted catering legacy —
            one celebration at a time.
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-white/40">
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
              className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent"
            />
          </motion.div>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(45,40%,94%)] to-transparent" />
      </section>

      {/* ── Story Section ── */}
      <section className="py-24 bg-[hsl(45,40%,94%)]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Image with decorative frame */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              {/* Gold border decoration */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[hsl(43,76%,58%)]/40 pointer-events-none" />
              <img
                src="/founders.jpg"
                alt="Our Founders - Christopher Durairaj and Nancy Navaneetham"
                className="w-full h-[520px] object-cover object-top relative z-10 shadow-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800";
                }}
              />
              {/* Gold accent corner */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[hsl(43,76%,58%)] z-0" />
              {/* Year badge */}
              <div className="absolute bottom-8 -right-6 z-20 bg-[hsl(30,20%,15%)] text-white px-5 py-3 shadow-xl">
                <div className="text-3xl font-light [font-family:'Cormorant_Garamond',serif] text-[hsl(43,76%,58%)]">
                  1998
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/60 mt-0.5">
                  Est.
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs uppercase tracking-[0.25em] text-[hsl(43,76%,40%)] font-bold mb-4">
                Who We Are
              </p>
              <h2 className="heading-script text-5xl md:text-6xl text-[hsl(30,20%,15%)] mb-6 leading-tight">
                Our Story
              </h2>
              <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mb-8" />

              <div className="space-y-5 [font-family:'Cormorant_Garamond',serif] text-[1.15rem]">
                <p className="text-[hsl(30,10%,35%)] leading-relaxed">
                  Rebekha Catering Services was founded in{" "}
                  <span className="text-[hsl(38,70%,40%)] font-semibold">1998</span> with
                  one simple idea: every celebration deserves food that feels
                  meaningful, generous, and unforgettable.
                </p>
                <p className="text-[hsl(30,10%,35%)] leading-relaxed">
                  From a modest kitchen in West Tambaram, our founders{" "}
                  <span className="font-semibold text-[hsl(38,70%,40%)]">
                    Christopher Durairaj
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-[hsl(38,70%,40%)]">
                    Nancy Navaneetham
                  </span>{" "}
                  built a company with handcrafted recipes, disciplined
                  operations, and sincere customer care.
                </p>
                <p className="text-[hsl(30,10%,35%)] leading-relaxed">
                  Over 25 years, we have catered intimate family gatherings,
                  grand weddings, and corporate events across Chennai — always
                  staying true to the values that shaped our very beginning.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-[hsl(40,20%,85%)]">
                <blockquote className="relative pl-5 border-l-2 border-[hsl(43,76%,58%)]">
                  <p className="text-xl italic text-[hsl(30,10%,35%)] [font-family:'Cormorant_Garamond',serif] leading-relaxed">
                    "We do not just serve meals. We help families and teams
                    celebrate moments that matter."
                  </p>
                  <footer className="mt-3 text-xs uppercase tracking-[0.15em] text-[hsl(43,76%,45%)]">
                    — Christopher Durairaj, Co-Founder
                  </footer>
                </blockquote>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values — Dark Immersive Section ── */}
      <section className="relative py-24 overflow-hidden bg-[hsl(30,20%,13%)]">
        {/* Decorative gold lines */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute top-0 left-1/4 w-px h-full bg-[hsl(43,76%,58%)]" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-[hsl(43,76%,58%)]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-[hsl(43,76%,58%)] font-bold mb-4">
              What Drives Us
            </p>
            <h2 className="heading-script text-5xl md:text-6xl text-white mb-4">
              Our Values
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="group relative p-8 border border-white/8 bg-white/4 backdrop-blur-sm hover:bg-white/8 transition-all duration-500 cursor-default"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -4 }}
              >
                {/* Coloured accent top border on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: value.accent }}
                />

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${value.accent}22` }}
                >
                  <value.icon
                    className="h-6 w-6"
                    style={{ color: value.accent }}
                  />
                </div>

                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white">
                  {value.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founders Section ── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-[hsl(43,76%,40%)] font-bold mb-4">
              The People Behind the Food
            </p>
            <h2 className="heading-script text-5xl md:text-6xl text-[hsl(30,20%,15%)] mb-4">
              Meet Our Founders
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto" />
          </motion.div>

          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid md:grid-cols-2 overflow-hidden shadow-2xl">
              {/* Image */}
              <div className="relative overflow-hidden min-h-[440px]">
                <img
                  src="/founders.jpg"
                  alt="Founders of Rebekha Catering Services"
                  className="w-full h-full object-cover object-top absolute inset-0 scale-100 hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800";
                  }}
                />
                {/* gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 md:bg-gradient-to-r" />
              </div>

              {/* Content */}
              <div className="bg-[hsl(30,20%,13%)] p-10 md:p-12 flex flex-col justify-center">
                <Flame className="h-7 w-7 text-[hsl(43,76%,58%)] mb-6" />

                {/* Founder 1 */}
                <div className="mb-6">
                  <h3 className="text-2xl text-white [font-family:'Cormorant_Garamond',serif] mb-1">
                    Christopher Durairaj
                  </h3>
                  <p className="text-[hsl(43,76%,58%)] text-xs uppercase tracking-[0.2em]">
                    Co-Founder & Head Chef
                  </p>
                </div>

                <div className="w-10 h-px bg-[hsl(43,76%,58%)]/40 mb-6" />

                {/* Founder 2 */}
                <div className="mb-8">
                  <h3 className="text-2xl text-white [font-family:'Cormorant_Garamond',serif] mb-1">
                    Nancy Navaneetham
                  </h3>
                  <p className="text-[hsl(43,76%,58%)] text-xs uppercase tracking-[0.2em]">
                    Co-Founder & Operations Head
                  </p>
                </div>

                <p className="text-white/60 [font-family:'Cormorant_Garamond',serif] text-[1.1rem] leading-relaxed mb-8">
                  Together, they shaped Rebekha Catering Services into a trusted
                  Chennai brand — combining culinary authenticity with disciplined
                  event execution and a client-first ethos.
                </p>

                <div className="flex items-center gap-3 text-[hsl(43,76%,58%)]">
                  <Award className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.2em]">
                    Serving Love Since 1998
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Journey — Vertical Timeline ── */}
      <section className="py-24 bg-[hsl(45,40%,94%)] overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-[hsl(43,76%,40%)] font-bold mb-4">
              A Quarter Century of Flavour
            </p>
            <h2 className="heading-script text-5xl md:text-6xl text-[hsl(30,20%,15%)] mb-4">
              Our Journey
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto" />
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Central line */}
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[hsl(43,76%,58%)]/40 to-transparent hidden md:block" />

            <div className="space-y-16 md:space-y-0">
              {journey.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    className={`relative flex flex-col md:flex-row md:items-center gap-8 md:gap-0 ${
                      isLeft ? "" : "md:flex-row-reverse"
                    }`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.65, delay: 0.05 }}
                  >
                    {/* Content side */}
                    <div
                      className={`md:w-[calc(50%-3rem)] ${
                        isLeft ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                      }`}
                    >
                      <motion.div
                        initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.15 }}
                        className="group relative bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 p-7 overflow-hidden"
                      >
                        {/* Year accent bg */}
                        <div
                          className="absolute top-0 bottom-0 w-1"
                          style={{
                            backgroundColor: item.color,
                            left: isLeft ? "auto" : 0,
                            right: isLeft ? 0 : "auto",
                          }}
                        />
                        <span
                          className="block text-4xl font-light mb-1 [font-family:'Cormorant_Garamond',serif]"
                          style={{ color: item.color }}
                        >
                          {item.year}
                        </span>
                        <h3 className="text-xl font-semibold text-[hsl(30,20%,15%)] mb-3 [font-family:'Cormorant_Garamond',serif]">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[hsl(30,10%,40%)] leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    </div>

                    {/* Centre dot */}
                    <div className="hidden md:flex w-24 justify-center relative z-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className="w-5 h-5 rounded-full border-2 border-[hsl(43,76%,58%)] bg-[hsl(45,40%,94%)] shadow-md"
                      />
                    </div>

                    {/* Image side */}
                    <div
                      className={`md:w-[calc(50%-3rem)] ${
                        isLeft ? "md:pl-8" : "md:pr-8"
                      }`}
                    >
                      <motion.div
                        initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.2 }}
                        className="overflow-hidden shadow-lg"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team Stats — Gold Glassmorphism ── */}
      <section className="relative py-24 overflow-hidden bg-[hsl(43,76%,58%)]">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[hsl(30,20%,15%)]/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-[hsl(30,20%,15%)]/60 font-bold mb-4">
              The People Behind Every Plate
            </p>
            <h2 className="heading-script text-5xl md:text-6xl text-[hsl(30,20%,15%)] mb-4">
              The Team
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(30,20%,15%)]/30 mx-auto mb-6" />
            <p className="text-[hsl(30,20%,15%)]/75 max-w-xl mx-auto [font-family:'Cormorant_Garamond',serif] text-lg">
              Experienced chefs, trained service staff, and event coordinators
              working in perfect harmony so every celebration feels effortless.
            </p>
          </motion.div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-14">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                className="group bg-white/15 backdrop-blur-sm border border-white/20 p-6 text-center hover:bg-white/25 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <item.icon className="h-7 w-7 text-[hsl(30,20%,15%)] mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-3xl font-light text-[hsl(30,20%,15%)] [font-family:'Cormorant_Garamond',serif]">
                  {item.count}
                </div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[hsl(30,20%,15%)]/60 mt-1">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Differentiators */}
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-3">
            {differentiators.map((point, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 bg-[hsl(30,20%,15%)]/10 backdrop-blur-sm p-4 border border-[hsl(30,20%,15%)]/10"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-[hsl(30,20%,15%)] shrink-0" />
                <p className="text-sm text-[hsl(30,20%,15%)]/80 leading-relaxed">
                  {point}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Licensing & Quality ── */}
      <section className="py-24 bg-white border-t border-[hsl(40,20%,88%)]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-[hsl(43,76%,40%)] font-bold mb-4">
              Verified Credentials & Quality Sourcing
            </p>
            <h2 className="heading-script text-5xl md:text-6xl text-[hsl(30,20%,15%)] mb-4">
              Official Licensing & In-House Quality
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto mb-6" />
            <p className="text-base text-[hsl(30,10%,40%)] max-w-2xl mx-auto">
              We operate with official government licensing and manage our own
              meat outlets to guarantee uncompromised hygiene and freshness for
              every celebration.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Business License card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group overflow-hidden border border-[hsl(40,20%,85%)] bg-[hsl(45,40%,97%)] shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="overflow-hidden h-64">
                <img
                  src={businessBannerImage}
                  alt="Rebekha Catering License and Business Contact Banner"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(43,76%,58%)]/15 text-[hsl(38,70%,40%)] text-xs font-bold uppercase tracking-wider mb-4">
                  <Shield className="h-3.5 w-3.5" />
                  Government License No: 009/2017/0000483
                </div>
                <h3 className="text-2xl font-bold text-[hsl(30,20%,15%)] mb-2 [font-family:'Cormorant_Garamond',serif]">
                  Rebekha Catering Services
                </h3>
                <p className="text-sm text-[hsl(30,10%,40%)] leading-relaxed">
                  Official business operation based at No. 19, Perumal Kovil
                  Street, West Tambaram, Chennai. Catering specialist for
                  large-format weddings, biryani feasts, and executive corporate
                  dining.
                </p>
              </div>
            </motion.div>

            {/* Meat Sourcing card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group overflow-hidden border border-[hsl(40,20%,85%)] bg-[hsl(45,40%,97%)] shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="overflow-hidden h-64">
                <img
                  src={muttonShopBannerImage}
                  alt="Rebekha Mutton and Chicken Shop Quality Meat Sourcing"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(43,76%,58%)]/15 text-[hsl(38,70%,40%)] text-xs font-bold uppercase tracking-wider mb-4">
                  <Utensils className="h-3.5 w-3.5" />
                  100% In-House Fresh Meat Sourcing
                </div>
                <h3 className="text-2xl font-bold text-[hsl(30,20%,15%)] mb-2 [font-family:'Cormorant_Garamond',serif]">
                  Rebekha Mutton & Chicken Shop
                </h3>
                <p className="text-sm text-[hsl(30,10%,40%)] leading-relaxed">
                  Our dedicated meat supply outlet ensures fresh-cut, hygienically
                  processed mutton and chicken for all our catering spreads —
                  maintaining strict quality from farm to feast.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 overflow-hidden bg-[hsl(30,20%,13%)]">
        {/* bg image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(30,20%,13%)] via-[hsl(30,20%,13%)]/95 to-[hsl(30,20%,13%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-[hsl(43,76%,58%)]/30 bg-[hsl(43,76%,58%)]/10 text-xs uppercase tracking-[0.2em] text-[hsl(43,76%,65%)]">
              <Sparkles className="h-3 w-3" />
              Ready to Celebrate?
            </div>

            <h2 className="heading-script text-5xl md:text-6xl text-white mb-6">
              Let Us Plan Your Next Event
            </h2>

            <p className="text-white/60 mb-10 max-w-2xl mx-auto [font-family:'Cormorant_Garamond',serif] text-lg leading-relaxed">
              Looking for wedding catering, corporate catering, or custom event
              menus in Chennai? Explore our services or contact our team for a
              personalised quote.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/services">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-2 px-10 py-4 text-sm font-medium tracking-widest uppercase bg-[hsl(43,76%,58%)] text-[hsl(30,20%,13%)] hover:bg-[hsl(43,76%,50%)] transition-all duration-300"
                >
                  Explore Services
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-10 py-4 text-sm font-medium tracking-widest uppercase border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
                >
                  Get in Touch
                </motion.button>
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
