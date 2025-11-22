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
                <img 
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80" 
                  alt="Kitchen team preparing food" 
                  className="relative rounded-2xl shadow-2xl w-full h-96 object-cover"
                />
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

          <div className="grid md:grid-cols-2 gap-12">
            <Card className="overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="h-64 bg-gradient-to-br from-red-700 to-amber-600 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=600&q=80')] bg-cover bg-center opacity-20"></div>
                <div className="relative z-10 text-center text-white">
                  <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm mx-auto mb-4 flex items-center justify-center border-4 border-white/30">
                    <span className="text-6xl font-bold">CD</span>
                  </div>
                </div>
              </div>
              <CardContent className="pt-6 text-center">
                <h3 className="text-2xl font-bold font-serif mb-2">Christopher Durairaj</h3>
                <p className="text-amber-700 font-semibold mb-4">Co-Founder</p>
                <p className="text-muted-foreground">
                  The visionary behind our authentic recipes and quality standards. Christopher's passion for traditional cooking methods combined with innovative presentation has been the cornerstone of our success.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="h-64 bg-gradient-to-br from-amber-600 to-yellow-500 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542042161784-26ab9e041e89?w=600&q=80')] bg-cover bg-center opacity-20"></div>
                <div className="relative z-10 text-center text-white">
                  <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm mx-auto mb-4 flex items-center justify-center border-4 border-white/30">
                    <span className="text-6xl font-bold">NN</span>
                  </div>
                </div>
              </div>
              <CardContent className="pt-6 text-center">
                <h3 className="text-2xl font-bold font-serif mb-2">Nancy Navaneetham</h3>
                <p className="text-amber-700 font-semibold mb-4">Co-Founder</p>
                <p className="text-muted-foreground">
                  The heart of our operations and customer relations. Nancy's attention to detail and commitment to hygiene has set the gold standard for our catering services.
                </p>
              </CardContent>
            </Card>
          </div>
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
