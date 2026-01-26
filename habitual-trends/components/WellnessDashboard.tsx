
import React, { useState, useEffect } from 'react';
import { getFastResponse } from '../services/geminiService';
import { WellnessMetric } from '../types';

const WellnessDashboard: React.FC = () => {
  const [metrics] = useState<WellnessMetric[]>([
    { id: '1', name: 'Sleep Quality', value: 85, unit: '%', trend: 'up', status: 'good' },
    { id: '2', name: 'Avg. Daily Steps', value: 9400, unit: 'steps', trend: 'down', status: 'warning' },
    { id: '3', name: 'Stress Index', value: 24, unit: '/100', trend: 'stable', status: 'good' },
    { id: '4', name: 'Water Intake', value: 1.8, unit: 'L', trend: 'up', status: 'alert' },
  ]);

  const [advice, setAdvice] = useState<string>('Analyzing your trends...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const prompt = `Based on these wellness metrics: ${JSON.stringify(metrics)}, provide a one-sentence, highly actionable, encouraging tip for today using Gemini Flash Lite. Be brief and punchy.`;
        const result = await getFastResponse(prompt);
        setAdvice(result || "Keep up the great work! You're making progress.");
      } catch (error) {
        setAdvice("Focus on hydration today to boost your energy levels!");
      } finally {
        setLoading(false);
      }
    };
    fetchAdvice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-indigo-600 to-blue-500 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome Back, Alex!</h2>
            <p className="text-indigo-100">Your wellness journey is looking solid today.</p>
          </div>
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
            🔥 12 Day Streak
          </div>
        </div>
        
        <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">AI Insight (Flash Lite)</h3>
          <p className="text-lg italic">
            {loading ? "Thinking fast..." : `"${advice}"`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between mb-4">
              <span className="text-gray-500 font-medium">{m.name}</span>
              <span className={`text-sm px-2 py-1 rounded-full ${
                m.status === 'good' ? 'bg-green-100 text-green-700' :
                m.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {m.status.toUpperCase()}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-900">{m.value}</span>
              <span className="text-gray-500 text-sm">{m.unit}</span>
            </div>
            <div className="mt-2 text-sm flex items-center gap-1">
              {m.trend === 'up' ? '↗️ Improvement' : m.trend === 'down' ? '↘️ Decreasing' : '➡️ Stable'}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[
              { label: 'Morning Yoga', time: '8:30 AM', duration: '20 min', intensity: 'Low' },
              { label: 'Deep Work Session', time: '10:00 AM', duration: '90 min', intensity: 'N/A' },
              { label: 'Brisk Walk', time: '12:15 PM', duration: '15 min', intensity: 'Med' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                    {activity.label.includes('Yoga') ? '🧘' : activity.label.includes('Work') ? '💻' : '👟'}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{activity.label}</h4>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{activity.duration}</div>
                  <div className="text-xs text-indigo-500 uppercase font-bold">{activity.intensity}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-indigo-900 mb-2">Sustainable Fitness Tip</h3>
            <p className="text-indigo-700 mb-6">Small, consistent habits win over intense, irregular workouts. You're currently performing in the top 15% of your peer group for consistency!</p>
            <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
              View Detailed Analytics
            </button>
          </div>
          <div className="absolute -bottom-6 -right-6 text-9xl opacity-10">📈</div>
        </div>
      </div>
    </div>
  );
};

export default WellnessDashboard;
