import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform
} from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Heart, Users, ChefHat, Award, Phone, ArrowRight,
  Leaf, Clock, MapPin, Send, Check, CalendarDays, Instagram
} from "lucide-react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { useIsMobile } from "@/hooks/use-mobile";
import { blogPosts } from "@/data/blogPosts";
import { CircularRevealHeading } from "@/components/ui/circular-reveal-heading";
import { CompareDemo } from "@/components/ui/compare-demo";
import { GlowCard } from "@/components/ui/spotlight-card";
import TestimonialsDemo from "@/components/ui/testimonials-demo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import heroCateringImage from "@/assets/hero-catering.jpg";
import weddingCateringImage from "@/assets/wedding-catering.jpg";
import corporateCateringImage from "@/assets/corporate-catering.jpg";
import privateDinnerImage from "@/assets/private-dinner.jpg";

// Food images for gallery
const foodImages = [
  { src: "https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Biryani", category: "Main Course" },
  { src: "https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Paneer Tikka", category: "Starters" },
  { src: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Butter Chicken", category: "Main Course" },
  { src: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Masala Dosa", category: "South Indian" },
  { src: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Chicken 65", category: "Starters" },
  { src: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Dessert Platter", category: "Sweets" },
  { src: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "South Indian Platter", category: "Main Course" },
  { src: "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Crispy Starters", category: "Snacks" },
];

// Menu categories
const menuCategories = [
  { name: "Breakfast", image: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400", link: "/menu" },
  { name: "Lunch", image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400", link: "/menu" },
  { name: "Dinner", image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400", link: "/menu" },
  { name: "Wedding", image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400", link: "/services" },
  { name: "Corporate", image: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=400", link: "/services" },
  { name: "Birthday", image: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400", link: "/services" },
];

const circularRevealItems = [
  {
    text: "Weddings",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80",
  },
  {
    text: "Corporate",
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80",
  },
  {
    text: "Birthdays",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
  },
  {
    text: "Private Dining",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
  },
];

const homeFaqs = [
  {
    question: "What types of events do you cater in Chennai?",
    answer: "We cater weddings, engagement ceremonies, birthday parties, corporate events, housewarmings, private dinners, and large family functions across Chennai."
  },
  {
    question: "Do you provide both vegetarian and non-vegetarian catering?",
    answer: "Yes. We offer separate vegetarian and non-vegetarian menus, and can also create mixed buffet plans based on your guest preferences."
  },
  {
    question: "How early should I book your catering service?",
    answer: "For weddings and peak season dates, we recommend booking 2 to 6 months in advance. For smaller events, we can often support shorter notice based on availability."
  },
  {
    question: "Can you customize menu items for my budget and taste?",
    answer: "Yes. We build custom menus based on your event type, guest count, cuisine preference, and budget while maintaining quality and hygiene standards."
  },
  {
    question: "Do you provide serving staff, setup, and vessels?",
    answer: "Yes. Our full-service catering includes professional serving staff, buffet setup, and required service equipment so you can focus on your guests."
  },
  {
    question: "Which locations do you serve apart from West Tambaram?",
    answer: "We are based in West Tambaram and serve most areas in Chennai and nearby districts. Share your venue location and date to confirm service availability."
  }
];

const instagramPosts = [
  {
    image: "https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Paneer starter platter",
    caption: "Freshly prepared paneer starters for events",
    link: "https://www.instagram.com/rebekhacaterers/",
  },
  {
    image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Signature biryani preparation",
    caption: "Aromatic biryani prepared for large gatherings",
    link: "https://www.instagram.com/rebekhacaterers/",
  },
  {
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Corporate lunch catering",
    caption: "Corporate event lunch with custom menu",
    link: "https://www.instagram.com/rebekhacaterers/",
  },
  {
    image: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "South Indian non veg spread",
    caption: "Chef special South Indian non-veg spread",
    link: "https://www.instagram.com/rebekhacaterers/",
  },
];

const revealEase = [0.22, 1, 0.36, 1] as const;

const heroHighlights = [
  {
    label: "Since 1998",
    copy: "Large-format wedding spreads and smaller private dinners handled with the same disciplined service flow.",
  },
  {
    label: "Custom menus",
    copy: "Vegetarian, non-vegetarian, and mixed event menus shaped around guest count, venue rhythm, and budget.",
  },
];

type HeroFeatureCard = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  glowColor: "blue" | "purple" | "green" | "red" | "orange";
};

const heroFeatureCards: HeroFeatureCard[] = [
  {
    title: "Layered service",
    description: "Buffet lines, live counters, and plated moments designed to feel calm, premium, and easy to move through.",
    icon: Clock,
    glowColor: "orange",
  },
  {
    title: "Regional depth",
    description: "South Indian and event-ready menus with room for ceremony staples, signature dishes, and late additions.",
    icon: Leaf,
    glowColor: "green",
  },
  {
    title: "Venue-led planning",
    description: "West Tambaram based with Chennai-wide execution, aligned to guest flow, access points, and timing windows.",
    icon: MapPin,
    glowColor: "blue",
  },
];

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
};

const ScrollReveal = ({
  children,
  className,
  delay = 0,
  amount = 0.28,
}: ScrollRevealProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount }}
    transition={{ duration: 0.85, delay, ease: revealEase }}
  >
    {children}
  </motion.div>
);

const HomeHero = () => {
  const heroRef = React.useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const disableHeroMotion = shouldReduceMotion || isMobile;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.16]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const headingScale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);
  const primaryCardY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const secondaryCardY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const tertiaryCardY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const primaryImageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);
  const secondaryImageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.02]);
  const tertiaryImageScale = useTransform(scrollYProgress, [0, 1], [0.98, 1.07]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  const backgroundStyle = disableHeroMotion ? undefined : { y: backgroundY, scale: backgroundScale };
  const contentStyle = disableHeroMotion ? undefined : { y: contentY };
  const headingStyle = disableHeroMotion ? undefined : { scale: headingScale };
  const primaryCardStyle = disableHeroMotion ? undefined : { y: primaryCardY };
  const secondaryCardStyle = disableHeroMotion ? undefined : { y: secondaryCardY };
  const tertiaryCardStyle = disableHeroMotion ? undefined : { y: tertiaryCardY };
  const primaryImageStyle = disableHeroMotion ? undefined : { scale: primaryImageScale };
  const secondaryImageStyle = disableHeroMotion ? undefined : { scale: secondaryImageScale };
  const tertiaryImageStyle = disableHeroMotion ? undefined : { scale: tertiaryImageScale };
  const scrollHintStyle = disableHeroMotion ? undefined : { opacity: scrollHintOpacity };

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-[#f4efe7]">
      <div className="relative">
        <div className="relative min-h-[100svh] overflow-hidden bg-[#120d0a] md:min-h-screen">
          <motion.div className="absolute inset-0" style={backgroundStyle}>
            <img
              src={heroCateringImage}
              alt="Rebekha catering service with an elegant event spread"
              className="h-full w-full object-cover object-center"
            />
          </motion.div>

          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(10,8,6,0.92)_12%,rgba(10,8,6,0.58)_46%,rgba(10,8,6,0.84)_100%)]" />
          <div className="absolute inset-y-0 left-0 w-full bg-[radial-gradient(circle_at_18%_42%,rgba(0,0,0,0.34),transparent_30%),linear-gradient(90deg,rgba(8,6,4,0.78)_0%,rgba(8,6,4,0.5)_34%,rgba(8,6,4,0.16)_58%,transparent_72%)]" />
          <div className="hero-grain absolute inset-0 opacity-80" />
          <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(0,0,0,0.35),transparent)]" />

          <div className="relative z-10 flex min-h-[100svh] items-center">
            <div className="container px-5 pb-10 pt-24 sm:px-6 sm:pb-12 sm:pt-28 md:pb-14 md:pt-32">
              <div className="grid items-end gap-10 md:gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)]">
                <motion.div
                  style={contentStyle}
                  className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left"
                >
                  <ScrollReveal>
                    <p className="mx-auto max-w-[17rem] font-outliers-sans text-[0.68rem] uppercase tracking-[0.28em] text-[#f0ddc9] sm:max-w-none sm:text-[0.72rem] sm:tracking-[0.34em] lg:mx-0">
                      Wedding & Event Catering
                    </p>
                  </ScrollReveal>

                  <ScrollReveal delay={0.08}>
                    <motion.h1
                      style={headingStyle}
                      className="heading-script mt-6 text-[clamp(3.35rem,17vw,5rem)] leading-[0.88] text-[#f8f1e6] sm:text-[clamp(4rem,13vw,6rem)] md:text-[clamp(4.5rem,8vw,8rem)] md:leading-[0.84]"
                    >
                      Bring ceremony
                      <br />
                      to the table.
                    </motion.h1>
                  </ScrollReveal>

                  <ScrollReveal delay={0.14}>
                    <p className="mx-auto mt-6 max-w-xl font-outliers-sans text-base leading-7 text-[#f6ede1] md:text-lg lg:mx-0">
                      Fresh vegetarian and non-vegetarian catering for weddings, birthdays,
                      corporate events, and family functions across Chennai, with custom menus
                      and professional service from setup to serving.
                    </p>
                  </ScrollReveal>

                  <ScrollReveal delay={0.2}>
                    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                      <Link to="/contact" className="w-full sm:w-auto">
                        <button className="font-outliers-sans inline-flex w-full items-center justify-center gap-2 border border-[#dbcab8] bg-[#f6eee2] px-6 py-4 text-xs uppercase tracking-[0.24em] text-[#140e0a] transition-all duration-300 hover:bg-white sm:w-auto sm:px-8 sm:tracking-[0.28em]">
                          Plan Your Event
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </Link>
                      <Link to="/menu" className="w-full sm:w-auto">
                        <button className="font-outliers-sans inline-flex w-full items-center justify-center gap-2 border border-white/28 bg-black/32 px-6 py-4 text-xs uppercase tracking-[0.24em] text-[#fbf4ea] transition-all duration-300 hover:bg-black/42 sm:w-auto sm:px-8 sm:tracking-[0.28em]">
                          Explore Menus
                        </button>
                      </Link>
                    </div>
                  </ScrollReveal>

                  <div className="mt-10 grid gap-4 sm:grid-cols-2">
                    {heroHighlights.map((item, index) => (
                      <ScrollReveal key={item.label} delay={0.26 + index * 0.06}>
                        <div className="border border-white/18 bg-black/44 p-5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.85)] backdrop-blur-md">
                          <p className="font-outliers-sans text-[0.68rem] uppercase tracking-[0.28em] text-[#f1d4a8]">
                            {item.label}
                          </p>
                          <p className="font-outliers-sans mt-3 text-sm leading-6 text-[#f7efe5]">
                            {item.copy}
                          </p>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>

                  <ScrollReveal delay={0.3} className="mt-12 mx-auto w-full max-w-sm lg:hidden">
                    <div className="overflow-hidden border border-white/12 bg-black/35 p-3 backdrop-blur-sm">
                      <motion.img
                        src={weddingCateringImage}
                        alt="Wedding catering table by Rebekha Caterers"
                        className="aspect-[4/5] w-full object-cover"
                        style={primaryImageStyle}
                      />
                      <div className="mt-4 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.28em] text-[#f2e3cf]">
                        <span className="font-outliers-sans">Wedding spreads</span>
                        <span className="font-outliers-sans">01</span>
                      </div>
                    </div>
                  </ScrollReveal>
                </motion.div>

                <div className="relative hidden min-h-[620px] lg:block">
                  <motion.div className="absolute right-0 top-0 w-[70%]" style={primaryCardStyle}>
                    <div className="overflow-hidden border border-white/18 bg-black/42 p-3 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.85)] backdrop-blur-sm">
                      <motion.img
                        src={weddingCateringImage}
                        alt="Wedding catering table by Rebekha Caterers"
                        className="aspect-[4/5] w-full object-cover"
                        style={primaryImageStyle}
                      />
                      <div className="mt-4 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.28em] text-[#f2e3cf]">
                        <span className="font-outliers-sans">Wedding spreads</span>
                        <span className="font-outliers-sans">01</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div className="absolute left-0 top-[18%] w-[38%]" style={secondaryCardStyle}>
                    <div className="overflow-hidden border border-[#ead8c6] bg-[#f6eee4] p-3 shadow-[0_36px_80px_-42px_rgba(0,0,0,0.72)]">
                      <motion.img
                        src={corporateCateringImage}
                        alt="Corporate catering setup by Rebekha Caterers"
                        className="aspect-[3/4] w-full object-cover"
                        style={secondaryImageStyle}
                      />
                      <p className="font-outliers-sans mt-4 text-[0.7rem] uppercase tracking-[0.28em] text-[#43362a]">
                        Corporate service
                      </p>
                    </div>
                  </motion.div>

                  <motion.div className="absolute bottom-0 left-[14%] w-[52%]" style={tertiaryCardStyle}>
                    <div className="overflow-hidden border border-white/18 bg-black/42 p-3 shadow-[0_34px_80px_-42px_rgba(0,0,0,0.72)] backdrop-blur-sm">
                      <motion.img
                        src={privateDinnerImage}
                        alt="Private dinner table setting by Rebekha Caterers"
                        className="aspect-[5/3] w-full object-cover"
                        style={tertiaryImageStyle}
                      />
                      <div className="mt-4 flex items-center justify-between gap-4">
                        <p className="heading-script text-[2.4rem] leading-[0.9] text-[#f8f1e6]">
                          Private dinners
                        </p>
                        <p className="font-outliers-sans text-[0.68rem] uppercase tracking-[0.28em] text-[#eedecd]">
                          Closer, quieter setups
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-3 lg:flex"
            style={scrollHintStyle}
          >
            <span className="font-outliers-sans text-[0.65rem] uppercase tracking-[0.28em] text-[#eadbc7]">
              Scroll To Explore
            </span>
            <span className="h-px w-20 bg-[#eadbc7]/40" />
          </motion.div>
        </div>
      </div>

      <div className="relative z-20 -mt-10 px-5 pb-12 sm:-mt-16 sm:px-6 md:-mt-24 md:pb-16">
        <div className="container">
          <ScrollReveal amount={0.24}>
            <div className="grid gap-6 border border-[#dac8b6] bg-[#f4ece1] p-5 shadow-[0_32px_80px_-44px_rgba(18,13,10,0.65)] sm:p-6 md:grid-cols-3 md:p-8">
              {heroFeatureCards.map(({ icon: Icon, title, description, glowColor }, index) => (
                <GlowCard
                  key={title}
                  customSize
                  glowColor={glowColor}
                  className="h-full min-h-[250px] w-full rounded-[28px] bg-[#f6eee4]/88 p-5 text-center shadow-[0_28px_70px_-46px_rgba(18,13,10,0.7)] backdrop-blur-xl sm:p-6 md:p-7 md:text-left"
                >
                  <div className="flex flex-col items-center gap-4 md:items-start">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#1a130d]/10 bg-white text-[#1a130d] md:mx-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-outliers-sans text-[0.68rem] uppercase tracking-[0.28em] text-[#6e5e4f]">
                        {`0${index + 1}`}
                      </p>
                      <h2 className="heading-script mt-3 text-[2.6rem] leading-[0.92] text-[#140e0a]">
                        {title}
                      </h2>
                    </div>
                  </div>
                  <p className="font-outliers-sans text-sm leading-6 text-[#514a40]">
                    {description}
                  </p>
                </GlowCard>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

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
  const inquiryReceiverEmail = "reburr94@gmail.com";

  const yearsCounter = useCounter(25, 2000);
  const eventsCounter = useCounter(10000, 2500);
  const dishesCounter = useCounter(200, 2000);

  // Enquire form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const latestBlogPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${inquiryReceiverEmail}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: "New Inquiry - Home Page",
            _captcha: "false",
            source_page: window.location.href,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            event_type: formData.eventType,
            message: formData.message,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: "",
          message: "",
        });
      }, 5000);
    } catch (err) {
      console.error("Form submission error:", err);
      setError("Failed to submit form. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[hsl(45,40%,94%)]">
      <SEO 
        title="Rebekha Catering Services - Best Wedding & Corporate Catering in Chennai"
        description="Award-winning veg & non-veg catering services in Chennai. Serving love since 1998. Perfect for weddings, birthday parties, corporate events & private dining. Hygienic, affordable."
        keywords="catering services Chennai, wedding catering Chennai, corporate event catering, best caterers West Tambaram, veg non-veg catering"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      </Helmet>
      <StructuredData />
      <Navigation />

      <HomeHero />

      {/* Before / After Compare */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-script text-5xl md:text-6xl text-[hsl(30,20%,15%)] mb-4">
              Compare Our Food Styling
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto mb-6" />
            <p className="text-lg text-[hsl(30,10%,35%)] max-w-2xl mx-auto [font-family:'Cormorant_Garamond',serif]">
              Drag the handle to compare two presentation styles and see the quality details.
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <CompareDemo />
          </motion.div>
        </div>
      </section>

      {/* Our Food Section - Eden Style */}
      <section className="py-20 bg-[hsl(43,76%,58%)]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-script text-5xl md:text-6xl text-[hsl(30,20%,15%)] mb-4">
              Our Food
            </h2>
            <div className="w-20 h-0.5 bg-[hsl(30,20%,15%)] mx-auto opacity-50" />
          </motion.div>

          {/* Food Grid - Masonry Style */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2">
            {foodImages.map((food, index) => (
              <motion.div
                key={index}
                className={`relative overflow-hidden cursor-pointer group ${index === 0 ? 'col-span-2 row-span-2' : ''
                  }`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <img
                  src={food.src}
                  alt={food.alt}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${index === 0 ? 'h-[400px] md:h-[500px]' : 'h-[180px] md:h-[240px]'
                    }`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {food.alt}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/menu">
              <button className="px-10 py-4 text-sm font-medium tracking-widest uppercase bg-[hsl(30,20%,15%)] text-white border-2 border-[hsl(30,20%,15%)] hover:bg-transparent hover:text-[hsl(30,20%,15%)] transition-all duration-300">
                View Full Menu
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Menu Categories Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {menuCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link to={category.link} className="block group">
                  <div className="relative overflow-hidden rounded-full aspect-square mb-3">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                  </div>
                  <p className="text-center text-sm font-medium tracking-wide uppercase text-[hsl(30,20%,15%)] group-hover:text-[hsl(38,70%,45%)] transition-colors">
                    {category.name}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Occasion Reveal Section */}
      <section className="py-20 bg-[hsl(45,40%,94%)]">
        <div className="container mx-auto grid gap-14 px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.85fr)] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-outliers-sans text-[0.72rem] uppercase tracking-[0.32em] text-[hsl(38,70%,45%)]">
              Tap Or Hover The Ring
            </p>
            <h2 className="heading-script mt-6 text-5xl md:text-6xl text-[hsl(30,20%,15%)]">
              Built around the way you host.
            </h2>
            <div className="my-6 h-0.5 w-16 bg-[hsl(43,76%,58%)]" />
            <p className="max-w-xl text-lg leading-relaxed text-[hsl(30,10%,35%)] [font-family:'Cormorant_Garamond',serif]">
              Preview the event moods we plan most often. On desktop, hover each word to reveal
              the atmosphere behind it. On smaller screens, tap a label to switch the image.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-[hsl(40,20%,85%)] bg-white/80 p-5">
                <p className="font-outliers-sans text-[0.68rem] uppercase tracking-[0.28em] text-[hsl(38,70%,45%)]">
                  Wedding service
                </p>
                <p className="mt-3 text-sm leading-6 text-[hsl(30,10%,35%)]">
                  Ceremony timing, buffet flow, and guest comfort balanced in one service plan.
                </p>
              </div>
              <div className="rounded-3xl border border-[hsl(40,20%,85%)] bg-white/80 p-5">
                <p className="font-outliers-sans text-[0.68rem] uppercase tracking-[0.28em] text-[hsl(38,70%,45%)]">
                  Corporate precision
                </p>
                <p className="mt-3 text-sm leading-6 text-[hsl(30,10%,35%)]">
                  Menus and setup paced for lunch windows, team events, and cleaner service rhythm.
                </p>
              </div>
            </div>

            <Link to="/services" className="mt-8 inline-flex">
              <button className="px-8 py-3 text-sm font-medium tracking-widest uppercase bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)] hover:bg-[hsl(38,70%,45%)] hover:border-[hsl(38,70%,45%)] transition-all duration-300 inline-flex items-center gap-2">
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <CircularRevealHeading
              items={circularRevealItems}
              size="md"
              className="mx-auto"
              centerText={
                <div className="flex flex-col items-center gap-3 text-center text-[#444444]">
                  <ChefHat className="h-8 w-8 text-[hsl(43,76%,58%)]" />
                  <p className="font-outliers-sans text-[0.68rem] uppercase tracking-[0.28em]">
                    Rebekha Caterers
                  </p>
                  <p className="heading-script text-[2.5rem] leading-none text-[#2f2721]">
                    Event craft
                  </p>
                </div>
              }
            />
          </motion.div>
        </div>
      </section>

      {/* Special Event Banner */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed [background-image:url('https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=1920')]" />
        <div className="absolute inset-0 bg-[hsl(43,76%,58%)]/90" />

        <motion.div
          className="relative z-10 container mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-script text-5xl md:text-7xl text-[hsl(30,20%,15%)] mb-4">
            Wedding Season
          </h2>
          <p className="text-4xl md:text-5xl font-light text-[hsl(30,20%,15%)] mb-6 [font-family:'Cormorant_Garamond',serif]">
            2026
          </p>
          <p className="text-lg text-[hsl(30,20%,15%)]/80 mb-8 max-w-xl mx-auto">
            Book your dream wedding catering now. Custom menus, professional service, unforgettable taste.
          </p>
          <Link to="/contact">
            <button className="px-10 py-4 text-sm font-medium tracking-widest uppercase bg-[hsl(30,20%,15%)] text-white border-2 border-[hsl(30,20%,15%)] hover:bg-transparent hover:text-[hsl(30,20%,15%)] transition-all duration-300">
              Book Now
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 text-center sm:grid-cols-3">
            <motion.div
              ref={yearsCounter.ref}
              className="mx-auto w-full max-w-[12rem]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Award className="h-10 w-10 text-[hsl(43,76%,58%)] mx-auto mb-3" />
              <div className="text-3xl sm:text-4xl md:text-5xl font-light text-[hsl(30,20%,15%)] [font-family:'Cormorant_Garamond',serif]">
                {yearsCounter.count}+
              </div>
              <p className="text-sm text-[hsl(30,10%,45%)] uppercase tracking-wider mt-2">Years</p>
            </motion.div>

            <motion.div
              ref={eventsCounter.ref}
              className="mx-auto w-full max-w-[12rem]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Users className="h-10 w-10 text-[hsl(43,76%,58%)] mx-auto mb-3" />
              <div className="text-3xl sm:text-4xl md:text-5xl font-light text-[hsl(30,20%,15%)] [font-family:'Cormorant_Garamond',serif]">
                {eventsCounter.count.toLocaleString()}+
              </div>
              <p className="text-sm text-[hsl(30,10%,45%)] uppercase tracking-wider mt-2">Events</p>
            </motion.div>

            <motion.div
              ref={dishesCounter.ref}
              className="mx-auto w-full max-w-[12rem]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <ChefHat className="h-10 w-10 text-[hsl(43,76%,58%)] mx-auto mb-3" />
              <div className="text-3xl sm:text-4xl md:text-5xl font-light text-[hsl(30,20%,15%)] [font-family:'Cormorant_Garamond',serif]">
                {dishesCounter.count}+
              </div>
              <p className="text-sm text-[hsl(30,10%,45%)] uppercase tracking-wider mt-2">Dishes</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-[hsl(45,40%,94%)]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              className="relative max-w-sm mx-auto lg:mx-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="overflow-hidden">
                <img
                  src="/founders-new-std.jpeg"
                  srcSet="/founders-new-std.jpeg 450w, /founders-new-hd.jpeg 903w"
                  sizes="(max-width: 1024px) 90vw, 384px"
                  alt="Our Founders"
                  className="w-full h-[500px] object-cover object-center contrast-110 saturate-110 brightness-105"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-script text-5xl md:text-6xl text-[hsl(30,20%,15%)] mb-6">
                About Us
              </h2>
              <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mb-8" />

              <p className="text-lg text-[hsl(30,10%,35%)] leading-relaxed mb-6 [font-family:'Cormorant_Garamond',serif] text-[1.25rem]">
                Rebekha Caterers is one of Chennai's most trusted catering services,
                providing fresh, authentic and delicious food since 1998.
              </p>

              <p className="text-lg text-[hsl(30,10%,35%)] leading-relaxed mb-8 [font-family:'Cormorant_Garamond',serif] text-[1.25rem]">
                Founded by Christopher Durairaj & Nancy Navaneetham, we bring
                traditional recipes passed through generations to your celebrations.
                Be it a wedding for 1000 or a birthday for 50, we have the experience
                and passion to make your event memorable.
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Leaf, text: "Fresh Ingredients" },
                  { icon: ChefHat, text: "Expert Chefs" },
                  { icon: Clock, text: "Timely Service" },
                  { icon: Heart, text: "Made with Love" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-[hsl(30,20%,15%)]">
                    <item.icon className="h-5 w-5 text-[hsl(43,76%,58%)]" />
                    <span className="text-sm uppercase tracking-wide">{item.text}</span>
                  </div>
                ))}
              </div>

              <Link to="/about">
                <button className="px-8 py-3 text-sm font-medium tracking-widest uppercase bg-transparent text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)] hover:bg-[hsl(43,76%,58%)] transition-all duration-300 flex items-center gap-2">
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-script text-5xl md:text-6xl text-[hsl(30,20%,15%)] mb-4">
              The Team
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto mb-6" />
            <p className="text-lg text-[hsl(30,10%,35%)] mb-8 max-w-xl mx-auto [font-family:'Cormorant_Garamond',serif]">
              Our dedicated team of chefs, service staff, and coordinators work together
              to make your events exceptional.
            </p>
            <Link to="/about">
              <button className="px-8 py-3 text-sm font-medium tracking-widest uppercase bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)] hover:bg-[hsl(38,70%,45%)] hover:border-[hsl(38,70%,45%)] transition-all duration-300">
                Meet The Team
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Blog / Updates Section */}
      <section className="py-20 bg-[hsl(45,40%,94%)]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-script text-5xl md:text-6xl text-[hsl(30,20%,15%)] mb-4">
              Latest Updates
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto mb-6" />
            <p className="text-lg text-[hsl(30,10%,35%)] max-w-2xl mx-auto [font-family:'Cormorant_Garamond',serif]">
              Wedding catering tips, menu customization guides, event planning checklists, and seasonal special offers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {latestBlogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Link to={`/blog/${post.slug}`} className="block group h-full">
                  <article className="bg-white h-full border border-[hsl(40,20%,85%)] overflow-hidden">
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-xs uppercase tracking-wider text-[hsl(30,10%,45%)] mb-3 flex items-center gap-2">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {new Date(post.date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      <h3 className="text-xl text-[hsl(30,20%,15%)] mb-3 line-clamp-2 group-hover:text-[hsl(38,70%,45%)] transition-colors [font-family:'Cormorant_Garamond',serif]">
                        {post.title}
                      </h3>
                      <p className="text-sm text-[hsl(30,10%,45%)] leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/blog">
              <button className="px-8 py-3 text-sm font-medium tracking-widest uppercase bg-transparent text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)] hover:bg-[hsl(43,76%,58%)] transition-all duration-300">
                Explore Blog
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-script text-5xl md:text-6xl text-[hsl(30,20%,15%)] mb-4">
              Instagram Highlights
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto mb-6" />
            <p className="text-lg text-[hsl(30,10%,35%)] max-w-2xl mx-auto [font-family:'Cormorant_Garamond',serif]">
              Recent catering moments from weddings, birthdays, and corporate events.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {instagramPosts.map((post, index) => (
              <motion.a
                key={post.alt}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.alt}
                    className="w-full h-44 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                    <p className="text-white text-xs md:text-sm p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {post.caption}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <a
              href="https://www.instagram.com/rebekhacaterers/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-8 py-3 text-sm font-medium tracking-widest uppercase bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)] hover:bg-[hsl(38,70%,45%)] hover:border-[hsl(38,70%,45%)] transition-all duration-300 inline-flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                Follow on Instagram
              </button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[hsl(45,40%,94%)]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-script text-5xl md:text-6xl text-[hsl(30,20%,15%)] mb-4">
              Testimonials
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto" />
            <p className="mt-5 text-[hsl(30,10%,35%)] max-w-2xl mx-auto [font-family:'Cormorant_Garamond',serif]">
              Real client feedback from weddings, birthdays, and corporate events.
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

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/testimonials">
              <button className="px-8 py-3 text-sm font-medium tracking-widest uppercase bg-transparent text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)] hover:bg-[hsl(43,76%,58%)] transition-all duration-300">
                View All Reviews
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-script text-5xl md:text-6xl text-[hsl(30,20%,15%)] mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto mb-6" />
            <p className="text-lg text-[hsl(30,10%,35%)] max-w-2xl mx-auto [font-family:'Cormorant_Garamond',serif]">
              Quick answers about our wedding, birthday, and corporate catering services in Chennai.
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {homeFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`home-faq-${index}`}
                  className="border border-[hsl(40,20%,85%)] px-6 bg-[hsl(45,40%,94%)]"
                >
                  <AccordionTrigger className="hover:no-underline py-6">
                    <span className="text-left text-lg text-[hsl(30,20%,15%)] [font-family:'Cormorant_Garamond',serif]">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[hsl(30,10%,35%)] pb-6 leading-relaxed [font-family:'Cormorant_Garamond',serif] text-[1.1rem]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="text-center mt-10">
              <Link to="/faq">
                <button className="px-8 py-3 text-sm font-medium tracking-widest uppercase bg-transparent text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)] hover:bg-[hsl(43,76%,58%)] transition-all duration-300">
                  View More FAQs
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enquire Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-script text-5xl md:text-6xl text-[hsl(30,20%,15%)] mb-4">
              Enquire
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto mb-6" />
            <p className="text-lg text-[hsl(30,10%,35%)] max-w-xl mx-auto [font-family:'Cormorant_Garamond',serif]">
              Ready to make your event memorable? Get in touch with us today.
            </p>
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto bg-[hsl(45,40%,94%)] p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl text-[hsl(30,20%,15%)] mb-2 [font-family:'Cormorant_Garamond',serif]">
                  Thank You!
                </h3>
                <p className="text-[hsl(30,10%,45%)]">
                  We've received your enquiry and will get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="home-name" className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">Name *</label>
                    <input
                      id="home-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors disabled:opacity-50"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="home-phone" className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">Phone *</label>
                    <input
                      id="home-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors disabled:opacity-50"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="home-email" className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">Email *</label>
                  <input
                    id="home-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors disabled:opacity-50"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="home-event-type" className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">Event Type</label>
                  <select
                    id="home-event-type"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors disabled:opacity-50"
                  >
                    <option value="">Select event type</option>
                    <option value="wedding">Wedding</option>
                    <option value="birthday">Birthday</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="home-message" className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">Message</label>
                  <textarea
                    id="home-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors resize-none disabled:opacity-50"
                    placeholder="Tell us about your event"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-sm font-medium tracking-widest uppercase bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)] hover:bg-[hsl(38,70%,45%)] hover:border-[hsl(38,70%,45%)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Enquiry
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Contact Info */}
            <div className="mt-8 pt-8 border-t border-[hsl(40,20%,85%)] text-center">
              <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-sm text-[hsl(30,10%,35%)]">
                <a href="tel:+919445435102" className="flex items-center gap-2 hover:text-[hsl(38,70%,45%)] transition-colors">
                  <Phone className="h-4 w-4" />
                  <span>+91 94454 35102</span>
                </a>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>West Tambaram, Chennai</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Business Card Section - Home Page */}
      <section className="py-20 bg-[hsl(45,40%,94%)]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="heading-script text-4xl text-[hsl(30,20%,15%)] mb-6">
                Connect With Us
              </h2>
              <p className="text-[hsl(30,10%,35%)] mb-8 leading-relaxed [font-family:'Cormorant_Garamond',serif] text-[1.2rem]">
                Save our contact details for your next event. We are dedicated to providing the best catering and transport services in Chennai.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <button className="px-6 py-3 text-xs font-bold uppercase tracking-widest bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] hover:bg-[hsl(38,70%,45%)] transition-all">
                    Get in Touch
                  </button>
                </Link>
                <a href="/catering-card.jpg" download className="px-6 py-3 text-xs font-bold uppercase tracking-widest border-2 border-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] hover:bg-[hsl(43,76%,58%)] transition-all text-center">
                  Save Card
                </a>
              </div>
            </div>
            <div className="md:w-1/2 relative group">
              <div className="absolute -inset-2 bg-[hsl(43,76%,58%)]/20 blur-lg group-hover:bg-[hsl(43,76%,58%)]/30 transition-all"></div>
              <img
                src="/catering-card.jpg"
                alt="Rebekha Caterers Card"
                className="relative z-10 w-full shadow-2xl transition-transform duration-500 group-hover:scale-[1.05]"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Home;
