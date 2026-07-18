import React, { useState, useEffect } from 'react';
import { toolsData } from './data/toolsData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ToolCard } from './components/ToolCard';
import { ApiKeyModal } from './components/ApiKeyModal';
import { WhiteLabelModal } from './components/WhiteLabelModal';
import { TipModal } from './components/TipModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeToolId, setActiveToolId] = useState('linkedin');
  const [apiKey, setApiKey] = useState('');
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);
  const [isAgencyOpen, setIsAgencyOpen] = useState(false);
  const [isTipOpen, setIsTipOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('viralcraft_gemini_key');
    if (saved) setApiKey(saved);
  }, []);

  const handleSaveApiKey = (newKey) => {
    setApiKey(newKey);
    if (newKey) {
      localStorage.setItem('viralcraft_gemini_key', newKey);
      showToast('🔑 Gemini API Key saved locally!');
    } else {
      localStorage.removeItem('viralcraft_gemini_key');
      showToast('🗑️ API Key removed. Using built-in generator.');
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const activeTool = toolsData.find(t => t.id === activeToolId) || toolsData[0];

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-purple-500 selection:text-white">
      
      {/* Header */}
      <Header
        onOpenApiKey={() => setIsApiKeyOpen(true)}
        onOpenAgency={() => setIsAgencyOpen(true)}
        onOpenTip={() => setIsTipOpen(true)}
        hasApiKey={Boolean(apiKey)}
      />

      {/* Main Content */}
      <main className="flex-1">
        <Hero
          tools={toolsData}
          activeToolId={activeToolId}
          onSelectTool={(id) => setActiveToolId(id)}
        />

        <ToolCard
          key={activeTool.id}
          tool={activeTool}
          onShowToast={showToast}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenApiKey={() => setIsApiKeyOpen(true)}
        onOpenAgency={() => setIsAgencyOpen(true)}
        onOpenTip={() => setIsTipOpen(true)}
      />

      {/* Modals */}
      <ApiKeyModal
        isOpen={isApiKeyOpen}
        onClose={() => setIsApiKeyOpen(false)}
        onSaveKey={handleSaveApiKey}
        currentKey={apiKey}
      />

      <WhiteLabelModal
        isOpen={isAgencyOpen}
        onClose={() => setIsAgencyOpen(false)}
        onShowToast={showToast}
      />

      <TipModal
        isOpen={isTipOpen}
        onClose={() => setIsTipOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 glass-panel px-4 py-3 border border-purple-500/40 text-white text-xs font-semibold shadow-2xl animate-slide-up flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
