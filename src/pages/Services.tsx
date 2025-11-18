import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import weddingImage from "@/assets/wedding-catering.jpg";
import birthdayImage from "@/assets/birthday-catering.jpg";
import corporateImage from "@/assets/corporate-catering.jpg";
import privateDinnerImage from "@/assets/private-dinner.jpg";

const Services = () => {
  const services = [
    {
      image: weddingImage,
      title: "Wedding & Engagement Catering",
      description:
        "Make your special day unforgettable with our exquisite wedding catering services. We handle everything from intimate ceremonies to grand celebrations.",
      features: [
        "Customized wedding menus",
        "Traditional & fusion options",
        "Elegant presentation & setup",
        "Professional service staff",
        "Decoration coordination",
        "Multi-cuisine offerings",
      ],
    },
    {
      image: birthdayImage,
      title: "Birthday Party Catering",
      description:
        "Celebrate life's special moments with delicious food and joyful service. From kids' parties to milestone celebrations, we create memorable experiences.",
      features: [
        "Age-appropriate menus",
        "Theme-based food presentation",
        "Kids-friendly options",
        "Cake & dessert coordination",
        "Party setup assistance",
        "Fun & interactive service",
      ],
    },
    {
      image: corporateImage,
      title: "Corporate & Office Events",
      description:
        "Professional catering for business events, conferences, and office celebrations. We ensure smooth service that lets you focus on your event.",
      features: [
        "Timely & efficient service",
        "Professional presentation",
        "Conference meal packages",
        "Working lunch options",
        "Coffee & snack breaks",
        "Dietary accommodations",
      ],
    },
    {
      image: privateDinnerImage,
      title: "Private Dinners & Family Gatherings",
      description:
        "Intimate dining experiences for your family and close friends. Enjoy restaurant-quality food in the comfort of your home or chosen venue.",
      features: [
        "Intimate dining setups",
        "Chef's special menus",
        "Personalized service",
        "Multi-course meals",
        "Table decoration",
        "Wine pairing suggestions",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 animate-fade-in">
            Our Services
          </h1>
          <p className="text-xl text-muted-foreground animate-fade-in">
            Comprehensive catering solutions for every occasion
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="space-y-20">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <Card className="overflow-hidden shadow-warm h-full">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-[400px] object-cover"
                    />
                  </Card>
                </div>

                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">{service.description}</p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact">
                    <Button variant="hero" size="lg">
                      Get Quote for This Event
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              Additional Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Customized solutions for all your catering needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">Dietary Specializations</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Jain meals (no onion/garlic)</li>
                  <li>• Vegan options</li>
                  <li>• Diabetic-friendly menus</li>
                  <li>• Gluten-free dishes</li>
                  <li>• Allergy-conscious preparation</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">Cuisine Varieties</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• South Indian traditional</li>
                  <li>• North Indian specialties</li>
                  <li>• Continental cuisine</li>
                  <li>• Indo-Chinese fusion</li>
                  <li>• Authentic regional dishes</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">Event Support</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Professional service staff</li>
                  <li>• Buffet setup & decoration</li>
                  <li>• Tableware & cutlery</li>
                  <li>• On-site cooking options</li>
                  <li>• Post-event cleanup</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">
            Ready to Plan Your Event?
          </h2>
          <p className="text-lg mb-8">
            Let's discuss your requirements and create a customized catering experience that
            exceeds your expectations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="secondary" size="lg">
                Contact Us Now
              </Button>
            </Link>
            <Link to="/menu">
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                View Our Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
