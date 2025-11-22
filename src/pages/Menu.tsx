import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Drumstick, Sparkles } from "lucide-react";
import vegImage from "@/assets/south-indian-veg.jpg";
import nonVegImage from "@/assets/non-veg-feast.jpg";

const Menu = () => {
  const vegMenuWithImages = {
    Starters: {
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80",
      items: [
        "Paneer Tikka",
        "Veg Manchurian",
        "Corn Cheese Balls",
        "Samosa Platter",
        "Spring Rolls",
        "Aloo Tikki Chaat",
      ],
    },
    "Main Course - Curries": {
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
      items: [
        "Paneer Butter Masala",
        "Dal Makhani",
        "Malai Kofta",
        "Chole Masala",
        "Veg Jalfrezi",
        "Kadai Vegetable",
      ],
    },
    "Rice & Biryanis": {
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
      items: [
        "Veg Biryani",
        "Jeera Rice",
        "Pulao Varieties",
        "Lemon Rice",
        "Tomato Rice",
        "Curd Rice",
      ],
    },
    Breads: {
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80",
      items: [
        "Butter Naan",
        "Garlic Naan",
        "Roti / Chapati",
        "Paratha Varieties",
        "Kulcha",
        "Puri",
      ],
    },
    "South Indian": {
      image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&q=80",
      items: [
        "Idli - Sambar",
        "Dosa Varieties",
        "Vada",
        "Uttapam",
        "Pongal",
        "Upma",
      ],
    },
    Desserts: {
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80",
      items: [
        "Gulab Jamun",
        "Rasmalai",
        "Kheer",
        "Payasam",
        "Kesari",
        "Ice Cream Varieties",
      ],
    },
  };

  const nonVegMenuWithImages = {
    Starters: {
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80",
      items: [
        "Chicken 65",
        "Chicken Tikka",
        "Fish Fry",
        "Mutton Seekh Kebab",
        "Prawn Tempura",
        "Egg Pakoda",
      ],
    },
    "Chicken Dishes": {
      image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=600&q=80",
      items: [
        "Butter Chicken",
        "Chicken Chettinad",
        "Kadai Chicken",
        "Chicken Korma",
        "Pepper Chicken",
        "Chicken Curry",
      ],
    },
    "Mutton Dishes": {
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80",
      items: [
        "Mutton Rogan Josh",
        "Mutton Curry",
        "Mutton Chukka",
        "Keema Masala",
        "Mutton Korma",
        "Pepper Mutton",
      ],
    },
    "Fish & Seafood": {
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=80",
      items: [
        "Fish Curry",
        "Fish Fry (Meen Varuval)",
        "Prawn Masala",
        "Crab Curry",
        "Squid Fry",
        "Fish Moilee",
      ],
    },
    "Egg Dishes": {
      image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=600&q=80",
      items: [
        "Egg Curry",
        "Egg Masala",
        "Boiled Egg Gravy",
        "Egg Bhurji",
        "Egg Roast",
      ],
    },
    Biryanis: {
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
      items: [
        "Chicken Biryani",
        "Mutton Biryani",
        "Fish Biryani",
        "Egg Biryani",
        "Prawn Biryani",
        "Mixed Non-Veg Biryani",
      ],
    },
    Desserts: {
      image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80",
      items: [
        "Gulab Jamun",
        "Rasmalai",
        "Kheer",
        "Payasam",
        "Fruit Custard",
        "Ice Cream",
      ],
    },
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section with Background */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80" 
            alt="Delicious food spread" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
        </div>
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 animate-fade-in text-white">
            Our Menu
          </h1>
          <p className="text-xl text-amber-100 animate-fade-in">
            Authentic flavors crafted with love and care
          </p>
        </div>
      </section>

      {/* Menu Tabs */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <Tabs defaultValue="veg" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 h-14 bg-gradient-to-r from-red-950/20 to-amber-950/20 p-1">
              <TabsTrigger 
                value="veg" 
                className="text-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-700 data-[state=active]:text-white flex items-center gap-2"
              >
                <Leaf className="h-5 w-5" />
                Vegetarian
              </TabsTrigger>
              <TabsTrigger 
                value="nonveg" 
                className="text-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-700 data-[state=active]:to-amber-600 data-[state=active]:text-white flex items-center gap-2"
              >
                <Drumstick className="h-5 w-5" />
                Non-Vegetarian
              </TabsTrigger>
            </TabsList>

            {/* Vegetarian Tab */}
            <TabsContent value="veg" className="animate-fade-in">
              {/* Main Hero Image */}
              <div className="mb-12 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl opacity-50 blur transition-all duration-300 group-hover:opacity-100"></div>
                <img
                  src={vegImage}
                  alt="Vegetarian Dishes"
                  className="relative w-full max-w-4xl mx-auto rounded-2xl shadow-2xl h-[500px] object-cover"
                />
              </div>

              {/* Category Cards with Images */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(vegMenuWithImages).map(([category, data]) => (
                  <Card key={category} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-green-200">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={data.image} 
                        alt={category}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <h3 className="absolute bottom-4 left-4 right-4 text-2xl font-serif font-bold text-white">
                        {category}
                      </h3>
                    </div>
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        {data.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex-shrink-0"></div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Non-Vegetarian Tab */}
            <TabsContent value="nonveg" className="animate-fade-in">
              {/* Main Hero Image */}
              <div className="mb-12 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-700 to-amber-600 rounded-2xl opacity-50 blur transition-all duration-300 group-hover:opacity-100"></div>
                <img
                  src={nonVegImage}
                  alt="Non-Vegetarian Dishes"
                  className="relative w-full max-w-4xl mx-auto rounded-2xl shadow-2xl h-[500px] object-cover"
                />
              </div>

              {/* Category Cards with Images */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(nonVegMenuWithImages).map(([category, data]) => (
                  <Card key={category} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-red-200">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={data.image} 
                        alt={category}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <h3 className="absolute bottom-4 left-4 right-4 text-2xl font-serif font-bold text-white">
                        {category}
                      </h3>
                    </div>
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        {data.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-700 to-amber-600 flex-shrink-0"></div>
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
      <section className="py-20 bg-gradient-to-b from-red-950 via-amber-950 to-red-950 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Sparkles className="h-16 w-16 mx-auto mb-6 text-amber-300" />
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 bg-gradient-to-r from-amber-200 to-yellow-300 bg-clip-text text-transparent">
            Want a Custom Menu?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-amber-100">
            Tell us your preferences, dietary requirements, and event details — we'll create a
            personalized menu just for you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-amber-400 text-amber-950 font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-yellow-500/60 border-2 border-yellow-400/50">
                Build My Custom Menu
              </button>
            </Link>
            <Link to="/contact">
              <button className="px-8 py-4 rounded-full bg-transparent border-2 border-amber-300 text-amber-100 font-semibold text-lg transition-all duration-300 hover:scale-105 hover:bg-amber-100/10 hover:border-amber-200">
                Talk to Our Team
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Menu Notes */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="border-amber-200 shadow-xl">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold font-serif mb-6 text-center bg-gradient-to-r from-red-700 to-amber-600 bg-clip-text text-transparent">
                Important Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-red-700 to-amber-600 flex items-center justify-center text-white text-xs font-bold mt-0.5">
                    1
                  </div>
                  <p className="text-sm">
                    This is a sample menu. Items and availability may vary based on season and location.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-red-700 to-amber-600 flex items-center justify-center text-white text-xs font-bold mt-0.5">
                    2
                  </div>
                  <p className="text-sm">
                    We offer customized menus for all dietary preferences including Jain, vegan, diabetic-friendly, and gluten-free options.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-red-700 to-amber-600 flex items-center justify-center text-white text-xs font-bold mt-0.5">
                    3
                  </div>
                  <p className="text-sm">
                    All dishes are prepared with fresh ingredients and strict hygiene standards.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-red-700 to-amb-600 flex items-center justify-center text-white text-xs font-bold mt-0.5">
                    4
                  </div>
                  <p className="text-sm">
                    Menu packages can be customized based on guest count, budget, and event type.
                  </p>
                </div>
                <div className="flex items-start gap-3 md:col-span-2">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-red-700 to-amber-600 flex items-center justify-center text-white text-xs font-bold mt-0.5">
                    5
                  </div>
                  <p className="text-sm">
                    Prices vary depending on menu selection, guest count, and service requirements. Contact us for a detailed quote.
                  </p>
                </div>
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
