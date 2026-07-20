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
  Leaf, Clock, MapPin, Send, Check, CalendarDays, Instagram, Flame, Sparkles, UtensilsCrossed, Play,
  ShieldCheck, Wallet, MessageCircle
} from "lucide-react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { useIsMobile } from "@/hooks/use-mobile";
import { blogPosts } from "@/data/blogPosts";
import { CompareDemo } from "@/components/ui/compare-demo";
import FAQBlock from "@/components/ui/faq-block";
import InteractiveSelector, { type InteractiveSelectorItem } from "@/components/ui/interactive-selector";
import { GlowCard } from "@/components/ui/spotlight-card";
import TestimonialsDemo from "@/components/ui/testimonials-demo";
import { submitInquiry, validateInquiryData } from "@/services/formService";
import heroCateringImage from "@/assets/hero-catering.jpg";
import weddingCateringImage from "@/assets/wedding-catering.jpg";
import corporateCateringImage from "@/assets/corporate-catering.jpg";
import privateDinnerImage from "@/assets/private-dinner.jpg";
import birthdayCateringImage from "@/assets/birthday-catering.jpg";
import nonVegFeastImage from "@/assets/non-veg-feast.jpg";
import southIndianVegImage from "@/assets/south-indian-veg.jpg";
import motherRecipeStoryImage from "@/assets/stories/mother-recipe-story.png";
import biryaniStoryImage from "@/assets/stories/biryani-story.png";
import joyFamilyStoryImage from "@/assets/stories/joy-family-story.png";
import legacyStoryImage from "@/assets/stories/legacy-story.png";
import reelOneVideo from "@/assets/stories/reel-1.mp4";
import reelTwoVideo from "@/assets/stories/reel-2.mp4";
import reelThreeVideo from "@/assets/stories/reel-3.mp4";

const homeFoodSelectorItems: InteractiveSelectorItem[] = [
  {
    title: "Wedding Buffets",
    description: "Full-course vegetarian and non-vegetarian buffet lines designed for fast, elegant guest service.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    icon: <ChefHat className="h-5 w-5 text-white" />,
    eyebrow: "Signature spreads",
  },
  {
    title: "Live Counters",
    description: "Interactive dosa, grill, and tawa counters that keep events feeling fresh and animated.",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80",
    icon: <Flame className="h-5 w-5 text-white" />,
    eyebrow: "Cooked on demand",
  },
  {
    title: "South Indian Favourites",
    description: "Breakfast and lunch menus rooted in familiar regional classics with crowd-pleasing balance.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
    icon: <Leaf className="h-5 w-5 text-white" />,
    eyebrow: "Regional depth",
  },
  {
    title: "Starter Service",
    description: "Crisp starters and passed bites timed around arrivals, speeches, and peak guest movement.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    icon: <UtensilsCrossed className="h-5 w-5 text-white" />,
    eyebrow: "Perfect openers",
  },
  {
    title: "Dessert Tables",
    description: "Festive dessert displays that close the meal with polish, variety, and visual warmth.",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80",
    icon: <Sparkles className="h-5 w-5 text-white" />,
    eyebrow: "Sweet finales",
  },
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

const foodGalleryItems = [
  {
    title: "Wedding Buffets",
    description: "Elegant buffet spreads styled for grand celebrations and fast guest service.",
    image: weddingCateringImage,
    tag: "Wedding",
  },
  {
    title: "Corporate Catering",
    description: "Polished plated service and premium packing for office events and executive gatherings.",
    image: corporateCateringImage,
    tag: "Corporate",
  },
  {
    title: "Private Dinners",
    description: "Warm, intimate dining sets designed for family celebrations and quiet evenings.",
    image: privateDinnerImage,
    tag: "Private",
  },
  {
    title: "Birthday Specials",
    description: "Colorful menus and festive presentation for birthdays and milestone parties.",
    image: birthdayCateringImage,
    tag: "Birthday",
  },
  {
    title: "Non-Veg Feast",
    description: "Rich, flavour-packed spreads that bring depth and variety to every event table.",
    image: nonVegFeastImage,
    tag: "Non-Veg",
  },
  {
    title: "South Indian Delights",
    description: "Classic regional favourites presented with fresh ingredients and thoughtful styling.",
    image: southIndianVegImage,
    tag: "Veg",
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

const featuredPosterStories = [
  {
    title: "Born from a Mother's Recipe",
    description: "A warm brand story anchored in heritage cooking and signature South Indian flavors.",
    image: motherRecipeStoryImage,
    alt: "Poster reading Born from a Mother's Recipe over a South Indian feast spread",
  },
  {
    title: "Honor Her with Every Bite",
    description: "A Mother's Day creative built around celebration tables, sweets, and festive catering.",
    image: biryaniStoryImage,
    alt: "Poster reading Honor Her with Every Bite over a styled biryani and buffet spread",
  },
  {
    title: "Focus on the Joy, We'll Handle the Rest",
    description: "Family-event messaging that keeps the spotlight on the people, not the logistics.",
    image: joyFamilyStoryImage,
    alt: "Poster reading Focus on the Joy, We'll Handle the Rest over a family celebration table",
  },
  {
    title: "Legacy Served on a Plate",
    description: "A heritage-led visual that speaks to multi-generation gatherings and careful service.",
    image: legacyStoryImage,
    alt: "Poster reading Legacy Served on a Plate over a family meal celebration",
  },
];

const featuredReelStories = [
  {
    title: "Motion Reel 01",
    description: "Looped footage for social stories, campaign cuts, and quick event previews.",
    video: reelOneVideo,
    poster: motherRecipeStoryImage,
  },
  {
    title: "Motion Reel 02",
    description: "A second reel that keeps the service flow and table detail moving on screen.",
    video: reelTwoVideo,
    poster: biryaniStoryImage,
  },
  {
    title: "Motion Reel 03",
    description: "A third reel that shows the scale and energy of a full celebration setup.",
    video: reelThreeVideo,
    poster: legacyStoryImage,
  },
];

const revealEase = [0.22, 1, 0.36, 1] as const;

const heroHighlights = [
  {
    label: "25+ Years Legacy",
    copy: "Grand wedding banquets and intimate private dining served with perfection and disciplined service flow.",
  },
  {
    label: "Bespoke Menus",
    copy: "Authentic South Indian & multi-cuisine spreads shaped around your guest count, venue rhythm, and budget.",
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
  const [greetingIndex, setGreetingIndex] = React.useState(0);
  
  const greetings = ["NAMASTE & WELCOME", "AUTHENTIC FLAVOURS SINCE 1998", "VANAKKAM! WELCOME TO REBEKHA"];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [greetings.length]);

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
    <section ref={heroRef} className="relative overflow-hidden bg-[#0e0906]">
      <div className="relative">
        <div className="relative min-h-[100svh] overflow-hidden bg-[#0e0906] md:min-h-screen">
          <motion.div className="absolute inset-0" style={backgroundStyle}>
            <img
              src={heroCateringImage}
              alt="Rebekha catering grand luxury buffet hall"
              className="h-full w-full object-cover object-center brightness-95 contrast-105"
            />
          </motion.div>

          {/* Premium Gradient Overlays */}
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(14,9,6,0.94)_10%,rgba(14,9,6,0.65)_48%,rgba(14,9,6,0.88)_100%)]" />
          <div className="absolute inset-y-0 left-0 w-full bg-[radial-gradient(circle_at_20%_40%,rgba(212,175,55,0.12),transparent_45%),linear-gradient(90deg,rgba(14,9,6,0.85)_0%,rgba(14,9,6,0.55)_36%,rgba(14,9,6,0.2)_62%,transparent_78%)]" />
          <div className="hero-grain absolute inset-0 opacity-60" />
          <div className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(0,0,0,0.5),transparent)]" />

          <div className="relative z-10 flex min-h-[100svh] items-center">
            <div className="container px-5 pb-12 pt-24 sm:px-6 sm:pb-14 sm:pt-28 md:pb-16 md:pt-32">
              <div className="grid items-center gap-10 md:gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,1fr)]">
                <motion.div
                  style={contentStyle}
                  className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left"
                >
                  {/* Animated rotating greeting badge */}
                  <ScrollReveal>
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-1.5 backdrop-blur-md">
                      <Sparkles className="h-4 w-4 text-[#e6c667] animate-pulse" />
                      <div className="relative h-5 overflow-hidden min-w-[210px]">
                        <motion.div
                          key={greetingIndex}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.5 }}
                          className="absolute left-0 top-0 font-sans text-xs uppercase font-bold tracking-[0.2em] text-[#e6c667]"
                        >
                          {greetings[greetingIndex]}
                        </motion.div>
                      </div>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.08}>
                    <motion.h1
                      style={{ scale: headingScale } as unknown as React.CSSProperties}
                      className="font-serif mt-5 text-[clamp(2.5rem,7vw,5.25rem)] font-extrabold leading-[1.08] tracking-tight text-[#FAF6F0]"
                    >
                      Crafting <span className="bg-gradient-to-r from-[#F3E5AB] via-[#E2C376] to-[#C89B3C] bg-clip-text text-transparent italic font-normal">Grand Feasts</span>
                      <br />
                      That Celebrate Life
                    </motion.h1>
                  </ScrollReveal>

                  <ScrollReveal delay={0.12}>
                    <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-[#E5DAC8] md:text-lg lg:mx-0 font-normal">
                      Award-winning South Indian & multi-cuisine catering for grand weddings, corporate galas, and intimate family celebrations across Chennai. Serving excellence since 1998.
                    </p>
                  </ScrollReveal>

                  <ScrollReveal delay={0.16}>
                    <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                      <Link to="/contact" className="w-full sm:w-auto group">
                        <button className="font-sans inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-[#e6c667]/40 bg-gradient-to-r from-[#d4af37] via-[#e6c667] to-[#c59b27] px-8 py-4 text-sm font-bold tracking-wide text-[#120d0a] shadow-[0_10px_30px_-10px_rgba(212,175,55,0.5)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_15px_35px_-8px_rgba(212,175,55,0.7)] sm:w-auto">
                          <span>Get Your Quote</span>
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                      </Link>
                      <Link to="/menu" className="w-full sm:w-auto">
                        <button className="font-sans inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-8 py-4 text-sm font-semibold tracking-wide text-[#FAF6F0] backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white/20 sm:w-auto">
                          <span>View Our Menus</span>
                        </button>
                      </Link>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.2} className="mt-12 hidden md:block">
                    <div className="grid gap-5 sm:grid-cols-2">
                      {heroHighlights.map((item) => (
                        <div key={item.label} className="group rounded-xl border border-[#d4af37]/25 bg-gradient-to-br from-white/12 to-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:border-[#d4af37]/50 hover:bg-white/15">
                          <p className="font-sans text-xs uppercase tracking-[0.18em] text-[#e6c667] font-bold">
                            {item.label}
                          </p>
                          <p className="font-sans mt-2.5 text-sm leading-relaxed text-[#F0E6D8] font-normal">
                            {item.copy}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.3} className="mt-12 mx-auto w-full max-w-sm lg:hidden">
                    <div className="overflow-hidden rounded-2xl border border-[#d4af37]/30 bg-[#120d0a]/80 p-3.5 backdrop-blur-md shadow-2xl">
                      <motion.img
                        src={weddingCateringImage}
                        alt="Royal wedding catering feast spread by Rebekha Caterers"
                        className="aspect-[4/3] w-full object-cover rounded-xl"
                        style={primaryImageStyle}
                      />
                      <div className="mt-3.5 flex items-center justify-between text-xs font-semibold tracking-wider text-[#e6c667]">
                        <span className="font-sans font-bold">01 | ROYAL WEDDING SPREADS</span>
                        <span className="font-sans text-[0.65rem] px-2 py-0.5 rounded border border-[#d4af37]/40 bg-[#d4af37]/10">VEG & NON-VEG</span>
                      </div>
                    </div>
                  </ScrollReveal>
                </motion.div>

                {/* Desktop Image Cards */}
                <div className="relative hidden min-h-[640px] lg:block">
                  <motion.div className="absolute right-0 top-0 w-[68%]" style={primaryCardStyle}>
                    <div className="group overflow-hidden rounded-2xl border border-[#d4af37]/35 bg-[#120d0a]/75 p-3.5 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md transition-all duration-500 hover:border-[#d4af37]/60">
                      <div className="relative overflow-hidden rounded-xl">
                        <motion.img
                          src={weddingCateringImage}
                          alt="Royal South Indian wedding catering table by Rebekha Caterers"
                          className="aspect-[4/5] w-full object-cover"
                          style={primaryImageStyle}
                        />
                        <div className="absolute top-3 left-3 rounded-full bg-[#120d0a]/80 border border-[#d4af37]/40 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-widest text-[#e6c667] backdrop-blur-md">
                          Grand Weddings
                        </div>
                      </div>
                      <div className="mt-3.5 flex items-center justify-between text-xs tracking-wider text-[#F5EBDC]">
                        <span className="font-sans font-bold text-[#FAF6F0]">Royal Banquet Spreads</span>
                        <span className="font-sans font-extrabold text-[#e6c667]">01</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div className="absolute left-0 top-[20%] w-[42%] z-10" style={secondaryCardStyle}>
                    <div className="group overflow-hidden rounded-2xl border border-white/20 bg-[#1a130d]/85 p-3.5 shadow-[0_25px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-500 hover:border-[#d4af37]/40">
                      <div className="relative overflow-hidden rounded-xl">
                        <motion.img
                          src={corporateCateringImage}
                          alt="Corporate catering service setup by Rebekha Caterers"
                          className="aspect-[3/4] w-full object-cover"
                          style={secondaryImageStyle}
                        />
                        <div className="absolute top-2.5 left-2.5 rounded-full bg-[#120d0a]/80 border border-white/20 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-widest text-[#F5EBDC] backdrop-blur-md">
                          Live Counters
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs tracking-wider text-[#F5EBDC]">
                        <span className="font-sans font-semibold">Corporate Events</span>
                        <span className="font-sans font-bold text-[#e6c667]">02</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div className="absolute bottom-2 left-[18%] w-[58%] z-20" style={tertiaryCardStyle}>
                    <div className="group overflow-hidden rounded-2xl border border-[#d4af37]/35 bg-[#120d0a]/85 p-3.5 shadow-[0_30px_80px_-35px_rgba(0,0,0,0.9)] backdrop-blur-md transition-all duration-500 hover:border-[#d4af37]/60">
                      <div className="relative overflow-hidden rounded-xl">
                        <motion.img
                          src={privateDinnerImage}
                          alt="Private dinner table setting by Rebekha Caterers"
                          className="aspect-[16/9] w-full object-cover"
                          style={tertiaryImageStyle}
                        />
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-4 px-1">
                        <div>
                          <p className="font-serif text-lg font-bold text-[#FAF6F0]">
                            Private Dinners
                          </p>
                          <p className="font-sans text-[0.7rem] uppercase tracking-widest text-[#e6c667] font-semibold">
                            Intimate Gatherings
                          </p>
                        </div>
                        <span className="font-sans font-extrabold text-sm text-[#e6c667] border border-[#d4af37]/30 rounded-full h-7 w-7 flex items-center justify-center bg-[#d4af37]/10">03</span>
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
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#e6c667] font-semibold">
              Scroll To Explore
            </span>
            <span className="h-px w-20 bg-gradient-to-r from-[#e6c667] to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="relative z-20 -mt-10 px-5 pb-12 sm:-mt-16 sm:px-6 md:-mt-24 md:pb-16">
        <div className="container">
          <ScrollReveal amount={0.24}>
            <div className="grid gap-6 rounded-2xl border border-[#d4af37]/25 bg-[#FAF6F0] p-6 shadow-[0_35px_90px_-40px_rgba(14,9,6,0.7)] sm:p-8 md:grid-cols-3">
              {heroFeatureCards.map(({ icon: Icon, title, description, glowColor }, index) => (
                <GlowCard
                  key={title}
                  customSize
                  glowColor={glowColor}
                  className="h-full min-h-[250px] w-full rounded-xl bg-white p-6 text-center shadow-[0_15px_45px_-20px_rgba(14,9,6,0.12)] border border-[#e8ded0] transition-all duration-300 hover:shadow-[0_20px_50px_-15px_rgba(212,175,55,0.25)] sm:p-7 md:text-left"
                >
                  <div className="flex flex-col items-center gap-4 md:items-start">
                    <div className="flex w-full items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#d4af37]/30 bg-gradient-to-br from-[#FAF6F0] to-[#F3E6D0] text-[#1a130d] shadow-sm">
                        <Icon className="h-6 w-6 text-[#C89B3C]" />
                      </div>
                      <span className="font-serif text-2xl font-extrabold text-[#d4af37]/40">
                        {`0${index + 1}`}
                      </span>
                    </div>
                    <div>
                      <p className="font-sans text-xs uppercase tracking-[0.18em] text-[#9E8255] font-bold">
                        Feature 0{index + 1}
                      </p>
                      <h2 className="font-serif mt-2 text-2xl font-bold leading-snug text-[#1A130D]">
                        {title}
                      </h2>
                    </div>
                  </div>
                  <p className="font-sans mt-3 text-sm leading-relaxed text-[#4A4237]">
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
  const yearsCounter = useCounter(25, 2000);
  const eventsCounter = useCounter(10000, 2500);
  const dishesCounter = useCounter(200, 2000);

  // Enquire form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
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
      const inquiryData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventType: formData.eventType,
        guestCount: "",
        date: formData.eventDate,
        message: formData.message,
      };

      const validation = validateInquiryData(inquiryData);
      if (!validation.valid) {
        setError(validation.errors[0]);
        return;
      }

      const inquiryId = await submitInquiry(inquiryData);
      console.log("Inquiry submitted successfully:", inquiryId);

      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: "",
          eventDate: "",
          message: "",
        });
      }, 5000);
    } catch (err) {
      console.error("Form submission error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to submit form. Please try again or contact us directly."
      );
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

      {/* Business Info Cards Section */}
      <section className="py-12 md:py-16 px-5 sm:px-6 bg-[#f4efe7]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal delay={0}>
              <div className="bg-white rounded-xl p-6 shadow-md border border-[#e8d7c3]">
                <p className="font-sans text-xs uppercase tracking-widest text-[#b8860b] font-semibold mb-2">
                  Contact Us
                </p>
                <h3 className="font-serif text-lg font-bold text-[#140e0a] mb-3">Phone</h3>
                <p className="font-sans text-sm text-[#514a40] mb-2">📞 +91 944543 5102</p>
                <p className="font-sans text-sm text-[#514a40]">📞 +91 892547 7007</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="bg-white rounded-xl p-6 shadow-md border border-[#e8d7c3]">
                <p className="font-sans text-xs uppercase tracking-widest text-[#b8860b] font-semibold mb-2">
                  Location
                </p>
                <h3 className="font-serif text-lg font-bold text-[#140e0a] mb-3">Address</h3>
                <p className="font-sans text-sm text-[#514a40]">No. 19, Perumal Kavil Street, Irumbuliyur, Tambaram West, Chennai - 600045</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-white rounded-xl p-6 shadow-md border border-[#e8d7c3]">
                <p className="font-sans text-xs uppercase tracking-widest text-[#b8860b] font-semibold mb-2">
                  License
                </p>
                <h3 className="font-serif text-lg font-bold text-[#140e0a] mb-3">Business Details</h3>
                <p className="font-sans text-sm text-[#514a40] mb-1">License No: 009/2017/0000483</p>
                <p className="font-sans text-sm text-[#514a40]">Proprietor: Rebekha Raj</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* About Section with Statistics */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-[#f4efe7] to-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left side - Images */}
            <ScrollReveal className="hidden md:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src={weddingCateringImage} 
                    alt="Wedding catering by Rebekha" 
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="overflow-hidden rounded-lg mt-8">
                  <img 
                    src={corporateCateringImage} 
                    alt="Corporate catering by Rebekha" 
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Right side - Content */}
            <ScrollReveal>
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-[#b8860b] font-semibold mb-3">
                  Since 1998
                </p>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#140e0a] leading-tight mb-6">
                  Elevating Your Events with Exceptional Food
                </h2>
                <p className="font-sans text-base leading-relaxed text-[#514a40] mb-8">
                  Rebekha Catering is where food is celebrated and memories are made. We love to create unforgettable culinary experiences that bring families and friends together.
                </p>

                {/* Statistics Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e8d7c3] text-center hover:shadow-md transition-shadow">
                    <p className="font-sans text-xs uppercase tracking-widest text-[#b8860b] font-semibold mb-2">
                      Experience
                    </p>
                    <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#140e0a]">
                      25
                    </h3>
                    <p className="font-sans text-xs text-[#6e5e4f] mt-2">Years of Service</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e8d7c3] text-center hover:shadow-md transition-shadow">
                    <p className="font-sans text-xs uppercase tracking-widest text-[#b8860b] font-semibold mb-2">
                      Events
                    </p>
                    <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#140e0a]">
                      2000+
                    </h3>
                    <p className="font-sans text-xs text-[#6e5e4f] mt-2">Successful Weddings</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e8d7c3] text-center hover:shadow-md transition-shadow">
                    <p className="font-sans text-xs uppercase tracking-widest text-[#b8860b] font-semibold mb-2">
                      Loyalty
                    </p>
                    <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#140e0a]">
                      98%
                    </h3>
                    <p className="font-sans text-xs text-[#6e5e4f] mt-2">Repeat Customers</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Before / After Compare */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-5xl md:text-6xl text-[hsl(30,20%,15%)] mb-4 font-bold">
              Compare Our Food Styling
            </h2>
            <div className="w-16 h-1 bg-[hsl(43,76%,58%)] mx-auto mb-6" />
            <p className="text-base text-[hsl(30,10%,35%)] max-w-2xl mx-auto font-sans">
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

      {/* What We Do - Services Section (Venus Style) */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
            <p className="font-sans text-xs uppercase tracking-widest text-[#b8860b] font-semibold mb-3">
              Our Services
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#140e0a] mb-6">
              Premium Catering Services
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1 - Wedding */}
            <ScrollReveal delay={0}>
              <motion.div 
                className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -8 }}
              >
                <div className="relative overflow-hidden h-64">
                  <img 
                    src={weddingCateringImage} 
                    alt="Wedding Catering" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140e0a]/80 to-transparent" />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="font-serif text-2xl font-bold text-[#140e0a] mb-3">
                    Wedding Events
                  </h3>
                  <p className="font-sans text-sm text-[#6e5e4f] leading-relaxed">
                    Full-course vegetarian and non-vegetarian buffet spreads designed for elegant guest service and unforgettable celebrations.
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Service Card 2 - Corporate */}
            <ScrollReveal delay={0.1}>
              <motion.div 
                className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -8 }}
              >
                <div className="relative overflow-hidden h-64">
                  <img 
                    src={corporateCateringImage} 
                    alt="Corporate Catering" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140e0a]/80 to-transparent" />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="font-serif text-2xl font-bold text-[#140e0a] mb-3">
                    Corporate Events
                  </h3>
                  <p className="font-sans text-sm text-[#6e5e4f] leading-relaxed">
                    Professional catering for business occasions, milestone celebrations, and corporate gatherings with customized menus.
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Service Card 3 - Birthday/Celebration */}
            <ScrollReveal delay={0.2}>
              <motion.div 
                className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -8 }}
              >
                <div className="relative overflow-hidden h-64">
                  <img 
                    src={privateDinnerImage} 
                    alt="Birthday Catering" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140e0a]/80 to-transparent" />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="font-serif text-2xl font-bold text-[#140e0a] mb-3">
                    Birthday & Private Celebrations
                  </h3>
                  <p className="font-sans text-sm text-[#6e5e4f] leading-relaxed">
                    Make every celebration memorable with our customized menus and attentive service for intimate to large gatherings.
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.3} className="text-center mt-12">
            <Link to="/services">
              <button className="px-10 py-4 text-sm font-medium tracking-widest uppercase bg-[#140e0a] text-white border-2 border-[#140e0a] hover:bg-transparent hover:text-[#140e0a] transition-all duration-300 rounded">
                View All Services
              </button>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Food Gallery Section */}
      <section className="bg-[hsl(45,40%,94%)] py-20 md:py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal className="mb-12 text-center">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#b8860b] font-semibold mb-3">
              Signature Spread
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#140e0a] mb-4">
              A Taste of Every Celebration
            </h2>
            <p className="mx-auto max-w-2xl font-sans text-base leading-relaxed text-[#514a40]">
              From elegant wedding buffets to intimate private dinners, our food presentation is designed to feel warm, premium, and memorable.
            </p>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {foodGalleryItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group overflow-hidden rounded-[1.2rem] border border-[#e7d9c8] bg-white shadow-[0_24px_70px_-40px_rgba(20,14,10,0.45)]"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140e0a]/80 via-[#140e0a]/10 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#fff8ef] backdrop-blur-sm">
                    {item.tag}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-serif text-2xl font-semibold text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="font-sans text-sm leading-relaxed text-[#5f554d]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Why Choose Us Section */}
      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal className="mb-12 text-center">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#b8860b] font-semibold mb-3">
              Why Choose Us
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#140e0a] mb-4">
              Trusted for Celebrations That Matter
            </h2>
            <p className="mx-auto max-w-2xl font-sans text-base leading-relaxed text-[#514a40]">
              A perfect blend of traditional flavors, hygiene-first preparation, and dependable service for weddings, corporate events, and private gatherings.
            </p>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: "Hygienic Preparation",
                description: "Clean kitchens, fresh ingredients, and careful handling for every event.",
              },
              {
                icon: Sparkles,
                title: "Authentic Flavors",
                description: "Classic recipes, rich spice balance, and memorable regional taste.",
              },
              {
                icon: Wallet,
                title: "Affordable Pricing",
                description: "Flexible packages that fit your celebration without compromising quality.",
              },
              {
                icon: Award,
                title: "25+ Years Experience",
                description: "Trusted by generations of families and event hosts across Chennai.",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="rounded-[1.2rem] border border-[#e7d9c8] bg-[hsl(45,40%,97%)] p-6 shadow-[0_20px_60px_-40px_rgba(20,14,10,0.4)]"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#c87b3f]/10 text-[#c87b3f]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-[#140e0a] mb-3">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-[#5f554d]">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Food Section */}
      <section className="py-20 bg-[hsl(43,76%,58%)]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-5xl md:text-6xl text-[hsl(30,20%,15%)] mb-4 font-bold">
              Our Food
            </h2>
            <div className="w-20 h-1 bg-[hsl(30,20%,15%)] mx-auto opacity-50 mb-6" />
            <p className="mx-auto max-w-2xl text-lg text-[hsl(30,18%,20%)] [font-family:'Cormorant_Garamond',serif]">
              Explore how our menus shift from wedding buffet scale to live counters,
              starters, regional classics, and polished dessert service.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <InteractiveSelector
              items={homeFoodSelectorItems}
              className="mx-auto max-w-6xl"
            />
          </motion.div>

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
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-[hsl(30,20%,15%)] font-serif">
                {yearsCounter.count}+
              </div>
              <p className="text-sm text-[hsl(30,10%,45%)] uppercase tracking-wider font-sans mt-2 font-semibold">Years Experience</p>
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
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-[hsl(30,20%,15%)] font-serif">
                {eventsCounter.count.toLocaleString()}+
              </div>
              <p className="text-sm text-[hsl(30,10%,45%)] uppercase tracking-wider font-sans mt-2 font-semibold">Events Served</p>
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
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-[hsl(30,20%,15%)] font-serif">
                {dishesCounter.count}+
              </div>
              <p className="text-sm text-[hsl(30,10%,45%)] uppercase tracking-wider font-sans mt-2 font-semibold">Menu Dishes</p>
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
            <h2 className="font-serif text-5xl md:text-6xl text-[hsl(30,20%,15%)] mb-6 font-bold">
              About Us
            </h2>
            <div className="w-16 h-1 bg-[hsl(43,76%,58%)] mb-8" />

            <p className="text-base text-[hsl(30,10%,35%)] leading-relaxed mb-6 font-sans">
              Rebekha Caterers is one of Chennai's most trusted catering services,
              providing fresh, authentic and delicious food since 1998.
            </p>

            <p className="text-base text-[hsl(30,10%,35%)] leading-relaxed mb-8 font-sans">
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
            <h2 className="font-serif text-5xl md:text-6xl text-[hsl(30,20%,15%)] mb-4 font-bold">
              The Team
            </h2>
            <div className="w-16 h-1 bg-[hsl(43,76%,58%)] mx-auto mb-6" />
            <p className="text-base text-[hsl(30,10%,35%)] mb-8 max-w-xl mx-auto font-sans">
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
            <h2 className="font-serif text-5xl md:text-6xl text-[hsl(30,20%,15%)] mb-4 font-bold">
              Latest Updates
            </h2>
            <div className="w-16 h-1 bg-[hsl(43,76%,58%)] mx-auto mb-6" />
            <p className="text-base text-[hsl(30,10%,35%)] max-w-2xl mx-auto font-sans">
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

      {/* Stories & Reels Section */}
      <section className="relative overflow-hidden bg-[#120d0a] py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(203,161,77,0.18),transparent_40%),linear-gradient(180deg,#160f0b_0%,#0c0907_100%)]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />

        <div className="container relative mx-auto px-6">
          <motion.div
            className="mx-auto mb-14 max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-outliers-sans text-[0.72rem] uppercase tracking-[0.34em] text-[#d9b46b]">
              Stories & Reels
            </p>
            <h2 className="heading-script mt-4 text-5xl text-[#f7efe4] md:text-6xl">
              Creative assets that move with the brand.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#e8d8c7] [font-family:'Cormorant_Garamond',serif]">
              Four campaign posters and three motion reels from the Rebekha Caterers bundle,
              placed here so visitors can see the brand voice and event energy together.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredPosterStories.map((story, index) => (
              <motion.article
                key={story.title}
                className="group"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: index * 0.06 }}
              >
                <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black shadow-[0_28px_80px_-48px_rgba(0,0,0,0.95)]">
                  <img
                    src={story.image}
                    alt={story.alt}
                    className="aspect-[9/16] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="px-1 pt-4">
                  <p className="font-outliers-sans text-[0.68rem] uppercase tracking-[0.3em] text-[#d9b46b]">
                    Poster {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-xl leading-tight text-[#f7efe4] [font-family:'Cormorant_Garamond',serif]">
                    {story.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#d8c5b1]">
                    {story.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {featuredReelStories.map((reel, index) => (
              <motion.article
                key={reel.title}
                className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-3 shadow-[0_28px_80px_-48px_rgba(0,0,0,0.95)] backdrop-blur-sm"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
              >
                <div className="relative overflow-hidden rounded-[1.25rem] bg-black">
                  <video
                    src={reel.video}
                    poster={reel.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="aspect-[9/16] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    aria-label={reel.title}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.46))]" />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[0.62rem] uppercase tracking-[0.28em] text-white/90 backdrop-blur">
                    <Play className="h-3 w-3" />
                    Reel {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
                <div className="px-2 pb-2 pt-4">
                  <h3 className="text-xl leading-tight text-[#f7efe4] [font-family:'Cormorant_Garamond',serif]">
                    {reel.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#d8c5b1]">
                    {reel.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <a
              href="https://www.instagram.com/rebekhacaterers/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <button className="inline-flex w-full items-center justify-center gap-2 border border-[#d9b46b] bg-[#d9b46b] px-8 py-3 text-sm font-medium uppercase tracking-[0.24em] text-[#1a120d] transition-all duration-300 hover:bg-[#c79b39] hover:border-[#c79b39] sm:w-auto">
                <Instagram className="h-4 w-4" />
                Follow on Instagram
              </button>
            </a>
            <Link to="/gallery" className="w-full sm:w-auto">
              <button className="inline-flex w-full items-center justify-center border border-white/18 bg-white/5 px-8 py-3 text-sm font-medium uppercase tracking-[0.24em] text-[#f7efe4] transition-all duration-300 hover:border-[#d9b46b] hover:text-[#d9b46b] sm:w-auto">
                View Gallery
              </button>
            </Link>
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
            <h2 className="font-serif text-5xl md:text-6xl text-[hsl(30,20%,15%)] mb-4 font-bold">
              Testimonials
            </h2>
            <div className="w-16 h-1 bg-[hsl(43,76%,58%)] mx-auto" />
            <p className="mt-5 text-[hsl(30,10%,35%)] max-w-2xl mx-auto font-sans">
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
      <section className="relative overflow-hidden bg-white py-20">
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(203,161,77,0.18),transparent_68%)]" />
        <div className="absolute right-0 top-24 hidden h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(220,188,121,0.14),transparent_68%)] blur-3xl lg:block" />
        <div className="container mx-auto px-6">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-outliers-sans text-[0.72rem] uppercase tracking-[0.32em] text-[hsl(38,70%,45%)]">
                Frequently Asked Questions
              </p>
              <h2 className="heading-script mt-4 text-5xl leading-[0.95] text-[hsl(30,20%,15%)] md:text-6xl">
                Find the right answer before you enquire.
              </h2>
              <div className="line-gold mt-6" />
              <p className="mt-6 max-w-xl text-lg leading-8 text-[hsl(30,10%,35%)] [font-family:'Cormorant_Garamond',serif]">
                We replaced the plain accordion stack with a richer FAQ assistant so visitors can search,
                browse, and narrow in on catering answers faster across wedding, birthday, and corporate events.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="border border-[hsl(40,20%,85%)] bg-[hsl(45,40%,97%)] p-5">
                  <p className="font-outliers-sans text-[0.68rem] uppercase tracking-[0.26em] text-[hsl(38,70%,45%)]">
                    Popular Topics
                  </p>
                  <p className="mt-3 text-3xl text-[hsl(30,20%,15%)] [font-family:'Cormorant_Garamond',serif]">
                    6 key answers
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[hsl(30,10%,45%)]">
                    Booking timelines, menu flexibility, service staff, and Chennai coverage.
                  </p>
                </div>
                <div className="border border-[hsl(40,20%,85%)] bg-[hsl(45,40%,97%)] p-5">
                  <p className="font-outliers-sans text-[0.68rem] uppercase tracking-[0.26em] text-[hsl(38,70%,45%)]">
                    Fast Next Step
                  </p>
                  <p className="mt-3 text-3xl text-[hsl(30,20%,15%)] [font-family:'Cormorant_Garamond',serif]">
                    Custom guidance
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[hsl(30,10%,45%)]">
                    If the answer is not listed, visitors can still ask a more specific question right inside the card.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link to="/faq">
                  <button className="inline-flex items-center justify-center gap-2 border border-[hsl(43,76%,58%)] bg-[hsl(43,76%,58%)] px-8 py-3 text-sm font-medium uppercase tracking-[0.24em] text-[hsl(30,20%,15%)] transition-all duration-300 hover:bg-[hsl(38,70%,45%)]">
                    Explore Full FAQ
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="inline-flex items-center justify-center border border-[hsl(40,20%,85%)] bg-white px-8 py-3 text-sm font-medium uppercase tracking-[0.24em] text-[hsl(30,20%,15%)] transition-all duration-300 hover:border-[hsl(43,76%,58%)] hover:text-[hsl(38,70%,45%)]">
                    Talk to Our Team
                  </button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
            >
              <FAQBlock
                faqs={homeFaqs}
                suggestions={homeFaqs}
                searchPlaceholder="Search catering questions..."
                suggestionsTitle="Start with these quick topics"
                getAiResponse={(question) =>
                  `We do not have a ready-made FAQ for "${question}" yet. Share your event date, guest count, service style, and preferred menu, and our Chennai team will suggest the best next step.`
                }
              />
            </motion.div>
          </div>
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
            <h2 className="font-serif text-5xl md:text-6xl text-[hsl(30,20%,15%)] mb-4 font-bold">
              Enquire
            </h2>
            <div className="w-16 h-1 bg-[hsl(43,76%,58%)] mx-auto mb-6" />
            <p className="text-base text-[hsl(30,10%,35%)] max-w-xl mx-auto font-sans">
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
                <div className="grid md:grid-cols-2 gap-6">
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
                    <label htmlFor="home-date" className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">Event Date</label>
                    <input
                      id="home-date"
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors disabled:opacity-50"
                    />
                  </div>
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

      <div className="fixed bottom-4 right-4 z-[60] flex flex-col gap-3 md:hidden">
        <a
          href="tel:+919445435102"
          className="flex items-center gap-2 rounded-full bg-[#c87b3f] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#c87b3f]/30 transition-transform duration-300 hover:scale-105"
        >
          <Phone className="h-4 w-4" />
          Call Now
        </a>
        <a
          href="https://wa.me/919445435102?text=Hello%20Rebekha%20Catering%2C%20I%20would%20like%20to%20enquire%20about%20your%20services."
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/30 transition-transform duration-300 hover:scale-105"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
};

export default Home;
