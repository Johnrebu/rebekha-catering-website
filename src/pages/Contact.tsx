import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    occasion: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const whatsappMessage = `New Inquiry from Website:%0A%0AName: ${formData.name}%0APhone: ${formData.phone}%0AEmail: ${formData.email}%0AOccasion: ${formData.occasion}%0AMessage: ${formData.message}`;
    
    // Open WhatsApp
    window.open(`https://wa.me/918925477007?text=${whatsappMessage}`, "_blank");
    
    toast.success("Opening WhatsApp...", {
      description: "We'll get back to you shortly!",
    });
    
    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      occasion: "",
      message: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 animate-fade-in">
            Get In Touch
          </h1>
          <p className="text-xl text-muted-foreground animate-fade-in">
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
              <h2 className="text-3xl font-bold font-serif mb-6">Send Us a Message</h2>
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 98765 43210"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="occasion">Type of Event *</Label>
                      <Input
                        id="occasion"
                        name="occasion"
                        value={formData.occasion}
                        onChange={handleChange}
                        required
                        placeholder="Wedding, Birthday, Corporate Event, etc."
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Your Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your event requirements, guest count, date, location, and any special requests..."
                        className="mt-2 min-h-32"
                      />
                    </div>

                    <Button type="submit" variant="hero" size="lg" className="w-full">
                      Send Message via WhatsApp
                    </Button>

                    <p className="text-sm text-muted-foreground text-center">
                      By submitting this form, your inquiry will be sent to us via WhatsApp
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold font-serif mb-6">Contact Information</h2>

              <div className="space-y-6">
                <Card className="hover:shadow-elegant transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Phone</h3>
                        <a
                          href="tel:+918925477007"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          +91 98765 43210
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-elegant transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <MessageCircle className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">WhatsApp</h3>
                        <a
                          href="https://wa.me/918925477007"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          Chat with us on WhatsApp
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-elegant transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Email</h3>
                        <a
                          href="mailto:info@rebekhacatering.com"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          info@rebekhacatering.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-elegant transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Location</h3>
                        <p className="text-muted-foreground">
                          West Tambaram
                          <br />
                          Chennai, Tamil Nadu
                          <br />
                          India
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-elegant transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Business Hours</h3>
                        <p className="text-muted-foreground">
                          Monday - Sunday: 8:00 AM - 10:00 PM
                          <br />
                          <span className="text-sm italic">Available for consultations and bookings</span>
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
          <h2 className="text-3xl font-bold font-serif mb-8 text-center">Find Us</h2>
          <div className="max-w-5xl mx-auto rounded-lg overflow-hidden shadow-warm">
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
