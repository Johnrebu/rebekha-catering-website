import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import vegImage from "@/assets/south-indian-veg.jpg";
import nonVegImage from "@/assets/non-veg-feast.jpg";

const Menu = () => {
  const vegMenu = {
    Starters: [
      "Paneer Tikka",
      "Veg Manchurian",
      "Corn Cheese Balls",
      "Samosa Platter",
      "Spring Rolls",
      "Aloo Tikki Chaat",
    ],
    "Main Course - Curries": [
      "Paneer Butter Masala",
      "Dal Makhani",
      "Malai Kofta",
      "Chole Masala",
      "Veg Jalfrezi",
      "Kadai Vegetable",
    ],
    "Rice & Biryanis": [
      "Veg Biryani",
      "Jeera Rice",
      "Pulao Varieties",
      "Lemon Rice",
      "Tomato Rice",
      "Curd Rice",
    ],
    Breads: [
      "Butter Naan",
      "Garlic Naan",
      "Roti / Chapati",
      "Paratha Varieties",
      "Kulcha",
      "Puri",
    ],
    "South Indian": [
      "Idli - Sambar",
      "Dosa Varieties",
      "Vada",
      "Uttapam",
      "Pongal",
      "Upma",
    ],
    Desserts: [
      "Gulab Jamun",
      "Rasmalai",
      "Kheer",
      "Payasam",
      "Kesari",
      "Ice Cream Varieties",
    ],
  };

  const nonVegMenu = {
    Starters: [
      "Chicken 65",
      "Chicken Tikka",
      "Fish Fry",
      "Mutton Seekh Kebab",
      "Prawn Tempura",
      "Egg Pakoda",
    ],
    "Chicken Dishes": [
      "Butter Chicken",
      "Chicken Chettinad",
      "Kadai Chicken",
      "Chicken Korma",
      "Pepper Chicken",
      "Chicken Curry",
    ],
    "Mutton Dishes": [
      "Mutton Rogan Josh",
      "Mutton Curry",
      "Mutton Chukka",
      "Keema Masala",
      "Mutton Korma",
      "Pepper Mutton",
    ],
    "Fish & Seafood": [
      "Fish Curry",
      "Fish Fry (Meen Varuval)",
      "Prawn Masala",
      "Crab Curry",
      "Squid Fry",
      "Fish Moilee",
    ],
    "Egg Dishes": [
      "Egg Curry",
      "Egg Masala",
      "Boiled Egg Gravy",
      "Egg Bhurji",
      "Egg Roast",
    ],
    "Biryanis": [
      "Chicken Biryani",
      "Mutton Biryani",
      "Fish Biryani",
      "Egg Biryani",
      "Prawn Biryani",
      "Mixed Non-Veg Biryani",
    ],
    Desserts: [
      "Gulab Jamun",
      "Rasmalai",
      "Kheer",
      "Payasam",
      "Fruit Custard",
      "Ice Cream",
    ],
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 animate-fade-in">
            Our Menu
          </h1>
          <p className="text-xl text-muted-foreground animate-fade-in">
            Authentic flavors crafted with love and care
          </p>
        </div>
      </section>

      {/* Menu Tabs */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <Tabs defaultValue="veg" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="veg" className="text-lg">
                Vegetarian Menu
              </TabsTrigger>
              <TabsTrigger value="nonveg" className="text-lg">
                Non-Vegetarian Menu
              </TabsTrigger>
            </TabsList>

            <TabsContent value="veg" className="animate-fade-in">
              <div className="mb-12">
                <img
                  src={vegImage}
                  alt="Vegetarian Dishes"
                  className="w-full max-w-3xl mx-auto rounded-lg shadow-warm h-[400px] object-cover"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(vegMenu).map(([category, items]) => (
                  <Card key={category} className="hover:shadow-elegant transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-2xl font-serif text-primary">
                        {category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="nonveg" className="animate-fade-in">
              <div className="mb-12">
                <img
                  src={nonVegImage}
                  alt="Non-Vegetarian Dishes"
                  className="w-full max-w-3xl mx-auto rounded-lg shadow-warm h-[400px] object-cover"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(nonVegMenu).map(([category, items]) => (
                  <Card key={category} className="hover:shadow-elegant transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-2xl font-serif text-primary">
                        {category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Custom Menu CTA */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="bg-gradient-primary text-white p-12 rounded-2xl shadow-warm">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              Want a Custom Menu?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Tell us your preferences, dietary requirements, and event details — we'll create a
              personalized menu just for you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/custom-menu">
                <Button variant="secondary" size="lg">
                  Build My Custom Menu
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                  Talk to Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Notes */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold font-serif mb-6 text-center">
                Important Information
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  • This is a sample menu. Items and availability may vary based on season and
                  location.
                </p>
                <p>
                  • We offer customized menus for all dietary preferences including Jain, vegan,
                  diabetic-friendly, and gluten-free options.
                </p>
                <p>
                  • All dishes are prepared with fresh ingredients and strict hygiene standards.
                </p>
                <p>
                  • Menu packages can be customized based on guest count, budget, and event type.
                </p>
                <p>
                  • Prices vary depending on menu selection, guest count, and service requirements.
                  Contact us for a detailed quote.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Menu;
