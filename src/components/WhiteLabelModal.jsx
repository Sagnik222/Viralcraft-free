import React, { useState } from 'react';
import { X, Building2, Check, Sparkles, Send } from 'lucide-react';

export function WhiteLabelModal({ isOpen, onClose, onShowToast }) {
  const [email, setEmail] = useState('');
  const [agencyName, setAgencyName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    onShowToast('📩 Inquiry sent! We will reach out within 24 hours.');
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-panel max-w-lg w-full p-6 border border-white/10 shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-heading">Agency White-Label License</h3>
            <p className="text-xs text-slate-400">Embed this tool suite under your own agency domain</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          While ViralCraft is <span className="text-emerald-400 font-semibold">100% Free for individuals</span>, we license custom white-labeled versions to marketing agencies and software companies.
        </p>

        <div className="space-y-2 mb-6 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Custom domain (`tools.youragency.com`) with your logo & brand colors</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Client lead capture portal + CRM integration (HubSpot/GoHighLevel)</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Dedicated API keys & priority SLA support</span>
          </div>
        </div>

        {submitted ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs text-center font-medium">
            ✨ Thanks! Your agency license request has been submitted.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Agency Name</label>
              <input
                type="text"
                required
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
                placeholder="e.g. Apex Marketing Agency"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Work Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@apexagency.com"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg transition-all flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Request White-Label Pricing ($99/mo)
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
