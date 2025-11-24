import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, MessageCircle, Clock, Send } from "lucide-react";

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
      // HubSpot Portal ID
      const portalId = "244427242";
      // You'll need to create a form in HubSpot and get the Form GUID
      // For now, we'll use HubSpot's contact API endpoint
      
      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/8dab0ded-7cbd-495b-8690-f9b1615418ee`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: [
              {
                name: "firstname",
                value: formData.name.split(" ")[0] || formData.name,
              },
              {
                name: "lastname",
                value: formData.name.split(" ").slice(1).join(" ") || "",
              },
              {
                name: "email",
                value: formData.email,
              },
              {
                name: "phone",
                value: formData.phone,
              },
              {
                name: "event_type",
                value: formData.eventType,
              },
              {
                name: "guest_count",
                value: formData.guestCount,
              },
              {
                name: "event_date",
                value: formData.date,
              },
              {
                name: "message",
                value: formData.message,
              },
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
      
      // Reset form after 5 seconds
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
      setError("Failed to submit form. Please try again or contact us directly via phone or email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section with Background */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80" 
            alt="Contact us" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
        </div>
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 animate-fade-in text-white">
            Get In Touch
          </h1>
          <p className="text-xl text-amber-100 animate-fade-in">
            Let's discuss your event and create a memorable experience together
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold font-serif mb-6 bg-gradient-to-r from-red-700 to-amber-600 bg-clip-text text-transparent">
                Send Us a Message
              </h2>
              <Card className="border-amber-200 shadow-xl">
                <CardContent className="pt-8 pb-6">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white mb-4">
                        <Send className="h-8 w-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h3>
                      <p className="text-muted-foreground">We've received your message and will get back to you soon.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {error && (
                        <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                          <p className="text-red-600 text-sm">{error}</p>
                        </div>
                      )}
                      
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="John Elon"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="john@elon.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="eventType" className="block text-sm font-semibold mb-2">
                            Event Type *
                          </label>
                          <select
                            id="eventType"
                            name="eventType"
                            value={formData.eventType}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <option value="">Select Event Type</option>
                            <option value="wedding">Wedding</option>
                            <option value="birthday">Birthday Party</option>
                            <option value="corporate">Corporate Event</option>
                            <option value="private">Private Dinner</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="guestCount" className="block text-sm font-semibold mb-2">
                            Number of Guests
                          </label>
                          <input
                            type="number"
                            id="guestCount"
                            name="guestCount"
                            value={formData.guestCount}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="100"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="date" className="block text-sm font-semibold mb-2">
                          Event Date
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold mb-2">
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="Tell us more about your event requirements..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-red-700 to-amber-600 text-white font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold font-serif mb-6 bg-gradient-to-r from-red-700 to-amber-600 bg-clip-text text-transparent">
                Contact Information
              </h2>

              <div className="space-y-6">
                <Card className="hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700 to-amber-600"></div>
                  <CardContent className="pt-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-red-700 to-amber-600 rounded-lg text-white group-hover:scale-110 transition-transform">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-lg">Phone</h3>
                        <a
                          href="tel:+918925477007"
                          className="text-muted-foreground hover:text-amber-600 transition-colors text-lg"
                        >
                          +91 89254 77007
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-green-500"></div>
                  <CardContent className="pt-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-green-600 to-green-500 rounded-lg text-white group-hover:scale-110 transition-transform">
                        <MessageCircle className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-lg">WhatsApp</h3>
                        <a
                          href="https://wa.me/918925477007"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-green-600 transition-colors"
                        >
                          Chat with us on WhatsApp
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500"></div>
                  <CardContent className="pt-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg text-white group-hover:scale-110 transition-transform">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-lg">Email</h3>
                        <a
                          href="mailto:reburr94@gmail.com"
                          className="text-muted-foreground hover:text-blue-600 transition-colors"
                        >
                          reburr94@gmail.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-pink-500"></div>
                  <CardContent className="pt-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg text-white group-hover:scale-110 transition-transform">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-lg">Location</h3>
                        <p className="text-muted-foreground">
                          19, Perumal koil street, Irumbuliyur, West Tambaram,
                          <br />
                          Chennai, Tamil Nadu
                          <br />
                          India
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 to-orange-500"></div>
                  <CardContent className="pt-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-amber-600 to-orange-500 rounded-lg text-white group-hover:scale-110 transition-transform">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-lg">Business Hours</h3>
                        <p className="text-muted-foreground">
                          Monday - Sunday: 8:00 AM - 10:00 PM
                          <br />
                          <span className="text-sm italic">
                            Available for consultations and bookings
                          </span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-serif mb-8 text-center">
            Find Us
          </h2>
          <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62686.89288283826!2d80.09476717910156!3d12.922915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f637c4d7b3f%3A0x2ac0d82f8a7c0b95!2sWest%20Tambaram%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="West Tambaram Location"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
