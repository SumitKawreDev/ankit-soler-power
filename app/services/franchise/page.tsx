'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SiteLayout from '@/components/SiteLayout';
import GetQuoteModal from '@/components/GetQuoteModal';

// Franchise benefits
const franchiseBenefits = [
    {
        title: 'Proven Business Model',
        description: 'Leverage our established business systems and processes that have been tested and refined over years of successful operations across multiple markets.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
    {
        title: 'Complete Training',
        description: 'Receive comprehensive 2-week training covering technical aspects, sales techniques, business operations, and customer relationship management.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
    },
    {
        title: 'Marketing Support',
        description: 'Access professional marketing materials, digital marketing campaigns, and brand recognition that drives customer trust and leads.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
        ),
    },
    {
        title: 'Lead Generation',
        description: 'Benefit from our central marketing efforts that generate qualified leads directly for your franchise territory.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
    },
    {
        title: 'Technical Back-end',
        description: 'Full technical support team handles complex engineering, system design, and installation guidance for all your projects.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
    {
        title: 'Low Investment Entry',
        description: 'Start your solar business with minimal upfront investment and scalable operations that grow with your success.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
];

// How it works steps
const howItWorks = [
    {
        step: 1,
        title: 'Submit Application',
        description: 'Fill out our franchise application form with your business background, location preferences, and investment capacity.',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
    },
    {
        step: 2,
        title: 'Interview & Evaluation',
        description: 'Our team reviews your application and conducts interviews to ensure mutual fit and understand your business goals.',
        image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
    },
    {
        step: 3,
        title: 'Training Program',
        description: 'Complete our comprehensive 2-week training covering solar technology, sales, operations, and business management.',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
    },
    {
        step: 4,
        title: 'Launch Your Business',
        description: 'We help you set up your office, hire staff, and provide initial marketing support for a successful grand opening.',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
    },
];

// Gallery images
const galleryImages = [
    {
        title: 'Franchise Training Center',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
    },
    {
        title: 'Team Meeting',
        image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
    },
    {
        title: 'Business Operations',
        image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80',
    },
    {
        title: 'Success Celebration',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
    },
];

export default function FranchisePage() {
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
                            Solar Franchise <span className="text-accent">Programme</span>
                        </h1>
                        <p className="text-green-100 text-lg md:text-xl max-w-3xl mx-auto">
                            Join India's fastest-growing solar franchise network. Build a successful business with our proven model and comprehensive support.
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
                            The solar industry is experiencing unprecedented growth, and we're looking for passionate entrepreneurs 
                            to join our network. As an Ankit Solar franchise partner, you'll have access to our proven business systems, 
                            industry expertise, and ongoing support to build a profitable solar business in your territory.
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
                                Why Partner With <span className="text-primary">Ankit Solar?</span>
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    The solar market in India is growing at over 20% annually, creating tremendous opportunities for entrepreneurs. With government incentives, rising electricity costs, and increasing environmental awareness, demand for solar solutions has never been higher.
                                </p>
                                <p>
                                    As a franchise partner, you don't need prior solar experience. We provide everything you need to succeed—from initial training and certification to ongoing technical support and marketing assistance. Our business model has been refined through years of successful operations across diverse markets.
                                </p>
                                <p>
                                    You'll benefit from our established brand reputation, proven sales processes, and technical expertise. We handle the complex engineering while you focus on building customer relationships and growing your business.
                                </p>
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
                                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80" 
                                    alt="Solar Franchise"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/800x600/7c3aed/FFFFFF?text=Solar+Franchise';
                                    }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-3 block">What You Get</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                            Franchise <span className="text-primary">Benefits</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {franchiseBenefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-3xl border border-purple-100 hover:shadow-xl transition-shadow"
                            >
                                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center text-white mb-6">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-gray-solar">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-3 block">Join Us</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                            How It <span className="text-primary">Works</span>
                        </h2>
                    </motion.div>

                    <div className="space-y-16">
                        {howItWorks.map((step, index) => (
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
                                                (e.target as HTMLImageElement).src = `https://placehold.co/800x450/7c3aed/FFFFFF?text=Step+${step.step}`;
                                            }}
                                        />
                                        <div className="absolute top-4 left-4 w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                                            {step.step}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 font-bold text-xl lg:hidden">
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

            {/* Gallery */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-3 block">Our Network</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                            Franchise <span className="text-primary">Gallery</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {galleryImages.map((photo, index) => (
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
                                            (e.target as HTMLImageElement).src = `https://placehold.co/600x450/7c3aed/FFFFFF?text=${encodeURIComponent(photo.title)}`;
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 via-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                            Ready to Start Your Solar Business?
                        </h2>
                        <p className="text-green-200 text-lg max-w-2xl mx-auto mb-8">
                            Join our growing network of successful franchise partners. Take the first step toward building a profitable business in the booming solar industry.
                        </p>
                        <button
                            onClick={() => setIsQuoteModalOpen(true)}
                            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold px-10 py-4 rounded-xl shadow-lg transition-all text-lg"
                        >
                            Apply for Franchise
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
                defaultCategory="franchise"
            />
        </SiteLayout>
    );
}
