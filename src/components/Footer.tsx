import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(45,40%,94%)] border-t border-[hsl(40,20%,85%)]">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/">
              <img
                src='/rebekha-logo.png'
                alt='Rebekha Caterers'
                className='h-20 w-auto'
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src.includes('rebekha-logo.png')) {
                    target.src = '/reblogo.png';
                  }
                }}
              />
            </Link>
            <p className="text-sm text-[hsl(30,10%,35%)] leading-relaxed mt-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem' }}>
              Authentic veg & non-veg catering services for all your special occasions.
              Creating memorable experiences with delicious food since 1998.
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-3 pt-2">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Twitter, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center border border-[hsl(40,20%,85%)] text-[hsl(30,20%,15%)] hover:bg-[hsl(43,76%,58%)] hover:border-[hsl(43,76%,58%)] transition-all duration-300"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium text-[hsl(30,20%,15%)] mb-6 uppercase tracking-wider text-sm">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/services", label: "Services" },
                { to: "/menu", label: "Our Food" },
                { to: "/gallery", label: "Gallery" },
                { to: "/testimonials", label: "Testimonials" },
                { to: "/contact", label: "Enquire" }
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-sm text-[hsl(30,10%,35%)] hover:text-[hsl(38,70%,45%)] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-medium text-[hsl(30,20%,15%)] mb-6 uppercase tracking-wider text-sm">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-[hsl(43,76%,58%)] mt-1 flex-shrink-0" />
                <div>
                  <a
                    href="tel:+919445435102"
                    className="text-sm text-[hsl(30,10%,35%)] hover:text-[hsl(38,70%,45%)] transition-colors"
                  >
                    +91 94454 35102
                  </a>
                  <br />
                  <a
                    href="tel:+919445435103"
                    className="text-sm text-[hsl(30,10%,35%)] hover:text-[hsl(38,70%,45%)] transition-colors"
                  >
                    +91 94454 35103
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-[hsl(43,76%,58%)] mt-1 flex-shrink-0" />
                <a
                  href="mailto:reburr94@gmail.com"
                  className="text-sm text-[hsl(30,10%,35%)] hover:text-[hsl(38,70%,45%)] transition-colors break-all"
                >
                  reburr94@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[hsl(43,76%,58%)] mt-1 flex-shrink-0" />
                <span className="text-sm text-[hsl(30,10%,35%)] leading-relaxed">
                  19, Perumal Koil Street,<br />
                  Irumbuliyur, West Tambaram,<br />
                  Chennai - 600045
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="h-4 w-4 text-[hsl(43,76%,58%)] mt-1 flex-shrink-0" />
                <a
                  href="https://wa.me/918925477007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[hsl(30,10%,35%)] hover:text-[hsl(38,70%,45%)] transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-lg font-medium text-[hsl(30,20%,15%)] mb-6 uppercase tracking-wider text-sm">
              Working Hours
            </h4>
            <ul className="space-y-3 text-sm text-[hsl(30,10%,35%)]">
              <li className="flex justify-between">
                <span>Monday - Saturday</span>
                <span>8:00 AM - 9:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>9:00 AM - 6:00 PM</span>
              </li>
            </ul>

            <div className="mt-8">
              <Link to="/contact">
                <button className="w-full py-3 text-sm font-medium tracking-wider uppercase bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] border-2 border-[hsl(43,76%,58%)] hover:bg-[hsl(38,70%,45%)] hover:border-[hsl(38,70%,45%)] transition-all duration-300">
                  Get Quote
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[hsl(40,20%,85%)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[hsl(30,10%,45%)]">
            <p>
              © {currentYear} Rebekha Catering Services. All rights reserved.
            </p>
            <p>
              Serving Chennai with Love Since 1998
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
