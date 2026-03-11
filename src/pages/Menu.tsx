import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Calculator, Drumstick, IndianRupee, Leaf, Users } from "lucide-react";

type DietaryTag = "Jain" | "Vegan" | "Gluten-Free";

interface Dish {
  name: string;
  image: string;
  tags: DietaryTag[];
}

interface MenuCategory {
  name: string;
  image: string;
  dishes: Dish[];
}

const dietaryTagStyle: Record<DietaryTag, string> = {
  Jain: "bg-amber-100 text-amber-800 border-amber-200",
  Vegan: "bg-green-100 text-green-800 border-green-200",
  "Gluten-Free": "bg-blue-100 text-blue-800 border-blue-200",
};

const vegCategories: MenuCategory[] = [
  {
    name: "Starters",
    image: "https://images.pexels.com/photos/9609838/pexels-photo-9609838.jpeg?auto=compress&cs=tinysrgb&w=800",
    dishes: [
      { name: "Paneer Tikka", image: "https://images.pexels.com/photos/9609838/pexels-photo-9609838.jpeg?auto=compress&cs=tinysrgb&w=600", tags: ["Gluten-Free"] },
      { name: "Veg Manchurian", image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600", tags: [] },
      { name: "Corn Cheese Balls", image: "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=600", tags: [] },
      { name: "Aloo Tikki Chaat", image: "https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?auto=compress&cs=tinysrgb&w=600", tags: ["Vegan"] },
    ],
  },
  {
    name: "Main Course",
    image: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=800",
    dishes: [
      { name: "Paneer Butter Masala", image: "https://images.pexels.com/photos/9609845/pexels-photo-9609845.jpeg?auto=compress&cs=tinysrgb&w=600", tags: [] },
      { name: "Dal Makhani", image: "https://images.pexels.com/photos/5410401/pexels-photo-5410401.jpeg?auto=compress&cs=tinysrgb&w=600", tags: ["Gluten-Free"] },
      { name: "Kadai Vegetable", image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=600", tags: ["Vegan", "Gluten-Free"] },
      { name: "Jain Veg Curry", image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=600", tags: ["Jain"] },
    ],
  },
  {
    name: "Rice and Biryani",
    image: "https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=800",
    dishes: [
      { name: "Veg Biryani", image: "https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=600", tags: [] },
      { name: "Jeera Rice", image: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600", tags: ["Vegan", "Gluten-Free"] },
      { name: "Lemon Rice", image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=600", tags: ["Vegan", "Gluten-Free"] },
      { name: "Curd Rice", image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600", tags: ["Gluten-Free"] },
    ],
  },
  {
    name: "South Indian and Desserts",
    image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800",
    dishes: [
      { name: "Mini Idli Sambar", image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=600", tags: ["Vegan"] },
      { name: "Ghee Pongal", image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600", tags: ["Gluten-Free"] },
      { name: "Payasam", image: "https://images.pexels.com/photos/666988/pexels-photo-666988.jpeg?auto=compress&cs=tinysrgb&w=600", tags: ["Gluten-Free"] },
      { name: "Fruit Bowl", image: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=600", tags: ["Jain", "Vegan", "Gluten-Free"] },
    ],
  },
];

const nonVegCategories: MenuCategory[] = [
  {
    name: "Non-Veg Starters",
    image: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=800",
    dishes: [
      { name: "Chicken 65", image: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=600", tags: ["Gluten-Free"] },
      { name: "Chicken Tikka", image: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=600", tags: ["Gluten-Free"] },
      { name: "Fish Fry", image: "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=600", tags: ["Gluten-Free"] },
      { name: "Egg Pakoda", image: "https://images.pexels.com/photos/6941028/pexels-photo-6941028.jpeg?auto=compress&cs=tinysrgb&w=600", tags: [] },
    ],
  },
  {
    name: "Chicken Special",
    image: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=800",
    dishes: [
      { name: "Butter Chicken", image: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=600", tags: ["Gluten-Free"] },
      { name: "Chicken Chettinad", image: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600", tags: ["Gluten-Free"] },
      { name: "Pepper Chicken", image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600", tags: ["Gluten-Free"] },
      { name: "Kadai Chicken", image: "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=600", tags: [] },
    ],
  },
  {
    name: "Mutton and Seafood",
    image: "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=800",
    dishes: [
      { name: "Mutton Chukka", image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600", tags: ["Gluten-Free"] },
      { name: "Mutton Curry", image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=600", tags: ["Gluten-Free"] },
      { name: "Prawn Masala", image: "https://images.pexels.com/photos/3298688/pexels-photo-3298688.jpeg?auto=compress&cs=tinysrgb&w=600", tags: ["Gluten-Free"] },
      { name: "Fish Moilee", image: "https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg?auto=compress&cs=tinysrgb&w=600", tags: ["Gluten-Free"] },
    ],
  },
  {
    name: "Biryanis and Desserts",
    image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800",
    dishes: [
      { name: "Chicken Biryani", image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600", tags: [] },
      { name: "Mutton Biryani", image: "https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=600", tags: [] },
      { name: "Egg Biryani", image: "https://images.pexels.com/photos/6941028/pexels-photo-6941028.jpeg?auto=compress&cs=tinysrgb&w=600", tags: [] },
      { name: "Rasmalai", image: "https://images.pexels.com/photos/666988/pexels-photo-666988.jpeg?auto=compress&cs=tinysrgb&w=600", tags: ["Gluten-Free"] },
    ],
  },
];

const guestTiers = [
  { label: "50-100 Guests", min: 50, max: 100, veg: 420, nonveg: 620, mixed: 540 },
  { label: "101-250 Guests", min: 101, max: 250, veg: 390, nonveg: 580, mixed: 500 },
  { label: "251-500 Guests", min: 251, max: 500, veg: 360, nonveg: 540, mixed: 470 },
  { label: "500+ Guests", min: 501, max: 5000, veg: 340, nonveg: 510, mixed: 445 },
];

const MenuColumn = ({
  title,
  isVeg,
  categories,
}: {
  title: string;
  isVeg: boolean;
  categories: MenuCategory[];
}) => (
  <div className="bg-[hsl(45,40%,94%)] p-6 md:p-8">
    <div className="flex items-center gap-3 mb-6">
      {isVeg ? (
        <Leaf className="h-5 w-5 text-green-700" />
      ) : (
        <Drumstick className="h-5 w-5 text-[hsl(30,20%,15%)]" />
      )}
      <h3 className="text-3xl text-[hsl(30,20%,15%)]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        {title}
      </h3>
    </div>

    <div className="space-y-8">
      {categories.map((category) => (
        <article key={category.name} className="bg-white border border-[hsl(40,20%,85%)]">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-44 object-cover"
            loading="lazy"
          />
          <div className="p-5">
            <h4 className="text-2xl text-[hsl(30,20%,15%)] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {category.name}
            </h4>
            <ul className="space-y-3">
              {category.dishes.map((dish) => (
                <li key={dish.name} className="flex gap-3">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-14 h-14 object-cover border border-[hsl(40,20%,85%)]"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <p className="text-sm text-[hsl(30,10%,30%)] font-medium">{dish.name}</p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {dish.tags.length > 0 ? (
                        dish.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`inline-flex items-center border px-2 py-0.5 text-[10px] uppercase tracking-wide ${dietaryTagStyle[tag]}`}
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="inline-flex items-center border border-[hsl(40,20%,85%)] px-2 py-0.5 text-[10px] uppercase tracking-wide text-[hsl(30,10%,45%)]">
                          Standard
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  </div>
);

const Menu = () => {
  const [guestCount, setGuestCount] = useState(150);
  const [menuType, setMenuType] = useState<"veg" | "nonveg" | "mixed">("mixed");
  const [selectedCategories, setSelectedCategories] = useState(4);
  const [liveCounter, setLiveCounter] = useState(true);
  const [premiumDessert, setPremiumDessert] = useState(false);

  const selectedTier = useMemo(() => {
    return guestTiers.find((tier) => guestCount >= tier.min && guestCount <= tier.max) ?? guestTiers[guestTiers.length - 1];
  }, [guestCount]);

  const estimate = useMemo(() => {
    const base = selectedTier[menuType];
    const categoryAdjustment = Math.max(selectedCategories - 4, 0) * 20;
    const addonAdjustment = (liveCounter ? 35 : 0) + (premiumDessert ? 25 : 0);
    const perPlate = base + categoryAdjustment + addonAdjustment;
    const minPerPlate = Math.round(perPlate * 0.9);
    const maxPerPlate = Math.round(perPlate * 1.1);
    const minTotal = minPerPlate * guestCount;
    const maxTotal = maxPerPlate * guestCount;

    return { perPlate, minPerPlate, maxPerPlate, minTotal, maxTotal };
  }, [guestCount, liveCounter, menuType, premiumDessert, selectedCategories, selectedTier]);

  return (
    <div className="min-h-screen bg-[hsl(45,40%,94%)]">
      <SEO
        title="Catering Menu Chennai - Veg and Non-Veg Comparison | Rebekha Catering"
        description="Compare vegetarian and non-vegetarian catering menus side-by-side. Check guest-based price tiers, dietary tags, dish images, and use the custom menu price estimator."
        keywords="catering menu Chennai, vegetarian vs non-vegetarian menu, catering price per plate Chennai, custom menu builder, Jain vegan gluten-free catering"
        canonical="https://rebekhacaterers.online/menu"
        ogUrl="https://rebekhacaterers.online/menu"
      />
      <StructuredData />
      <Navigation />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1920')",
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
            Compare Menus
          </h1>
          <p className="text-xl font-light tracking-wide">
            Vegetarian and Non-Vegetarian options with pricing clarity
          </p>
        </motion.div>
      </section>

      {/* Side-by-side menu */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl text-[hsl(30,20%,15%)] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Menu Comparison
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto mb-6" />
            <p className="text-[hsl(30,10%,35%)] max-w-3xl mx-auto">
              View both menus side-by-side for quick planning. Each dish includes dietary tags like Jain, Vegan, and Gluten-Free.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <MenuColumn title="Vegetarian Menu" isVeg categories={vegCategories} />
            <MenuColumn title="Non-Vegetarian Menu" isVeg={false} categories={nonVegCategories} />
          </div>
        </div>
      </section>

      {/* Price tiers */}
      <section className="py-16 bg-[hsl(45,40%,94%)]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl text-[hsl(30,20%,15%)] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Price Tiers by Guest Count
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto mb-6" />
            <p className="text-[hsl(30,10%,35%)] max-w-2xl mx-auto">
              Indicative per-plate pricing. Final quotation depends on menu depth, service style, and venue logistics.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto overflow-x-auto bg-white border border-[hsl(40,20%,85%)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)]">
                  <th className="px-4 py-3 text-left uppercase tracking-wide">Guest Tier</th>
                  <th className="px-4 py-3 text-left uppercase tracking-wide">Veg / Plate</th>
                  <th className="px-4 py-3 text-left uppercase tracking-wide">Non-Veg / Plate</th>
                  <th className="px-4 py-3 text-left uppercase tracking-wide">Mixed / Plate</th>
                </tr>
              </thead>
              <tbody>
                {guestTiers.map((tier) => (
                  <tr key={tier.label} className="border-t border-[hsl(40,20%,85%)]">
                    <td className="px-4 py-3 text-[hsl(30,20%,15%)]">{tier.label}</td>
                    <td className="px-4 py-3 text-[hsl(30,10%,35%)]">Rs {tier.veg}</td>
                    <td className="px-4 py-3 text-[hsl(30,10%,35%)]">Rs {tier.nonveg}</td>
                    <td className="px-4 py-3 text-[hsl(30,10%,35%)]">Rs {tier.mixed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Custom builder estimator */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl text-[hsl(30,20%,15%)] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Custom Menu Builder
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto mb-6" />
            <p className="text-[hsl(30,10%,35%)] max-w-2xl mx-auto">
              Build a sample package and get an estimated budget instantly.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
            <div className="bg-[hsl(45,40%,94%)] p-6 md:p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">Menu Type</label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { id: "veg", label: "Vegetarian" },
                      { id: "nonveg", label: "Non-Vegetarian" },
                      { id: "mixed", label: "Mixed" },
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setMenuType(type.id as "veg" | "nonveg" | "mixed")}
                        className={`px-4 py-2 border text-xs uppercase tracking-widest transition-colors ${
                          menuType === type.id
                            ? "bg-[hsl(43,76%,58%)] border-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)]"
                            : "border-[hsl(40,20%,80%)] text-[hsl(30,10%,35%)]"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="guest-count" className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">
                    Guest Count
                  </label>
                  <input
                    id="guest-count"
                    type="number"
                    min={50}
                    max={5000}
                    value={guestCount}
                    onChange={(e) => setGuestCount(Math.max(50, Number(e.target.value) || 50))}
                    className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="category-count" className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">
                    Number of Categories
                  </label>
                  <input
                    id="category-count"
                    type="range"
                    min={3}
                    max={8}
                    value={selectedCategories}
                    onChange={(e) => setSelectedCategories(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-sm text-[hsl(30,10%,45%)] mt-2">{selectedCategories} categories selected</p>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)]">Add-ons</label>
                  <label className="flex items-center gap-3 text-sm text-[hsl(30,10%,35%)]">
                    <input
                      type="checkbox"
                      checked={liveCounter}
                      onChange={(e) => setLiveCounter(e.target.checked)}
                    />
                    Live Counter (+Rs 35 per plate)
                  </label>
                  <label className="flex items-center gap-3 text-sm text-[hsl(30,10%,35%)]">
                    <input
                      type="checkbox"
                      checked={premiumDessert}
                      onChange={(e) => setPremiumDessert(e.target.checked)}
                    />
                    Premium Dessert (+Rs 25 per plate)
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-[hsl(43,76%,58%)] p-6 md:p-8 text-[hsl(30,20%,15%)]">
              <h3 className="text-3xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Estimated Pricing
              </h3>

              <div className="space-y-4 text-sm">
                <p className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Guest tier: {selectedTier.label}
                </p>
                <p className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" />
                  Estimate per plate: Rs {estimate.minPerPlate} - Rs {estimate.maxPerPlate}
                </p>
                <p className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Total estimate: Rs {estimate.minTotal.toLocaleString("en-IN")} - Rs {estimate.maxTotal.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="mt-8 p-4 bg-white/60">
                <p className="text-sm">
                  This builder gives an indicative estimate only. Final pricing is confirmed after menu freeze, service scope, and venue assessment.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to="/custom-menu">
                  <button className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-widest bg-[hsl(30,20%,15%)] text-white border-2 border-[hsl(30,20%,15%)] hover:bg-transparent hover:text-[hsl(30,20%,15%)] transition-all">
                    Open Full Builder
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-widest bg-transparent border-2 border-[hsl(30,20%,15%)] hover:bg-[hsl(30,20%,15%)] hover:text-white transition-all">
                    Request Exact Quote
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="py-16 bg-[hsl(45,40%,94%)]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-10 border border-[hsl(40,20%,85%)]">
            <h3 className="text-2xl text-[hsl(30,20%,15%)] mb-5 text-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Menu Notes
            </h3>
            <ul className="space-y-3 text-sm text-[hsl(30,10%,35%)]">
              <li>Menus shown are sample references. Final items may vary by season and market availability.</li>
              <li>Dietary tags indicate dishes that can be offered in those styles with advance confirmation.</li>
              <li>Live counters, premium desserts, and service upgrades are available as add-ons.</li>
              <li>For weddings and large events, we recommend a tasting session after provisional booking.</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Menu;
