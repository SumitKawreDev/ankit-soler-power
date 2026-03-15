'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface Stats {
    totalLeads: number;
    commercialLeads: number;
    residentialLeads: number;
    franchiseLeads: number;
    totalProjects: number;
    totalFranchises: number;
}

interface RecentLead {
    _id: string;
    name: string;
    phone: string;
    category: string;
    location: string;
    createdAt: string;
}

interface RecentProject {
    _id: string;
    name: string;
    capacity: string;
    category: string;
    state: string;
}

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
    const [recentProjects, setRecentProjects] = useState<RecentProject[]>([]);
    const [loading, setLoading] = useState(true);

    const getToken = useCallback(() => {
        if (typeof window !== 'undefined') return localStorage.getItem('admin_token');
        return null;
    }, []);

    useEffect(() => {
        const token = getToken();
        if (!token) return;
        const headers = { Authorization: `Bearer ${token}` };

        Promise.all([
            fetch('/api/admin/stats', { headers }).then(r => r.json()),
        ])
            .then(([statsData]) => {
                if (statsData?.data) {
                    const d = statsData.data;
                    setStats({
                        totalLeads: d.leads?.total || 0,
                        commercialLeads: d.leads?.commercial || 0,
                        residentialLeads: d.leads?.residential || 0,
                        franchiseLeads: d.leads?.franchise || 0,
                        totalProjects: d.projects?.total || 0,
                        totalFranchises: d.franchise?.total || 0,
                    });
                    if (d.recentLeads) setRecentLeads(d.recentLeads);
                    if (d.recentProjects) setRecentProjects(d.recentProjects);
                }
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [getToken]);

    const statCards = stats ? [
        { label: 'Total Leads', value: stats.totalLeads, color: 'bg-blue-500', icon: '📋' },
        { label: 'Commercial Leads', value: stats.commercialLeads, color: 'bg-primary', icon: '🏭' },
        { label: 'Residential Leads', value: stats.residentialLeads, color: 'bg-green-500', icon: '🏠' },
        { label: 'Franchise Leads', value: stats.franchiseLeads, color: 'bg-purple-500', icon: '🤝' },
        { label: 'Total Projects', value: stats.totalProjects, color: 'bg-accent', icon: '☀️' },
        { label: 'Franchise Locations', value: stats.totalFranchises, color: 'bg-pink-500', icon: '📍' },
    ] : [];

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map(n => (
                        <div key={n} className="bg-white rounded-xl p-5 animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
                            <div className="h-8 bg-gray-200 rounded w-1/3" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {statCards.map((s) => (
                    <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-2xl">{s.icon}</span>
                            <span className={`w-2 h-2 rounded-full ${s.color}`} />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                        <p className="text-gray-500 text-sm">{s.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Leads */}
                <div className="bg-white rounded-xl shadow-sm">
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="font-bold text-gray-900">Recent Leads</h2>
                        <Link href="/admin/dashboard/leads" className="text-primary text-sm font-medium hover:underline">View All →</Link>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {recentLeads.length > 0 ? recentLeads.map((lead) => (
                            <div key={lead._id} className="px-5 py-3 flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">{lead.name}</p>
                                    <p className="text-gray-400 text-xs">{lead.phone} · {lead.location}</p>
                                </div>
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${lead.category === 'commercial' ? 'bg-primary/10 text-primary' :
                                    lead.category === 'residential' ? 'bg-green-100 text-green-700' :
                                        'bg-purple-100 text-purple-700'
                                    }`}>{lead.category}</span>
                            </div>
                        )) : (
                            <div className="px-5 py-8 text-center text-gray-400 text-sm">No leads yet</div>
                        )}
                    </div>
                </div>

                {/* Recent Projects */}
                <div className="bg-white rounded-xl shadow-sm">
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="font-bold text-gray-900">Recent Projects</h2>
                        <Link href="/admin/dashboard/projects" className="text-primary text-sm font-medium hover:underline">View All →</Link>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {recentProjects.length > 0 ? recentProjects.map((project) => (
                            <div key={project._id} className="px-5 py-3 flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">{project.name}</p>
                                    <p className="text-gray-400 text-xs">{project.capacity} · {project.state}</p>
                                </div>
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${project.category === 'commercial' ? 'bg-primary/10 text-primary' : 'bg-green-100 text-green-700'
                                    }`}>{project.category}</span>
                            </div>
                        )) : (
                            <div className="px-5 py-8 text-center text-gray-400 text-sm">No projects yet</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
