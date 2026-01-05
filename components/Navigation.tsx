'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

  return (
    <nav
      className={`fixed top-8 md:top-10 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo/Brand */}
          <Link
            href="/"
            onClick={handleLinkClick}
            className="text-xl md:text-2xl font-bold transition-colors text-[#000080]"
          >
            Digital Khalsa
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              onClick={handleLinkClick}
              className="font-semibold transition-colors hover:opacity-80 text-[#000080]"
            >
              Home
            </Link>
            <Link
              href="/features"
              onClick={handleLinkClick}
              className="font-semibold transition-colors hover:opacity-80 text-[#000080]"
            >
              Features
            </Link>
            <Link
              href="/about"
              onClick={handleLinkClick}
              className="font-semibold transition-colors hover:opacity-80 text-[#000080]"
            >
              About Us
            </Link>
            <Link
              href="/resources"
              onClick={handleLinkClick}
              className="font-semibold transition-colors hover:opacity-80 text-[#000080]"
            >
              Resources
            </Link>
            <Link
              href="/waitlist"
              onClick={handleLinkClick}
              className="px-6 py-2 rounded-lg font-semibold transition-all bg-[#000080] text-white hover:bg-[#000060]"
            >
              Waitlist
            </Link>
            <Link
              href="/waitlist"
              onClick={handleLinkClick}
              className="px-6 py-2 rounded-lg font-semibold transition-all bg-[#FF9933] text-white hover:bg-[#FF8800]"
            >
              Donate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 transition-colors text-[#000080]"
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
          <div className="py-4 space-y-4 bg-white rounded-b-lg -mx-6 px-6">
            <Link
              href="/"
              onClick={handleLinkClick}
              className="block font-semibold transition-colors hover:opacity-80 text-[#000080]"
            >
              Home
            </Link>
            <Link
              href="/features"
              onClick={handleLinkClick}
              className="block font-semibold transition-colors hover:opacity-80 text-[#000080]"
            >
              Features
            </Link>
            <Link
              href="/about"
              onClick={handleLinkClick}
              className="block font-semibold transition-colors hover:opacity-80 text-[#000080]"
            >
              About Us
            </Link>
            <Link
              href="/resources"
              onClick={handleLinkClick}
              className="block font-semibold transition-colors hover:opacity-80 text-[#000080]"
            >
              Resources
            </Link>
            <Link
              href="/waitlist"
              onClick={handleLinkClick}
              className="block px-6 py-2 rounded-lg font-semibold text-center transition-all bg-[#000080] text-white hover:bg-[#000060]"
            >
              Waitlist
            </Link>
            <Link
              href="/waitlist"
              onClick={handleLinkClick}
              className="block px-6 py-2 rounded-lg font-semibold text-center transition-all bg-[#FF9933] text-white hover:bg-[#FF8800]"
            >
              Donate
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

