import React from 'react';
import { Zap, Heart, ShieldCheck, Share2, Globe } from 'lucide-react';

export function Footer({ onOpenApiKey, onOpenAgency, onOpenTip }) {
  return (
    <footer className="mt-16 border-t border-white/10 glass-panel py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Col 1: Brand & Mission */}
        <div className="md:col-span-1 space-y-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="font-extrabold text-lg text-white font-heading">
              ViralCraft <span className="gradient-text">Free</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            A 100% free AI content creation & marketing suite built for creators, solopreneurs, and marketers who refuse to pay $50/mo.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" /> No Credit Card Required Ever
          </div>
        </div>

        {/* Col 2: Free SEO Micro-Tools */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 font-heading">Free AI Tools</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><a href="#linkedin" className="hover:text-purple-300 transition-colors">LinkedIn Hook Generator</a></li>
            <li><a href="#youtube" className="hover:text-purple-300 transition-colors">YouTube Script Writer</a></li>
            <li><a href="#twitter" className="hover:text-purple-300 transition-colors">Twitter / X Thread Crafter</a></li>
            <li><a href="#seo" className="hover:text-purple-300 transition-colors">SEO Meta Description Optimizer</a></li>
            <li><a href="#email" className="hover:text-purple-300 transition-colors">Cold Email Subject Line Scorer</a></li>
          </ul>
        </div>

        {/* Col 3: Ecosystem & Monetization */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 font-heading">Platform & Ops</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><button onClick={onOpenApiKey} className="hover:text-purple-300 transition-colors text-left">BYOK Gemini API Key</button></li>
            <li><button onClick={onOpenAgency} className="hover:text-purple-300 transition-colors text-left">Agency White-Labeling</button></li>
            <li><button onClick={onOpenTip} className="hover:text-purple-300 transition-colors text-left">Support Free Development</button></li>
            <li><a href="https://elevenlabs.io/?via=viralcraft" target="_blank" rel="noreferrer" className="hover:text-purple-300 transition-colors">ElevenLabs AI Voiceover</a></li>
          </ul>
        </div>

        {/* Col 4: Stealth Philosophy */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1 font-heading">Stealth Mission</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Operated as a privacy-first, stealth tool engine. All code runs client-side or direct to Google AI endpoints.
          </p>
          <div className="pt-2 flex items-center gap-3 text-slate-400">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1 text-xs">
              <Globe className="w-3.5 h-3.5" /> Web
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1 text-xs">
              <Share2 className="w-3.5 h-3.5" /> Social
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>
          © {new Date().getFullYear()} ViralCraft Free. All rights reserved.
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          Crafted with <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500/20" /> for creators everywhere.
        </div>
      </div>
    </footer>
  );
}
