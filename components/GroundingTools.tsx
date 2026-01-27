
import React, { useState, useEffect } from 'react';
import { findWellnessPlaces } from '../services/geminiService';

const GroundingTools: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ text: string; links: any[] } | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => console.log('Location permission denied')
      );
    }
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const { text, groundingLinks } = await findWellnessPlaces(query, coords?.lat, coords?.lng);
      setResults({ text, links: groundingLinks });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = ["Healthy restaurants near me", "Meditation studios in this area", "Best outdoor running tracks", "24/7 gyms nearby"];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Explore Wellness</h2>
        <p className="text-gray-500 mb-8">Find the best local spots for your physical and mental health.</p>
        
        <form onSubmit={handleSearch} className="relative mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for gyms, spas, yoga studios..."
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-12 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-lg"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 bg-indigo-600 text-white px-6 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all"
          >
            {loading ? 'Finding...' : 'Search'}
          </button>
        </form>

        <div className="flex flex-wrap gap-2 mb-8">
          {suggestions.map(s => (
            <button 
              key={s} 
              onClick={() => setQuery(s)}
              className="text-sm bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full hover:bg-indigo-100 transition-colors border border-indigo-100"
            >
              {s}
            </button>
          ))}
        </div>

        {results && (
          <div className="bg-slate-50 rounded-2xl p-6 border border-gray-100 animate-in slide-in-from-bottom-4 duration-500">
            <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
              📍 Discovery Summary
            </h3>
            <div className="prose prose-indigo max-w-none mb-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{results.text}</p>
            </div>
            
            {results.links.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {results.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all group shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">🗺️</div>
                      <span className="font-semibold text-gray-800">{link.title}</span>
                    </div>
                    <span className="text-indigo-400 group-hover:text-indigo-600">→</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      {!results && !loading && (
        <div className="text-center p-12 text-gray-400">
          <div className="text-6xl mb-4">🧘‍♂️</div>
          <p className="text-lg">Ready to find your next favorite wellness spot?</p>
        </div>
      )}
    </div>
  );
};

export default GroundingTools;
