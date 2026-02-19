import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Leaf, Drumstick } from "lucide-react";

const Menu = () => {
  const [activeTab, setActiveTab] = useState<'veg' | 'nonveg'>('veg');

  const vegMenu = {
    "Starters": [
      "Paneer Tikka", "Veg Manchurian", "Corn Cheese Balls",
      "Samosa Platter", "Spring Rolls", "Aloo Tikki Chaat"
    ],
    "Main Course": [
      "Paneer Butter Masala", "Dal Makhani", "Malai Kofta",
      "Chole Masala", "Veg Jalfrezi", "Kadai Vegetable"
    ],
    "Rice & Biryanis": [
      "Veg Biryani", "Jeera Rice", "Pulao Varieties",
      "Lemon Rice", "Tomato Rice", "Curd Rice"
    ],
    "Breads": [
      "Butter Naan", "Garlic Naan", "Roti / Chapati",
      "Paratha Varieties", "Kulcha", "Puri"
    ],
    "South Indian": [
      "Idli - Sambar", "Dosa Varieties", "Vada",
      "Uttapam", "Pongal", "Upma"
    ],
    "Desserts": [
      "Gulab Jamun", "Rasmalai", "Kheer",
      "Payasam", "Kesari", "Ice Cream"
    ],
  };

  const nonVegMenu = {
    "Starters": [
      "Chicken 65", "Chicken Tikka", "Fish Fry",
      "Mutton Seekh Kebab", "Prawn Tempura", "Egg Pakoda"
    ],
    "Chicken Dishes": [
      "Butter Chicken", "Chicken Chettinad", "Kadai Chicken",
      "Chicken Korma", "Pepper Chicken", "Chicken Curry"
    ],
    "Mutton Dishes": [
      "Mutton Rogan Josh", "Mutton Curry", "Mutton Chukka",
      "Keema Masala", "Mutton Korma", "Pepper Mutton"
    ],
    "Fish & Seafood": [
      "Fish Curry", "Fish Fry", "Prawn Masala",
      "Crab Curry", "Squid Fry", "Fish Moilee"
    ],
    "Biryanis": [
      "Chicken Biryani", "Mutton Biryani", "Fish Biryani",
      "Egg Biryani", "Prawn Biryani", "Mixed Non-Veg"
    ],
    "Desserts": [
      "Gulab Jamun", "Rasmalai", "Kheer",
      "Payasam", "Fruit Custard", "Ice Cream"
    ],
  };

  const menuImages = [
    "https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/9609838/pexels-photo-9609838.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/666988/pexels-photo-666988.jpeg?auto=compress&cs=tinysrgb&w=400",
  ];

  const currentMenu = activeTab === 'veg' ? vegMenu : nonVegMenu;

  return (
    <div className="min-h-screen bg-[hsl(45,40%,94%)]">
      <SEO 
        title="Catering Menu - Vegetarian & Non-Vegetarian Options | Rebekha Catering"
        description="Explore our authentic Indian catering menu. Vegetarian and non-vegetarian dishes, customized menus available. From wedding feasts to corporate lunches."
        keywords="catering menu Chennai, vegetarian catering menu, non-veg catering options, Indian catering menu, custom catering menu"
      />
      <StructuredData />
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1920')`
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
            Our Food
          </h1>
          <p className="text-xl font-light tracking-wide">
            Authentic flavors crafted with love and care
          </p>
        </motion.div>
      </section>

      {/* Food Gallery Grid */}
      <section className="py-16 bg-[hsl(43,76%,58%)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
            {menuImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden aspect-square group cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <img
                  src={image}
                  alt={`Dish ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Tabs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl text-[hsl(30,20%,15%)] mb-6" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Menu
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto mb-8" />

            {/* Tab Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setActiveTab('veg')}
                className={`px-8 py-3 text-sm font-medium tracking-wider uppercase flex items-center gap-2 transition-all duration-300 ${activeTab === 'veg'
                    ? 'bg-green-600 text-white'
                    : 'bg-transparent text-[hsl(30,20%,15%)] border-2 border-[hsl(40,20%,85%)] hover:border-green-600'
                  }`}
              >
                <Leaf className="h-4 w-4" />
                Vegetarian
              </button>
              <button
                onClick={() => setActiveTab('nonveg')}
                className={`px-8 py-3 text-sm font-medium tracking-wider uppercase flex items-center gap-2 transition-all duration-300 ${activeTab === 'nonveg'
                    ? 'bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)]'
                    : 'bg-transparent text-[hsl(30,20%,15%)] border-2 border-[hsl(40,20%,85%)] hover:border-[hsl(43,76%,58%)]'
                  }`}
              >
                <Drumstick className="h-4 w-4" />
                Non-Vegetarian
              </button>
            </div>
          </motion.div>

          {/* Menu Categories Grid */}
          <motion.div
            key={activeTab}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {Object.entries(currentMenu).map(([category, items], index) => (
              <div
                key={category}
                className="bg-[hsl(45,40%,94%)] p-8"
              >
                <h3 className="text-xl text-[hsl(30,20%,15%)] mb-6 pb-3 border-b border-[hsl(40,20%,85%)]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {category}
                </h3>
                <ul className="space-y-3">
                  {items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-[hsl(30,10%,35%)]">
                      <div className={`w-1.5 h-1.5 rounded-full ${activeTab === 'veg' ? 'bg-green-600' : 'bg-[hsl(43,76%,58%)]'}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Custom Menu CTA */}
      <section className="py-20 bg-[hsl(43,76%,58%)]">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl text-[hsl(30,20%,15%)] mb-6" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Custom Menu
            </h2>
            <p className="text-lg text-[hsl(30,20%,15%)]/80 mb-10 max-w-xl mx-auto">
              Tell us your preferences, dietary requirements, and event details —
              we'll create a personalized menu just for you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <button className="px-10 py-4 text-sm font-medium tracking-widest uppercase bg-[hsl(30,20%,15%)] text-white border-2 border-[hsl(30,20%,15%)] hover:bg-transparent hover:text-[hsl(30,20%,15%)] transition-all duration-300">
                  Build My Menu
                </button>
              </Link>
              <Link to="/contact">
                <button className="px-10 py-4 text-sm font-medium tracking-widest uppercase bg-transparent text-[hsl(30,20%,15%)] border-2 border-[hsl(30,20%,15%)] hover:bg-[hsl(30,20%,15%)] hover:text-white transition-all duration-300">
                  Talk to Our Team
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Menu Notes */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-[hsl(45,40%,94%)] p-8 md:p-12">
            <h3 className="text-2xl text-[hsl(30,20%,15%)] mb-6 text-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Important Information
            </h3>
            <ul className="space-y-4 text-sm text-[hsl(30,10%,35%)]">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                <span>This is a sample menu. Items and availability may vary based on season.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                <span>We offer customized menus for Jain, vegan, diabetic-friendly, and gluten-free options.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                <span>All dishes are prepared with fresh ingredients and strict hygiene standards.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                <span>Prices vary depending on menu, guest count, and service requirements. Contact us for a quote.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Menu;
