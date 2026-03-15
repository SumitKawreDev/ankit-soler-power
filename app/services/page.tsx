'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SiteLayout from '@/components/SiteLayout';

const services = [
    {
        title: 'Commercial Solar Installation',
        description: 'Enterprise-grade solar solutions for commercial properties including hotels, factories, industrial plants, warehouses, and commercial buildings. We handle everything from site assessment to commissioning.',
        features: ['Site Assessment & Design', 'Custom Panel Configuration', 'Grid-Tie / Off-Grid Systems', 'Net Metering Setup', 'Government Subsidy Assistance', 'Maintenance & Support'],
        icon: (
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
        highlight: true,
    },
    {
        title: 'Residential Solar Systems',
        description: 'Affordable and efficient rooftop solar panel systems for homes and housing societies. Reduce your electricity bills by up to 90% and contribute to a cleaner environment.',
        features: ['Rooftop Solar Panels', 'Battery Backup Solutions', 'Smart Monitoring System', 'Low Maintenance', 'Up to 25 Years Warranty', 'EMI Options Available'],
        icon: (
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
        highlight: false,
    },
    {
        title: 'Solar Franchise Program',
        description: 'Join India\'s fastest-growing solar franchise network. We provide a complete business-in-a-box model with training, brand support, leads, and technical assistance.',
        features: ['Proven Business Model', 'Complete Training', 'Marketing & Brand Support', 'Lead Generation', 'Technical Back-end', 'Low Investment Entry'],
        icon: (
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        highlight: false,
    },
];

const process_steps = [
    { step: '01', title: 'Consultation', desc: 'Free site visit and energy audit to understand your requirements.' },
    { step: '02', title: 'Design & Proposal', desc: 'Custom solar system design with ROI projections and detailed quotation.' },
    { step: '03', title: 'Installation', desc: 'Professional installation by certified engineers with quality components.' },
    { step: '04', title: 'Commissioning', desc: 'System testing, net metering setup, and handover with full documentation.' },
];

export default function ServicesPage() {
    return (
        <SiteLayout>
            {/* Hero */}
            <section className="bg-hero-gradient pt-32 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #fff 40px, #fff 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #fff 40px, #fff 41px)' }} />
                <div className="relative max-w-7xl mx-auto px-4 md:px-8 text-center">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Our <span className="text-accent">Services</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-green-100 text-lg max-w-2xl mx-auto">
                        End-to-end solar energy solutions for commercial, residential, and franchise needs.
                    </motion.p>
                </div>
            </section>

            {/* Services */}
            <section className="section-padding bg-white">
                <div className="container-max space-y-10">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={`rounded-3xl overflow-hidden ${service.highlight ? 'bg-primary text-white' : 'bg-gray-solar text-gray-900'}`}
                        >
                            <div className="p-8 md:p-12">
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="flex-1">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 ${service.highlight ? 'bg-white/15 text-white' : 'bg-primary/10 text-primary'}`}>
                                            {service.icon}
                                        </div>
                                        {service.highlight && (
                                            <span className="inline-block bg-accent text-white text-xs font-bold px-3 py-1 rounded-full mb-3">Most Popular</span>
                                        )}
                                        <h2 className="text-2xl md:text-3xl font-bold mb-4">{service.title}</h2>
                                        <p className={`leading-relaxed mb-6 ${service.highlight ? 'text-green-100' : 'text-gray-600'}`}>
                                            {service.description}
                                        </p>
                                        <Link
                                            href="/contact"
                                            className={`inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl transition-all ${service.highlight
                                                    ? 'bg-accent hover:bg-accent-light text-white'
                                                    : 'bg-primary hover:bg-primary-light text-white'
                                                }`}
                                        >
                                            Get Quote →
                                        </Link>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-semibold mb-4 ${service.highlight ? 'text-green-200' : 'text-gray-500'}`}>
                                            Key Features
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {service.features.map((f) => (
                                                <div key={f} className="flex items-center gap-3">
                                                    <svg className={`w-5 h-5 flex-shrink-0 ${service.highlight ? 'text-accent' : 'text-primary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className={`text-sm ${service.highlight ? 'text-green-100' : 'text-gray-600'}`}>{f}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Process steps */}
            <section className="section-padding bg-gray-solar">
                <div className="container-max">
                    <div className="text-center mb-12">
                        <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-3 block">How We Work</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Our <span className="text-primary">Installation Process</span>
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-4 gap-6">
                        {process_steps.map((s, i) => (
                            <motion.div
                                key={s.step}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow relative"
                            >
                                <span className="text-5xl font-bold text-primary/10 mb-2 block">{s.step}</span>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                                <p className="text-gray-500 text-sm">{s.desc}</p>
                                {i < process_steps.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-300 z-10">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-primary">
                <div className="container-max text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to Go Solar?</h2>
                    <p className="text-green-200 max-w-xl mx-auto mb-8">Get a free consultation and custom quote for your solar installation needs. Our experts are ready to help you save on energy costs.</p>
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold px-10 py-4 rounded-xl shadow-lg transition-all text-base">
                        Get Free Consultation →
                    </Link>
                </div>
            </section>
        </SiteLayout>
    );
}
