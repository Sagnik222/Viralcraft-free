import React from 'react';
import { ExternalLink, Mic, Video, FileText, Send, Globe, Sparkles } from 'lucide-react';
import { affiliateTools } from '../data/affiliateData';

const iconMap = {
  Mic: Mic,
  Video: Video,
  FileText: FileText,
  Send: Send,
  Globe: Globe
};

export function AffiliateBar({ toolId }) {
  // Recommend specific partner tools based on the current tool
  const getRelevantTools = () => {
    switch (toolId) {
      case 'youtube':
        return affiliateTools.filter(t => t.id === 'elevenlabs' || t.id === 'descript');
      case 'linkedin':
      case 'twitter':
        return affiliateTools.filter(t => t.id === 'notion' || t.id === 'convertkit');
      case 'seo':
        return affiliateTools.filter(t => t.id === 'hostinger' || t.id === 'notion');
      case 'email':
        return affiliateTools.filter(t => t.id === 'convertkit' || t.id === 'notion');
      default:
        return affiliateTools.slice(0, 2);
    }
  };

  const relevant = getRelevantTools();

  return (
    <div className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-300">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Recommended Next Steps & Free Partner Tools</span>
        </div>
        <span className="text-[10px] text-slate-500 font-medium">Free Trials • Supported by Partners</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {relevant.map((item) => {
          const IconComp = iconMap[item.icon] || ExternalLink;
          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 hover:bg-slate-900 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:text-purple-300 transition-colors">
                  <IconComp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white group-hover:text-purple-300 transition-colors flex items-center gap-1.5">
                    {item.name}
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-normal">
                      {item.category}
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{item.headline}</p>
                </div>
              </div>

              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 shrink-0 transition-colors" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
