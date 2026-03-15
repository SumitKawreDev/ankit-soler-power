'use client';

import { useState, useEffect, useCallback } from 'react';

interface Lead {
    _id: string;
    name: string;
    phone: string;
    email?: string;
    location: string;
    message?: string;
    category: 'commercial' | 'residential' | 'franchise';
    electricityBillUrl?: string;
    createdAt: string;
}

export default function AdminLeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'all' | 'commercial' | 'residential' | 'franchise'>('all');
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

    const getToken = useCallback(() => {
        if (typeof window !== 'undefined') return localStorage.getItem('admin_token');
        return null;
    }, []);

    const fetchLeads = useCallback(() => {
        const token = getToken();
        if (!token) return;
        setLoading(true);
        const query = activeTab !== 'all' ? `?category=${activeTab}` : '';
        fetch(`/api/leads${query}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(r => r.json())
            .then(d => { if (d.data) setLeads(d.data); })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [activeTab, getToken]);

    useEffect(() => { fetchLeads(); }, [fetchLeads]);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this lead?')) return;
        const token = getToken();
        if (!token) return;
        try {
            const res = await fetch(`/api/leads/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                setLeads(leads.filter(l => l._id !== id));
                if (selectedLead?._id === id) setSelectedLead(null);
            }
        } catch { /* ignore */ }
    };

    const tabs = [
        { key: 'all' as const, label: 'All' },
        { key: 'commercial' as const, label: 'Commercial' },
        { key: 'residential' as const, label: 'Residential' },
        { key: 'franchise' as const, label: 'Franchise' },
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900">Leads Management</h1>
                <span className="text-sm text-gray-500">{leads.length} total</span>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto">
                {tabs.map(tab => (
                    <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.key ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                            }`}>{tab.label}</button>
                ))}
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin w-6 h-6 border-3 border-primary border-t-transparent rounded-full mx-auto" />
                    </div>
                ) : leads.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">No leads found</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Name</th>
                                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Phone</th>
                                    <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Location</th>
                                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Category</th>
                                    <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Date</th>
                                    <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {leads.map(lead => (
                                    <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3">
                                            <button onClick={() => setSelectedLead(lead)} className="font-medium text-gray-900 hover:text-primary transition-colors text-left">
                                                {lead.name}
                                            </button>
                                            {lead.email && <p className="text-xs text-gray-400">{lead.email}</p>}
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{lead.phone}</td>
                                        <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{lead.location}</td>
                                        <td className="px-4 py-3">
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${lead.category === 'commercial' ? 'bg-primary/10 text-primary' :
                                                lead.category === 'residential' ? 'bg-green-100 text-green-700' :
                                                    'bg-purple-100 text-purple-700'
                                                }`}>{lead.category}</span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-400 text-xs hidden lg:table-cell">
                                            {new Date(lead.createdAt).toLocaleDateString('en-IN')}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button onClick={() => handleDelete(lead._id)} className="text-red-400 hover:text-red-600 transition-colors p-1" title="Delete">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Lead Detail Modal */}
            {selectedLead && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setSelectedLead(null)}>
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-900">Lead Details</h3>
                            <button onClick={() => setSelectedLead(null)} className="text-gray-400 hover:text-gray-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="space-y-3 text-sm">
                            {[
                                { label: 'Name', value: selectedLead.name },
                                { label: 'Phone', value: selectedLead.phone },
                                { label: 'Email', value: selectedLead.email || '—' },
                                { label: 'Location', value: selectedLead.location },
                                { label: 'Category', value: selectedLead.category },
                                { label: 'Message', value: selectedLead.message || '—' },
                                { label: 'Date', value: new Date(selectedLead.createdAt).toLocaleString('en-IN') },
                            ].map(item => (
                                <div key={item.label} className="flex justify-between">
                                    <span className="text-gray-500">{item.label}</span>
                                    <span className="text-gray-900 font-medium text-right max-w-[60%] capitalize">{item.value}</span>
                                </div>
                            ))}
                            {selectedLead.electricityBillUrl && (
                                <div className="pt-2">
                                    <a href={selectedLead.electricityBillUrl} target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline text-sm">
                                        View Electricity Bill →
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
