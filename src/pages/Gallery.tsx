import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-catering.jpg";
import weddingImage from "@/assets/wedding-catering.jpg";
import birthdayImage from "@/assets/birthday-catering.jpg";
import corporateImage from "@/assets/corporate-catering.jpg";
import privateDinnerImage from "@/assets/private-dinner.jpg";
import vegImage from "@/assets/south-indian-veg.jpg";
import nonVegImage from "@/assets/non-veg-feast.jpg";

const Gallery = () => {
  const galleryImages = [
    { src: heroImage, alt: "Luxurious catering buffet spread", category: "Buffet Setups" },
    { src: weddingImage, alt: "Elegant wedding catering", category: "Weddings" },
    { src: birthdayImage, alt: "Colorful birthday party catering", category: "Birthdays" },
    { src: corporateImage, alt: "Professional corporate event", category: "Corporate Events" },
    { src: privateDinnerImage, alt: "Intimate private dinner", category: "Private Dinners" },
    { src: vegImage, alt: "Traditional South Indian vegetarian meal", category: "Vegetarian" },
    { src: nonVegImage, alt: "Delicious non-vegetarian feast", category: "Non-Vegetarian" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 animate-fade-in">
            Our Gallery
          </h1>
          <p className="text-xl text-muted-foreground animate-fade-in">
            A visual journey through our culinary creations and celebrations
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-elegant hover:shadow-warm transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6">
                    <p className="text-white text-sm font-semibold uppercase tracking-wide mb-1">
                      {image.category}
                    </p>
                    <p className="text-white/90 text-sm">{image.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Highlights */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Event Highlights</h2>
            <p className="text-lg text-muted-foreground">
              Memorable moments from celebrations we've been part of
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card p-8 rounded-lg text-center shadow-elegant">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Weddings Catered</div>
            </div>

            <div className="bg-card p-8 rounded-lg text-center shadow-elegant">
              <div className="text-4xl font-bold text-secondary mb-2">1000+</div>
              <div className="text-muted-foreground">Events Completed</div>
            </div>

            <div className="bg-card p-8 rounded-lg text-center shadow-elegant">
              <div className="text-4xl font-bold text-accent mb-2">50,000+</div>
              <div className="text-muted-foreground">Guests Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Specialties */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              What You'll Experience
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-serif text-primary">Visual Excellence</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Beautifully decorated buffet counters with golden accents</li>
                <li>• Elegant table arrangements with fresh flowers</li>
                <li>• Professional food presentation on premium platters</li>
                <li>• Live cooking stations for select items</li>
                <li>• Traditional banana leaf serving for South Indian meals</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-serif text-primary">Culinary Artistry</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Colorful and aromatic vegetarian spreads</li>
                <li>• Succulent and perfectly spiced non-vegetarian delicacies</li>
                <li>• Authentic regional flavors from across India</li>
                <li>• Fresh ingredients sourced daily</li>
                <li>• Garnished with herbs and edible decorations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">
            Ready to Create Your Own Memories?
          </h2>
          <p className="text-lg mb-8">
            Let us bring the same elegance, taste, and presentation to your next event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-elegant">
                Get Your Quote
              </button>
            </a>
            <a href="tel:+918925477007">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary">
                Call Us Now
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
