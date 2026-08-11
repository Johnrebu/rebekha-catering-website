import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Download, IndianRupee, Info, Loader2 } from "lucide-react";
import { downloadMenuPDF } from "@/utils/menuPdfDownload";

type PackageType = "wedding-non-veg" | "hotel-non-veg" | "hotel-veg";
type BiryaniType = "mutton" | "chicken";

const packagesData = {
  "wedding-non-veg": {
    id: "wedding-non-veg",
    title: "Wedding Feast (Non-Veg)",
    options: {
      mutton: { price: 500, label: "Mutton Biryani Menu" },
      chicken: { price: 400, label: "Chicken Biryani Menu" },
    },
    menuItems: (biryani: BiryaniType) => [
      `Biryani (${biryani === "mutton" ? "Mutton" : "Chicken"})`,
      "Chicken 65 / Chicken Gravy",
      "Onion Raita",
      "Brinjal Gravy",
      "Sweet (Choice of Pineapple Pudding, Bread Halwa, or Dry Gulab Jamun)",
      "Ice Cream",
      "Welcome Drink",
      "Popcorn",
      "Beeda",
      "Fruit Mixture",
      "Paper Roll / Tissue",
      "Water Bottle (300 ml)",
      "Banana Leaf"
    ],
    note: "Service charge and transportation are included within Tambaram Corporation limits."
  },
  "hotel-non-veg": {
    id: "hotel-non-veg",
    title: "Hotel Supply (Non-Veg)",
    options: {
      mutton: { price: 450, label: "Mutton Biryani Menu" },
      chicken: { price: 350, label: "Chicken Biryani Menu" },
    },
    menuItems: (biryani: BiryaniType) => [
      `Biryani (${biryani === "mutton" ? "Mutton" : "Chicken"})`,
      "Chicken 65 (Chicken Gravy is also available as an alternative for Chicken Biryani option)",
      "Onion Raita",
      "Brinjal Gravy",
      "Sweet (Choice of Pineapple Pudding, Bread Halwa, or Dry Gulab Jamun)",
      "Ice Cream",
      "Water Bottle (300 ml)",
      "Banana Leaf (or Arekha Plate for Chicken)",
      "Paper Roll / Tissue"
    ],
    note: "Service charge and transportation are included within Tambaram Corporation limits."
  },
  "hotel-veg": {
    id: "hotel-veg",
    title: "Hotel Supply (Vegetarian)",
    price: 300,
    menuItems: () => [
      "White Rice",
      "Sambar",
      "Rasam",
      "Vattral Kuzhambu",
      "Chapathi",
      "Payasam (Pal / Paruppu)",
      "Pappad",
      "Poriyal (1 variety)",
      "Kootu (2 varieties)",
      "Buttermilk",
      "Pickle",
      "Vadai",
      "Paper Roll",
      "Banana Leaf",
      "Water Bottle (300 ml)"
    ],
    note: "Service charge and transportation are included within Tambaram Corporation limits."
  }
};

const Packages = () => {
  const [activeTab, setActiveTab] = useState<PackageType>("wedding-non-veg");
  const [weddingBiryani, setWeddingBiryani] = useState<BiryaniType>("mutton");
  const [hotelBiryani, setHotelBiryani] = useState<BiryaniType>("mutton");
  const [isDownloading, setIsDownloading] = useState(false);

  let currentPrice = 0;
  let items: string[] = [];

  if (activeTab === "wedding-non-veg") {
    const pkg = packagesData["wedding-non-veg"];
    currentPrice = pkg.options[weddingBiryani].price;
    items = pkg.menuItems(weddingBiryani);
  } else if (activeTab === "hotel-non-veg") {
    const pkg = packagesData["hotel-non-veg"];
    currentPrice = pkg.options[hotelBiryani].price;
    items = pkg.menuItems(hotelBiryani);
  } else {
    const pkg = packagesData["hotel-veg"];
    currentPrice = pkg.price;
    items = pkg.menuItems();
  }

  const currentPackage = packagesData[activeTab];

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      try {
        let subtitle = "";
        let packageType: "veg" | "nonveg" = "nonveg";
        if (activeTab === "wedding-non-veg") {
          subtitle = weddingBiryani === "mutton" ? "Mutton Biryani Menu" : "Chicken Biryani Menu";
        } else if (activeTab === "hotel-non-veg") {
          subtitle = hotelBiryani === "mutton" ? "Mutton Biryani Menu" : "Chicken Biryani Menu";
        } else {
          packageType = "veg";
        }
        downloadMenuPDF({
          title: currentPackage.title,
          subtitle,
          price: currentPrice,
          priceLabel: "per plate",
          items,
          note: currentPackage.note ?? "",
          packageType,
        });
      } finally {
        setIsDownloading(false);
      }
    }, 200);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl text-[hsl(30,20%,15%)] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
            Our Menu Packages
          </h2>
          <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto mb-6" />
          <p className="text-[hsl(30,10%,35%)] max-w-3xl mx-auto">
            Choose from our curated selection of feast and supply packages designed to make your events memorable.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-center mb-10 border-b border-[hsl(40,20%,85%)]">
            {(Object.keys(packagesData) as PackageType[]).map((tabId) => (
              <button
                key={tabId}
                onClick={() => setActiveTab(tabId)}
                className={`px-4 lg:px-8 py-4 text-sm uppercase tracking-wider font-semibold transition-all relative whitespace-nowrap ${
                  activeTab === tabId
                    ? "text-[hsl(43,76%,58%)] bg-[hsl(30,20%,15%)]"
                    : "text-[hsl(30,10%,35%)] hover:bg-[hsl(45,40%,94%)]"
                }`}
              >
                {packagesData[tabId].title}
                {activeTab === tabId && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-[hsl(43,76%,58%)]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Package Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-[hsl(45,40%,94%)] border border-[hsl(40,20%,85%)] p-6 md:p-10 shadow-lg"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6 border-b border-[hsl(40,20%,85%)] pb-8">
                <div className="flex-1">
                  <h3 className="text-3xl text-[hsl(30,20%,15%)] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {currentPackage.title}
                  </h3>
                  
                  {activeTab === "wedding-non-veg" && (
                    <div className="flex flex-wrap items-center gap-3 mt-4">
                      <label className="text-sm font-semibold uppercase tracking-wider text-[hsl(30,20%,15%)]">Select Option:</label>
                      <select 
                        value={weddingBiryani}
                        onChange={(e) => setWeddingBiryani(e.target.value as BiryaniType)}
                        className="p-2 border border-[hsl(40,20%,85%)] bg-white text-sm focus:outline-none focus:border-[hsl(43,76%,58%)] shadow-sm"
                      >
                        <option value="mutton">Mutton Biryani Menu</option>
                        <option value="chicken">Chicken Biryani Menu</option>
                      </select>
                    </div>
                  )}

                  {activeTab === "hotel-non-veg" && (
                    <div className="flex flex-wrap items-center gap-3 mt-4">
                      <label className="text-sm font-semibold uppercase tracking-wider text-[hsl(30,20%,15%)]">Select Option:</label>
                      <select 
                        value={hotelBiryani}
                        onChange={(e) => setHotelBiryani(e.target.value as BiryaniType)}
                        className="p-2 border border-[hsl(40,20%,85%)] bg-white text-sm focus:outline-none focus:border-[hsl(43,76%,58%)] shadow-sm"
                      >
                        <option value="mutton">Mutton Biryani Menu</option>
                        <option value="chicken">Chicken Biryani Menu</option>
                      </select>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="bg-[hsl(30,20%,15%)] text-white px-8 py-6 text-center min-w-[200px] border-b-4 border-[hsl(43,76%,58%)] rounded-sm shadow-md">
                    <div className="text-sm uppercase tracking-widest text-[hsl(43,76%,58%)] mb-1">Price</div>
                    <div className="flex items-center justify-center text-4xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      <IndianRupee className="h-6 w-6 mr-1" />
                      {currentPrice}
                    </div>
                    <div className="text-xs font-light mt-1 text-gray-300">per plate</div>
                  </div>

                  {/* ── Premium Download Button ── */}
                  <motion.button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="
                      w-full flex items-center justify-center gap-2
                      px-6 py-3 rounded-sm
                      bg-gradient-to-r from-[hsl(38,70%,45%)] to-[hsl(43,76%,58%)]
                      text-[hsl(30,20%,10%)] font-semibold text-sm
                      uppercase tracking-widest
                      shadow-md hover:shadow-lg
                      border border-[hsl(43,76%,58%)]
                      transition-all duration-200
                      disabled:opacity-60 disabled:cursor-not-allowed
                    "
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        <span>Download Menu</span>
                      </>
                    )}
                  </motion.button>
                  <p className="text-[10px] text-[hsl(30,10%,50%)] text-center">
                    Downloads as a premium PDF
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white border border-[hsl(40,20%,85%)] rounded-sm shadow-sm hover:shadow-md transition-shadow">
                    <div className="mt-0.5 bg-[hsl(43,76%,58%)] rounded-full p-1 shrink-0">
                      <Check className="h-3 w-3 text-[hsl(30,20%,15%)]" />
                    </div>
                    <span className="text-[hsl(30,10%,35%)] text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-white border-l-4 border-[hsl(43,76%,58%)] p-4 flex gap-3 text-[hsl(30,10%,35%)] text-sm shadow-sm">
                <Info className="h-5 w-5 shrink-0 text-[hsl(43,76%,58%)]" />
                <p>{currentPackage.note}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Packages;
