'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SiteLayout from '@/components/SiteLayout';

export default function AboutPage() {
    return (
        <SiteLayout>
            {/* Hero */}
            <section className="bg-hero-gradient pt-32 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #fff 40px, #fff 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #fff 40px, #fff 41px)' }} />
                <div className="relative max-w-7xl mx-auto px-4 md:px-8 text-center">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-white mb-4">
                        About <span className="text-accent">Ankit Solar Power</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-green-100 text-lg max-w-2xl mx-auto">
                        Empowering India with clean, sustainable solar energy since over a decade.
                    </motion.p>
                </div>
            </section>

            {/* Company Introduction */}
            <section className="section-padding bg-white">
                <div className="container-max">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                            <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-3 block">Who We Are</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                India&apos;s Trusted <span className="text-primary">Solar Energy</span> Partner
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Ankit Solar Power is a premier enterprise solar energy company headquartered in India. With over a decade of expertise in the solar industry, we have established ourselves as a trusted partner for commercial and residential solar installations.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Our mission is to make solar energy accessible, affordable, and reliable for businesses and homeowners across India. We specialize in large-scale commercial installations for hotels, factories, industrial plants, and commercial buildings.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                With 500+ successful project installations, 20 MW of installed capacity, and a growing franchise network of 13+ partners, we are committed to powering India&apos;s clean energy transition.
                            </p>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                            <div className="bg-gray-solar rounded-3xl p-8 relative">
                                <div className="space-y-6">
                                    {[
                                        { year: '2014', event: 'Company founded with a vision to democratize solar energy in India.' },
                                        { year: '2017', event: 'Completed 100th solar installation milestone; expanded to 3 states.' },
                                        { year: '2019', event: 'Launched the franchise program; established 5 franchise partners.' },
                                        { year: '2021', event: 'Crossed 10 MW installed capacity; expanded to 8 states Pan-India.' },
                                        { year: '2024', event: '500+ projects completed, 13+ franchise partners, 20 MW capacity.' },
                                    ].map((item, i) => (
                                        <div key={item.year} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">{item.year}</div>
                                                {i < 4 && <div className="w-0.5 h-full bg-primary/20 mt-1" />}
                                            </div>
                                            <p className="text-gray-600 text-sm pt-2">{item.event}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section-padding bg-gray-solar">
                <div className="container-max">
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-primary rounded-3xl p-8 md:p-10 text-white"
                        >
                            <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mb-5">
                                <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                            <p className="text-green-100 leading-relaxed">
                                To accelerate India&apos;s transition to clean, renewable solar energy by providing world-class solar installations that are affordable, reliable, and accessible to businesses and individuals across the nation.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="bg-white rounded-3xl p-8 md:p-10 shadow-md"
                        >
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-5">
                                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
                            <p className="text-gray-600 leading-relaxed">
                                To become India&apos;s most trusted and largest solar energy company, with a franchise network spanning every state, making clean solar power the default choice for energy needs across the country.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Achievements */}
            <section className="section-padding bg-white">
                <div className="container-max">
                    <div className="text-center mb-12">
                        <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-3 block">Our Track Record</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Key <span className="text-primary">Achievements</span>
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { value: '500+', label: 'Projects Installed', desc: 'Commercial & residential installations', icon: '☀️' },
                            { value: '20 MW', label: 'Installed Capacity', desc: 'Total solar capacity deployed', icon: '⚡' },
                            { value: '13+', label: 'Franchise Partners', desc: 'Across multiple states', icon: '🤝' },
                            { value: '10+', label: 'Years of Experience', desc: 'In the solar energy industry', icon: '🏆' },
                        ].map((item, i) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="bg-gray-solar rounded-2xl p-6 text-center hover:shadow-md transition-shadow"
                            >
                                <span className="text-3xl mb-3 block">{item.icon}</span>
                                <p className="text-3xl font-bold text-primary mb-1">{item.value}</p>
                                <p className="text-gray-900 font-semibold text-sm mb-1">{item.label}</p>
                                <p className="text-gray-500 text-xs">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team (optional per PRD) */}
            <section className="section-padding bg-gray-solar">
                <div className="container-max">
                    <div className="text-center mb-12">
                        <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-3 block">Our People</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Leadership <span className="text-primary">Team</span>
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {[
                            { name: 'Ankit Kumar', role: 'Founder & CEO', bio: 'Visionary leader with 10+ years in solar energy, driving India\'s clean energy transition.' },
                            { name: 'Priya Sharma', role: 'Head of Operations', bio: 'Overseeing 500+ installations and ensuring quality across all projects.' },
                            { name: 'Raj Patel', role: 'Franchise Director', bio: 'Building and managing India\'s fastest-growing solar franchise network.' },
                        ].map((member, i) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-primary">{member.name.charAt(0)}</span>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">{member.name}</h3>
                                <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                                <p className="text-gray-500 text-sm">{member.bio}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-primary">
                <div className="container-max text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Partner With Us</h2>
                    <p className="text-green-200 max-w-xl mx-auto mb-8">
                        Whether you need solar installation or want to start a solar franchise, we&apos;re here to help you succeed.
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
