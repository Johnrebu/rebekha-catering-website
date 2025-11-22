import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/services", label: "Services" },
    { path: "/menu", label: "Menu" },
    { path: "/gallery", label: "Gallery" },
    { path: "/testimonials", label: "Testimonials" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gradient-to-r from-red-950/95 via-amber-950/95 to-red-950/95 backdrop-blur-md shadow-lg shadow-amber-900/20' 
          : 'bg-gradient-to-r from-red-950/90 via-amber-950/90 to-red-950/90 backdrop-blur-sm'
      }`}
    >
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-full bg-amber-100/10 backdrop-blur-sm border border-amber-500/30 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-red-700 group-hover:to-amber-600 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amber-500/50">
              <ChefHat className="h-5 w-5 md:h-6 md:w-6 text-amber-300 transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold font-serif bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
                Rebekha Catering
              </h1>
              <p className="text-xs md:text-sm text-amber-200 italic">Serving Love Since 1998</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="group relative"
              >
                <span className={`text-sm font-medium transition-all duration-300 ${
                  isActive(link.path) 
                    ? "text-amber-300" 
                    : "text-amber-100 hover:text-amber-300"
                }`}>
                  {link.label}
                </span>
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-red-700 to-amber-500 transition-all duration-300 ${
                  isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
            
            {/* Contact Us Button - Gold/Mustard Accent */}
            <Link to="/contact">
              <button className="relative px-5 py-2.5 rounded-full bg-gradient-to-r from-yellow-500 to-amber-400 text-amber-950 font-semibold text-sm transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-yellow-500/60 flex items-center gap-2 group overflow-hidden border-2 border-yellow-400/50">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Contact Us</span>
              </button>
            </Link>
            
            {/* Call Now Button */}
            <a href="tel:+918925477007">
              <button className="relative px-5 py-2.5 rounded-full bg-gradient-to-r from-red-700 to-amber-600 text-white font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/50 flex items-center gap-2 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Phone className="h-4 w-4 relative z-10 transition-transform duration-300 group-hover:rotate-12" />
                <span className="relative z-10">Call Now</span>
              </button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg bg-amber-100/10 backdrop-blur-sm border border-amber-500/30 text-amber-300 transition-all duration-300 hover:bg-gradient-to-r hover:from-red-700 hover:to-amber-600 hover:scale-110"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pb-4 border-t border-amber-500/20 pt-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="group relative"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={`px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive(link.path)
                      ? "bg-gradient-to-r from-red-700/50 to-amber-600/50"
                      : "hover:bg-amber-100/10"
                  }`}>
                    <span className={`text-base font-medium transition-colors duration-300 ${
                      isActive(link.path) ? "text-amber-300" : "text-amber-100"
                    }`}>
                      {link.label}
                    </span>
                  </div>
                </Link>
              ))}
              
              {/* Contact Us Button - Mobile */}
              <Link to="/contact" onClick={() => setIsOpen(false)} className="mt-2">
                <button className="w-full px-5 py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-400 text-amber-950 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/60 flex items-center justify-center gap-2 group border-2 border-yellow-400/50">
                  <span>Contact Us</span>
                </button>
              </Link>
              
              {/* Call Now Button - Mobile */}
              <a href="tel:+918925477007" className="mt-2">
                <button className="w-full px-5 py-3 rounded-lg bg-gradient-to-r from-red-700 to-amber-600 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/50 flex items-center justify-center gap-2 group">
                  <Phone className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                  <span>Call Now</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
