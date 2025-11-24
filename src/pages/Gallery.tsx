import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Gallery = () => {
  const galleryImages = [
    { 
      src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80", 
      alt: "Traditional Indian wedding buffet with golden decorations", 
      category: "Wedding Catering" 
    },
    { 
      src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80", 
      alt: "Colorful Indian food spread with curries and rice", 
      category: "Buffet Setups" 
    },
    { 
      src: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&q=80", 
      alt: "Authentic South Indian vegetarian thali on banana leaf", 
      category: "Vegetarian" 
    },
    { 
      src: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80", 
      alt: "Delicious biryani with raita and garnishing", 
      category: "Non-Vegetarian" 
    },
    { 
      src: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80", 
      alt: "Colorful Indian sweets and desserts platter", 
      category: "Desserts" 
    },
    { 
      src: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80", 
      alt: "Tandoori chicken with naan bread", 
      category: "Non-Vegetarian" 
    },
    { 
      src: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80", 
      alt: "Elegant corporate event buffet setup", 
      category: "Corporate Events" 
    },
    { 
      src: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=800&q=80", 
      alt: "Beautiful wedding reception dining setup", 
      category: "Weddings" 
    },
    { 
      src: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80", 
      alt: "Variety of Indian curries in serving bowls", 
      category: "Vegetarian" 
    },
    { 
      src: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=800&q=80", 
      alt: "Festive birthday party catering setup", 
      category: "Birthdays" 
    },
   
    { 
      src: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80", 
      alt: "Intimate private dinner table setting", 
      category: "Private Dinners" 
    },
    { 
      src: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80", 
      alt: "Golden gulab jamun dessert in syrup", 
      category: "Desserts" 
    },
    { 
      src: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80", 
      alt: "Crispy orange jalebi swirls", 
      category: "Desserts" 
    },
 
    { 
      src: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80", 
      alt: "Colorful kulfi ice cream dessert", 
      category: "Desserts" 
    },
  
    { 
      src: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=800&q=80", 
      alt: "Rasmalai dessert in creamy sauce", 
      category: "Desserts" 
    },

    { 
      src: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80", 
      alt: "Colorful ladoo sweets platter", 
      category: "Desserts" 
    },
    { 
      src: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80", 
      alt: "Grilled kebab platter with mint chutney", 
      category: "Non-Vegetarian" 
    },
    { 
      src: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=800&q=80", 
      alt: "Kaju barfi cashew dessert", 
      category: "Desserts" 
    },
    { 
      src: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80", 
      alt: "Grand buffet display at wedding", 
      category: "Wedding Catering" 
    },
    { 
      src: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80", 
      alt: "Chicken biryani with garnish and raita", 
      category: "Non-Vegetarian" 
    },
    { 
      src: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&q=80", 
      alt: "Mango kulfi Indian ice cream on stick", 
      category: "Ice Cream & Desserts" 
    },
    { 
      src: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80", 
      alt: "Colorful ice cream sundae with toppings", 
      category: "Ice Cream & Desserts" 
    },
    { 
      src: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&q=80", 
      alt: "Assorted gelato ice cream flavors", 
      category: "Ice Cream & Desserts" 
    },
    { 
      src: "https://images.unsplash.com/photo-1560008581-09b62139bbbb?w=800&q=80", 
      alt: "Delicious ice cream scoops in cones", 
      category: "Ice Cream & Desserts" 
    },
    { 
      src: "https://images.unsplash.com/photo-1582143495604-cdbb37e29371?w=800&q=80", 
      alt: "Traditional pistachio kulfi dessert", 
      category: "Ice Cream & Desserts" 
    },
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
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-elegant magic-hover">
                Get Your Quote
              </button>
            </a>
            <a href="tel:+918925477007">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary magic-hover">
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

