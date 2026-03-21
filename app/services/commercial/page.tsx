'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SiteLayout from '@/components/SiteLayout';
import GetQuoteModal from '@/components/GetQuoteModal';

// Installation process steps with dummy images
const installationSteps = [
    {
        step: 1,
        title: 'Site Survey & Analysis',
        description: 'Our team conducts a comprehensive site assessment to evaluate your facility\'s energy needs, roof condition, sun exposure, and structural requirements. We analyze your current electricity consumption patterns to design an optimal solar solution.',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    },
    {
        step: 2,
        title: 'System Design & Engineering',
        description: 'Our engineers create a custom solar system design tailored to your specific requirements. This includes panel layout, inverter selection, electrical schematics, and structural mounting plans that maximize energy generation.',
        image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800&q=80',
    },
    {
        step: 3,
        title: 'Permits & Approvals',
        description: 'We handle all necessary permits, utility approvals, and net metering applications on your behalf. Our team ensures compliance with local regulations and building codes for a hassle-free installation process.',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    },
    {
        step: 4,
        title: 'Installation & Mounting',
        description: 'Our certified technicians install high-quality solar panels using robust mounting systems designed to withstand local weather conditions. We use premium components from trusted manufacturers to ensure long-term reliability.',
        image: 'https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=800&q=80',
    },
    {
        step: 5,
        title: 'Electrical Connections',
        description: 'We complete all electrical wiring, inverter installation, and grid connection setup following strict safety standards. Our systems include advanced monitoring capabilities for real-time performance tracking.',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
    },
    {
        step: 6,
        title: 'Testing & Commissioning',
        description: 'Rigorous system testing ensures optimal performance before handover. We configure net metering, provide comprehensive documentation, and train your team on system operation and maintenance procedures.',
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
    },
];

// Project photos with dummy images
const projectPhotos = [
    {
        title: 'Factory Rooftop Installation',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80',
    },
    {
        title: 'Industrial Warehouse Solar',
        image: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?w=600&q=80',
    },
    {
        title: 'Commercial Building Project',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    },
    {
        title: 'Manufacturing Plant Setup',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
    },
];

export default function CommercialSolarPage() {
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
                            Commercial Solar <span className="text-accent">Installation</span>
                        </h1>
                        <p className="text-green-100 text-lg md:text-xl max-w-3xl mx-auto">
                            Enterprise-grade solar solutions for hotels, factories, industrial plants, warehouses, and commercial buildings.
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
                            Transform your business energy consumption with our comprehensive commercial solar solutions. 
                            We specialize in designing and installing high-capacity solar systems that significantly 
                            reduce operational costs while supporting your sustainability goals.
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
                                Why Choose <span className="text-primary">Commercial Solar?</span>
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    Commercial solar installations offer businesses a strategic advantage by significantly reducing electricity costs—often by 70-90%. With rising energy prices, solar provides predictable energy costs for decades, improving your bottom line and competitive position.
                                </p>
                                <p>
                                    Our commercial solutions are designed for high energy demands typical of industrial facilities, hotels, and large commercial buildings. We utilize high-efficiency panels and advanced inverter technology to maximize energy generation even in limited roof space.
                                </p>
                                <p>
                                    Beyond cost savings, commercial solar demonstrates corporate environmental responsibility, enhancing your brand image and meeting increasingly stringent sustainability requirements from partners and regulators.
                                </p>
                            </div>
                            
                            {/* Key Features */}
                            <div className="mt-8 grid sm:grid-cols-2 gap-4">
                                {[
                                    'Custom System Design',
                                    'Net Metering Setup',
                                    'Government Subsidy Assistance',
                                    '24/7 Monitoring',
                                    'Maintenance Support',
                                    '25-Year Warranty',
                                ].map((feature) => (
                                    <div key={feature} className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                    src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80" 
                                    alt="Commercial Solar Installation"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/800x600/023d2a/FFFFFF?text=Commercial+Solar';
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
                        <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-3 block">Our Process</span>
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
                                                (e.target as HTMLImageElement).src = `https://placehold.co/800x450/023d2a/FFFFFF?text=Step+${step.step}`;
                                            }}
                                        />
                                        <div className="absolute top-4 left-4 w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-white font-bold text-xl">
                                            {step.step}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-xl lg:hidden">
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
                        <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-3 block">Our Work</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                            Project <span className="text-primary">Gallery</span>
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
                                            (e.target as HTMLImageElement).src = `https://placehold.co/600x450/023d2a/FFFFFF?text=${encodeURIComponent(photo.title)}`;
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                            Ready to Power Your Business with Solar?
                        </h2>
                        <p className="text-green-200 text-lg max-w-2xl mx-auto mb-8">
                            Get a free site assessment and custom quote for your commercial solar installation. Our experts will help you design the perfect system for your energy needs.
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
                defaultCategory="commercial"
            />
        </SiteLayout>
    );
}
