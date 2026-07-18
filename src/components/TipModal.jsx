import React from 'react';
import { X, Heart, Coffee, ExternalLink, Sparkles } from 'lucide-react';

export function TipModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-panel max-w-md w-full p-6 border border-white/10 shadow-2xl relative text-center">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 p-0.5 mx-auto mb-3 shadow-lg shadow-pink-500/20 flex items-center justify-center">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Coffee className="w-6 h-6 text-pink-400" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-1 font-heading">Support 100% Free Tools</h3>
        <p className="text-xs text-slate-400 mb-5 leading-relaxed max-w-sm mx-auto">
          ViralCraft is completely free with zero paywalls. If our tools saved you time or helped you land a client, consider buying a coffee to support server maintenance!
        </p>

        <div className="grid grid-cols-3 gap-2.5 mb-5">
          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500/40 hover:bg-slate-850 transition-all text-center block group"
          >
            <div className="text-sm font-bold text-white group-hover:text-pink-300">$5</div>
            <div className="text-[10px] text-slate-500">1 Coffee ☕</div>
          </a>

          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-slate-900 border border-pink-500/30 hover:border-pink-500 hover:bg-slate-850 transition-all text-center block group"
          >
            <div className="text-sm font-bold text-pink-300">$15</div>
            <div className="text-[10px] text-pink-400/80">3 Coffees ⚡</div>
          </a>

          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500/40 hover:bg-slate-850 transition-all text-center block group"
          >
            <div className="text-sm font-bold text-white group-hover:text-pink-300">$50</div>
            <div className="text-[10px] text-slate-500">Super Supporter 🚀</div>
          </a>
        </div>

        <div className="pt-2 border-t border-slate-800">
          <p className="text-[11px] text-slate-500">
            Thank you for keeping software accessible to everyone! ❤️
          </p>
        </div>

      </div>
    </div>
  );
}
