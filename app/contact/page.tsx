'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SiteLayout from '@/components/SiteLayout';

type Category = 'commercial' | 'residential' | 'franchise';

export default function ContactPage() {
    const [category, setCategory] = useState<Category>('commercial');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        name: '', phone: '', email: '', location: '', message: '', electricityBillUrl: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, category }),
            });
            const data = await res.json();
            if (res.ok) {
                setSuccess(true);
                setForm({ name: '', phone: '', email: '', location: '', message: '', electricityBillUrl: '' });
            } else {
                setError(data.error || 'Something went wrong');
            }
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const categories: { value: Category; label: string; icon: string; desc: string }[] = [
        { value: 'commercial', label: 'Commercial Solar', icon: '🏭', desc: 'Hotels, Factories, Industrial' },
        { value: 'residential', label: 'Residential Solar', icon: '🏠', desc: 'Home Solar Systems' },
        { value: 'franchise', label: 'Franchise Inquiry', icon: '🤝', desc: 'Business Partnership' },
    ];

    return (
        <SiteLayout>
            {/* Hero */}
            <section className="bg-hero-gradient pt-32 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #fff 40px, #fff 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #fff 40px, #fff 41px)' }} />
                <div className="relative max-w-7xl mx-auto px-4 md:px-8 text-center">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Contact <span className="text-accent">Us</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-green-100 text-lg max-w-2xl mx-auto">
                        Get a free consultation and solar quote. Our experts are ready to help.
                    </motion.p>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="container-max">
                    <div className="grid lg:grid-cols-3 gap-10">
                        {/* Form */}
                        <div className="lg:col-span-2">
                            {success ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center"
                                >
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
                                    <p className="text-gray-600 mb-6">Your inquiry has been submitted successfully. Our team will contact you within 24 hours with a customized solar quote.</p>
                                    <button onClick={() => setSuccess(false)} className="bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-light transition-colors">
                                        Submit Another Inquiry
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us an Inquiry</h2>
                                        <p className="text-gray-500 text-sm mb-6">Select your inquiry type and fill in the details below.</p>
                                    </div>

                                    {/* Category selector */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Inquiry Type</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {categories.map((cat) => (
                                                <button
                                                    key={cat.value}
                                                    type="button"
                                                    onClick={() => setCategory(cat.value)}
                                                    className={`p-4 rounded-xl border-2 text-left transition-all ${category === cat.value
                                                            ? 'border-primary bg-primary/5 shadow-sm'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <span className="text-2xl block mb-2">{cat.icon}</span>
                                                    <span className={`font-semibold block text-sm ${category === cat.value ? 'text-primary' : 'text-gray-700'}`}>{cat.label}</span>
                                                    <span className="text-xs text-gray-400">{cat.desc}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                                            <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your full name"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone <span className="text-red-500">*</span></label>
                                            <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
                                        <input type="text" name="location" value={form.location} onChange={handleChange} required placeholder="City, State"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-gray-400">(optional)</span></label>
                                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                                    </div>

                                    {(category === 'commercial' || category === 'residential') && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Electricity Bill Image URL <span className="text-gray-400">(optional — Cloudinary URL)</span>
                                            </label>
                                            <input type="url" name="electricityBillUrl" value={form.electricityBillUrl} onChange={handleChange} placeholder="https://res.cloudinary.com/..."
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                                            <p className="text-xs text-gray-400 mt-1">Upload your electricity bill to Cloudinary and paste the URL here for an accurate solar estimate.</p>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Message <span className="text-gray-400">(optional)</span></label>
                                        <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Tell us about your requirements..."
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" />
                                    </div>

                                    {error && (
                                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-primary hover:bg-primary-light disabled:opacity-70 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                                Submitting...
                                            </>
                                        ) : (
                                            'Submit Inquiry'
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-gray-solar rounded-2xl p-6">
                                <h3 className="font-bold text-gray-900 mb-4">Contact Information</h3>
                                <div className="space-y-5">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 mb-0.5">Phone</p>
                                            <a href="tel:+919876543210" className="text-gray-900 font-medium text-sm hover:text-primary transition-colors">+91 98765 43210</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 mb-0.5">Email</p>
                                            <a href="mailto:info@ankitsolar.com" className="text-gray-900 font-medium text-sm hover:text-primary transition-colors">info@ankitsolar.com</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 mb-0.5">Location</p>
                                            <p className="text-gray-900 font-medium text-sm">Pan-India Operations</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-primary rounded-2xl p-6">
                                <h3 className="text-white font-bold mb-3">Working Hours</h3>
                                <div className="space-y-2 text-green-200 text-sm">
                                    <div className="flex justify-between">
                                        <span>Monday - Friday</span>
                                        <span className="text-white font-medium">9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Saturday</span>
                                        <span className="text-white font-medium">10:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Sunday</span>
                                        <span className="text-white font-medium">Closed</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6">
                                <h3 className="text-gray-900 font-bold mb-2">⚡ Quick Response</h3>
                                <p className="text-gray-600 text-sm">We typically respond to all inquiries within 24 hours with a detailed solar consultation and quote.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </SiteLayout>
    );
}
