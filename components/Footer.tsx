'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <span className="font-bold text-lg block">Ankit Solar Power</span>
                <span className="text-xs text-green-300">Enterprise Solar Solutions</span>
              </div>
            </div>
            <p className="text-green-200 text-sm leading-relaxed mb-6">
              India&apos;s trusted commercial solar installation company. Powering hotels, factories, and industrial plants with clean, sustainable energy.
            </p>
            <div className="flex gap-3">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <a key={social} href="#" className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center hover:bg-primary-light transition-colors">
                  <span className="sr-only">{social}</span>
                  <svg className="w-4 h-4 text-green-200" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/projects?category=commercial', label: 'Commercial Projects' },
                { href: '/projects?category=residential', label: 'Residential Projects' },
                { href: '/services', label: 'Our Services' },
                { href: '/franchise', label: 'Franchise Program' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-green-300 hover:text-accent text-sm flex items-center gap-2 transition-colors">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Our Services</h3>
            <ul className="space-y-2">
              {[
                'Commercial Solar Installation',
                'Industrial Solar Plants',
                'Residential Solar Systems',
                'Solar for Hotels',
                'Solar Franchise Program',
                'Solar Maintenance',
              ].map((service) => (
                <li key={service} className="text-green-300 text-sm flex items-center gap-2">
                  <svg className="w-3 h-3 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-green-400">Phone</p>
                  <a href="tel:+919876543210" className="text-green-200 hover:text-accent text-sm transition-colors">+91 98765 43210</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-green-400">Email</p>
                  <a href="mailto:info@ankitsolar.com" className="text-green-200 hover:text-accent text-sm transition-colors">info@ankitsolar.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-green-400">Location</p>
                  <p className="text-green-200 text-sm">India (Pan-India Operations)</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-green-400 text-sm">
            &copy; {new Date().getFullYear()} Ankit Solar Power. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-green-400 text-sm">
            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a5 5 0 015 5v3H7V7a5 5 0 015-5zm5 10H7l-1 10h12l-1-10z" />
            </svg>
            Powering India with Clean Solar Energy
          </div>
        </div>
      </div>
    </footer>
  );
}
