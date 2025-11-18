import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

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
    
    toast.success("Opening WhatsApp...", {
      description: "We'll create a custom menu just for you!",
    });
    
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
            Build Your Custom Menu
          </h1>
          <p className="text-xl text-muted-foreground animate-fade-in">
            Tell us your preferences and we'll create the perfect menu for your event
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Custom Menu Request Form</CardTitle>
              <p className="text-muted-foreground">
                Fill in your details and preferences, and we'll craft a personalized menu that
                perfectly fits your event
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
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
                </div>

                {/* Event Details */}
                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-lg font-semibold">Event Details</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="eventType">Event Type *</Label>
                      <Input
                        id="eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        required
                        placeholder="Wedding, Birthday, Corporate, etc."
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="guestCount">Number of Guests *</Label>
                      <Input
                        id="guestCount"
                        name="guestCount"
                        type="number"
                        value={formData.guestCount}
                        onChange={handleChange}
                        required
                        placeholder="100"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Event Location *</Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        placeholder="Chennai, Tamil Nadu"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="eventDate">Preferred Event Date</Label>
                      <Input
                        id="eventDate"
                        name="eventDate"
                        type="date"
                        value={formData.eventDate}
                        onChange={handleChange}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Menu Preferences */}
                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-lg font-semibold">Menu Preferences</h3>
                  
                  <div>
                    <Label>Food Type Preference *</Label>
                    <RadioGroup
                      value={formData.menuPreference}
                      onValueChange={(value) =>
                        setFormData({ ...formData, menuPreference: value })
                      }
                      className="mt-2 space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="veg" id="veg" />
                        <Label htmlFor="veg" className="font-normal cursor-pointer">
                          Vegetarian Only
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nonveg" id="nonveg" />
                        <Label htmlFor="nonveg" className="font-normal cursor-pointer">
                          Non-Vegetarian Only
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" id="both" />
                        <Label htmlFor="both" className="font-normal cursor-pointer">
                          Both Vegetarian & Non-Vegetarian
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="dietaryRestrictions">
                      Dietary Restrictions / Special Requirements
                    </Label>
                    <Textarea
                      id="dietaryRestrictions"
                      name="dietaryRestrictions"
                      value={formData.dietaryRestrictions}
                      onChange={handleChange}
                      placeholder="Jain meals, vegan, gluten-free, diabetic-friendly, allergies, etc."
                      className="mt-2 min-h-24"
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialRequests">
                      Special Requests / Additional Information
                    </Label>
                    <Textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      placeholder="Preferred cuisines, specific dishes, budget considerations, service requirements, decoration needs, etc."
                      className="mt-2 min-h-32"
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    Submit Custom Menu Request
                  </Button>
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    Your custom menu request will be sent to us via WhatsApp. We'll review your
                    requirements and get back to you with a personalized menu proposal within 24
                    hours.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card>
              <CardContent className="pt-6 text-center">
                <h3 className="font-bold mb-2">Flexible Options</h3>
                <p className="text-sm text-muted-foreground">
                  We accommodate all dietary needs and preferences
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <h3 className="font-bold mb-2">Quick Response</h3>
                <p className="text-sm text-muted-foreground">
                  Get your custom menu proposal within 24 hours
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <h3 className="font-bold mb-2">Budget Friendly</h3>
                <p className="text-sm text-muted-foreground">
                  Transparent pricing with no hidden costs
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CustomMenu;
