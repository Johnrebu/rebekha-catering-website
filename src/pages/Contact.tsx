import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GoogleBusinessProfile from "@/components/GoogleBusinessProfile";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, Check } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    guestCount: "",
    date: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const portalId = "244427242";

      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/8dab0ded-7cbd-495b-8690-f9b1615418ee`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: [
              { name: "firstname", value: formData.name.split(" ")[0] || formData.name },
              { name: "lastname", value: formData.name.split(" ").slice(1).join(" ") || "" },
              { name: "email", value: formData.email },
              { name: "phone", value: formData.phone },
              { name: "event_type", value: formData.eventType },
              { name: "guest_count", value: formData.guestCount },
              { name: "event_date", value: formData.date },
              { name: "message", value: formData.message },
            ],
            context: {
              pageUri: window.location.href,
              pageName: "Contact Page",
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: "",
          guestCount: "",
          date: "",
          message: "",
        });
      }, 5000);
    } catch (err) {
      console.error("Form submission error:", err);
      setError("Failed to submit form. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(45,40%,94%)]">
      <SEO 
        title="Contact Rebekha Catering Services - Call now for Booking"
        description="Get in touch with Rebekha Catering Services in West Tambaram, Chennai. Call now to book your event catering. Available 24/7 for consultations."
        keywords="contact catering Chennai, catering inquiry, book catering services, Rebekha contact"
      />
      <StructuredData />
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
            Enquire
          </h1>
          <p className="text-xl font-light tracking-wide">
            Let's discuss your event and create something memorable
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl text-[hsl(30,20%,15%)] mb-6" style={{ fontFamily: "'Great Vibes', cursive" }}>
                Send Us a Message
              </h2>
              <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mb-8" />

              <div className="bg-[hsl(45,40%,94%)] p-8 md:p-10">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl text-[hsl(30,20%,15%)] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      Thank You!
                    </h3>
                    <p className="text-[hsl(30,10%,45%)]">
                      We've received your message and will get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200">
                        <p className="text-red-600 text-sm">{error}</p>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">
                          Event Type
                        </label>
                        <select
                          name="eventType"
                          value={formData.eventType}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors"
                        >
                          <option value="">Select event type</option>
                          <option value="wedding">Wedding</option>
                          <option value="birthday">Birthday</option>
                          <option value="corporate">Corporate Event</option>
                          <option value="private">Private Dinner</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">
                          Number of Guests
                        </label>
                        <input
                          type="number"
                          name="guestCount"
                          value={formData.guestCount}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors"
                          placeholder="100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">
                        Event Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm uppercase tracking-wider text-[hsl(30,20%,15%)] mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-white border border-[hsl(40,20%,85%)] focus:border-[hsl(43,76%,58%)] focus:outline-none transition-colors resize-none"
                        placeholder="Tell us about your event..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 text-sm font-medium tracking-widest uppercase bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)] hover:bg-[hsl(38,70%,45%)] hover:border-[hsl(38,70%,45%)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Enquiry
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl text-[hsl(30,20%,15%)] mb-6" style={{ fontFamily: "'Great Vibes', cursive" }}>
                Contact Information
              </h2>
              <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mb-8" />

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4 p-6 bg-[hsl(45,40%,94%)]">
                  <div className="w-12 h-12 bg-[hsl(43,76%,58%)] flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-[hsl(30,20%,15%)]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[hsl(30,20%,15%)] mb-1 uppercase tracking-wide text-sm">Phone</h3>
                    <a href="tel:+919445435102" className="text-[hsl(30,10%,35%)] hover:text-[hsl(43,76%,58%)] transition-colors">
                      +91 94454 35102
                    </a>
                    <br />
                    <a href="tel:+919445435103" className="text-[hsl(30,10%,35%)] hover:text-[hsl(43,76%,58%)] transition-colors">
                      +91 94454 35103
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4 p-6 bg-[hsl(45,40%,94%)]">
                  <div className="w-12 h-12 bg-green-600 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[hsl(30,20%,15%)] mb-1 uppercase tracking-wide text-sm">WhatsApp</h3>
                    <a
                      href="https://wa.me/918925477007"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[hsl(30,10%,35%)] hover:text-green-600 transition-colors"
                    >
                      Chat with us on WhatsApp
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-6 bg-[hsl(45,40%,94%)]">
                  <div className="w-12 h-12 bg-[hsl(43,76%,58%)] flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-[hsl(30,20%,15%)]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[hsl(30,20%,15%)] mb-1 uppercase tracking-wide text-sm">Email</h3>
                    <a href="mailto:reburr94@gmail.com" className="text-[hsl(30,10%,35%)] hover:text-[hsl(43,76%,58%)] transition-colors">
                      reburr94@gmail.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 p-6 bg-[hsl(45,40%,94%)]">
                  <div className="w-12 h-12 bg-[hsl(43,76%,58%)] flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-[hsl(30,20%,15%)]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[hsl(30,20%,15%)] mb-1 uppercase tracking-wide text-sm">Location</h3>
                    <p className="text-[hsl(30,10%,35%)]">
                      19, Perumal Koil Street,<br />
                      Irumbuliyur, West Tambaram,<br />
                      Chennai - 600045
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 p-6 bg-[hsl(45,40%,94%)]">
                  <div className="w-12 h-12 bg-[hsl(43,76%,58%)] flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-[hsl(30,20%,15%)]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[hsl(30,20%,15%)] mb-1 uppercase tracking-wide text-sm">Hours</h3>
                    <p className="text-[hsl(30,10%,35%)]">
                      Monday - Saturday: 8:00 AM - 9:00 PM<br />
                      Sunday: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Card Section */}
      <section className="py-20 bg-[hsl(43,76%,58%)]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl text-[hsl(30,20%,15%)] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Our Business Cards
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(30,20%,15%)] mx-auto opacity-50" />
            <p className="mt-6 text-[hsl(30,20%,15%)]/80 max-w-2xl mx-auto">
              Feel free to save or share our contact details. We specialize in both event catering and professional transport services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Catering Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white p-4 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src="/catering-card.jpg"
                  alt="Rebekha Caterers Business Card"
                  className="w-full h-auto shadow-inner"
                />
                <div className="mt-6 flex justify-between items-center px-2">
                  <h3 className="text-lg font-medium text-[hsl(30,20%,15%)]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Catering Specialist
                  </h3>
                  <a
                    href="/catering-card.jpg"
                    download="Rebekha-Catering-Card.jpg"
                    className="text-xs uppercase tracking-widest font-bold text-[hsl(43,76%,58%)] hover:text-[hsl(38,70%,45%)] transition-colors"
                  >
                    Download Card
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Transport Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group"
            >
              <div className="bg-white p-4 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src="/transport-card.jpg"
                  alt="RC Transport Business Card"
                  className="w-full h-auto shadow-inner"
                />
                <div className="mt-6 flex justify-between items-center px-2">
                  <h3 className="text-lg font-medium text-[hsl(30,20%,15%)]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Transport Services
                  </h3>
                  <a
                    href="/transport-card.jpg"
                    download="RC-Transport-Card.jpg"
                    className="text-xs uppercase tracking-widest font-bold text-[hsl(43,76%,58%)] hover:text-[hsl(38,70%,45%)] transition-colors"
                  >
                    Download Card
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-[hsl(45,40%,94%)]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl text-[hsl(30,20%,15%)] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Find Us
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto" />
          </motion.div>

          <div className="max-w-4xl mx-auto overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62686.89288283826!2d80.09476717910156!3d12.922915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f637c4d7b3f%3A0x2ac0d82f8a7c0b95!2sWest%20Tambaram%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="West Tambaram Location"
            />
          </div>
        </div>
      </section>

      {/* Google Business Profile & Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl text-center text-[hsl(30,20%,15%)] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Find Us
            </h2>
            <div className="w-16 h-0.5 bg-[hsl(43,76%,58%)] mx-auto" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GoogleBusinessProfile />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
