'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SiteLayout from '@/components/SiteLayout';

interface FranchiseItem {
    _id: string;
    name: string;
    state: string;
    district: string;
    googleMapsUrl?: string;
    contactNumber: string;
    photoUrl?: string;
}

const placeholderFranchises: FranchiseItem[] = [
    { _id: '1', name: 'Ankit Solar — Ahmedabad', state: 'Gujarat', district: 'Ahmedabad', contactNumber: '+91 98765 00001', photoUrl: '' },
    { _id: '2', name: 'Ankit Solar — Surat', state: 'Gujarat', district: 'Surat', contactNumber: '+91 98765 00002', photoUrl: '' },
    { _id: '3', name: 'Ankit Solar — Mumbai', state: 'Maharashtra', district: 'Mumbai', contactNumber: '+91 98765 00003', photoUrl: '' },
    { _id: '4', name: 'Ankit Solar — Pune', state: 'Maharashtra', district: 'Pune', contactNumber: '+91 98765 00004', photoUrl: '' },
    { _id: '5', name: 'Ankit Solar — Jaipur', state: 'Rajasthan', district: 'Jaipur', contactNumber: '+91 98765 00005', photoUrl: '' },
    { _id: '6', name: 'Ankit Solar — Jodhpur', state: 'Rajasthan', district: 'Jodhpur', contactNumber: '+91 98765 00006', photoUrl: '' },
    { _id: '7', name: 'Ankit Solar — Delhi', state: 'Delhi', district: 'New Delhi', contactNumber: '+91 98765 00007', photoUrl: '' },
    { _id: '8', name: 'Ankit Solar — Lucknow', state: 'Uttar Pradesh', district: 'Lucknow', contactNumber: '+91 98765 00008', photoUrl: '' },
    { _id: '9', name: 'Ankit Solar — Bhopal', state: 'Madhya Pradesh', district: 'Bhopal', contactNumber: '+91 98765 00009', photoUrl: '' },
    { _id: '10', name: 'Ankit Solar — Indore', state: 'Madhya Pradesh', district: 'Indore', contactNumber: '+91 98765 00010', photoUrl: '' },
    { _id: '11', name: 'Ankit Solar — Bangalore', state: 'Karnataka', district: 'Bangalore', contactNumber: '+91 98765 00011', photoUrl: '' },
    { _id: '12', name: 'Ankit Solar — Hyderabad', state: 'Telangana', district: 'Hyderabad', contactNumber: '+91 98765 00012', photoUrl: '' },
    { _id: '13', name: 'Ankit Solar — Chennai', state: 'Tamil Nadu', district: 'Chennai', contactNumber: '+91 98765 00013', photoUrl: '' },
];

export default function FranchisePage() {
    const [franchises, setFranchises] = useState<FranchiseItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/franchise')
            .then((r) => r.json())
            .then((d) => { if (d.data) setFranchises(d.data); })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const displayFranchises = franchises.length > 0 ? franchises : placeholderFranchises;

    return (
        <SiteLayout>
            {/* Hero */}
            <section className="bg-hero-gradient pt-32 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #fff 40px, #fff 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #fff 40px, #fff 41px)' }} />
                <div className="relative max-w-7xl mx-auto px-4 md:px-8 text-center">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Solar <span className="text-accent">Franchise</span> Program
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-green-100 text-lg max-w-2xl mx-auto">
                        Join India&apos;s fastest-growing solar franchise network. Start your own solar energy business with our proven model.
                    </motion.p>
                </div>
            </section>

            {/* Why Franchise */}
            <section className="section-padding bg-white">
                <div className="container-max">
                    <div className="text-center mb-12">
                        <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-3 block">Why Join Us</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Benefits of <span className="text-primary">Our Franchise</span>
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: 'Low Investment', desc: 'Start with minimal investment and grow with a proven business model.', icon: '💰' },
                            { title: 'Full Training', desc: 'Comprehensive technical and business training for you and your team.', icon: '🎓' },
                            { title: 'Brand Support', desc: 'Leverage our established brand reputation and marketing materials.', icon: '🏷️' },
                            { title: 'Lead Generation', desc: 'Get qualified solar leads from our central marketing campaigns.', icon: '📈' },
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="bg-gray-solar rounded-2xl p-6 text-center hover:shadow-md transition-shadow"
                            >
                                <span className="text-3xl mb-3 block">{item.icon}</span>
                                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Franchise Locations */}
            <section className="section-padding bg-gray-solar">
                <div className="container-max">
                    <div className="text-center mb-12">
                        <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-3 block">Our Network</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Franchise <span className="text-primary">Locations</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto mt-3">We are present across India with {displayFranchises.length}+ franchise partners serving their local communities.</p>
                    </div>

                    {loading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                <div key={n} className="bg-white rounded-2xl p-6 animate-pulse">
                                    <div className="w-12 h-12 bg-gray-200 rounded-xl mb-4" />
                                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayFranchises.map((franchise, i) => (
                                <motion.div
                                    key={franchise._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
                                >
                                    {franchise.photoUrl ? (
                                        <div className="h-44 overflow-hidden">
                                            <img src={franchise.photoUrl} alt={franchise.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                    ) : (
                                        <div className="h-44 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                                            <svg className="w-14 h-14 text-primary/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="p-5">
                                        <h3 className="font-bold text-gray-900 mb-2">{franchise.name}</h3>
                                        <div className="space-y-2 mb-4">
                                            <p className="flex items-center gap-2 text-sm text-gray-500">
                                                <svg className="w-4 h-4 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                </svg>
                                                {franchise.district}, {franchise.state}
                                            </p>
                                            <p className="flex items-center gap-2 text-sm text-gray-500">
                                                <svg className="w-4 h-4 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                <a href={`tel:${franchise.contactNumber}`} className="hover:text-primary transition-colors">{franchise.contactNumber}</a>
                                            </p>
                                        </div>
                                        {franchise.googleMapsUrl && (
                                            <a
                                                href={franchise.googleMapsUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                View on Maps
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Apply CTA */}
            <section className="section-padding bg-primary">
                <div className="container-max text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Become a Solar Franchise Partner</h2>
                    <p className="text-green-200 max-w-xl mx-auto mb-8">
                        Ready to start your own solar energy business? Apply today and join our growing network of successful franchise partners across India.
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold px-10 py-4 rounded-xl shadow-lg transition-all text-base">
                        Apply for Franchise →
                    </Link>
                </div>
            </section>
        </SiteLayout>
    );
}
