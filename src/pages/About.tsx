import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Utensils, Award, Shield, Sparkles } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Heart className="h-10 w-10" />,
      title: "Family Legacy",
      description: "Family-driven legacy of taste and tradition spanning over 25 years",
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Hygienic Standards",
      description: "Strict hygiene protocols and fresh, quality ingredients in every dish",
    },
    {
      icon: <Utensils className="h-10 w-10" />,
      title: "Veg & Non-Veg",
      description: "Comprehensive menu options for all dietary preferences and needs",
    },
    {
      icon: <Sparkles className="h-10 w-10" />,
      title: "Custom Menus",
      description: "Personalized menu creation for your unique event requirements",
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: "Professional Team",
      description: "Experienced staff ensuring flawless execution and presentation",
    },
    {
      icon: <Award className="h-10 w-10" />,
      title: "Excellence",
      description: "Committed to exceeding expectations in every catering experience",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section with Background Image */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80" 
            alt="Catering preparation" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
        </div>
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 animate-fade-in text-white">
            Our Story
          </h1>
          <p className="text-xl text-amber-100 italic animate-fade-in">
            A Journey of Love, Tradition, and Authentic Flavors
          </p>
        </div>
      </section>

      {/* Story Section with Image */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="space-y-6 text-lg leading-relaxed">
                <p className="text-xl font-semibold bg-gradient-to-r from-red-700 to-amber-600 bg-clip-text text-transparent">
                  Founded in 1998, Rebekha Catering Services began as a small family venture with a big vision: to create exceptional catering experiences that blend traditional flavors with modern culinary techniques.
                </p>

                <p>
                  Our journey started in a modest kitchen in West Tambaram, where our founders,{" "}
                  <span className="font-semibold text-amber-700">Christopher Durairaj</span> and{" "}
                  <span className="font-semibold text-amber-700">Nancy Navaneetham</span>, began crafting their signature dishes using recipes passed down through generations.
                </p>

                <p>
                  What began as a passion project quickly evolved into something much larger. Their commitment to quality, authentic flavors, and genuine hospitality resonated deeply with the community.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-700 to-amber-600 rounded-2xl opacity-50 blur transition-all duration-300 group-hover:opacity-100"></div>
                <div className="relative rounded-2xl shadow-2xl overflow-hidden">
                  <img 
                    src="/founders.jpg" 
                    alt="Our Founders - Christopher Durairaj & Nancy Navaneetham with grandchild" 
                    className="relative rounded-2xl w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                    <p className="text-white font-semibold text-lg">Our Founders</p>
                    <p className="text-amber-200 text-sm">Christopher Durairaj & Nancy Navaneetham</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-gradient-to-b from-red-950 via-amber-950 to-red-950 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-8 bg-gradient-to-r from-amber-200 to-yellow-300 bg-clip-text text-transparent">Our Philosophy</h2>
          <blockquote className="text-2xl md:text-3xl font-serif text-amber-100 italic mb-12">
            "We don't just serve food. We serve love, tradition, and unforgettable memories."
          </blockquote>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center bg-white/10 backdrop-blur-sm border-amber-500/30 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="pt-8 pb-6">
                  <div className="text-amber-300 mb-4 flex justify-center">{value.icon}</div>
                  <h3 className="font-bold text-lg mb-3 text-white">{value.title}</h3>
                  <p className="text-sm text-amber-100">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section with Images */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-12 text-center">
            Meet Our Founders
          </h2>

          {/* Single Founders Card with Photo */}
          <div className="max-w-3xl mx-auto">
            <Card className="overflow-hidden hover:shadow-2xl transition-shadow border-0 shadow-xl">
              <div className="relative">
                {/* Decorative top border */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 z-10"></div>
                
                <div className="md:flex">
                  {/* Image Side */}
                  <div className="md:w-1/2 relative">
                    <img 
                      src="/founders.jpg" 
                      alt="Our Founders - Christopher Durairaj & Nancy Navaneetham" 
                      className="w-full h-full object-cover min-h-[400px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/20"></div>
                  </div>
                  
                  {/* Content Side */}
                  <div className="md:w-1/2 p-8 flex flex-col justify-center bg-gradient-to-br from-amber-50 to-white">
                    <div className="space-y-6">
                      {/* Founders Names */}
                      <div>
                        <h3 className="text-2xl font-bold font-serif text-gray-900 mb-1">Christopher Durairaj</h3>
                        <p className="text-amber-700 font-semibold">Co-Founder & Head Chef</p>
                      </div>
                      
                      <div className="w-16 h-0.5 bg-gradient-to-r from-red-700 to-amber-600"></div>
                      
                      <div>
                        <h3 className="text-2xl font-bold font-serif text-gray-900 mb-1">Nancy Navaneetham</h3>
                        <p className="text-amber-700 font-semibold">Co-Founder & Operations Head</p>
                      </div>
                      
                      <div className="w-16 h-0.5 bg-gradient-to-r from-red-700 to-amber-600"></div>
                      
                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed">
                        Together, they have built Rebekha Catering Services from a humble home kitchen 
                        into one of Chennai's most trusted catering brands. Their passion for authentic 
                        flavors and commitment to quality has served over 10,000+ happy events.
                      </p>
                      
                      {/* Badge */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-700 to-amber-600 text-white rounded-full text-sm font-semibold">
                        <Award className="h-4 w-4" />
                        <span>Serving Love Since 1998</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Visiting Card Section */}
      <section className="py-16 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-serif mb-3 bg-gradient-to-r from-red-700 to-amber-600 bg-clip-text text-transparent">
              Connect With Us
            </h2>
            <p className="text-muted-foreground">
              Save our contact details for easy reference
            </p>
          </div>
          
          <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 max-w-2xl mx-auto">
            <CardContent className="p-6 bg-gradient-to-br from-white to-amber-50/20">
              <div className="relative group">
                <img 
                  src="/visiting-card.jpg" 
                  alt="Rebekha Caterers Contact Card" 
                  className="w-full h-auto rounded-lg shadow-lg group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
              
              <div className="mt-4 text-center">
                <a 
                  href="/visiting-card.jpg" 
                  download="Rebekha-Caterers-Card.jpg"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-700 to-amber-600 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 hover:shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Card
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Journey Timeline with Images */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-12 text-center">
            Our Journey
          </h2>

          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/4 text-center md:text-right">
                <span className="text-4xl font-bold bg-gradient-to-r from-red-700 to-amber-600 bg-clip-text text-transparent">1998</span>
              </div>
              <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&q=80" 
                  alt="1998 beginning" 
                  className="rounded-xl shadow-lg w-full h-48 object-cover"
                />
              </div>
              <div className="md:w-2/5">
                <h3 className="text-2xl font-bold mb-2">The Beginning</h3>
                <p className="text-muted-foreground">
                  Started in a small home kitchen with a dream to bring authentic, homemade taste to celebrations
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse gap-6 items-center">
              <div className="md:w-1/4 text-center md:text-left">
                <span className="text-4xl font-bold bg-gradient-to-r from-red-700 to-amber-600 bg-clip-text text-transparent">2005</span>
              </div>
              <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80" 
                  alt="2005 growth" 
                  className="rounded-xl shadow-lg w-full h-48 object-cover"
                />
              </div>
              <div className="md:w-2/5">
                <h3 className="text-2xl font-bold mb-2">Growing Recognition</h3>
                <p className="text-muted-foreground">
                  Expanded services to include corporate events and large-scale weddings
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/4 text-center md:text-right">
                <span className="text-4xl font-bold bg-gradient-to-r from-red-700 to-amber-600 bg-clip-text text-transparent">2015</span>
              </div>
              <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80" 
                  alt="2015 innovation" 
                  className="rounded-xl shadow-lg w-full h-48 object-cover"
                />
              </div>
              <div className="md:w-2/5">
                <h3 className="text-2xl font-bold mb-2">Culinary Innovation</h3>
                <p className="text-muted-foreground">
                  Introduced fusion menus and specialized dietary options while maintaining traditional roots
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse gap-6 items-center">
              <div className="md:w-1/4 text-center md:text-left">
                <span className="text-4xl font-bold bg-gradient-to-r from-red-700 to-amber-600 bg-clip-text text-transparent">2025</span>
              </div>
              <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80" 
                  alt="2025 today" 
                  className="rounded-xl shadow-lg w-full h-48 object-cover"
                />
              </div>
              <div className="md:w-2/5">
                <h3 className="text-2xl font-bold mb-2">Today & Beyond</h3>
                <p className="text-muted-foreground">
                  Continuing to serve love with over 25 years of experience, thousands of satisfied clients, and a commitment to excellence
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

