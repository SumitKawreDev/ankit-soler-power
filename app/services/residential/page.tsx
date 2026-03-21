'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SiteLayout from '@/components/SiteLayout';
import GetQuoteModal from '@/components/GetQuoteModal';

// Installation process steps with residential solar images
const installationSteps = [
    {
        step: 1,
        title: 'Home Energy Assessment',
        description: 'Our solar consultants visit your home to evaluate your roof condition, sun exposure, and electricity usage patterns. We analyze your past electricity bills to determine the optimal system size for maximum savings.',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    },
    {
        step: 2,
        title: 'Custom System Design',
        description: 'Based on your assessment, we design a personalized solar system that matches your home\'s architecture and energy needs. Our designs maximize roof utilization while maintaining aesthetic appeal.',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    },
    {
        step: 3,
        title: 'Permits & Documentation',
        description: 'We handle all necessary permits, utility interconnection agreements, and net metering applications. Our team ensures compliance with local building codes and HOA requirements.',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    },
    {
        step: 4,
        title: 'Professional Installation',
        description: 'Our certified technicians complete the installation in 1-2 days with minimal disruption to your daily life. We use high-quality panels and mounting systems designed to last 25+ years.',
        image: 'https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=800&q=80',
    },
    {
        step: 5,
        title: 'Inspection & Activation',
        description: 'After installation, we coordinate with the utility company for final inspection and meter installation. Once approved, your system is activated and you start generating clean energy.',
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
    },
];

// Project photos with relevant residential solar images
const projectPhotos = [
    {
        title: 'Modern Home Installation',
        image: 'https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=600&q=80',
    },
    {
        title: 'Rooftop Solar Setup',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80',
    },
    {
        title: 'Villa Solar Project',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80',
    },
    {
        title: 'Apartment Complex Solar',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    },
];

export default function ResidentialSolarPage() {
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

    return (
        <SiteLayout>
            {/* Hero */}
            <section className="bg-hero-gradient pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #fff 40px, #fff 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #fff 40px, #fff 41px)' }} />
                <div className="relative max-w-7xl mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Residential Solar <span className="text-accent">Systems</span>
                        </h1>
                        <p className="text-green-100 text-lg md:text-xl max-w-3xl mx-auto">
                            Affordable and efficient rooftop solar solutions for homes and housing societies. Reduce your electricity bills by up to 90%.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Power your home with clean, renewable solar energy. Our residential solar systems are designed 
                            to help families reduce their carbon footprint while enjoying significant savings on electricity bills. 
                            With easy financing options and government subsidies, going solar has never been more affordable.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Description Section */}
            <section className="py-16 bg-gray-solar">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Benefits of <span className="text-primary">Home Solar</span>
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    Residential solar systems offer homeowners an opportunity to take control of their energy costs. With electricity rates continuing to rise, solar provides predictable energy costs and protection against future price increases. Most homeowners see a return on investment within 4-6 years.
                                </p>
                                <p>
                                    Our systems are designed with the latest technology, including high-efficiency monocrystalline panels and smart inverters that maximize energy production even on cloudy days. With battery backup options, you can store excess energy for use during power outages.
                                </p>
                                <p>
                                    Government incentives and subsidies can reduce your upfront costs by up to 40%. Combined with our flexible EMI options, you can start saving from day one with zero or minimal initial investment.
                                </p>
                            </div>
                            
                            {/* Key Features */}
                            <div className="mt-8 grid sm:grid-cols-2 gap-4">
                                {[
                                    'Rooftop Solar Panels',
                                    'Battery Backup Options',
                                    'Smart Monitoring App',
                                    'Low Maintenance',
                                    '25-Year Warranty',
                                    'EMI Options Available',
                                ].map((feature) => (
                                    <div key={feature} className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                                <img 
                                    src="https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=800&q=80" 
                                    alt="Residential Solar Installation on House Rooftop"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/800x600/023d2a/FFFFFF?text=Residential+Solar';
                                    }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Installation Process */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-3 block">How It Works</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                            Installation <span className="text-primary">Process</span>
                        </h2>
                    </motion.div>

                    <div className="space-y-16">
                        {installationSteps.map((step, index) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                            >
                                {/* Image */}
                                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                    <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-video">
                                        <img 
                                            src={step.image} 
                                            alt={step.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = `https://placehold.co/800x450/16a34a/FFFFFF?text=Step+${step.step}`;
                                            }}
                                        />
                                        <div className="absolute top-4 left-4 w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                                            {step.step}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 font-bold text-xl lg:hidden">
                                            {step.step}
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{step.title}</h3>
                                    </div>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Project Photos */}
            <section className="py-20 bg-gray-solar">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-3 block">Our Projects</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                            Residential <span className="text-primary">Installations</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {projectPhotos.map((photo, index) => (
                            <motion.div
                                key={photo.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
                                    <img 
                                        src={photo.image} 
                                        alt={photo.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = `https://placehold.co/600x450/16a34a/FFFFFF?text=${encodeURIComponent(photo.title)}`;
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-green-600/80 via-green-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-xl font-bold text-white">{photo.title}</h3>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary">
                <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Start Your Solar Journey Today
                        </h2>
                        <p className="text-green-200 text-lg max-w-2xl mx-auto mb-8">
                            Get a free home assessment and personalized quote. Discover how much you can save with solar power for your home.
                        </p>
                        <button
                            onClick={() => setIsQuoteModalOpen(true)}
                            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold px-10 py-4 rounded-xl shadow-lg transition-all text-lg"
                        >
                            Get Quote
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Quote Modal */}
            <GetQuoteModal
                isOpen={isQuoteModalOpen}
                onClose={() => setIsQuoteModalOpen(false)}
                defaultCategory="residential"
            />
        </SiteLayout>
    );
}
