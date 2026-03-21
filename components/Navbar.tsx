'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onGetQuote: () => void;
}

export default function Navbar({ onGetQuote }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setProjectsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/franchise', label: 'Franchise' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => pathname === href;

  // Check if current page needs transparent navbar (only home page with hero)
  const isHomePage = pathname === '/';

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-md group-hover:bg-primary-light transition-colors">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <span className={`font-bold text-lg leading-tight block ${isScrolled || !isHomePage ? 'text-primary' : 'text-white'}`}>
                Ankit Solar
              </span>
              <span className={`text-xs leading-tight block ${isScrolled || !isHomePage ? 'text-gray-500' : 'text-green-200'}`}>
                Power Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, 1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  isActive(link.href)
                    ? 'text-primary bg-green-50'
                    : isScrolled || !isHomePage
                    ? 'text-gray-700 hover:text-primary hover:bg-green-50'
                    : 'text-white hover:text-green-200'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Projects Dropdown */}
            <div className="relative" onMouseEnter={() => setProjectsOpen(true)} onMouseLeave={() => setProjectsOpen(false)}>
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  pathname.startsWith('/projects')
                    ? 'text-primary bg-green-50'
                    : isScrolled || !isHomePage
                    ? 'text-gray-700 hover:text-primary hover:bg-green-50'
                    : 'text-white hover:text-green-200'
                }`}
              >
                Projects
                <svg className={`w-4 h-4 transition-transform ${projectsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {projectsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                  >
                    <Link href="/projects?category=commercial" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-primary transition-colors">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      Commercial Projects
                    </Link>
                    <Link href="/projects?category=residential" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-primary transition-colors">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      Residential Projects
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  isActive(link.href)
                    ? 'text-primary bg-green-50'
                    : isScrolled || !isHomePage
                    ? 'text-gray-700 hover:text-primary hover:bg-green-50'
                    : 'text-white hover:text-green-200'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetQuote}
              className="bg-accent hover:bg-accent-light text-white font-semibold px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all text-sm"
            >
              Get Quote
            </motion.button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`lg:hidden p-2 rounded-lg ${isScrolled || !isHomePage ? 'text-gray-700' : 'text-white'}`}
            aria-label="Toggle menu"
          >
            <motion.div animate={isMobileOpen ? 'open' : 'closed'} className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                variants={{ open: { rotate: 45, y: 8 }, closed: { rotate: 0, y: 0 } }}
                className={`block h-0.5 w-full rounded ${isScrolled ? 'bg-gray-700' : 'bg-white'}`}
              />
              <motion.span
                variants={{ open: { opacity: 0 }, closed: { opacity: 1 } }}
                className={`block h-0.5 w-full rounded ${isScrolled ? 'bg-gray-700' : 'bg-white'}`}
              />
              <motion.span
                variants={{ open: { rotate: -45, y: -8 }, closed: { rotate: 0, y: 0 } }}
                className={`block h-0.5 w-full rounded ${isScrolled ? 'bg-gray-700' : 'bg-white'}`}
              />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              <Link href="/" className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-primary font-medium">Home</Link>
              <Link href="/projects?category=commercial" className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-primary font-medium">Commercial Projects</Link>
              <Link href="/projects?category=residential" className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-primary font-medium">Residential Projects</Link>
              <Link href="/services" className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-primary font-medium">Services</Link>
              <Link href="/franchise" className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-primary font-medium">Franchise</Link>
              <Link href="/about" className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-primary font-medium">About</Link>
              <Link href="/contact" className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-primary font-medium">Contact</Link>
              <button
                onClick={() => { onGetQuote(); setIsMobileOpen(false); }}
                className="w-full mt-2 bg-accent text-white font-semibold py-3 rounded-xl"
              >
                Get Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
