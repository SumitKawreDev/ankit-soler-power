'use client';

import { useState, useEffect, useCallback } from 'react';

interface Project {
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
    featured: boolean;
}

const emptyForm = {
    name: '', description: '', capacity: '', category: 'commercial' as 'commercial' | 'residential',
    images: '', youtubeUrl: '', state: '', district: '', googleMapsUrl: '', featured: false,
};

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<string | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const getToken = useCallback(() => {
        if (typeof window !== 'undefined') return localStorage.getItem('admin_token');
        return null;
    }, []);

    const fetchProjects = useCallback(() => {
        const token = getToken();
        if (!token) return;
        setLoading(true);
        fetch('/api/projects', { headers: { Authorization: `Bearer ${token}` } })
            .then(r => r.json())
            .then(d => { if (d.data) setProjects(d.data); })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [getToken]);

    useEffect(() => { fetchProjects(); }, [fetchProjects]);

    const openEdit = (p: Project) => {
        setForm({
            name: p.name, description: p.description, capacity: p.capacity,
            category: p.category, images: p.images.join(', '), youtubeUrl: p.youtubeUrl || '',
            state: p.state, district: p.district, googleMapsUrl: p.googleMapsUrl || '', featured: p.featured,
        });
        setEditing(p._id);
        setShowForm(true);
        setError('');
    };

    const openNew = () => {
        setForm(emptyForm);
        setEditing(null);
        setShowForm(true);
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        const token = getToken();
        if (!token) return;

        const body = {
            ...form,
            images: form.images.split(',').map(s => s.trim()).filter(Boolean),
        };

        try {
            const url = editing ? `/api/projects/${editing}` : '/api/projects';
            const method = editing ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if (res.ok) {
                setShowForm(false);
                fetchProjects();
            } else {
                setError(data.error || 'Failed to save project');
            }
        } catch {
            setError('Network error');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        const token = getToken();
        if (!token) return;
        try {
            await fetch(`/api/projects/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
            setProjects(prev => prev.filter(p => p._id !== id));
        } catch { /* ignore */ }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900">Projects Management</h1>
                <button onClick={openNew} className="bg-primary hover:bg-primary-light text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                    + Add Project
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="font-bold text-gray-900">{editing ? 'Edit Project' : 'Add New Project'}</h3>
                            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
                                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity *</label>
                                    <input type="text" value={form.capacity} onChange={e => setForm({ ...form, capacity: e.target.value })} required placeholder="e.g. 100 KW"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as 'commercial' | 'residential' })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                                        <option value="commercial">Commercial</option>
                                        <option value="residential">Residential</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                                    <input type="text" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">District *</label>
                                    <input type="text" value={form.district} onChange={e => setForm({ ...form, district: e.target.value })} required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image URLs (comma separated)</label>
                                <input type="text" value={form.images} onChange={e => setForm({ ...form, images: e.target.value })} placeholder="https://res.cloudinary.com/..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Video URL</label>
                                <input type="url" value={form.youtubeUrl} onChange={e => setForm({ ...form, youtubeUrl: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps URL</label>
                                <input type="url" value={form.googleMapsUrl} onChange={e => setForm({ ...form, googleMapsUrl: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                            </div>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="rounded" />
                                <span className="text-sm text-gray-700">Featured project (shown on homepage)</span>
                            </label>
                            {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>}
                            <button type="submit" disabled={saving}
                                className="w-full bg-primary hover:bg-primary-light disabled:opacity-70 text-white font-semibold py-2.5 rounded-lg transition-all">
                                {saving ? 'Saving...' : editing ? 'Update Project' : 'Add Project'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Projects Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center"><div className="animate-spin w-6 h-6 border-3 border-primary border-t-transparent rounded-full mx-auto" /></div>
                ) : projects.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">No projects yet. Add your first project.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Project</th>
                                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Capacity</th>
                                    <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Location</th>
                                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Category</th>
                                    <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {projects.map(p => (
                                    <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3">
                                            <p className="font-medium text-gray-900">{p.name}</p>
                                            {p.featured && <span className="text-xs text-accent font-semibold">⭐ Featured</span>}
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{p.capacity}</td>
                                        <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{p.district}, {p.state}</td>
                                        <td className="px-4 py-3">
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${p.category === 'commercial' ? 'bg-primary/10 text-primary' : 'bg-green-100 text-green-700'
                                                }`}>{p.category}</span>
                                        </td>
                                        <td className="px-4 py-3 text-right space-x-2">
                                            <button onClick={() => openEdit(p)} className="text-blue-500 hover:text-blue-700 transition-colors p-1" title="Edit">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </button>
                                            <button onClick={() => handleDelete(p._id)} className="text-red-400 hover:text-red-600 transition-colors p-1" title="Delete">
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
        </div>
    );
}
