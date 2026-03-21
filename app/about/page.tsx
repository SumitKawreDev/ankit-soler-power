'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import SiteLayout from '@/components/SiteLayout';

// Animated Counter Component
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    setCount(target);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);
            return () => clearInterval(timer);
        }
    }, [isInView, target]);

    return (
        <span ref={ref}>
            {count}{suffix}
        </span>
    );
}

// Animated Solar Installation Illustration
function SolarInstallationAnimation() {
    return (
        <div className="relative w-full h-full min-h-[400px]">
            {/* Sun with animated rays */}
            <motion.div
                className="absolute top-4 right-4 md:top-8 md:right-8"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
                <svg width="100" height="100" viewBox="0 0 100 100" className="text-accent">
                    <circle cx="50" cy="50" r="20" fill="currentColor" />
                    {[...Array(12)].map((_, i) => (
                        <motion.line
                            key={i}
                            x1="50" y1="50"
                            x2={50 + 35 * Math.cos((i * 30 * Math.PI) / 180)}
                            y2={50 + 35 * Math.sin((i * 30 * Math.PI) / 180)}
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        />
                    ))}
                </svg>
            </motion.div>

            {/* Building with solar panels */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
            >
                <svg width="280" height="200" viewBox="0 0 280 200" fill="none">
                    {/* Building */}
                    <rect x="60" y="80" width="160" height="120" fill="#e8f4f0" stroke="#023d2a" strokeWidth="2" rx="4" />
                    
                    {/* Windows */}
                    <rect x="80" y="100" width="30" height="30" fill="#023d2a" opacity="0.3" rx="2" />
                    <rect x="125" y="100" width="30" height="30" fill="#023d2a" opacity="0.3" rx="2" />
                    <rect x="170" y="100" width="30" height="30" fill="#023d2a" opacity="0.3" rx="2" />
                    <rect x="80" y="145" width="30" height="30" fill="#023d2a" opacity="0.3" rx="2" />
                    <rect x="125" y="145" width="30" height="30" fill="#023d2a" opacity="0.3" rx="2" />
                    <rect x="170" y="145" width="30" height="30" fill="#023d2a" opacity="0.3" rx="2" />
                    
                    {/* Solar panels on roof */}
                    <motion.g
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                    >
                        <rect x="50" y="55" width="180" height="25" fill="#023d2a" rx="3" />
                        <line x1="80" y1="55" x2="80" y2="80" stroke="#034d35" strokeWidth="2" />
                        <line x1="110" y1="55" x2="110" y2="80" stroke="#034d35" strokeWidth="2" />
                        <line x1="140" y1="55" x2="140" y2="80" stroke="#034d35" strokeWidth="2" />
                        <line x1="170" y1="55" x2="170" y2="80" stroke="#034d35" strokeWidth="2" />
                        <line x1="200" y1="55" x2="200" y2="80" stroke="#034d35" strokeWidth="2" />
                        
                        {/* Animated energy lines */}
                        <motion.circle
                            cx="90" cy="42" r="4" fill="#f5a623"
                            animate={{ opacity: [0, 1, 0], y: [0, -15] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                        />
                        <motion.circle
                            cx="140" cy="38" r="4" fill="#f5a623"
                            animate={{ opacity: [0, 1, 0], y: [0, -15] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                        />
                        <motion.circle
                            cx="190" cy="42" r="4" fill="#f5a623"
                            animate={{ opacity: [0, 1, 0], y: [0, -15] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                        />
                    </motion.g>
                    
                    {/* Ground */}
                    <rect x="0" y="195" width="280" height="5" fill="#023d2a" opacity="0.2" />
                </svg>
            </motion.div>

            {/* Floating energy icons */}
            <motion.div
                className="absolute top-1/2 left-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="#f5a623">
                    <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/>
                </svg>
            </motion.div>

            <motion.div
                className="absolute top-1/3 right-8"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <svg width="35" height="35" viewBox="0 0 24 24" fill="#023d2a" opacity="0.6">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
            </motion.div>
        </div>
    );
}

// Accurate India Map Component
function IndiaMapComparison() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    // Major solar locations in India (approximate positions)
    const currentLocations = [
        // Rajasthan
        { cx: 85, cy: 160, r: 4 },
        { cx: 95, cy: 170, r: 3 },
        { cx: 80, cy: 175, r: 3 },
        // Gujarat
        { cx: 60, cy: 200, r: 4 },
        { cx: 70, cy: 210, r: 3 },
        // Madhya Pradesh
        { cx: 130, cy: 200, r: 3 },
        { cx: 140, cy: 190, r: 3 },
        // Maharashtra
        { cx: 100, cy: 240, r: 4 },
        { cx: 110, cy: 250, r: 3 },
        // Karnataka
        { cx: 100, cy: 300, r: 4 },
        { cx: 110, cy: 310, r: 3 },
        // Tamil Nadu
        { cx: 125, cy: 360, r: 4 },
        { cx: 135, cy: 370, r: 3 },
        // Andhra Pradesh
        { cx: 130, cy: 320, r: 3 },
        { cx: 140, cy: 310, r: 3 },
        // Telangana
        { cx: 125, cy: 270, r: 3 },
        // Uttar Pradesh
        { cx: 150, cy: 150, r: 3 },
        { cx: 160, cy: 160, r: 3 },
        // Punjab
        { cx: 120, cy: 100, r: 3 },
    ];

    const projectedLocations = [
        ...currentLocations,
        // Additional projected locations (denser coverage)
        { cx: 90, cy: 165, r: 3 },
        { cx: 100, cy: 155, r: 3 },
        { cx: 75, cy: 165, r: 3 },
        { cx: 65, cy: 195, r: 3 },
        { cx: 75, cy: 215, r: 3 },
        { cx: 55, cy: 205, r: 3 },
        { cx: 125, cy: 195, r: 3 },
        { cx: 135, cy: 205, r: 3 },
        { cx: 145, cy: 185, r: 3 },
        { cx: 95, cy: 235, r: 3 },
        { cx: 115, cy: 245, r: 3 },
        { cx: 105, cy: 255, r: 3 },
        { cx: 95, cy: 295, r: 3 },
        { cx: 115, cy: 305, r: 3 },
        { cx: 120, cy: 355, r: 3 },
        { cx: 140, cy: 365, r: 3 },
        { cx: 145, cy: 300, r: 3 },
        { cx: 135, cy: 325, r: 3 },
        { cx: 120, cy: 265, r: 3 },
        { cx: 155, cy: 145, r: 3 },
        { cx: 165, cy: 155, r: 3 },
        { cx: 170, cy: 170, r: 3 },
        { cx: 115, cy: 105, r: 3 },
        { cx: 125, cy: 95, r: 3 },
        { cx: 135, cy: 110, r: 3 },
    ];

    return (
        <div ref={ref} className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Current Status */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl p-6 md:p-8 shadow-lg"
            >
                <div className="text-center mb-6">
                    <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-3">
                        2026
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Current Solar Status</h3>
                    <p className="text-3xl font-bold text-primary">~90 GW</p>
                </div>
                
                <div className="relative aspect-[3/4] w-full max-w-[250px] mx-auto">
                    <svg viewBox="0 0 200 280" className="w-full h-full">
                        {/* Simplified but recognizable India map outline */}
                        <motion.path
                            d="M100 15 
                               L115 18 L130 28 L140 40 L145 55 L148 70 
                               L150 85 L155 100 L165 115 L175 130 L180 145 
                               L178 160 L172 175 L165 190 L158 205 L150 220 
                               L142 235 L135 250 L128 265 L122 275 L115 270 
                               L108 255 L100 240 L92 225 L85 210 L75 195 
                               L65 180 L55 165 L45 150 L38 135 L32 120 
                               L28 105 L25 90 L28 75 L35 62 L45 50 
                               L58 40 L72 32 L85 25 L95 18 Z"
                            fill="none"
                            stroke="#023d2a"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={isInView ? { pathLength: 1 } : {}}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        
                        {/* Solar installation dots - Current */}
                        {currentLocations.map((loc, i) => (
                            <motion.circle
                                key={`current-${i}`}
                                cx={loc.cx}
                                cy={loc.cy}
                                r={loc.r}
                                fill="#023d2a"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
                            />
                        ))}
                    </svg>
                </div>
                
                <div className="mt-4 text-center text-sm text-gray-500">
                    Existing solar installations across India
                </div>
            </motion.div>

            {/* Projected Growth */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-3xl p-6 md:p-8 shadow-lg"
            >
                <div className="text-center mb-6">
                    <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-3">
                        2036
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Projected Solar Growth</h3>
                    <p className="text-3xl font-bold text-primary">~500 GW</p>
                </div>
                
                <div className="relative aspect-[3/4] w-full max-w-[250px] mx-auto">
                    <svg viewBox="0 0 200 280" className="w-full h-full">
                        {/* India outline */}
                        <motion.path
                            d="M100 15 
                               L115 18 L130 28 L140 40 L145 55 L148 70 
                               L150 85 L155 100 L165 115 L175 130 L180 145 
                               L178 160 L172 175 L165 190 L158 205 L150 220 
                               L142 235 L135 250 L128 265 L122 275 L115 270 
                               L108 255 L100 240 L92 225 L85 210 L75 195 
                               L65 180 L55 165 L45 150 L38 135 L32 120 
                               L28 105 L25 90 L28 75 L35 62 L45 50 
                               L58 40 L72 32 L85 25 L95 18 Z"
                            fill="none"
                            stroke="#f5a623"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={isInView ? { pathLength: 1 } : {}}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        
                        {/* Solar installation dots - Projected (more dense) */}
                        {projectedLocations.map((loc, i) => (
                            <motion.circle
                                key={`projected-${i}`}
                                cx={loc.cx}
                                cy={loc.cy}
                                r={loc.r}
                                fill="#f5a623"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.5 + i * 0.03, duration: 0.3 }}
                            />
                        ))}
                        
                        {/* Pulse effects on major locations */}
                        <motion.circle
                            cx="85" cy="160" r="8"
                            fill="none"
                            stroke="#f5a623"
                            strokeWidth="1.5"
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        />
                        <motion.circle
                            cx="100" cy="240" r="8"
                            fill="none"
                            stroke="#f5a623"
                            strokeWidth="1.5"
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                        />
                        <motion.circle
                            cx="125" cy="360" r="8"
                            fill="none"
                            stroke="#f5a623"
                            strokeWidth="1.5"
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
                        />
                    </svg>
                </div>
                
                <div className="mt-4 text-center text-sm text-gray-500">
                    Projected solar expansion over next decade
                </div>
            </motion.div>
        </div>
    );
}

export default function AboutPage() {
    return (
        <SiteLayout>
            {/* NEW: Introduction Section - Unique from Home Page */}
            <section className="bg-white pt-28 pb-16 md:pt-32 md:pb-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
                        {/* Left: Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-4 block">
                                Welcome to Ankit Solar Power
                            </span>
                            
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                About{' '}
                                <span className="text-primary">Ankit Solar Power</span>
                            </h1>
                            
                            <div className="space-y-4 text-gray-600 leading-relaxed mb-6">
                                <p>
                                    Ankit Solar Power is a leading solar energy solutions provider specializing in both commercial
                                    and residential solar installations. With over a decade of experience, we have established
                                    ourselves as a trusted partner for businesses and homeowners looking to harness the power of
                                    clean, renewable energy.
                                </p>
                                <p>
                                    Our expertise spans large-scale commercial projects for hotels, factories, and industrial
                                    facilities, as well as residential installations for homes across India. We provide
                                    end-to-end solutions from site assessment and system design to installation and maintenance.
                                </p>
                                <p>
                                    By choosing Ankit Solar Power, customers can reduce their electricity bills by up to 80%,
                                    achieve energy independence, and contribute to a sustainable future. Our commitment to quality,
                                    reliability, and customer satisfaction has earned us the trust of over 500 satisfied clients
                                    and 13+ franchise partners across multiple states.
                                </p>
                            </div>
                            
                            <div className="space-y-4 mb-8">
                                {[
                                    'End-to-end solar solutions for businesses',
                                    'Premium quality panels and inverters',
                                    'Significant cost savings on electricity bills',
                                    'Expert installation with ongoing support'
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                        
                        {/* Right: Animated Illustration */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-gray-solar rounded-3xl p-6 md:p-8 h-full flex items-center justify-center"
                        >
                            <div className="w-full h-full min-h-[400px] flex items-center justify-center">
                                <SolarInstallationAnimation />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What We Do Section */}
            <section className="bg-gray-solar py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-3 block">What We Do</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            How We Help Your Business
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We provide comprehensive solar solutions tailored to your commercial and industrial needs
                        </p>
                    </motion.div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                ),
                                title: 'Cost Reduction',
                                desc: 'Slash your electricity bills by up to 80% with our efficient solar installations. Generate your own power and eliminate dependency on grid electricity.'
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                ),
                                title: 'Energy Independence',
                                desc: 'Take control of your energy future. Our systems provide reliable power backup and reduce vulnerability to grid outages and rising electricity tariffs.'
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                                    </svg>
                                ),
                                title: 'Sustainability Goals',
                                desc: 'Meet your corporate sustainability targets while improving your brand image. Solar energy significantly reduces your carbon footprint.'
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-5">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Company Story Section */}
            <section className="bg-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-3 block">Our Story</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Over a Decade of{' '}
                                <span className="text-primary">Solar Excellence</span>
                            </h2>
                            
                            <div className="space-y-6 text-gray-600 leading-relaxed">
                                <p>
                                    Founded in 2014, Ankit Solar Power began with a simple mission: to make solar energy 
                                    accessible and affordable for businesses across India. What started as a small team 
                                    with a big vision has grown into one of the country's most trusted solar installation companies.
                                </p>
                                <p>
                                    Today, we have successfully completed over 500 projects, installed 20 MW of solar capacity, 
                                    and built a network of 13+ franchise partners spanning multiple states. Our expertise spans 
                                    hotels, factories, warehouses, and commercial buildings.
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-6 mt-8">
                                {[
                                    { value: 500, suffix: '+', label: 'Projects Completed' },
                                    { value: 20, suffix: ' MW', label: 'Capacity Installed' },
                                ].map((stat, i) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                        className="bg-gray-solar rounded-xl p-4"
                                    >
                                        <p className="text-2xl md:text-3xl font-bold text-primary">
                                            <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                                        </p>
                                        <p className="text-gray-600 text-sm">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-4"
                        >
                            {[
                                { year: '2014', title: 'Foundation', desc: 'Started with a vision to democratize solar energy' },
                                { year: '2017', title: 'First 100 Projects', desc: 'Expanded operations to 3 states' },
                                { year: '2021', title: '10 MW Milestone', desc: 'Presence established in 8 states' },
                                { year: '2026', title: 'Industry Leader', desc: '500+ projects, 13+ franchise partners' },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-4 items-start"
                                >
                                    <div className="w-16 h-10 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                        {item.year}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                        <p className="text-gray-600 text-sm">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="bg-gray-solar py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-3 block">Why Us</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose Ankit Solar Power?
                        </h2>
                    </motion.div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                title: 'Commercial Expertise',
                                desc: 'Specialized in large-scale installations for hotels, factories, warehouses, and commercial buildings.',
                                icon: '🏢'
                            },
                            {
                                title: 'Quality Assurance',
                                desc: 'We use only Tier-1 solar panels and premium inverters with comprehensive warranties.',
                                icon: '✓'
                            },
                            {
                                title: 'End-to-End Service',
                                desc: 'From site survey and design to installation and maintenance, we handle everything.',
                                icon: '🔄'
                            },
                            {
                                title: 'Financing Support',
                                desc: 'We help you access government subsidies and arrange hassle-free solar financing options.',
                                icon: '💰'
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-2xl p-6 flex gap-4 items-start"
                            >
                                <span className="text-2xl flex-shrink-0 w-10">{item.icon}</span>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* India Solar Growth Section */}
            <section className="bg-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-3 block">India's Solar Future</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            The Solar Revolution in India
                        </h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            India is rapidly transforming its energy landscape. See how solar power is growing and 
                            creating opportunities for businesses like yours.
                        </p>
                    </motion.div>
                    
                    <IndiaMapComparison />
                    
                    {/* Growth Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mt-12 bg-gray-solar rounded-2xl p-8"
                    >
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            <div>
                                <p className="text-4xl font-bold text-primary mb-2">5.5x</p>
                                <p className="text-gray-600">Expected Growth by 2036</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-accent mb-2">40%+</p>
                                <p className="text-gray-600">C&I Sector Contribution</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-primary mb-2">$20B+</p>
                                <p className="text-gray-600">Investment Opportunity</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="bg-gray-solar py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-3 block">Our Purpose</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Mission & Vision
                        </h2>
                    </motion.div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-primary rounded-2xl p-8 text-white"
                        >
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-5">
                                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                            <p className="text-green-100 leading-relaxed">
                                To provide reliable, affordable, and sustainable solar solutions that empower businesses 
                                and industries to achieve energy independence. We are committed to delivering world-class 
                                installations with unmatched quality, enabling our clients to reduce costs while contributing 
                                to a cleaner environment.
                            </p>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white rounded-2xl p-8 shadow-sm"
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To become India's most trusted solar energy partner with a pan-India franchise network 
                                spanning every state. We envision a future where clean solar power is the default choice 
                                for all energy needs, driving innovation and establishing India as a global leader in 
                                renewable energy adoption.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Partner With Us Section - PRESERVED */}
            <section className="bg-primary py-16">
                <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Partner With Us</h2>
                    <p className="text-green-100 max-w-xl mx-auto mb-8">
                        Whether you need solar installation or want to start a solar franchise, we're here to help you succeed.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/contact" className="bg-accent hover:bg-accent-light text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg transition-all">
                            Contact Us →
                        </Link>
                        <Link href="/franchise" className="border-2 border-white/30 hover:border-white/50 text-white font-semibold px-8 py-3.5 rounded-xl transition-all">
                            Franchise Opportunities
                        </Link>
                    </div>
                </div>
            </section>
        </SiteLayout>
    );
}
