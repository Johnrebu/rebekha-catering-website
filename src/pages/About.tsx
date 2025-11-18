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

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 animate-fade-in">
            Our Story
          </h1>
          <p className="text-xl text-muted-foreground italic animate-fade-in">
            A Journey of Love, Tradition, and Authentic Flavors
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-8 text-lg leading-relaxed">
            <p className="text-center text-xl font-semibold text-primary">
              Founded in 1998, Rebekha Catering Services began as a small family venture with a big
              vision: to create exceptional catering experiences that blend traditional flavors with
              modern culinary techniques.
            </p>

            <p>
              Our journey started in a modest kitchen in West Tambaram, where our founders,{" "}
              <span className="font-semibold text-primary">Christopher Durairaj</span> and{" "}
              <span className="font-semibold text-primary">Nancy Navaneetham</span>, began crafting
              their signature dishes using recipes passed down through generations.
            </p>

            <p>
              What began as a passion project in a humble home kitchen quickly evolved into
              something much larger. Their commitment to quality, authentic flavors, and genuine
              hospitality resonated deeply with the community. Word spread quickly about the
              extraordinary food and heartfelt service that made every event feel like a family
              celebration.
            </p>

            <p>
              Over the years, our small family gatherings grew into large community celebrations,
              corporate events, and grand weddings. Through it all, we've remained true to our core
              belief: that food is more than sustenance—it's an expression of love, a celebration of
              culture, and a way to bring people together.
            </p>

            <p>
              Today, more than 25 years later, we continue to serve with the same passion and
              dedication that inspired our founders. Every dish we prepare, every event we cater,
              carries forward the legacy of love and excellence that Christopher and Nancy
              established in 1998.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-8">Our Philosophy</h2>
          <blockquote className="text-2xl md:text-3xl font-serif text-primary italic mb-8">
            "We don't just serve food. We serve love, tradition, and unforgettable memories."
          </blockquote>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-warm transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="pt-8 pb-6">
                  <div className="text-primary mb-4 flex justify-center">{value.icon}</div>
                  <h3 className="font-bold text-lg mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-12 text-center">
            Meet Our Founders
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="w-32 h-32 rounded-full bg-gradient-primary mx-auto mb-6 flex items-center justify-center">
                  <span className="text-4xl text-white font-bold">CD</span>
                </div>
                <h3 className="text-2xl font-bold font-serif mb-2">Christopher Durairaj</h3>
                <p className="text-primary font-semibold mb-4">Co-Founder</p>
                <p className="text-muted-foreground">
                  The visionary behind our authentic recipes and quality standards. Christopher's
                  passion for traditional cooking methods combined with innovative presentation has
                  been the cornerstone of our success.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="w-32 h-32 rounded-full bg-secondary mx-auto mb-6 flex items-center justify-center">
                  <span className="text-4xl text-white font-bold">NN</span>
                </div>
                <h3 className="text-2xl font-bold font-serif mb-2">Nancy Navaneetham</h3>
                <p className="text-primary font-semibold mb-4">Co-Founder</p>
                <p className="text-muted-foreground">
                  The heart of our operations and customer relations. Nancy's attention to detail
                  and commitment to hygiene has set the gold standard for our catering services.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-12 text-center">
            Our Journey
          </h2>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-right">
                <span className="text-2xl font-bold text-primary">1998</span>
              </div>
              <div className="flex-1 border-l-4 border-primary pl-6 pb-8">
                <h3 className="text-xl font-bold mb-2">The Beginning</h3>
                <p className="text-muted-foreground">
                  Started in a small home kitchen with a dream to bring authentic, homemade taste to
                  celebrations
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-right">
                <span className="text-2xl font-bold text-primary">2005</span>
              </div>
              <div className="flex-1 border-l-4 border-primary pl-6 pb-8">
                <h3 className="text-xl font-bold mb-2">Growing Recognition</h3>
                <p className="text-muted-foreground">
                  Expanded services to include corporate events and large-scale weddings
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-right">
                <span className="text-2xl font-bold text-primary">2015</span>
              </div>
              <div className="flex-1 border-l-4 border-primary pl-6 pb-8">
                <h3 className="text-xl font-bold mb-2">Culinary Innovation</h3>
                <p className="text-muted-foreground">
                  Introduced fusion menus and specialized dietary options while maintaining
                  traditional roots
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-right">
                <span className="text-2xl font-bold text-primary">2025</span>
              </div>
              <div className="flex-1 border-l-4 border-primary pl-6">
                <h3 className="text-xl font-bold mb-2">Today & Beyond</h3>
                <p className="text-muted-foreground">
                  Continuing to serve love with over 25 years of experience, thousands of satisfied
                  clients, and a commitment to excellence
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
