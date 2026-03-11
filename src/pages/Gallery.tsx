import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { CalendarDays, ChevronLeft, ChevronRight, Image as ImageIcon, Quote, X } from "lucide-react";

type EventType = "All" | "Weddings" | "Birthdays" | "Corporate" | "Housewarming" | "Private Dining";

interface GalleryPhoto {
  id: number;
  src: string;
  alt: string;
  eventType: Exclude<EventType, "All">;
  eventDate: string;
  caption: string;
  feedback: string;
  location: string;
}

const galleryPhotos: GalleryPhoto[] = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/2306277/pexels-photo-2306277.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Wedding buffet setup with floral decor",
    eventType: "Weddings",
    eventDate: "2026-02-21",
    caption: "Grand wedding buffet with live counters for 800 guests",
    feedback: "The spread was elegant and service timing was perfect throughout the evening.",
    location: "Tambaram, Chennai",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Birthday dessert and snacks counter",
    eventType: "Birthdays",
    eventDate: "2026-01-30",
    caption: "Colorful birthday menu with dessert and chaat stations",
    feedback: "Kids loved the menu variety and the setup looked amazing in photos.",
    location: "Chromepet, Chennai",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Corporate lunch buffet in conference venue",
    eventType: "Corporate",
    eventDate: "2026-02-08",
    caption: "Corporate annual day lunch for 450 attendees",
    feedback: "Professional team and smooth crowd handling during peak lunch time.",
    location: "OMR, Chennai",
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "South Indian lunch service",
    eventType: "Housewarming",
    eventDate: "2026-01-14",
    caption: "Traditional South Indian lunch service for housewarming event",
    feedback: "Authentic taste and very hygienic service. Guests were very happy.",
    location: "Pallikaranai, Chennai",
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Private dinner table arrangement with premium plating",
    eventType: "Private Dining",
    eventDate: "2025-12-27",
    caption: "Premium plated dinner experience for a family celebration",
    feedback: "Menu customization was done exactly to our preferences.",
    location: "Adyar, Chennai",
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Biryani station in wedding reception",
    eventType: "Weddings",
    eventDate: "2026-02-03",
    caption: "Live biryani counter as part of wedding dinner menu",
    feedback: "Flavor and aroma were outstanding. The biryani counter was the highlight.",
    location: "Porur, Chennai",
  },
  {
    id: 7,
    src: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Breakfast spread for corporate training event",
    eventType: "Corporate",
    eventDate: "2025-12-19",
    caption: "Breakfast and tea break menu for corporate training day",
    feedback: "Punctual service and good variety for all dietary preferences.",
    location: "Guindy, Chennai",
  },
  {
    id: 8,
    src: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Dosa and tiffin station",
    eventType: "Housewarming",
    eventDate: "2026-02-16",
    caption: "Live tiffin and dosa station for morning function",
    feedback: "Freshly made items and great support from the serving team.",
    location: "Velachery, Chennai",
  },
  {
    id: 9,
    src: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Non-veg starters platter",
    eventType: "Birthdays",
    eventDate: "2026-01-22",
    caption: "Special non-veg starters counter for evening birthday event",
    feedback: "The starters were served hot and tasted excellent.",
    location: "Medavakkam, Chennai",
  },
  {
    id: 10,
    src: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Formal plated dinner service",
    eventType: "Private Dining",
    eventDate: "2026-02-12",
    caption: "Curated plated dinner for anniversary celebration",
    feedback: "Beautiful plating and highly attentive staff from start to finish.",
    location: "Anna Nagar, Chennai",
  },
  {
    id: 11,
    src: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Dessert counter with sweets and ice cream",
    eventType: "Weddings",
    eventDate: "2026-01-18",
    caption: "Wedding dessert bar with traditional and modern sweets",
    feedback: "Dessert quality and presentation were top class.",
    location: "Mylapore, Chennai",
  },
  {
    id: 12,
    src: "https://images.pexels.com/photos/9609838/pexels-photo-9609838.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Paneer starters in buffet line",
    eventType: "Corporate",
    eventDate: "2026-02-26",
    caption: "Vegetarian starter bar for product launch event",
    feedback: "Great veg choices and smooth buffet flow even during rush hour.",
    location: "Nungambakkam, Chennai",
  },
];

const eventFilters: EventType[] = ["All", "Weddings", "Birthdays", "Corporate", "Housewarming", "Private Dining"];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState<EventType>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredPhotos = useMemo(() => {
    if (activeFilter === "All") return galleryPhotos;
    return galleryPhotos.filter((photo) => photo.eventType === activeFilter);
  }, [activeFilter]);

  const openPhoto = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const showPrev = () => setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + filteredPhotos.length) % filteredPhotos.length));
  const showNext = () => setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % filteredPhotos.length));

  const selectedPhoto = selectedIndex !== null ? filteredPhotos[selectedIndex] : null;

  return (
    <div className="min-h-screen bg-[hsl(45,40%,94%)]">
      <SEO
        title="Event Photo Gallery - Weddings, Birthdays, Corporate | Rebekha Catering"
        description="Browse Rebekha Catering event gallery with real photos, event filters, dates, captions, and client feedback from weddings, birthdays, corporate, and private functions in Chennai."
        keywords="catering gallery Chennai, wedding catering photos, birthday event catering photos, corporate catering gallery, catering lightbox gallery"
        canonical="https://rebekhacaterers.online/gallery"
        ogUrl="https://rebekhacaterers.online/gallery"
      />
      <StructuredData />
      <Navigation />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920')",
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
            Gallery
          </h1>
          <p className="text-xl font-light tracking-wide">
            Real event moments from our catering service in Chennai
          </p>
        </motion.div>
      </section>

      {/* Filters + count */}
      <section className="py-10 bg-white border-b border-[hsl(40,20%,85%)]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-4xl text-[hsl(30,20%,15%)] mb-2" style={{ fontFamily: "'Great Vibes', cursive" }}>
                Our Creations
              </h2>
              <p className="text-sm text-[hsl(30,10%,45%)] flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Showing {filteredPhotos.length} photo{filteredPhotos.length !== 1 ? "s" : ""} {activeFilter !== "All" ? `in ${activeFilter}` : "across all events"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {eventFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setSelectedIndex(null);
                  }}
                  className={`px-4 py-2 text-xs uppercase tracking-widest border transition-colors ${
                    activeFilter === filter
                      ? "bg-[hsl(43,76%,58%)] border-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)]"
                      : "border-[hsl(40,20%,80%)] text-[hsl(30,10%,40%)] hover:border-[hsl(43,76%,58%)]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-14 bg-[hsl(45,40%,94%)]">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo, index) => (
              <motion.article
                key={photo.id}
                className="bg-white overflow-hidden border border-[hsl(40,20%,85%)] group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                onClick={() => openPhoto(index)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 text-[10px] uppercase tracking-wider bg-black/60 text-white">
                    {photo.eventType}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg text-[hsl(30,20%,15%)] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {photo.caption}
                  </h3>
                  <p className="text-xs text-[hsl(30,10%,45%)] mb-3 flex items-center gap-2">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {new Date(photo.eventDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} • {photo.location}
                  </p>
                  <p className="text-sm text-[hsl(30,10%,35%)] leading-relaxed flex items-start gap-2">
                    <Quote className="h-4 w-4 mt-0.5 text-[hsl(43,76%,58%)] flex-shrink-0" />
                    {photo.feedback}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 p-4 md:p-8 flex items-center justify-center" onClick={closeLightbox}>
          <button
            className="absolute top-4 right-4 text-white hover:text-[hsl(43,76%,58%)] transition-colors"
            onClick={closeLightbox}
            aria-label="Close gallery modal"
          >
            <X className="h-8 w-8" />
          </button>

          {filteredPhotos.length > 1 && (
            <>
              <button
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-white hover:text-[hsl(43,76%,58%)] transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-9 w-9" />
              </button>
              <button
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-white hover:text-[hsl(43,76%,58%)] transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next photo"
              >
                <ChevronRight className="h-9 w-9" />
              </button>
            </>
          )}

          <div
            className="max-w-5xl w-full bg-[hsl(30,20%,12%)] text-white border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedPhoto.src} alt={selectedPhoto.alt} className="w-full max-h-[68vh] object-contain bg-black" />
            <div className="p-5">
              <p className="text-xs uppercase tracking-wider text-[hsl(43,76%,58%)] mb-2">
                {selectedPhoto.eventType} • {selectedIndex !== null ? selectedIndex + 1 : 1} / {filteredPhotos.length}
              </p>
              <h3 className="text-xl mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {selectedPhoto.caption}
              </h3>
              <p className="text-sm text-white/80 mb-3">
                {new Date(selectedPhoto.eventDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} • {selectedPhoto.location}
              </p>
              <p className="text-sm text-white/90">{selectedPhoto.feedback}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
