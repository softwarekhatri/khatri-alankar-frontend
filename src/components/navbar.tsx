import { useState, useEffect } from "react";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`relative z-50 px-6 py-6 lg:px-12 lg:py-8 transition-all duration-300 ${isScrolled ? 'bg-black bg-opacity-90 backdrop-blur-sm shadow-lg' : ''
        }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 gold-gradient rounded-lg flex items-center justify-center">
            <span className="text-black font-cinzel font-bold text-xl">KA</span>
          </div>
          <div>
            <h1 className="text-white font-cinzel font-bold text-2xl lg:text-3xl">Khatri Alankar</h1>
            <p className="text-light-gold text-sm font-light">Luxury Jewelry</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
          <button
            onClick={() => onNavigate('catalogue')}
            className="text-white hover:text-luxury-gold transition-colors duration-300 font-medium"
            data-testid="nav-link-catalogue"
          >
            Catalogue
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="text-white hover:text-luxury-gold transition-colors duration-300 font-medium"
            data-testid="nav-link-about"
          >
            About Us
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="text-white hover:text-luxury-gold transition-colors duration-300 font-medium"
            data-testid="nav-link-contact"
          >
            Contact
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-black bg-opacity-95 backdrop-blur-sm transition-all duration-300 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}>
        <div className="px-6 py-6 space-y-4">
          <button
            onClick={() => { onNavigate('catalogue'); setIsMobileMenuOpen(false); }}
            className="block text-white hover:text-luxury-gold transition-colors duration-300 font-medium py-2"
          >
            Catalogue
          </button>
          <button
            onClick={() => { onNavigate('about'); setIsMobileMenuOpen(false); }}
            className="block text-white hover:text-luxury-gold transition-colors duration-300 font-medium py-2"
          >
            About Us
          </button>
          <button
            onClick={() => { onNavigate('contact'); setIsMobileMenuOpen(false); }}
            className="block text-white hover:text-luxury-gold transition-colors duration-300 font-medium py-2"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}
