'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SiteLayout from '@/components/SiteLayout';

// Service data for the three main cards with icons
const services = [
    {
        id: 'commercial',
        title: 'Commercial Solar Power',
        description: 'Enterprise-grade solar solutions for businesses, factories, and commercial buildings.',
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
    },
    {
        id: 'residential',
        title: 'Residential Solar Power',
        description: 'Affordable rooftop solar systems for homes, apartments, and housing societies.',
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
    },
    {
        id: 'franchise',
        title: 'Solar Franchise Programme',
        description: 'Join our network and start your own solar business with complete support.',
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        ),
    },
];

// Expertise areas with industry-matching images
const expertiseAreas = [
    {
        title: 'Factory Installations',
        description: 'Our factory solar installations help manufacturing units significantly reduce electricity costs and improve energy efficiency. We design systems that can power heavy machinery, production lines, and facility operations. With rising electricity tariffs, factories can save up to 70% on energy bills while ensuring uninterrupted power supply for critical operations. Our industrial-grade solar panels are built to withstand harsh factory environments and deliver consistent performance for 25+ years.',
        image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&q=80',
    },
    {
        title: 'IT Park Solar Systems',
        description: 'Solar solutions for IT parks and corporate campuses provide clean energy for 24/7 operations. Our installations help technology companies reduce their carbon footprint while powering servers, data centers, and office spaces. With net metering, excess energy generated during weekends can be fed back to the grid for credits. Modern IT parks choose solar to meet sustainability goals while reducing operational costs by up to 60%.',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
    },
    {
        title: 'Industrial Plants',
        description: 'Heavy industrial plants require robust solar systems capable of meeting demanding energy needs. We specialize in installations for chemical plants, pharmaceutical facilities, steel mills, and manufacturing units. Our systems are designed with high-capacity inverters and durable mounting structures to handle industrial loads. Solar power helps industries achieve energy independence while complying with environmental regulations and reducing carbon emissions.',
        image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80',
    },
    {
        title: 'Large Commercial Buildings',
        description: 'Shopping malls, office complexes, and commercial centers benefit greatly from rooftop solar installations. Our integrated solutions utilize available roof space efficiently to generate power for lighting, air conditioning, elevators, and common areas. With high daytime electricity consumption, commercial buildings see immediate returns on investment. We handle everything from structural assessment to net metering setup, ensuring hassle-free adoption.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    },
];

export default function ServicesPage() {
    return (
        <SiteLayout>
            {/* Hero */}
            <section className="bg-hero-gradient pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #fff 40px, #fff 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #fff 40px, #fff 41px)' }} />
                <div className="relative max-w-7xl mx-auto px-4 md:px-8 text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                    >
                        Our <span className="text-accent">Services</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: 0.15 }} 
                        className="text-green-100 text-lg md:text-xl max-w-2xl mx-auto"
                    >
                        Comprehensive solar energy solutions tailored for commercial, residential, and franchise needs.
                    </motion.p>
                </div>
            </section>

            {/* Services - Three Enhanced Cards */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={`/services/${service.id}`} className="block h-full">
                                    <div className="group h-full min-h-[320px] md:min-h-[380px] bg-white rounded-2xl border border-gray-200 hover:border-[#023d2a] transition-all duration-300 shadow-md hover:shadow-2xl cursor-pointer overflow-hidden flex flex-col">
                                        {/* Top accent bar */}
                                        <div className="h-1.5 bg-gradient-to-r from-[#023d2a] via-[#034d35] to-[#023d2a] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                        
                                        {/* Card content */}
                                        <div className="flex-1 p-6 md:p-8 flex flex-col items-center text-center">
                                            {/* Icon container */}
                                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gray-50 group-hover:bg-[#023d2a] flex items-center justify-center mb-5 md:mb-6 transition-all duration-300 shadow-inner group-hover:shadow-lg">
                                                <div className="text-[#023d2a] group-hover:text-white transition-colors duration-300">
                                                    {service.icon}
                                                </div>
                                            </div>
                                            
                                            {/* Title */}
                                            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-[#023d2a] mb-3 md:mb-4 transition-colors duration-300">
                                                {service.title}
                                            </h3>
                                            
                                            {/* Description */}
                                            <p className="text-gray-500 group-hover:text-gray-600 text-sm md:text-base leading-relaxed mb-5 md:mb-6 flex-1">
                                                {service.description}
                                            </p>
                                            
                                            {/* CTA indicator */}
                                            <div className="flex items-center gap-2 text-[#023d2a] font-semibold text-sm md:text-base">
                                                <span>Learn More</span>
                                                <svg 
                                                    className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                        
                                        {/* Bottom hover indicator */}
                                        <div className="h-1 bg-[#023d2a] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Stats Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 bg-white rounded-3xl p-8 md:p-12 shadow-lg"
                    >
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-[#023d2a] mb-2">500+</div>
                            <div className="text-gray-500">Projects Completed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-[#023d2a] mb-2">50MW+</div>
                            <div className="text-gray-500">Solar Capacity</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-[#023d2a] mb-2">98%</div>
                            <div className="text-gray-500">Client Satisfaction</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-[#023d2a] mb-2">10+</div>
                            <div className="text-gray-500">Years Experience</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* We Are Experts Section - Vertical Layout */}
            <section className="py-20 bg-gray-solar">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-3 block">Industry Leaders</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                            We Are Experts in <span className="text-[#023d2a]">Commercial Solar Power</span>
                        </h2>
                    </motion.div>

                    {/* Expertise Areas - Vertical Layout */}
                    <div className="space-y-16">
                        {expertiseAreas.map((area, index) => (
                            <motion.div
                                key={area.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center`}
                            >
                                {/* Image */}
                                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                    <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                                        <img 
                                            src={area.image} 
                                            alt={area.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = `https://placehold.co/800x600/023d2a/FFFFFF?text=${encodeURIComponent(area.title)}`;
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#023d2a]/60 to-transparent" />
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <h3 className="text-2xl md:text-3xl font-bold text-white">{area.title}</h3>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 lg:hidden">{area.title}</h3>
                                    <h3 className="text-2xl md:text-3xl font-bold text-[#023d2a] mb-4 hidden lg:block">{area.title}</h3>
                                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                                        {area.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-[#023d2a]">
                <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-white mb-4"
                    >
                        Ready to Go Solar?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-green-200 text-lg max-w-2xl mx-auto mb-8"
                    >
                        Get a free consultation and custom quote for your solar installation needs. Our experts are ready to help you save on energy costs.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link href="/contact" className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#023d2a] font-semibold px-10 py-4 rounded-xl shadow-lg transition-all text-lg">
                            Get Free Consultation
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </SiteLayout>
    );
}
