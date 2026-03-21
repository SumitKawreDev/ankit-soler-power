'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GetQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: 'commercial' | 'residential' | 'franchise';
}

type Category = 'commercial' | 'residential' | 'franchise';

// Maximum file size in bytes (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Accepted file types
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

export default function GetQuoteModal({ isOpen, onClose, defaultCategory }: GetQuoteModalProps) {
  const [category, setCategory] = useState<Category>(defaultCategory || 'commercial');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [fileError, setFileError] = useState('');
  const [form, setForm] = useState({
    name: '', phone: '', email: '', location: '', message: '', companyName: '', occupation: ''
  });
  const [electricityBill, setElectricityBill] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateFile = (file: File): boolean => {
    setFileError('');
    
    // Check file type
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setFileError('Please upload a JPG, PNG, or PDF file.');
      return false;
    }
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setFileError('File size must be less than 5MB.');
      return false;
    }
    
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (validateFile(file)) {
        setElectricityBill(file);
      } else {
        // Clear the input if validation fails
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (validateFile(file)) {
        setElectricityBill(file);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const removeFile = () => {
    setElectricityBill(null);
    setFileError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Create FormData for multipart/form-data submission
      const formData = new FormData();
      
      // Append all text fields
      formData.append('name', form.name);
      formData.append('phone', form.phone);
      formData.append('email', form.email);
      formData.append('location', form.location);
      formData.append('message', form.message);
      formData.append('category', category);
      if (form.companyName) formData.append('companyName', form.companyName);
      if (form.occupation) formData.append('occupation', form.occupation);
      
      // Append file only if selected
      if (electricityBill) {
        formData.append('electricityBill', electricityBill);
      }
      
      const res = await fetch('/api/leads', {
        method: 'POST',
        // Do not set Content-Type header - browser sets it with boundary for multipart/form-data
        body: formData,
      });
      
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setForm({ name: '', phone: '', email: '', location: '', message: '', companyName: '', occupation: '' });
        setElectricityBill(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError('');
    setFileError('');
    onClose();
  };

  const categories: { value: Category; label: string; icon: string; desc: string }[] = [
    { value: 'commercial', label: 'Commercial', icon: '🏭', desc: 'Hotels, Factories, Industrial' },
    { value: 'residential', label: 'Residential', icon: '🏠', desc: 'Home Solar Systems' },
    { value: 'franchise', label: 'Franchise', icon: '🤝', desc: 'Business Partnership' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#023d2a] p-6 rounded-t-2xl">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-xl font-bold text-white">Get Solar Quote</h2>
                <button onClick={handleClose} className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-green-200 text-sm">Free consultation & custom quote for your solar needs</p>
            </div>

            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#023d2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Inquiry Submitted!</h3>
                <p className="text-gray-500 mb-6">Our solar expert will contact you within 24 hours with a customized quote.</p>
                <button onClick={handleClose} className="bg-[#023d2a] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#023d2a]/90 transition-colors">
                  Done
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Category selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Inquiry Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setCategory(cat.value)}
                        className={`p-3 rounded-xl border-2 text-center transition-all ${
                          category === cat.value
                            ? 'border-[#023d2a] bg-[#023d2a]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-xl block mb-1">{cat.icon}</span>
                        <span className={`text-xs font-semibold block ${category === cat.value ? 'text-[#023d2a]' : 'text-gray-600'}`}>{cat.label}</span>
                        <span className="text-xs text-gray-400 hidden sm:block">{cat.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#023d2a]/30 focus:border-[#023d2a]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#023d2a]/30 focus:border-[#023d2a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    required
                    placeholder="City, State"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#023d2a]/30 focus:border-[#023d2a]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-gray-400">(optional)</span></label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#023d2a]/30 focus:border-[#023d2a]"
                  />
                </div>

                {/* Company Name - Only for commercial and residential */}
                {(category === 'commercial' || category === 'residential') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name <span className="text-gray-400">(optional)</span></label>
                    <input
                      type="text"
                      name="companyName"
                      value={form.companyName}
                      onChange={handleChange}
                      placeholder="Business Name"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#023d2a]/30 focus:border-[#023d2a]"
                    />
                  </div>
                )}

                {/* Occupation - Only for franchise */}
                {category === 'franchise' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Occupation <span className="text-gray-400">(optional)</span></label>
                    <input
                      type="text"
                      name="occupation"
                      value={form.occupation}
                      onChange={handleChange}
                      placeholder="Your current profession or business type"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#023d2a]/30 focus:border-[#023d2a]"
                    />
                  </div>
                )}

                {/* File Upload Section - Only for commercial and residential */}
                {(category === 'commercial' || category === 'residential') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Electricity Bill <span className="text-gray-400">(optional)</span>
                    </label>
                    
                    {!electricityBill ? (
                      <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={() => fileInputRef.current?.click()}
                        className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-[#023d2a] hover:bg-[#023d2a]/5 transition-all group"
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        
                        {/* Upload Icon */}
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#023d2a]/10 transition-colors">
                          <svg className="w-6 h-6 text-gray-400 group-hover:text-[#023d2a] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-400">
                          JPG, PNG, PDF (max 5MB)
                        </p>
                      </div>
                    ) : (
                      <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {/* File Icon */}
                            <div className="w-10 h-10 bg-[#023d2a]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <svg className="w-5 h-5 text-[#023d2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            
                            {/* File Info */}
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                                {electricityBill.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatFileSize(electricityBill.size)}
                              </p>
                            </div>
                          </div>
                          
                          {/* Remove Button */}
                          <button
                            type="button"
                            onClick={removeFile}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Remove file"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* File Error Message */}
                    {fileError && (
                      <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {fileError}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message <span className="text-gray-400">(optional)</span></label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell us about your requirements..."
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#023d2a]/30 focus:border-[#023d2a] resize-none"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#023d2a] hover:bg-[#023d2a]/90 disabled:opacity-70 text-white font-semibold py-3 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
