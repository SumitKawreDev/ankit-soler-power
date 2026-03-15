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
            </div>

            {/* Hero stat cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden lg:grid grid-cols-2 gap-4"
            >
              {[
                { value: '500+', label: 'Projects Installed', icon: '☀️' },
                { value: '20 MW', label: 'Installed Capacity', icon: '⚡' },
                { value: '13+', label: 'Franchise Locations', icon: '📍' },
                { value: '10+', label: 'Years Experience', icon: '🏆' },
              ].map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/15 transition-all"
                >
                  <span className="text-2xl mb-2 block">{card.icon}</span>
                  <p className="text-2xl font-bold text-white mb-1">{card.value}</p>
                  <p className="text-green-200 text-sm">{card.label}</p>
                </motion.div>
              ))}
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
