from dotenv import load_dotenv
load_dotenv()
use opentelemetry::{global, trace::Tracer};
use opentelemetry_otlp::WithExportConfig;
use opentelemetry_sdk::trace::SdkTracerProvider;
use std::collections::HashMap;

fn init_opik_tracer() -> SdkTracerProvider {
    // 1. Define your Comet credentials
    let api_key = "YOUR_COMET_API_KEY";
    let workspace = "YOUR_WORKSPACE_NAME";
    let project = "habitual-trends";

    // 2. Configure OTLP Headers (Required by Opik)
    let mut headers = HashMap::new();
    headers.insert("Authorization".to_string(), api_key.to_string());
    headers.insert("Comet-Workspace".to_string(), workspace.to_string());
    headers.insert("projectName".to_string(), project.to_string());

    // 3. Build the OTLP Exporter pointing to Comet's OTel endpoint
    let exporter = opentelemetry_otlp::SpanExporter::builder()
        .with_http()
        .with_endpoint("https://www.comet.com/opik/api/v1/private/otel")
        .with_headers(headers)
        .build()
        .expect("Failed to create exporter");

    // 4. Initialize the Tracer Provider
    let provider = SdkTracerProvider::builder()
        .with_batch_exporter(exporter)
        .build();

    // 5. Set as global so you can use the tracer anywhere in your app
    global::set_tracer_provider(provider.clone());
    provider
}

#[tokio::main]
async fn main() {
    let _provider = init_opik_tracer();
    let tracer = global::tracer("habitual-trends-engine");

    // Example of a trace span
    tracer.in_span("ingestion_engine_process", |_cx| {
        println!("Rust is processing Habitual Trends data...");
        // Your logic here
    });

    // Ensure all traces are sent before the app exits
    global::shutdown_tracer_provider();
}
import comet_ml
# Comet will now automatically find the key from your .env file
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
