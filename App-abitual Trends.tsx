
import React, { useState } from 'react';
import Header from './components/Header';
import WellnessDashboard from './components/WellnessDashboard';
import ChatBot from './components/ChatBot';
import GroundingTools from './components/GroundingTools';
import ImageLab from './components/ImageLab';
import { TabType } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.DASHBOARD);

  const renderContent = () => {
    switch (activeTab) {
      case TabType.DASHBOARD:
        return <WellnessDashboard />;
      case TabType.CHAT:
        return <ChatBot />;
      case TabType.WELLNESS_FINDER:
        return <GroundingTools />;
      case TabType.IMAGE_LAB:
        return <ImageLab />;
      default:
        return <WellnessDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {renderContent()}
      </main>

      <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">🌿</div>
            <span className="font-bold text-gray-900">Habitual Trends</span>
          </div>
          <p className="text-gray-400 text-sm">
            Empowering your health journey with Gemini Intelligence.
          </p>
          <div className="mt-4 flex justify-center gap-6 text-xs font-semibold text-gray-400 uppercase tracking-widest">
            <span>Fitness</span>
            <span>Sleep</span>
            <span>Mindfulness</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
