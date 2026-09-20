import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, Building, Send, CheckCircle2, AlertCircle, Link as LinkIcon, ShieldCheck } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [clientType, setClientType] = useState<'individual' | 'organization'>('organization');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [serviceRequested, setServiceRequested] = useState('Data Annotation');
  const [budget, setBudget] = useState('₹5,000 - ₹10,000');
  const [message, setMessage] = useState('');
  const [webhookUrl, setWebhookUrl] = useState(() => {
    return localStorage.getItem('google_sheet_webhook') || '';
  });
  const [showConfig, setShowConfig] = useState(false);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('google_sheet_webhook', webhookUrl);
  }, [webhookUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientType,
          name,
          email,
          organizationName: clientType === 'organization' ? organizationName : 'Independent Individual',
          serviceRequested,
          budget,
          message,
          webhookUrl: webhookUrl.trim()
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage('Thank you for your inquiry. Your message has been sent and logged successfully.');
        setName('');
        setEmail('');
        setOrganizationName('');
        setMessage('');
      } else {
        setErrorMessage(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Network error. Please check connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-[#0a0a0a] border-t border-slate-200 dark:border-[#262626] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-red-950/30 text-blue-700 dark:text-red-400 text-xs font-semibold border border-blue-200 dark:border-red-900/50">
            Contact
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Send an Inquiry
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
            Fill out the form below for project inquiries, custom annotation pipelines, or translation work.
          </p>

          {/* Google Sheet Integration Toggle */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowConfig(!showConfig)}
              className="text-xs font-semibold text-blue-600 dark:text-red-400 hover:underline flex items-center gap-1"
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>{showConfig ? 'Hide Google Sheet Link Setup' : 'Link to your Google Sheet Webhook URL'}</span>
            </button>

            {showConfig && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 p-4 rounded-xl bg-blue-50 dark:bg-[#141414] border border-blue-200 dark:border-[#262626] space-y-2"
              >
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-red-500" />
                  <span>Google Apps Script Web App URL for your Sheet:</span>
                </label>
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#1a1a1a] border border-slate-300 dark:border-[#333] text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-red-500"
                />
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Paste your Google Apps Script Web App URL here. Submissions will post directly to your private Google Sheet.
                </p>
              </motion.div>
            )}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-slate-50 dark:bg-[#141414] p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-[#262626]"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900 dark:text-white">
                Client Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setClientType('organization')}
                  className={`p-3.5 rounded-xl border font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                    clientType === 'organization'
                      ? 'bg-blue-600 dark:bg-red-600 text-white border-transparent shadow-xs'
                      : 'bg-white dark:bg-[#1a1a1a] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#262626]'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>Organization</span>
                </button>

                <button
                  type="button"
                  onClick={() => setClientType('individual')}
                  className={`p-3.5 rounded-xl border font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                    clientType === 'individual'
                      ? 'bg-blue-600 dark:bg-red-600 text-white border-transparent shadow-xs'
                      : 'bg-white dark:bg-[#1a1a1a] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#262626]'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Individual</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#262626] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-red-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#262626] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-red-500"
                />
              </div>
            </div>

            {clientType === 'organization' && (
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Organization Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required={clientType === 'organization'}
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  placeholder="Company or Institution Name"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#262626] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-red-500"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Service Requested
                </label>
                <select
                  value={serviceRequested}
                  onChange={(e) => setServiceRequested(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#262626] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-red-500"
                >
                  <option value="Data Annotation">Data Annotation</option>
                  <option value="Marathi & English Translation">Marathi & English Translation</option>
                  <option value="Data Labelling">Data Labelling</option>
                  <option value="Other / General">Other / General</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Estimated Budget / Scope (INR)
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#262626] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-red-500"
                >
                  <option value="₹2,000 - ₹5,000">₹2,000 - ₹5,000</option>
                  <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
                  <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
                  <option value="₹25,000+">₹25,000+</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your project requirements, guidelines, or timeline..."
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#262626] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-red-500"
              />
            </div>

            {successMessage && (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200 text-sm font-semibold flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-200 text-sm font-semibold flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-blue-600 dark:bg-red-600 text-white font-bold text-sm hover:opacity-95 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm"
            >
              {loading ? (
                <span>Sending...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>

          </form>
        </motion.div>

      </div>
    </section>
  );
};
