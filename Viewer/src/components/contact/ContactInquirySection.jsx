import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, ShieldAlert, FileText, Clock } from 'lucide-react';
import { CONTACT_PAGE_DEFAULTS } from '../../data/contactPageDefaults';
import { apiClient } from '../../api/client';

import { INQUIRY_TYPES } from '../../constants/inquiryTypes';

const Toast = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 50, scale: 0.95 }}
    className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl border ${
      type === 'success' 
        ? 'bg-[#050505] border-green-500/30 text-green-500'
        : 'bg-[#050505] border-red-500/30 text-red-500'
    }`}
  >
    {type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
    <p className="font-heading font-bold uppercase tracking-wider text-sm">{message}</p>
    <button onClick={onClose} className="ml-4 text-brand-white/50 hover:text-brand-white">
      <AlertCircle size={16} className="opacity-0" /> {/* Spacer */}
    </button>
  </motion.div>
);

const ContactInquirySection = ({ data, forwardRef }) => {

  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toast, setToast] = useState(null);
  const [apiError, setApiError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.inquiryType) newErrors.inquiryType = 'Please select an inquiry type';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error as user types
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const formDefaults = data?.form || {};
  const supportDefaults = data?.support || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Map to backend schema
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || undefined,
        organization: formData.organization || undefined,
        type: formData.inquiryType,
        message: formData.message
      };

      await apiClient.post('/contact', payload);

      setToast({ type: 'success', message: formDefaults.fields?.successMessage || 'Inquiry Submitted Successfully' });
      setFormData({
        fullName: '',
        organization: '',
        email: '',
        phone: '',
        inquiryType: '',
        message: ''
      });
      setErrors({});
      setTimeout(() => setToast(null), 5000);
    } catch (err) {
      console.error("Submission failed", err);
      setToast({ type: 'error', message: 'Failed to send inquiry. Please try again later.' });
      setTimeout(() => setToast(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={forwardRef} className="py-24 bg-[#050505] relative z-10 border-t border-[rgba(255,255,255,0.06)] overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">

          {/* INQUIRY FORM */}
          <div className="w-full border border-[rgba(255,255,255,0.06)] bg-[#080808] p-8 md:p-12 relative overflow-hidden group">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[80px] rounded-full pointer-events-none transition-opacity duration-700"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] text-brand-primary tracking-widest font-heading uppercase font-bold">{formDefaults.sectionHeader}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-white leading-tight mb-4">
                {formDefaults.title}
              </h2>
              <p className="text-brand-white/50 font-body mb-10">
                {formDefaults.description}
              </p>

                <AnimatePresence>
                  {toast && (
                    <Toast 
                      type={toast.type} 
                      message={toast.message} 
                      onClose={() => setToast(null)} 
                    />
                  )}
                </AnimatePresence>

                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {apiError && (
                      <div className="p-4 border border-red-500/30 bg-red-500/10 text-red-500 text-sm flex items-start gap-3">
                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                        <p>{apiError}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-heading font-bold text-brand-white uppercase tracking-wider">{formDefaults.fields?.nameLabel} <span className="text-brand-primary">*</span></label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className={`w-full bg-[#050505] border ${errors.fullName ? 'border-red-500/50' : 'border-[rgba(255,255,255,0.1)]'} text-brand-white px-4 py-3 focus:outline-none focus:border-brand-primary focus:bg-[rgba(255,106,0,0.02)] transition-all`}
                        />
                        {errors.fullName && <span className="text-xs text-red-500">{errors.fullName}</span>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-heading font-bold text-brand-white uppercase tracking-wider">{formDefaults.fields?.organizationLabel}</label>
                        <input
                          type="text"
                          name="organization"
                          value={formData.organization}
                          onChange={handleInputChange}
                          placeholder="Enter your organization"
                          className="w-full bg-[#050505] border border-[rgba(255,255,255,0.1)] text-brand-white px-4 py-3 focus:outline-none focus:border-brand-primary focus:bg-[rgba(255,106,0,0.02)] transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-heading font-bold text-brand-white uppercase tracking-wider">{formDefaults.fields?.emailLabel} <span className="text-brand-primary">*</span></label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                          className={`w-full bg-[#050505] border ${errors.email ? 'border-red-500/50' : 'border-[rgba(255,255,255,0.1)]'} text-brand-white px-4 py-3 focus:outline-none focus:border-brand-primary focus:bg-[rgba(255,106,0,0.02)] transition-all`}
                        />
                        {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-heading font-bold text-brand-white uppercase tracking-wider">{formDefaults.fields?.phoneLabel}</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          className="w-full bg-[#050505] border border-[rgba(255,255,255,0.1)] text-brand-white px-4 py-3 focus:outline-none focus:border-brand-primary focus:bg-[rgba(255,106,0,0.02)] transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-heading font-bold text-brand-white uppercase tracking-wider">{formDefaults.fields?.inquiryTypeLabel} <span className="text-brand-primary">*</span></label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className={`w-full bg-[#050505] border ${errors.inquiryType ? 'border-red-500/50' : 'border-[rgba(255,255,255,0.1)]'} text-brand-white px-4 py-3 focus:outline-none focus:border-brand-primary focus:bg-[rgba(255,106,0,0.02)] transition-all appearance-none`}
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.5)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
                      >
                        <option value="" disabled>Select inquiry type</option>
                        {INQUIRY_TYPES.map((type, idx) => (
                          <option key={idx} value={type} className="bg-[#050505] text-brand-white">{type}</option>
                        ))}
                      </select>
                      {errors.inquiryType && <span className="text-xs text-red-500">{errors.inquiryType}</span>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-heading font-bold text-brand-white uppercase tracking-wider">{formDefaults.fields?.messageLabel} <span className="text-brand-primary">*</span></label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your requirements..."
                        rows={5}
                        className={`w-full bg-[#050505] border ${errors.message ? 'border-red-500/50' : 'border-[rgba(255,255,255,0.1)]'} text-brand-white px-4 py-3 focus:outline-none focus:border-brand-primary focus:bg-[rgba(255,106,0,0.02)] transition-all resize-y`}
                      ></textarea>
                      {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand-primary text-[#050505] px-10 py-4 font-heading font-bold uppercase tracking-widest text-sm hover:bg-brand-primary/90 hover:shadow-[0_0_20px_rgba(255,106,0,0.4)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Sending...' : formDefaults.fields?.submitText}
                        {!isSubmitting && <Send size={18} />}
                      </button>

                      <div className="flex items-center gap-3 text-brand-white/40 text-xs">
                        <ShieldAlert size={16} className="text-brand-primary/70" />
                        <span>{formDefaults.fields?.disclaimer}</span>
                      </div>
                    </div>
                  </motion.form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactInquirySection;
