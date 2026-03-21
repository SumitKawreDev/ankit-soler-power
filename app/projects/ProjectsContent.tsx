'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SiteLayout from '@/components/SiteLayout';

interface Project {
    _id: string;
    name: string;
    description: string;
    capacity: string;
    category: 'commercial' | 'residential';
    images: string[];
    state: string;
    district: string;
}

export default function ProjectsContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category') as 'commercial' | 'residential' | null;
    const [activeCategory, setActiveCategory] = useState<'all' | 'commercial' | 'residential'>(categoryParam || 'all');
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const query = activeCategory !== 'all' ? `?category=${activeCategory}` : '';
        fetch(`/api/projects${query}`)
            .then((r) => r.json())
            .then((d) => { if (d.data) setProjects(d.data); })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [activeCategory]);

    /* Fallback placeholder data when API has no projects */
    const placeholderProjects: Project[] = [
        { _id: '1', name: 'Hotel Sunrise Solar Plant', description: 'A 100 KW rooftop solar plant installed on Hotel Sunrise, providing clean energy and significant cost savings.', capacity: '100 KW', category: 'commercial', images: [], state: 'Maharashtra', district: 'Mumbai' },
        { _id: '2', name: 'Greenfield Industries', description: 'Large-scale 500 KW solar installation for Greenfield Industries, powering manufacturing operations.', capacity: '500 KW', category: 'commercial', images: [], state: 'Gujarat', district: 'Ahmedabad' },
        { _id: '3', name: 'Sharma Textiles Factory', description: 'Premium solar plant for textile manufacturing facility, reducing energy costs by 60%.', capacity: '250 KW', category: 'commercial', images: [], state: 'Rajasthan', district: 'Jaipur' },
        { _id: '4', name: 'Royal Grand Hotel', description: 'Complete solar solution for a premium hotel property with battery backup.', capacity: '200 KW', category: 'commercial', images: [], state: 'Delhi', district: 'New Delhi' },
        { _id: '5', name: 'Skyline Housing Society', description: 'Community solar project serving over 100 residential units.', capacity: '50 KW', category: 'residential', images: [], state: 'Maharashtra', district: 'Pune' },
        { _id: '6', name: 'Patel Residence', description: 'Rooftop solar panel installation for a residential property.', capacity: '10 KW', category: 'residential', images: [], state: 'Gujarat', district: 'Surat' },
    ];

    const displayProjects = projects.length > 0 ? projects : placeholderProjects.filter(p => activeCategory === 'all' || p.category === activeCategory);

    return (
        <SiteLayout>
            {/* Hero banner */}
            <section className="bg-hero-gradient pt-32 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #fff 40px, #fff 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #fff 41px)' }} />
                <div className="relative max-w-7xl mx-auto px-4 md:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                    >
                        Our Solar <span className="text-accent">Projects</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-green-100 text-lg max-w-2xl mx-auto"
                    >
                        Explore our portfolio of commercial and residential solar installations across India.
                    </motion.p>
                </div>
            </section>

            {/* Category filters */}
            <section className="bg-white border-b border-gray-100 sticky top-16 z-30">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex items-center gap-2 py-4 overflow-x-auto">
                        {[
                            { key: 'all' as const, label: 'All Projects' },
                            { key: 'commercial' as const, label: 'Commercial' },
                            { key: 'residential' as const, label: 'Residential' },
                        ].map((cat) => (
                            <button
                                key={cat.key}
                                onClick={() => setActiveCategory(cat.key)}
                                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat.key
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="section-padding bg-gray-solar">
                <div className="container-max">
                    {loading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                <div key={n} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                                    <div className="h-52 bg-gray-200" />
                                    <div className="p-5 space-y-3">
                                        <div className="h-5 bg-gray-200 rounded w-3/4" />
                                        <div className="h-4 bg-gray-100 rounded w-full" />
                                        <div className="h-4 bg-gray-100 rounded w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayProjects.map((project, i) => (
                                <motion.div
                                    key={project._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                >
                                    <Link href={`/projects/${project._id}`}>
                                        <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                                            <div className="relative h-52 bg-gray-200 overflow-hidden">
                                                {project.images?.[0] ? (
                                                    <img src={project.images[0]} alt={project.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                                                        <svg className="w-16 h-16 text-primary/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                                        </svg>
                                                    </div>
                                                )}
                                                <span className="absolute top-3 left-3 bg-primary/90 text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">{project.category}</span>
                                            </div>
                                            <div className="p-5">
                                                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors text-lg">{project.name}</h3>
                                                <p className="text-gray-500 text-sm mb-3 line-clamp-2">{project.description}</p>
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                                        {project.capacity}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-4 h-4 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        </svg>
                                                        {project.district}, {project.state}
                                                    </span>
                                                </div>
                                                <div className="mt-4 pt-4 border-t border-gray-100">
                                                    <span className="text-primary font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                                        View Details
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {!loading && displayProjects.length === 0 && (
                        <div className="text-center py-16">
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <p className="text-gray-500 text-lg">No projects found in this category.</p>
                        </div>
                    )}
                </div>
            </section>
        </SiteLayout>
    );
}
