import React from 'react';
import { Share2, Video, MessageSquare, Search, Mail, Sparkles, CheckCircle2 } from 'lucide-react';

const iconMap = {
  Share2: Share2,
  Video: Video,
  MessageSquare: MessageSquare,
  Search: Search,
  Mail: Mail
};

export function Hero({ tools, activeToolId, onSelectTool }) {
  return (
    <section className="relative pt-8 pb-6 px-4 max-w-7xl mx-auto text-center">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/10 blur-3xl rounded-full pointer-events-none animate-glow" />

      {/* Trust Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/30 text-xs text-purple-300 font-medium mb-4 shadow-lg">
        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
        <span>100% Free AI Marketing & Content Engine</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 max-w-4xl mx-auto leading-tight">
        Create Viral Social Copy & Video Scripts <span className="gradient-text">100% Free</span>
      </h1>

      {/* Subtitle */}
      <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
        Stop paying $50/month subscription fees. Access high-converting LinkedIn hooks, YouTube scripts, X threads, and SEO descriptions with zero paywalls.
      </p>

      {/* Value Badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-400 mb-8">
        <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> No Credit Card Required
        </span>
        <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Unlimited Free Generations
        </span>
        <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Google Search SEO Ready
        </span>
      </div>

      {/* Interactive Tool Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
        {tools.map((tool) => {
          const IconComponent = iconMap[tool.icon] || Sparkles;
          const isActive = tool.id === activeToolId;

          return (
            <button
              key={tool.id}
              onClick={() => onSelectTool(tool.id)}
              className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between group relative overflow-hidden ${
                isActive
                  ? 'bg-slate-900 border-purple-500/80 shadow-lg shadow-purple-500/20 ring-1 ring-purple-500/50'
                  : 'glass-panel hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg bg-slate-800/80 ${isActive ? 'text-purple-400' : 'text-slate-400 group-hover:text-white'}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-slate-800 text-slate-400'
                }`}>
                  {tool.badge}
                </span>
              </div>

              <div>
                <h3 className={`font-semibold text-xs mb-1 ${isActive ? 'text-white font-bold' : 'text-slate-300'}`}>
                  {tool.title.split('&')[0]}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-1">
                  {tool.tagline.substring(0, 40)}...
                </p>
              </div>

              {/* Bottom Active Glow Bar */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
              )}
            </button>
          );
        })}
      </div>

    </section>
  );
}
