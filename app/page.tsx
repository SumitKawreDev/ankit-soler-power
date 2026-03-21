'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import SiteLayout from '@/components/SiteLayout';

/* ────────────────────────── helper: animated counter ────────────────────────── */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ────────────────────────── Solar Hero Animation ────────────────────────── */
function SolarHeroAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-visible">
      {/* Animated Sun */}
      <motion.div
        className="absolute top-2 right-2 md:top-4 md:right-4 lg:top-8 lg:right-8 w-16 h-16 md:w-20 md:h-20 lg:w-28 lg:h-28"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 120 120" className="w-full h-full text-accent">
          <circle cx="60" cy="60" r="25" fill="currentColor" />
          {[...Array(12)].map((_, i) => (
            <motion.line
              key={i}
              x1="60"
              y1="60"
              x2={60 + 45 * Math.cos((i * 30 * Math.PI) / 180)}
              y2={60 + 45 * Math.sin((i * 30 * Math.PI) / 180)}
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Sun Rays Animation */}
      <div className="absolute top-8 right-8 w-32 h-32 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 bg-gradient-to-b from-accent/40 to-transparent"
            style={{
              height: '100px',
              left: `${10 + i * 15}%`,
              top: '80px',
              transformOrigin: 'top center',
              transform: `rotate(${-30 + i * 12}deg)`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scaleY: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Solar Panel Array */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[320px]"
      >
        <svg viewBox="0 0 320 220" fill="none" className="w-full h-auto">
          {/* Solar Panel Row 1 */}
          <g transform="translate(20, 80)">
            {/* Panel Frame */}
            <rect x="0" y="0" width="280" height="100" rx="4" fill="#023d2a" stroke="#034d35" strokeWidth="2" />
            
            {/* Panel Cells */}
            {[0, 1, 2, 3, 4, 5].map((col) => (
              <g key={col}>
                <rect 
                  x={10 + col * 45} 
                  y="10" 
                  width="40" 
                  height="35" 
                  fill="#0a5c40" 
                  stroke="#023d2a" 
                  strokeWidth="1"
                />
                <rect 
                  x={10 + col * 45} 
                  y="50" 
                  width="40" 
                  height="35" 
                  fill="#0a5c40" 
                  stroke="#023d2a" 
                  strokeWidth="1"
                />
                {/* Cell reflection */}
                <motion.rect
                  x={12 + col * 45}
                  y="12"
                  width="36"
                  height="31"
                  fill="url(#panelGradient)"
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: col * 0.2 }}
                />
              </g>
            ))}
            
            {/* Stand */}
            <rect x="130" y="100" width="20" height="40" fill="#666" />
            <rect x="100" y="140" width="80" height="10" fill="#555" />
          </g>

          {/* Energy Particles */}
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.circle
              key={i}
              cx={40 + i * 50}
              cy="75"
              r="5"
              fill="#f5a623"
              initial={{ opacity: 0, y: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                y: [0, -30]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeOut"
              }}
            />
          ))}

          {/* Electricity Flow Lines */}
          <motion.path
            d="M 140 150 L 140 180 L 180 180"
            stroke="#f5a623"
            strokeWidth="3"
            fill="none"
            strokeDasharray="10 5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Lightning Bolt */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <polygon points="190,170 200,185 195,185 202,200 185,190 190,190 183,170" fill="#f5a623" />
          </motion.g>

          {/* Ground Line */}
          <line x1="0" y1="210" x2="320" y2="210" stroke="#023d2a" strokeWidth="2" opacity="0.3" />
          
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="panelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a7a5c" />
              <stop offset="100%" stopColor="#0a5c40" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Floating Energy Icons */}
      <motion.div
        className="absolute top-1/3 left-8"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="45" height="45" viewBox="0 0 24 24" fill="#f5a623" opacity="0.8">
          <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/>
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-12"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <svg width="35" height="35" viewBox="0 0 24 24" fill="#ffffff" opacity="0.4">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* Clean Energy Badge */}
      <motion.div
        className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          <span className="text-white text-sm font-medium">100% Clean Energy</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ────────────────────────── section animation wrapper ────────────────────────── */
function Section({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ────────────────────────── We Serve Industries Section ────────────────────────── */
function IndustriesSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const industries = [
    {
      name: 'Textile Industry',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      description: 'High-capacity solar installations for textile mills and garment factories.',
    },
    {
      name: 'Automotive Industry',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 10l2-5h10l2 5v7H5v-7z" />
          <circle cx="7.5" cy="17.5" r="1.5" />
          <circle cx="16.5" cy="17.5" r="1.5" />
        </svg>
      ),
      description: 'Powering automotive manufacturing with sustainable solar energy solutions.',
    },
    {
      name: 'Pharmaceutical Industry',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      description: 'Reliable solar power for pharmaceutical plants and research facilities.',
    },
    {
      name: 'IT Parks',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      description: 'Clean energy solutions for tech campuses and data centers.',
    },
    {
      name: 'Factories / Manufacturing Plants',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      description: 'Industrial-grade solar installations for maximum energy efficiency.',
    },
    {
      name: 'Agriculture Sector',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2L2 7l10 5 10-5-10-5z" />
        </svg>
      ),
      description: 'Solar pumping and irrigation solutions for modern farming.',
    },
  ];

  const slidesPerView = 3;
  const totalSlides = Math.ceil(industries.length / slidesPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const visibleIndustries = industries.slice(
    currentSlide * slidesPerView,
    currentSlide * slidesPerView + slidesPerView
  );

  return (
    <Section className="section-padding bg-primary">
      <div className="container-max">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-3 block">Industries We Work With</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              We Serve <span className="text-accent">Industries</span>
            </h2>
          </div>

          {/* Navigation Arrow */}
          <div className="mt-4 md:mt-0">
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 border border-white/20"
              aria-label="Next industries"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Industry Cards Carousel */}
        <div className="overflow-hidden">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {visibleIndustries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center text-accent mb-5 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  {industry.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{industry.name}</h3>
                <p className="text-green-100 text-sm leading-relaxed">{industry.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'w-8 bg-accent' : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════════
   HOME PAGE
   ════════════════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  interface ProjectCardData {
    _id: string;
    name: string;
    capacity: string;
    state: string;
    district: string;
    images: string[];
    category: string;
  }

  const [featuredProjects, setFeaturedProjects] = useState<ProjectCardData[]>([]);

  useEffect(() => {
    fetch('/api/projects?featured=true&limit=6')
      .then((r) => r.json())
      .then((d) => { if (d.data) setFeaturedProjects(d.data); })
      .catch(() => { });
  }, []);

  return (
    <SiteLayout>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-hero-gradient">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full border border-white/5"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-60 -left-60 w-[800px] h-[800px] rounded-full border border-white/5"
          />
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-green-400/10 rounded-full blur-3xl" />
          {/* Solar panel grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #fff 40px, #fff 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #fff 40px, #fff 41px)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-green-200 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  India&apos;s Trusted Solar Partner
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                Powering India with{' '}
                <span className="text-accent">Clean Solar</span>{' '}
                Energy Solutions
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-green-100 text-lg md:text-xl leading-relaxed mb-8 max-w-xl"
              >
                Enterprise-grade solar installations for hotels, factories, industrial plants, and commercial buildings. From consultation to commissioning — we power your future.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/contact"
                  className="bg-accent hover:bg-accent-light text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all text-base"
                >
                  Get Free Quote →
                </Link>
                <Link
                  href="/projects?category=commercial"
                  className="border-2 border-white/30 hover:border-white/50 text-white font-semibold px-8 py-3.5 rounded-xl transition-all text-base backdrop-blur-sm"
                >
                  View Projects
                </Link>
              </motion.div>

              {/* Solar Animation - Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="md:hidden mt-8 relative h-[300px] w-full"
              >
                <SolarHeroAnimation />
              </motion.div>
            </div>

            {/* Solar Animation - Desktop & Tablet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden md:block relative h-[350px] lg:h-[500px] w-full"
            >
              <SolarHeroAnimation />
            </motion.div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
            <path fill="#ffffff" d="M0,64L80,58.7C160,53,320,43,480,42.7C640,43,800,53,960,56C1120,59,1280,53,1360,50.7L1440,48L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z" />
          </svg>
        </div>
      </section>

      {/* ─── COMPANY OVERVIEW ─── */}
      <Section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-accent font-semibold text-sm tracking-wider uppercase mb-3 block"
              >
                About Our Company
              </motion.span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Leading the <span className="text-primary">Solar Revolution</span> Across India
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Ankit Solar Power is a premier enterprise solar energy company specializing in large-scale commercial and industrial solar installations. With over a decade of experience, we&apos;ve helped hundreds of businesses reduce their energy costs and carbon footprint.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                From hotels and factories to industrial plants and housing societies, we provide end-to-end solar solutions that deliver reliable, clean energy and significant cost savings.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'End-to-End Solutions', icon: '🔧' },
                  { label: 'Pan-India Operations', icon: '🇮🇳' },
                  { label: 'Government Subsidy Assistance', icon: '📋' },
                  { label: 'After-Sales Support', icon: '🛡️' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 bg-gray-solar rounded-xl px-4 py-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-primary/5 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: 500, suffix: '+', label: 'Projects Completed' },
                    { value: 20, suffix: ' MW', label: 'Installed Capacity' },
                    { value: 98, suffix: '%', label: 'Client Satisfaction' },
                    { value: 13, suffix: '+', label: 'Franchise Partners' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-4">
                      <p className="text-3xl md:text-4xl font-bold text-primary mb-1">
                        <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                      </p>
                      <p className="text-gray-500 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </Section>

      {/* ─── SERVICES ─── */}
      <Section className="section-padding bg-gray-solar">
        <div className="container-max">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-3 block">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Solar <span className="text-primary">Services</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">End-to-end solar energy solutions tailored for every scale — from rooftop residential installations to massive industrial solar plants.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Commercial Solar Installation',
                desc: 'Large-scale solar solutions for hotels, factories, industrial plants, and commercial buildings. Maximize ROI with premium solar infrastructure.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                highlight: true,
                href: '/services',
              },
              {
                title: 'Residential Solar Systems',
                desc: 'Affordable rooftop solar panels for homes. Go green, save on electricity bills, and contribute to a sustainable future for your family.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
                highlight: false,
                href: '/services',
              },
              {
                title: 'Solar Franchise Program',
                desc: 'Join India\'s fastest growing solar franchise network. Start your own solar business with our proven model, training, and brand support.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                highlight: false,
                href: '/franchise',
              },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={service.href}>
                  <div
                    className={`group relative rounded-2xl p-8 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${service.highlight
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-white text-gray-900 shadow-md'
                      }`}
                  >
                    {service.highlight && (
                      <span className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">Popular</span>
                    )}
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${service.highlight ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'
                        }`}
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className={`text-sm leading-relaxed mb-4 ${service.highlight ? 'text-green-100' : 'text-gray-600'}`}>
                      {service.desc}
                    </p>
                    <span className={`inline-flex items-center gap-1 text-sm font-semibold ${service.highlight ? 'text-accent' : 'text-primary'} group-hover:gap-2 transition-all`}>
                      Learn More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── WE SERVE INDUSTRIES ─── */}
      <IndustriesSection />

      {/* ─── FEATURED PROJECTS ─── */}
      <Section className="section-padding bg-white">
        <div className="container-max">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-3 block">Our Portfolio</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Featured <span className="text-primary">Solar Projects</span>
              </h2>
            </div>
            <Link
              href="/projects?category=commercial"
              className="mt-4 md:mt-0 text-primary font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All Projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, i) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link href={`/projects/${project._id}`}>
                    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="relative h-52 bg-gray-200 overflow-hidden">
                        {project.images?.[0] ? (
                          <img
                            src={project.images[0]}
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                            <svg className="w-12 h-12 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-card-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="absolute top-3 left-3 bg-primary/90 text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">
                          {project.category}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{project.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            {project.capacity}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {project.district}, {project.state}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Placeholder project cards when no data from API */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Hotel Sunrise Solar Plant', capacity: '100 KW', location: 'Mumbai, Maharashtra', cat: 'commercial' },
                { name: 'Greenfield Industries', capacity: '500 KW', location: 'Ahmedabad, Gujarat', cat: 'commercial' },
                { name: 'Skyline Housing Society', capacity: '50 KW', location: 'Pune, Maharashtra', cat: 'residential' },
                { name: 'Sharma Textiles Factory', capacity: '250 KW', location: 'Jaipur, Rajasthan', cat: 'commercial' },
                { name: 'Patel Residence', capacity: '10 KW', location: 'Surat, Gujarat', cat: 'residential' },
                { name: 'Royal Grand Hotel Solar', capacity: '200 KW', location: 'Delhi NCR', cat: 'commercial' },
              ].map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-52 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center overflow-hidden">
                      <svg className="w-16 h-16 text-primary/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className="absolute top-3 left-3 bg-primary/90 text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">{p.cat}</span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{p.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          {p.capacity}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {p.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* ─── STATISTICS BANNER ─── */}
      <section className="bg-hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { target: 500, suffix: '+', label: 'Projects Installed', icon: '☀️' },
              { target: 20, suffix: ' MW', label: 'Installed Capacity', icon: '⚡' },
              { target: 13, suffix: '+', label: 'Franchise Locations', icon: '📍' },
              { target: 98, suffix: '%', label: 'Happy Clients', icon: '⭐' },
            ].map((stat) => (
              <div key={stat.label}>
                <span className="text-3xl mb-2 block">{stat.icon}</span>
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </p>
                <p className="text-green-200 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FRANCHISE OPPORTUNITY ─── */}
      <Section className="section-padding bg-white">
        <div className="container-max">
          <div className="bg-gradient-to-br from-primary via-primary-light to-primary-dark rounded-3xl p-8 md:p-14 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
            </div>
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-flex items-center gap-2 bg-accent/20 text-accent text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                  🤝 Business Opportunity
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Start Your Own Solar Business
                </h2>
                <p className="text-green-100 leading-relaxed mb-6">
                  Join India&apos;s fastest-growing solar franchise network. With 13+ locations across India, Ankit Solar Power offers a proven franchise model with full training, brand support, and ongoing technical assistance.
                </p>
                <div className="space-y-3 mb-8">
                  {['Low investment, high returns', 'Complete training & certification', 'Brand & marketing support', 'Ongoing technical assistance'].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-green-100">
                      <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/franchise"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg transition-all"
                >
                  Apply for Franchise →
                </Link>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <div className="w-64 h-64 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-white mb-2">13+</p>
                    <p className="text-green-200 text-sm">Franchise Partners</p>
                    <p className="text-green-200 text-sm">Across India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── FINAL CTA ─── */}
      <section className="section-padding bg-gray-solar">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-3 block">Ready to Go Solar?</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get a Free Solar <span className="text-primary">Consultation</span> Today
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Whether you need solar for your commercial property, residential home, or want to start a solar franchise — we&apos;re here to help. Get a customized quote within 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-primary hover:bg-primary-light text-white font-semibold px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all text-base"
              >
                Get Solar Quote →
              </Link>
              <a
                href="tel:+919876543210"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-10 py-4 rounded-xl transition-all text-base"
              >
                Call Us Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </SiteLayout>
  );
}
