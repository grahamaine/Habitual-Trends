
import React, { useState } from 'react';
import { generateWellnessImage, editWellnessImage } from '../services/geminiService';
import { ImageSize } from '../types';

const ImageLab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<ImageSize>('1K');
  const [loading, setLoading] = useState(false);
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);
  const [editingPrompt, setEditingPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  const checkAndOpenKey = async () => {
    if (typeof window.aistudio !== 'undefined') {
      const selected = await window.aistudio.hasSelectedApiKey();
      if (!selected) {
        await window.aistudio.openSelectKey();
      }
      setHasApiKey(true);
      return true;
    }
    return false;
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    // Check key for Pro Image model
    await checkAndOpenKey();

    setLoading(true);
    try {
      const url = await generateWellnessImage(prompt, size);
      setGeneratedImg(url);
    } catch (error) {
      console.error(error);
      alert("Failed to generate image. Please ensure your API key selection is valid and you have credits.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!generatedImg || !editingPrompt.trim()) return;
    setIsEditing(true);
    try {
      const url = await editWellnessImage(generatedImg, editingPrompt);
      if (url) setGeneratedImg(url);
      setEditingPrompt('');
    } catch (error) {
      console.error(error);
      alert("Editing failed. Gemini Flash Image encountered an issue.");
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Wellness Visualization Lab</h2>
            <p className="text-gray-500">Generate high-res motivational content or visualize your fitness goals.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            ✨ Gemini 3 Pro Image
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Inspiration Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. A serene mountain landscape with a person doing yoga during sunrise, 4k resolution, cinematic lighting..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quality</label>
                <div className="flex gap-2">
                  {(['1K', '2K', '4K'] as ImageSize[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all border ${
                        size === s 
                        ? 'bg-indigo-600 text-white border-indigo-600' 
                        : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Generating Artifact...</>
              ) : 'Generate Masterpiece'}
            </button>
            
            <p className="text-xs text-center text-gray-400">
              *Requires a valid API key for Gemini 3 Pro Image.
            </p>
          </div>

          <div className="relative">
            <div className="aspect-square bg-slate-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden group">
              {generatedImg ? (
                <img src={generatedImg} alt="Generated" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="text-center text-gray-400">
                  <div className="text-6xl mb-4">🖼️</div>
                  <p>Your creation will appear here</p>
                </div>
              )}
              
              {loading && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-indigo-900 font-bold">Dreaming up pixels...</p>
                  </div>
                </div>
              )}
            </div>

            {generatedImg && !loading && (
              <div className="mt-4 p-4 bg-indigo-50 rounded-2xl border border-indigo-100 animate-in slide-in-from-top-2">
                <h4 className="text-sm font-bold text-indigo-900 mb-3 flex items-center gap-2">
                  🪄 Edit with Flash Image
                </h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingPrompt}
                    onChange={(e) => setEditingPrompt(e.target.value)}
                    placeholder="e.g. 'Add a retro filter' or 'Make it dusk'"
                    className="flex-1 bg-white border border-indigo-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                  <button
                    onClick={handleEdit}
                    disabled={isEditing || !editingPrompt.trim()}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {isEditing ? 'Editing...' : 'Apply'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: '🏃‍♂️', title: 'Actionable Goal', desc: 'Visualize yourself finishing that marathon or hitting a new PR.' },
          { icon: '🧘‍♀️', title: 'Mental Peace', desc: 'Generate custom zen wallpapers tailored to your mood.' },
          { icon: '🥗', title: 'Recipe Vision', desc: 'See what that healthy meal could look like when plated perfectly.' }
        ].map((feat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-3xl mb-3">{feat.icon}</div>
            <h4 className="font-bold text-gray-900 mb-2">{feat.title}</h4>
            <p className="text-sm text-gray-500">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageLab;
