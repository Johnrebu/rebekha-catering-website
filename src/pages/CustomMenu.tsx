import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";

const CustomMenu = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    guestCount: "",
    menuPreference: "both",
    location: "",
    eventDate: "",
    dietaryRestrictions: "",
    specialRequests: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create WhatsApp message with all form data
    const message = `Custom Menu Request:%0A%0A` +
      `Name: ${formData.name}%0A` +
      `Phone: ${formData.phone}%0A` +
      `Email: ${formData.email}%0A` +
      `Event Type: ${formData.eventType}%0A` +
      `Guest Count: ${formData.guestCount}%0A` +
      `Menu Preference: ${formData.menuPreference}%0A` +
      `Location: ${formData.location}%0A` +
      `Event Date: ${formData.eventDate}%0A` +
      `Dietary Restrictions: ${formData.dietaryRestrictions || 'None'}%0A` +
      `Special Requests: ${formData.specialRequests || 'None'}`;

    // Open WhatsApp
    window.open(`https://wa.me/918925477007?text=${message}`, "_blank");

    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      eventType: "",
      guestCount: "",
      menuPreference: "both",
      location: "",
      eventDate: "",
      dietaryRestrictions: "",
      specialRequests: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[hsl(45,40%,94%)]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920')`
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
            Custom Menu
          </h1>
          <p className="text-xl font-light tracking-wide">
            Build your perfect event menu
          </p>
        </motion.div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl text-[hsl(30,20%,15%)] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
                Request Form
              </h2>
              <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto mb-6" />
              <p className="text-lg text-[hsl(30,10%,35%)] max-w-2xl mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Fill in your details and preferences, and we'll craft a personalized menu that
                perfectly fits your event.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="bg-[hsl(45,40%,94%)] p-8 md:p-12 space-y-10">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-2xl text-[hsl(30,20%,15%)] pb-2 border-b border-[hsl(40,20%,85%)]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">Name *</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">Phone *</label>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors"
                      placeholder="+91 89254 77007"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-6">
                <h3 className="text-2xl text-[hsl(30,20%,15%)] pb-2 border-b border-[hsl(40,20%,85%)]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Event Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">Event Type *</label>
                    <input
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors"
                      placeholder="Wedding, Birthday, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">Number of Guests *</label>
                    <input
                      name="guestCount"
                      type="number"
                      value={formData.guestCount}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors"
                      placeholder="100"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">Event Location *</label>
                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors"
                      placeholder="Chennai, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">Event Date</label>
                    <input
                      name="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="space-y-6">
                <h3 className="text-2xl text-[hsl(30,20%,15%)] pb-2 border-b border-[hsl(40,20%,85%)]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Menu Preferences
                </h3>
                <div>
                  <label className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-4">Food Type Preference *</label>
                  <div className="flex flex-wrap gap-6">
                    {['veg', 'nonveg', 'both'].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="menuPreference"
                          value={type}
                          checked={formData.menuPreference === type}
                          onChange={(e) => setFormData({ ...formData, menuPreference: e.target.value })}
                          className="w-4 h-4 text-[hsl(43,76%,58%)] border-[hsl(40,20%,85%)] focus:ring-[hsl(43,76%,58%)]"
                        />
                        <span className="text-sm uppercase tracking-widest text-[hsl(30,10%,35%)] group-hover:text-[hsl(43,76%,58%)] transition-colors">
                          {type === 'veg' ? 'Vegetarian' : type === 'nonveg' ? 'Non-Vegetarian' : 'Both'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">Dietary Restrictions</label>
                  <textarea
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors resize-none"
                    placeholder="Jain, Vegan, Gluten-free, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">Special Requests</label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors resize-none"
                    placeholder="Preferred cuisines, specific dishes, budget considerations, etc."
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-[hsl(40,20%,85%)]">
                <button
                  type="submit"
                  className="w-full py-4 text-sm font-medium tracking-widest uppercase bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)] hover:bg-[hsl(38,70%,45%)] hover:border-[hsl(38,70%,45%)] transition-all duration-300"
                >
                  Submit Custom Menu Request
                </button>
                <p className="text-sm text-[hsl(30,10%,45%)] text-center mt-6 italic">
                  Your request will be sent via WhatsApp. We'll get back to you with a proposal within 24 hours.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-20 bg-[hsl(45,40%,94%)]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: "Flexible Options", text: "We accommodate all dietary needs and preferences" },
              { title: "Quick Response", text: "Get your custom menu proposal within 24 hours" },
              { title: "Budget Friendly", text: "Transparent pricing with no hidden costs" },
            ].map((info, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="w-12 h-12 bg-[hsl(43,76%,58%)] flex items-center justify-center mx-auto mb-4">
                  <Check className="h-6 w-6 text-[hsl(30,20%,15%)]" />
                </div>
                <h4 className="text-lg font-medium text-[hsl(30,20%,15%)] mb-2 uppercase tracking-wide text-sm">{info.title}</h4>
                <p className="text-sm text-[hsl(30,10%,45%)]">{info.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CustomMenu;
