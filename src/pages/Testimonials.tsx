import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      event: "Wedding Reception",
      rating: 5,
      date: "December 2024",
      text: "The food was absolutely delicious and the presentation was stunning! Our guests are still talking about the amazing feast. The team was professional, punctual, and went above and beyond to make our special day even more memorable. Thank you Rebekha Catering!",
    },
    {
      name: "Rajesh Kumar",
      event: "Corporate Event",
      rating: 5,
      date: "November 2024",
      text: "Professional service and authentic taste. Rebekha Catering made our company anniversary celebration a huge success. The variety was impressive and every dish was cooked to perfection. Highly recommended for corporate events!",
    },
    {
      name: "Anjali Menon",
      event: "Birthday Party",
      rating: 5,
      date: "October 2024",
      text: "The variety and quality of food exceeded our expectations. The team was punctual and the setup was beautiful. My daughter's 10th birthday was made extra special thanks to their creative presentation and delicious food. Will definitely book again!",
    },
    {
      name: "Suresh Iyer",
      event: "50th Wedding Anniversary",
      rating: 5,
      date: "September 2024",
      text: "We wanted authentic South Indian food for our golden anniversary, and Rebekha Catering delivered beyond expectations. The banana leaf meal reminded us of traditional family gatherings. Every elder praised the authentic taste.",
    },
    {
      name: "Deepa Patel",
      event: "Engagement Ceremony",
      rating: 5,
      date: "August 2024",
      text: "Exceptional service from start to finish! They accommodated all our Jain dietary requirements without compromising on taste. The presentation was elegant and the staff was courteous. Our guests were thoroughly impressed!",
    },
    {
      name: "Mohammed Farhan",
      event: "Office Inauguration",
      rating: 5,
      date: "July 2024",
      text: "The non-veg spread was phenomenal! The chicken biryani and mutton dishes were restaurant-quality. They managed to serve 200 people efficiently with a smile. Best catering service in Chennai!",
    },
    {
      name: "Kavitha Ramesh",
      event: "Housewarming Party",
      rating: 5,
      date: "June 2024",
      text: "Amazing experience! They provided both veg and non-veg options that pleased all our guests. The quality of ingredients was top-notch and you could taste the love in every dish. Christopher uncle personally oversaw everything!",
    },
    {
      name: "Arun Krishnan",
      event: "Wedding Dinner",
      rating: 5,
      date: "May 2024",
      text: "We had over 500 guests and Rebekha Catering handled it like pros. Not a single complaint! The live dosa counter was a huge hit. The team's coordination and hygiene standards were exemplary. Worth every rupee!",
    },
    {
      name: "Lakshmi Venkatesh",
      event: "Baby Shower",
      rating: 5,
      date: "April 2024",
      text: "The traditional South Indian lunch was perfect! Everything from the sambar to the payasam was homemade quality. Nancy aunty helped us plan the menu considering dietary restrictions. Such caring and personal service!",
    },
    {
      name: "Vikram Reddy",
      event: "Retirement Party",
      rating: 5,
      date: "March 2024",
      text: "Continental and North Indian fusion menu was executed perfectly. The presentation was Instagram-worthy! They were flexible with last-minute guest count changes. Professional team that truly serves with love.",
    },
    {
      name: "Meera Srinivasan",
      event: "Diwali Celebration",
      rating: 5,
      date: "February 2024",
      text: "The festive menu they created was outstanding! Traditional sweets and savories were authentic and fresh. They even suggested menu items that fit our theme. A family business that feels like family!",
    },
    {
      name: "Arjun Nair",
      event: "Corporate Seminar",
      rating: 5,
      date: "January 2024",
      text: "Punctual delivery and excellent packaging for our working lunch. The food stayed fresh and hot. No complaints from 150+ attendees. They make corporate catering stress-free. Our go-to caterers now!",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 animate-fade-in">
            Client Testimonials
          </h1>
          <p className="text-xl text-muted-foreground animate-fade-in">
            Hear what our happy clients have to say about their experiences
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-sm text-muted-foreground">Years of Service</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-sm text-muted-foreground">Events Catered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-sm text-muted-foreground">Guests Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5.0</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="hover:shadow-warm transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="pt-6">
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-muted-foreground mb-4 italic text-sm leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  {/* Client Info */}
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.event}</p>
                    <p className="text-xs text-muted-foreground mt-1">{testimonial.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">
            Ready to Create Your Own Success Story?
          </h2>
          <p className="text-lg mb-8">
            Join hundreds of satisfied clients who have experienced our commitment to excellence
            and authentic taste.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-elegant">
                Book Your Event
              </button>
            </a>
            <a href="/menu">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-semibold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-all">
                View Our Menu
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonials;
