import React, { useState, useEffect } from 'react';
import { X, Key, Check, ExternalLink, ShieldCheck, Trash2 } from 'lucide-react';

export function ApiKeyModal({ isOpen, onClose, onSaveKey, currentKey }) {
  const [key, setKey] = useState('');

  useEffect(() => {
    setKey(currentKey || '');
  }, [currentKey, isOpen]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveKey(key);
    onClose();
  };

  const handleClear = () => {
    onSaveKey('');
    setKey('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel max-w-md w-full p-6 border border-white/10 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-heading">Bring Your Own Key (BYOK)</h3>
            <p className="text-xs text-slate-400">Optional: Connect your Google Gemini API Key</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          ViralCraft works 100% free out of the box. If you'd like unlimited live generation with your own quota, enter your free Google Gemini API key below. Key is saved locally in your browser only.
        </p>

        {/* Info Box */}
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 mb-4 text-xs text-slate-400 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>Your key is never sent to our servers. All API requests run direct client-side to Google AI endpoints.</span>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Google Gemini API Key
            </label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-medium"
            >
              Get Free Gemini Key <ExternalLink className="w-3 h-3" />
            </a>

            <div className="flex items-center gap-2">
              {currentKey && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-3 py-2 rounded-xl text-xs font-medium bg-rose-500/10 text-rose-300 border border-rose-500/20 hover:bg-rose-500/20 transition-all flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              )}

              <button
                type="submit"
                className="btn-primary py-2 px-4 text-xs font-semibold"
              >
                Save Key
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
