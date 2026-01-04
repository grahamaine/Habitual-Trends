
import React from 'react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: TabType.DASHBOARD, label: 'Dashboard', icon: '📊' },
    { id: TabType.CHAT, label: 'Wellness Coach', icon: '💬' },
    { id: TabType.WELLNESS_FINDER, label: 'Explore', icon: '📍' },
    { id: TabType.IMAGE_LAB, label: 'Image Lab', icon: '🎨' },
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <span className="text-white text-xl">🌿</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Habitual Trends</h1>
          </div>
          <nav className="hidden md:flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
      {/* Mobile Nav */}
      <div className="md:hidden flex overflow-x-auto border-t border-gray-100 py-2 px-4 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-medium mr-2 ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-500 border border-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
