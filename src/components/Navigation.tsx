import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/services", label: "Services" },
    { path: "/menu", label: "Our Food" },
    { path: "/gallery", label: "Gallery" },
    { path: "/testimonials", label: "Testimonials" },
    { path: "/contact", label: "Enquire" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top bar with contact info */}
      <div className="hidden lg:block bg-[hsl(43,76%,58%)] py-2">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6 text-sm text-[hsl(30,20%,15%)]">
            <a href="tel:+919445435102" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="h-3.5 w-3.5" />
              <span>+91 94454 35102</span>
            </a>
            <a href="mailto:reburr94@gmail.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail className="h-3.5 w-3.5" />
              <span>reburr94@gmail.com</span>
            </a>
          </div>
          <div className="text-sm text-[hsl(30,20%,15%)]">
            <span>Serving Chennai Since 1998</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${scrolled
            ? 'bg-[hsl(45,40%,94%)] shadow-md'
            : 'bg-[hsl(45,40%,94%)]'
          }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src='/rebekha-logo.png'
                alt='Rebekha Caterers'
                className='h-14 md:h-16 lg:h-20 w-auto transition-all duration-300 group-hover:opacity-80'
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src.includes('rebekha-logo.png')) {
                    target.src = '/reblogo.png';
                  }
                }}
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
                  <span className={`text-sm font-normal tracking-wide uppercase transition-colors duration-300 ${isActive(link.path)
                      ? "text-[hsl(38,70%,45%)]"
                      : "text-[hsl(30,20%,15%)] hover:text-[hsl(38,70%,45%)]"
                    }`}>
                    {link.label}
                  </span>
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[hsl(43,76%,58%)] transition-all duration-300 ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/menu">
                <button className="px-6 py-2.5 text-sm font-medium tracking-wider uppercase bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)] hover:bg-[hsl(38,70%,45%)] hover:border-[hsl(38,70%,45%)] transition-all duration-300">
                  Order Online
                </button>
              </Link>
              <Link to="/contact">
                <button className="px-6 py-2.5 text-sm font-medium tracking-wider uppercase bg-transparent text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)] hover:bg-[hsl(43,76%,58%)] transition-all duration-300">
                  Enquire
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-[hsl(30,20%,15%)]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full bg-[hsl(45,40%,94%)] shadow-lg transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
        >
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`py-2 text-center text-sm font-normal tracking-wide uppercase transition-colors duration-300 ${isActive(link.path)
                      ? "text-[hsl(38,70%,45%)]"
                      : "text-[hsl(30,20%,15%)] hover:text-[hsl(38,70%,45%)]"
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-[hsl(40,20%,85%)]">
                <Link to="/menu" onClick={() => setIsOpen(false)}>
                  <button className="w-full py-3 text-sm font-medium tracking-wider uppercase bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)]">
                    Order Online
                  </button>
                </Link>
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  <button className="w-full py-3 text-sm font-medium tracking-wider uppercase bg-transparent text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)]">
                    Enquire
                  </button>
                </Link>
                <a href="tel:+919445435102" className="flex items-center justify-center gap-2 py-3 text-sm text-[hsl(30,20%,15%)]">
                  <Phone className="h-4 w-4" />
                  <span>+91 94454 35102</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
