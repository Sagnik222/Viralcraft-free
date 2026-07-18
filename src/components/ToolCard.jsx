import React, { useState } from 'react';
import { Sparkles, Copy, Download, Share2, Check, RefreshCw, Layers } from 'lucide-react';
import { generateContent } from '../utils/aiGenerator';
import { AffiliateBar } from './AffiliateBar';

export function ToolCard({ tool, onShowToast }) {
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (id, value) => {
    setInputs(prev => ({ ...prev, [id]: value }));
  };

  const handleGenerate = async (e) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const output = await generateContent(tool.id, inputs);
      setResults(output);
      setActiveTab(0);
      onShowToast('⚡ Content generated successfully!');
    } catch (err) {
      console.error(err);
      onShowToast('❌ Generation failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    onShowToast('📋 Copied output to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (text, title) => {
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tool.id}-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onShowToast('📥 Markdown file downloaded!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="glass-panel p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
        
        {/* Header inside Tool Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">{tool.title}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                100% Free
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm">{tool.tagline}</p>
          </div>

          <div className="text-right flex items-center gap-2 self-start sm:self-center">
            <span className="text-xs text-slate-400 font-medium bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-400" /> Unlimited Free Uses
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input Form */}
          <form onSubmit={handleGenerate} className="lg:col-span-5 space-y-5">
            {tool.inputs.map((field) => (
              <div key={field.id} className="space-y-1.5">
                <label className="block text-xs font-bold text-white tracking-wide">
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select
                    value={inputs[field.id] || field.options[0]}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="form-input w-full rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:outline-none transition-all shadow-md"
                  >
                    {field.options.map(opt => (
                      <option key={opt} value={opt} className="bg-white text-slate-900 font-medium">{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={inputs[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="form-input w-full rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:outline-none transition-all shadow-md"
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 text-sm font-extrabold shadow-xl disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating Free Content...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Content Free
                </>
              )}
            </button>
          </form>

          {/* Right Column: Output Results */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {results ? (
                <div className="space-y-4">
                  {/* Variation Tabs */}
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
                    {results.map((res, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                          activeTab === index
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                        }`}
                      >
                        {res.title}
                      </button>
                    ))}
                  </div>

                  {/* Result Content Box */}
                  <div className="relative bg-slate-950/80 border border-slate-800 rounded-xl p-5 min-h-[260px] text-slate-200 text-sm font-sans whitespace-pre-wrap leading-relaxed shadow-inner">
                    {results[activeTab]?.content}
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(results[activeTab]?.content)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-semibold border border-slate-700 transition-all"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? 'Copied!' : 'Copy Copy'}</span>
                      </button>

                      <button
                        onClick={() => handleDownload(results[activeTab]?.content, results[activeTab]?.title)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-semibold border border-slate-700 transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Markdown</span>
                      </button>
                    </div>

                    <span className="text-[11px] text-slate-500 italic">
                      100% free • No watermarks
                    </span>
                  </div>

                  {/* Native Affiliate Partner Bar */}
                  <AffiliateBar toolId={tool.id} />

                </div>
              ) : (
                /* Empty Placeholder State */
                <div className="h-full min-h-[300px] border border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-slate-950/40">
                  <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center mb-3 text-purple-400">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-white text-base font-semibold mb-1 font-heading">Ready to Generate</h3>
                  <p className="text-slate-400 text-xs max-w-sm mb-4">
                    Fill in your topic above and click <span className="text-purple-300 font-semibold">"Generate Content Free"</span> to output instant viral templates.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
