import { useEffect, useState } from "react";
import { useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { HeroCarousel } from "@/components/hero-carousel";
import { ProductGrid } from "@/components/product-grid";
import { ContactForm } from "@/components/contact-form";
import { ProductModal } from "@/components/product-modal";
import type { Product } from "@/lib/product-data";


export default function Home() {
  const { toast } = useToast();
  const [showHeroText, setShowHeroText] = useState(true);
  const [showHeroOverlay, setShowHeroOverlay] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch filter options from API
  const { data: filterOptions, isLoading: isFiltersLoading } = useQuery<{ categories: { code: string; displayName: string }[]; metalTypes: { code: string; displayName: string }[] }>({
    queryKey: ['filters'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/filters`);
      if (!res.ok) throw new Error('Failed to fetch filters');
      return res.json();
    }
  });

  const [filters, setFilters] = useState({
    category: '',
    metalType: '',
    gender: ''
  });
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8); // You can adjust page size as needed

  // Build query params for products API
  const params = new URLSearchParams();
  params.set('page', String(page));
  params.set('limit', String(pageSize));
  if (filters.category) params.set('category', filters.category);
  if (filters.metalType) params.set('metalType', filters.metalType);
  if (filters.gender && filters.gender !== 'All') params.set('gender', filters.gender);
  if (debouncedSearch) params.set('search', debouncedSearch);

  const { data, isLoading } = useQuery<{ items: Product[]; total: number }>({
    queryKey: ['products', page, pageSize, filters, debouncedSearch],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      return res.json();
    },
    enabled: debouncedSearch.length === 0 || debouncedSearch.length > 0,
  });

  const products = data?.items || [];
  const totalProducts = data?.total || 0;

  // No client-side sorting, just use products as returned
  const filteredProducts = products;

  // Debounce search input
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 800);
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [search]);

  const handleWhatsappShare = (product: Product) => {
    const message = `Check out this beautiful ${product.name} (${product.code}) from Khatri Alankar! ${window.location.href}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Copy product-specific link and open modal on load if param is present
  const handleCopyLink = async (product?: Product) => {
    try {
      let url = window.location.origin + window.location.pathname;
      if (product && product.code) {
        url += `?product=${encodeURIComponent(product.code)}`;
      }
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link Copied!",
        description: "Product link copied to clipboard.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  // Open product modal if ?product= is present in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('product');
    if (code && products.length > 0) {
      const found = products.find(p => p.code === code);
      if (found) setSelectedProduct(found);
    }
  }, [products]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Integrated Navbar */}
      <section id="home" className="relative min-h-screen overflow-hidden">
        <HeroCarousel />
        {showHeroOverlay && (
          <div className="absolute inset-0 hero-gradient"></div>
        )}
        <Navbar onNavigate={scrollToSection} />
        {/* Hero Content */}
        {showHeroText && (
          <div className="relative z-40 flex items-center justify-center min-h-screen px-6 lg:px-12 -mt-24">
            <div className="text-center max-w-4xl mx-auto">
              <div className="hero-content animate-fade-in">
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-playfair font-bold text-white mb-6 leading-tight">
                  Exclusive Festive <span className="text-luxury-gold">Collection</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Discover our handcrafted luxury jewelry collection featuring timeless elegance and modern sophistication
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={() => scrollToSection('catalogue')}
                    className="gold-gradient text-black px-8 py-4 rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    data-testid="button-explore-collection"
                  >
                    Explore Collection
                  </button>
                  <button
                    className="border-2 border-luxury-gold text-luxury-gold px-8 py-4 rounded-lg font-semibold hover:bg-luxury-gold hover:text-black transition-all duration-300"
                    onClick={() => {
                      setShowHeroText(false);
                      setShowHeroOverlay(false);
                    }}
                    data-testid="button-view-images-only"
                  >
                    Focus on Branding
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Catalogue Section */}
      <section id="catalogue" className="py-20 bg-soft-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-elegant-black mb-4">Our Collection</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Exquisite handcrafted jewelry pieces that celebrate life's precious moments</p>
          </div>

          {/* Filters & Sorting */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all duration-300"
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  data-testid="select-category"
                  disabled={isFiltersLoading}
                >
                  <option value="">All Categories (सभी श्रेणियाँ)</option>
                  {filterOptions?.categories.map(cat => (
                    <option key={cat.code} value={cat.code}>{cat.displayName}</option>
                  ))}
                </select>
              </div>

              {/* Metal Type Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Metal Type</label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all duration-300"
                  value={filters.metalType}
                  onChange={(e) => setFilters({ ...filters, metalType: e.target.value })}
                  data-testid="select-metal-type"
                  disabled={isFiltersLoading}
                >
                  <option value="">All Metals</option>
                  {filterOptions?.metalTypes.map(metal => (
                    <option key={metal.code} value={metal.code}>{metal.displayName}</option>
                  ))}
                </select>
              </div>

              {/* Gender Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all duration-300"
                  value={filters.gender}
                  onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                  data-testid="select-gender"
                >
                  <option>All</option>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Unisex</option>
                </select>
              </div>

              {/* Search Input (instant) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all duration-300"
                  placeholder="Search by name or code"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  data-testid="input-search-products"
                />
              </div>
            </div>
          </div>

          <ProductGrid
            products={filteredProducts}
            isLoading={isLoading}
            onProductClick={setSelectedProduct}
            onWhatsappShare={handleWhatsappShare}
            onCopyLink={handleCopyLink}
            page={page}
            pageSize={pageSize}
            totalProducts={totalProducts}
            onPageChange={setPage}
          />
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="animate-slide-up">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-elegant-black mb-6">
                Crafting Excellence Since <span className="text-luxury-gold">1985</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Khatri Alankar has been a symbol of luxury and craftsmanship for over three decades. Our master artisans combine traditional techniques with contemporary designs to create jewelry pieces that tell stories and celebrate life's precious moments.
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Every piece in our collection is meticulously handcrafted using the finest materials - from 916 gold to platinum and the most exquisite gemstones. We believe that jewelry is not just an accessory, but an expression of your unique personality and style.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-luxury-gold mb-2">1000+</div>
                  <p className="text-gray-600">Happy Customers</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-luxury-gold mb-2">500+</div>
                  <p className="text-gray-600">Unique Designs</p>
                </div>
              </div>
            </div>

            {/* Image/Video */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1608042314453-ae338d80c427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Jewelry craftsmanship workshop"
                className="rounded-xl shadow-2xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl"></div>

              {/* Play Button for Craftsmanship Video */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-300 transform hover:scale-110">
                  <svg className="w-8 h-8 text-luxury-gold ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactForm />

      {/* Footer */}
      <footer className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand Information */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 gold-gradient rounded-lg flex items-center justify-center">
                  <span className="text-black font-cinzel font-bold text-xl">KA</span>
                </div>
                <div>
                  <h3 className="text-white font-cinzel font-bold text-2xl">Khatri Alankar</h3>
                  <p className="text-luxury-gold text-sm">Luxury Jewelry</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Creating timeless jewelry pieces that celebrate life's precious moments with exceptional craftsmanship and elegance.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-playfair font-bold text-xl mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><button onClick={() => scrollToSection('home')} className="text-gray-400 hover:text-luxury-gold transition-colors duration-300">Home</button></li>
                <li><button onClick={() => scrollToSection('catalogue')} className="text-gray-400 hover:text-luxury-gold transition-colors duration-300">Catalogue</button></li>
                <li><button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-luxury-gold transition-colors duration-300">About Us</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-luxury-gold transition-colors duration-300">Contact</button></li>
                <li></li>
              </ul>
            </div>

            {/* Connect With Us */}
            <div>
              <h4 className="text-white font-playfair font-bold text-xl mb-6">Connect With Us</h4>
              <div className="flex space-x-4 mb-6">
                <a href="#" className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-luxury-gold hover:text-black transition-all duration-300 transform hover:scale-110">
                  <svg className="w-5 h-5" fill="#05b9ed" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-luxury-gold hover:text-black transition-all duration-300 transform hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.219-.359-1.219c0-1.142.662-1.995 1.488-1.995.219 0 .438.16.438.438 0 .219-.139.518-.219.797-.179.797.399 1.436 1.197 1.436 1.437 0 2.545-1.516 2.545-3.694 0-1.934-1.397-3.288-3.394-3.288-2.304 0-3.661 1.715-3.661 3.533 0 .179.02.359.059.518.179.438.359.877.359 1.317 0 .797-.399 1.436-1.197 1.436-.797 0-1.197-.639-1.197-1.436 0-.179.02-.359.059-.518.179-.797.518-1.914.518-2.711 0-2.525-1.536-4.56-4.302-4.56-2.944 0-5.028 2.186-5.028 5.131 0 1.018.239 2.067.718 2.97.139.219.179.438.139.697-.139.717-.458 1.873-.518 2.129-.059.438-.298.538-.718.318C2.614 19.01.029 15.645.029 11.987.029 5.367 5.396.001 12.017.001z" />
                  </svg>
                </a>
                <a href="#" className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-luxury-gold hover:text-black transition-all duration-300 transform hover:scale-110">
                  <svg className="w-5 h-5" fill="#39df5a" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.085" />
                  </svg>
                </a>
                <a href="#" className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-luxury-gold hover:text-black transition-all duration-300 transform hover:scale-110">
                  <svg className="w-5 h-5" fill="red" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
              <a href="#" className="text-xl text-luxury-gold  hover:text-yellow-100 transition-colors duration-300"><span className="inline-flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.085" />
                </svg>
                Place your Custom Order
              </span></a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Khatri Alankar. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-luxury-gold transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-luxury-gold transition-colors duration-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onWhatsappShare={() => handleWhatsappShare(selectedProduct)}
          onCopyLink={handleCopyLink}
        />
      )}
    </div>
  );
}
