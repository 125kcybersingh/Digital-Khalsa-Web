'use client';

import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hero section is approximately 400-500px tall, so we'll use 100px as threshold
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-8 md:top-10 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo/Brand */}
          <button
            onClick={scrollToTop}
            className={`text-xl md:text-2xl font-bold transition-colors ${
              isScrolled ? 'text-[#000080]' : 'text-white'
            }`}
          >
            Digital Khalsa
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className={`font-semibold transition-colors hover:opacity-80 ${
                isScrolled ? 'text-[#000080]' : 'text-white'
              }`}
            >
              Home
            </a>
            <a
              href="#features"
              onClick={handleLinkClick}
              className={`font-semibold transition-colors hover:opacity-80 ${
                isScrolled ? 'text-[#000080]' : 'text-white'
              }`}
            >
              Features
            </a>
            <a
              href="#features"
              onClick={handleLinkClick}
              className={`font-semibold transition-colors hover:opacity-80 ${
                isScrolled ? 'text-[#000080]' : 'text-white'
              }`}
            >
              Try It Now
            </a>
            <a
              href="#waitlist"
              onClick={handleLinkClick}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                isScrolled
                  ? 'bg-[#000080] text-white hover:bg-[#000060]'
                  : 'bg-white text-[#000080] hover:bg-gray-50'
              }`}
            >
              Waitlist
            </a>
            <a
              href="#waitlist"
              onClick={handleLinkClick}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                isScrolled
                  ? 'bg-[#FF9933] text-white hover:bg-[#FF8800]'
                  : 'bg-[#FF9933] text-white hover:bg-[#FF8800]'
              }`}
            >
              Donate
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ${
              isScrolled ? 'text-[#000080]' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <span
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div
            className={`py-4 space-y-4 ${
              isScrolled ? 'bg-white' : 'bg-[#000080]/95 backdrop-blur-sm'
            } rounded-b-lg -mx-6 px-6`}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className={`block font-semibold transition-colors hover:opacity-80 ${
                isScrolled ? 'text-[#000080]' : 'text-white'
              }`}
            >
              Home
            </a>
            <a
              href="#features"
              onClick={handleLinkClick}
              className={`block font-semibold transition-colors hover:opacity-80 ${
                isScrolled ? 'text-[#000080]' : 'text-white'
              }`}
            >
              Features
            </a>
            <a
              href="#features"
              onClick={handleLinkClick}
              className={`block font-semibold transition-colors hover:opacity-80 ${
                isScrolled ? 'text-[#000080]' : 'text-white'
              }`}
            >
              Try It Now
            </a>
            <a
              href="#waitlist"
              onClick={handleLinkClick}
              className={`block px-6 py-2 rounded-lg font-semibold text-center transition-all ${
                isScrolled
                  ? 'bg-[#000080] text-white hover:bg-[#000060]'
                  : 'bg-white text-[#000080] hover:bg-gray-50'
              }`}
            >
              Waitlist
            </a>
            <a
              href="#waitlist"
              onClick={handleLinkClick}
              className={`block px-6 py-2 rounded-lg font-semibold text-center transition-all bg-[#FF9933] text-white hover:bg-[#FF8800]`}
            >
              Donate
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

