'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SiteLayout from '@/components/SiteLayout';

interface ProjectDetail {
    _id: string;
    name: string;
    description: string;
    capacity: string;
    category: 'commercial' | 'residential';
    images: string[];
    youtubeUrl?: string;
    state: string;
    district: string;
    googleMapsUrl?: string;
    createdAt: string;
}

export default function ProjectDetailPage() {
    const params = useParams();
    const [project, setProject] = useState<ProjectDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        if (!params.id) return;
        fetch(`/api/projects/${params.id}`)
            .then((r) => r.json())
            .then((d) => { if (d.data) setProject(d.data); })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [params.id]);

    /* Extract YouTube embed URL */
    const getYouTubeEmbed = (url: string) => {
        const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    };

    if (loading) {
        return (
            <SiteLayout>
                <section className="bg-hero-gradient pt-32 pb-16" />
                <section className="section-padding">
                    <div className="container-max animate-pulse space-y-6">
                        <div className="h-8 bg-gray-200 rounded w-1/2" />
                        <div className="h-72 bg-gray-200 rounded-2xl" />
                        <div className="space-y-3">
                            <div className="h-4 bg-gray-100 rounded w-full" />
                            <div className="h-4 bg-gray-100 rounded w-3/4" />
                        </div>
                    </div>
                </section>
            </SiteLayout>
        );
    }

    if (!project) {
        return (
            <SiteLayout>
                <section className="bg-hero-gradient pt-32 pb-16" />
                <section className="section-padding">
                    <div className="container-max text-center py-16">
                        <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h2>
                        <p className="text-gray-500 mb-6">The project you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                        <Link href="/projects?category=commercial" className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-light transition-colors">
                            Browse All Projects
                        </Link>
                    </div>
                </section>
            </SiteLayout>
        );
    }

    return (
        <SiteLayout>
            {/* Hero */}
            <section className="bg-hero-gradient pt-32 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #fff 40px, #fff 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #fff 40px, #fff 41px)' }} />
                <div className="relative max-w-7xl mx-auto px-4 md:px-8">
                    <Link href="/projects?category=commercial" className="inline-flex items-center gap-2 text-green-200 hover:text-white transition-colors mb-6 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Projects
                    </Link>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold text-white mb-3">
                        {project.name}
                    </motion.h1>
                    <div className="flex flex-wrap items-center gap-4 text-green-200">
                        <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-semibold capitalize">{project.category}</span>
                        <span className="flex items-center gap-1 text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            {project.capacity}
                        </span>
                        <span className="flex items-center gap-1 text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            {project.district}, {project.state}
                        </span>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding bg-white">
                <div className="container-max">
                    <div className="grid lg:grid-cols-3 gap-10">
                        {/* Main column */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Image Gallery */}
                            {project.images && project.images.length > 0 && (
                                <div>
                                    <div className="rounded-2xl overflow-hidden bg-gray-100 mb-3">
                                        <img
                                            src={project.images[activeImage]}
                                            alt={`${project.name} - Image ${activeImage + 1}`}
                                            className="w-full h-[400px] object-cover"
                                        />
                                    </div>
                                    {project.images.length > 1 && (
                                        <div className="flex gap-2 overflow-x-auto pb-2">
                                            {project.images.map((img, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setActiveImage(i)}
                                                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${activeImage === i ? 'border-primary ring-2 ring-primary/30' : 'border-gray-200 opacity-70 hover:opacity-100'
                                                        }`}
                                                >
                                                    <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Description */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Project</h2>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{project.description}</p>
                            </div>

                            {/* YouTube Video */}
                            {project.youtubeUrl && getYouTubeEmbed(project.youtubeUrl) && (
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Video</h2>
                                    <div className="rounded-2xl overflow-hidden aspect-video bg-gray-100">
                                        <iframe
                                            src={getYouTubeEmbed(project.youtubeUrl)!}
                                            title={project.name}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Details card */}
                            <div className="bg-gray-solar rounded-2xl p-6">
                                <h3 className="font-bold text-gray-900 mb-4">Project Details</h3>
                                <div className="space-y-4">
                                    {[
                                        { label: 'Project Name', value: project.name },
                                        { label: 'Category', value: project.category.charAt(0).toUpperCase() + project.category.slice(1) },
                                        { label: 'Solar Capacity', value: project.capacity },
                                        { label: 'State', value: project.state },
                                        { label: 'District', value: project.district },
                                    ].map((item) => (
                                        <div key={item.label} className="flex justify-between items-start">
                                            <span className="text-gray-500 text-sm">{item.label}</span>
                                            <span className="text-gray-900 font-medium text-sm text-right">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Google Maps */}
                            {project.googleMapsUrl && (
                                <a
                                    href={project.googleMapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl p-5 hover:border-primary hover:shadow-md transition-all group"
                                >
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">View on Google Maps</p>
                                        <p className="text-xs text-gray-500">Open location in maps</p>
                                    </div>
                                </a>
                            )}

                            {/* CTA */}
                            <div className="bg-primary rounded-2xl p-6 text-center">
                                <h3 className="text-white font-bold text-lg mb-2">Interested in Solar?</h3>
                                <p className="text-green-200 text-sm mb-4">Get a free consultation for a similar solar installation.</p>
                                <Link href="/contact" className="block w-full bg-accent hover:bg-accent-light text-white font-semibold py-3 rounded-xl transition-colors">
                                    Get Free Quote →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </SiteLayout>
    );
}
