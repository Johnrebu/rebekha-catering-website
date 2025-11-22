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
            {/* Logo Image */}
            <img 
              src='/logo4.png' 
              alt='Rebekha Caterers Logo' 
              className='h-12 md:h-14 lg:h-16 w-auto transition-all duration-300 group-hover:scale-105'
            />
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
      </div>

      {/* Mobile Menu Overlay - Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu - Slide-in Drawer from Right */}
      <div 
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-gradient-to-b from-red-950 via-amber-950 to-red-950 z-50 lg:hidden transform transition-transform duration-500 ease-out shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Decorative border */}
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-amber-500 to-transparent"></div>
        
        {/* Close button */}
        <div className="flex justify-end p-4 border-b border-amber-500/20">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg bg-amber-100/10 backdrop-blur-sm border border-amber-500/30 text-amber-300 transition-all duration-300 hover:bg-gradient-to-r hover:from-red-700 hover:to-amber-600 hover:scale-110"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex flex-col h-full px-6 py-8 overflow-y-auto">
          {/* Navigation Links */}
          <nav className="flex-1 flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="group"
                style={{ 
                  animation: isOpen ? `slideIn 0.3s ease-out ${index * 0.1}s both` : 'none'
                }}
              >
                <div className={`py-4 px-6 rounded-xl text-center transition-all duration-300 ${
                  isActive(link.path)
                    ? "bg-gradient-to-r from-red-700 to-amber-600 shadow-lg"
                    : "hover:bg-amber-100/10 hover:translate-x-2"
                }`}>
                  <span className={`text-2xl font-semibold transition-colors duration-300 ${
                    isActive(link.path) ? "text-white" : "text-amber-100"
                  }`}>
                    {link.label}
                  </span>
                </div>
              </Link>
            ))}
          </nav>

          {/* Bottom Buttons */}
          <div className="space-y-3 pt-6 border-t border-amber-500/20">
            {/* Get a Quote Button */}
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              <button className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-400 text-amber-950 font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/60 border-2 border-yellow-400/50">
                Get a Quote
              </button>
            </Link>
            
            {/* Call Now Button */}
            <a href="tel:+918925477007">
              <button className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-red-700 to-amber-600 text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/50 flex items-center justify-center gap-2 group">
                <Phone className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                <span>Call Now</span>
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Custom CSS for slide-in animation */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
