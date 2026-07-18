import React from 'react';
import { Zap, Key, Building2, Heart, ShieldCheck } from 'lucide-react';

export function Header({ onOpenApiKey, onOpenAgency, onOpenTip, hasApiKey }) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 px-4 lg:px-8 py-3.5 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-purple-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-purple-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white font-heading">
                ViralCraft <span className="gradient-text">Free</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" /> 100% Free
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Zero Paywalls • Unlimited Generations
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* BYOK Status / Modal */}
          <button
            onClick={onOpenApiKey}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              hasApiKey 
                ? 'bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20' 
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700/80'
            }`}
          >
            <Key className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">{hasApiKey ? 'Gemini Key Connected' : 'BYOK (API Key)'}</span>
          </button>

          {/* Agency White-Label Link */}
          <button
            onClick={onOpenAgency}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 border border-slate-700 text-slate-300 hover:bg-slate-700/80 hover:text-white transition-all hidden md:flex"
          >
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Agency White-Label</span>
          </button>

          {/* Tip / Coffee Modal */}
          <button
            onClick={onOpenTip}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/30 text-pink-300 hover:bg-pink-500/20 transition-all"
          >
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400/20" />
            <span>Support Free</span>
          </button>

        </div>
      </div>
    </header>
  );
}
