import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, Award, Users, Calendar, TrendingUp } from "lucide-react";
import { useCountAnimation } from "@/hooks/useCountAnimation";

const AnimatedStat = ({ icon, value, label, color }: { icon: React.ReactNode, value: string, label: string, color: string }) => {
  // Parse the value to extract number and suffix
  const parseValue = (val: string) => {
    const match = val.match(/^(\d+(?:\.\d+)?)(.*)/);
    if (match) {
      return { number: parseFloat(match[1]), suffix: match[2] };
    }
    return { number: 0, suffix: '' };
  };

  const { number, suffix } = parseValue(value);
  const { displayValue, elementRef } = useCountAnimation({ 
    end: number, 
    duration: 2500,
    suffix: suffix
  });

  return (
    <div 
      ref={elementRef}
      className="group relative overflow-hidden rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
      <div className="relative z-10">
        <div className={`inline-flex p-3 rounded-full bg-gradient-to-br ${color} text-white mb-3`}>
          {icon}
        </div>
        <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-2`}>
          {displayValue}
        </div>
        <div className="text-sm text-muted-foreground font-medium">{label}</div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      event: "Wedding Reception",
      rating: 5,
      date: "December 2024",
      text: "The food was absolutely delicious and the presentation was stunning! Our guests are still talking about the amazing feast. The team was professional, punctual, and went above and beyond to make our special day even more memorable. Thank you Rebekha Catering!",
      initials: "PS",
      color: "from-pink-500 to-rose-500"
    },
    {
      name: "Rajesh Kumar",
      event: "Corporate Event",
      rating: 5,
      date: "November 2024",
      text: "Professional service and authentic taste. Rebekha Catering made our company anniversary celebration a huge success. The variety was impressive and every dish was cooked to perfection. Highly recommended for corporate events!",
      initials: "RK",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Anjali",
      event: "Birthday Party",
      rating: 5,
      date: "October 2024",
      text: "The variety and quality of food exceeded our expectations. The team was punctual and the setup was beautiful. My daughter's 10th birthday was made extra special thanks to their creative presentation and delicious food. Will definitely book again!",
      initials: "AM",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Suresh Kumar",
      event: "50th Wedding Anniversary",
      rating: 5,
      date: "September 2024",
      text: "We wanted authentic South Indian food for our golden anniversary, and Rebekha Catering delivered beyond expectations. The banana leaf meal reminded us of traditional family gatherings. Every elder praised the authentic taste.",
      initials: "SI",
      color: "from-amber-500 to-orange-500"
    },
    {
      name: "Deepa Patel",
      event: "Engagement Ceremony",
      rating: 5,
      date: "August 2024",
      text: "Exceptional service from start to finish! They accommodated all our Jain dietary requirements without compromising on taste. The presentation was elegant and the staff was courteous. Our guests were thoroughly impressed!",
      initials: "DP",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Mohammed Farhan",
      event: "Office Inauguration",
      rating: 5,
      date: "July 2024",
      text: "The non-veg spread was phenomenal! The chicken biryani and mutton dishes were restaurant-quality. They managed to serve 200 people efficiently with a smile. Best catering service in Chennai!",
      initials: "MF",
      color: "from-indigo-500 to-blue-500"
    },
    {
      name: "Kavitha Ramesh",
      event: "Housewarming Party",
      rating: 5,
      date: "June 2024",
      text: "Amazing experience! They provided both veg and non-veg options that pleased all our guests. The quality of ingredients was top-notch and you could taste the love in every dish. Christopher uncle personally oversaw everything!",
      initials: "KR",
      color: "from-red-500 to-pink-500"
    },
    {
      name: "Arun Krishnan",
      event: "Wedding Dinner",
      rating: 5,
      date: "May 2024",
      text: "We had over 500 guests and Rebekha Catering handled it like pros. Not a single complaint! The live dosa counter was a huge hit. The team's coordination and hygiene standards were exemplary. Worth every rupee!",
      initials: "AK",
      color: "from-teal-500 to-cyan-500"
    },
    {
      name: "Lakshmi Venkatesh",
      event: "Baby Shower",
      rating: 5,
      date: "April 2024",
      text: "The traditional South Indian lunch was perfect! Everything from the sambar to the payasam was homemade quality. Nancy aunty helped us plan the menu considering dietary restrictions. Such caring and personal service!",
      initials: "LV",
      color: "from-violet-500 to-purple-500"
    },
    {
      name: "Vikram",
      event: "Retirement Party",
      rating: 5,
      date: "March 2024",
      text: "Continental and North Indian fusion menu was executed perfectly. The presentation was Instagram-worthy! They were flexible with last-minute guest count changes. Professional team that truly serves with love.",
      initials: "VR",
      color: "from-orange-500 to-red-500"
    },
    {
      name: "Meera Srinivasan",
      event: "Diwali Celebration",
      rating: 5,
      date: "February 2024",
      text: "The festive menu they created was outstanding! Traditional sweets and savories were authentic and fresh. They even suggested menu items that fit our theme. A family business that feels like family!",
      initials: "MS",
      color: "from-yellow-500 to-amber-500"
    },
    {
      name: "Saravanan",
      event: "Corporate Seminar",
      rating: 5,
      date: "January 2024",
      text: "Punctual delivery and excellent packaging for our working lunch. The food stayed fresh and hot. No complaints from 150+ attendees. They make corporate catering stress-free. Our go-to caterers now!",
      initials: "AN",
      color: "from-cyan-500 to-blue-500"
    },
  ];

  const stats = [
    {
      icon: <Award className="h-8 w-8" />,
      value: "25+",
      label: "Years of Service",
      color: "from-red-700 to-amber-600"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      value: "1000+",
      label: "Events Catered",
      color: "from-amber-600 to-yellow-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      value: "50K+",
      label: "Guests Served",
      color: "from-yellow-500 to-amber-500"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      value: "5.0",
      label: "Average Rating",
      color: "from-amber-500 to-red-700"
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section with Background */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&q=80" 
            alt="Happy clients" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
        </div>
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <Quote className="h-16 w-16 mx-auto mb-6 text-amber-300" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 animate-fade-in text-white">
            Client Testimonials
          </h1>
          <p className="text-xl text-amber-100 animate-fade-in">
            Hear what our happy clients have to say about their experiences
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <AnimatedStat
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                color={stat.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              Success Stories From Our Clients
            </h2>
            <p className="text-lg text-muted-foreground">
              Real experiences from real people who trusted us with their special moments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in border-0"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Gradient top border */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.color}`}></div>
                
                <CardContent className="pt-8 pb-6">
                  {/* Quote Icon */}
                  <Quote className="h-10 w-10 text-amber-600/20 mb-4" />

                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-muted-foreground mb-6 italic text-sm leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  {/* Client Info with Avatar */}
                  <div className="flex items-center gap-4 border-t border-border pt-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                      {testimonial.initials}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.event}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{testimonial.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-red-950 via-amber-950 to-red-950 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6 bg-gradient-to-r from-amber-200 to-yellow-300 bg-clip-text text-transparent">
            Ready to Create Your Own Success Story?
          </h2>
          <p className="text-lg mb-8 text-amber-100">
            Join hundreds of satisfied clients who have experienced our commitment to excellence
            and authentic taste.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-amber-400 text-amber-950 font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-yellow-500/60 border-2 border-yellow-400/50 magic-hover">
                Book Your Event
              </button>
            </a>
            <a href="/menu">
              <button className="px-8 py-4 rounded-full bg-transparent border-2 border-amber-300 text-amber-100 font-semibold text-lg transition-all duration-300 hover:scale-105 hover:bg-amber-100/10 hover:border-amber-200 magic-hover">
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

