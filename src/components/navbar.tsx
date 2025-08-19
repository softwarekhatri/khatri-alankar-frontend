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

        {/* Mobile Menu Button (always visible, fixed in mobile menu) */}
        <button
          className={`md:hidden text-white text-2xl focus:outline-none ${isMobileMenuOpen ? 'fixed top-6 right-6 z-[100]' : ''}`}
          style={isMobileMenuOpen ? { position: 'fixed', top: 24, right: 24 } : {}}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          data-testid="button-mobile-menu"
        >
          {isMobileMenuOpen ? (
            // Close (X) icon
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Burger icon
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden fixed inset-0 bg-black bg-opacity-95 backdrop-blur-sm transition-all duration-300 z-50 flex flex-col ${isMobileMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="px-6 py-12 space-y-6 flex-1 flex flex-col justify-center items-center">
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
