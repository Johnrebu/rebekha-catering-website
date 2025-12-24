import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Twitter, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative overflow-hidden bg-gradient-to-br from-red-950 via-amber-950 to-red-950 text-amber-50"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-orange-800/20 to-red-900/20 animate-gradient-x"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Brand Section */}
          <div className="space-y-4 animate-fade-in">
            <div className="group">
              {/* Logo Badge */}
              {/* Logo Badge */}
              <div className="inline-block mb-4 transition-all duration-300 group-hover:scale-105">
                <img 
                  src='/rebekha-logo.png' 
                  alt='Rebekha Caterers' 
                  className='h-24 w-auto rounded-xl'
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src.includes('rebekha-logo.png')) {
                      target.src = '/reblogo.png';
                    }
                  }}
                />
              </div>
            </div>
            <p className="text-sm italic text-amber-200 flex items-center gap-2">
              <Heart className="h-4 w-4 fill-current text-red-400 animate-pulse" />
              Serving Love Since 1998
            </p>
            <p className="text-sm text-amber-100 leading-relaxed">
              Authentic veg & non-veg catering services for all your special occasions. Creating memorable experiences with delicious food.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-4 pt-2">
              {[Facebook, Instagram, Twitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="group relative p-2 rounded-full bg-amber-100/10 backdrop-blur-sm border border-amber-500/30 hover:bg-gradient-to-r hover:from-red-700 hover:to-amber-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-amber-500/50"
                >
                  <Icon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4" style={{ animationDelay: '100ms' }}>
            <h4 className="text-xl font-semibold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-red-700 to-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/services", label: "Services" },
                { to: "/menu", label: "Menu" },
                { to: "/gallery", label: "Gallery" },
                { to: "/faq", label: "FAQ" },
                { to: "/contact", label: "Contact" }
              ].map((link, index) => (
                <li key={index} className="group">
                  <Link
                    to={link.to}
                    className="flex items-center gap-2 text-amber-100 hover:text-amber-300 transition-all duration-300 hover:translate-x-2"
                  >
                    <span className="w-0 h-0.5 bg-gradient-to-r from-red-700 to-amber-500 transition-all duration-300 group-hover:w-4"></span>
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-700 to-amber-500 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4" style={{ animationDelay: '200ms' }}>
            <h4 className="text-xl font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="group flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-100/10 backdrop-blur-sm border border-amber-500/30 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-red-700 group-hover:to-amber-600 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amber-500/50">
                  <Phone className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                </div>
                <a
                  href="tel:+919445435102"
                  className="text-amber-100 hover:text-amber-300 transition-colors duration-300 mt-2"
                >
                  +91 94454 35102
                </a>
              </li>
              <li className="group flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-100/10 backdrop-blur-sm border border-amber-500/30 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-red-700 group-hover:to-amber-600 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amber-500/50">
                  <Mail className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                </div>
                <a
                  href="mailto:reburr94@gmail.com"
                  className="text-amber-100 hover:text-amber-300 transition-colors duration-300 mt-2 break-all"
                >
                  reburr94@gmail.com
                </a>
              </li>
              <li className="group flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-100/10 backdrop-blur-sm border border-amber-500/30 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-red-700 group-hover:to-amber-600 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amber-500/50">
                  <MapPin className="h-4 w-4 flex-shrink-0 transition-transform duration-300 group-hover:rotate-12" />
                </div>
                <span className="text-amber-100 mt-2 leading-relaxed">
                  19, Perumal koil street, Irumbuliyur, West Tambaram, Chennai, Tamil Nadu, India
                </span>
              </li>
              <li className="group flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-100/10 backdrop-blur-sm border border-amber-500/30 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-green-700 group-hover:to-green-600 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-green-500/50">
                  <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                </div>
                <a
                  href="https://wa.me/918925477007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-100 hover:text-amber-300 transition-colors duration-300 mt-2"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div className="space-y-4" style={{ animationDelay: '300ms' }}>
            <h4 className="text-xl font-semibold mb-6">Find Us</h4>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-700 to-amber-600 rounded-xl opacity-50 blur transition-all duration-300 group-hover:opacity-100"></div>
              <div className="relative rounded-xl overflow-hidden h-48 bg-amber-100/10 backdrop-blur-sm border border-amber-500/30 transition-all duration-300 group-hover:scale-[1.02]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62686.89288283826!2d80.09476717910156!3d12.922915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f637c4d7b3f%3A0x2ac0d82f8a7c0b95!2sWest%20Tambaram%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="West Tambaram Location"
                  className="transition-all duration-300 group-hover:brightness-110"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative mt-16 pt-8 border-t border-amber-500/20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-amber-100">
            <p className="flex items-center gap-2">
              &copy; {currentYear} Rebekha Catering Services. All rights reserved.
            </p>
            <p className="flex items-center gap-2">
              Made with <Heart className="h-4 w-4 fill-current text-red-400 animate-pulse" /> in Chennai
            </p>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
