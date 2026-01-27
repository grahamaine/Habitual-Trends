<<<<<<< HEAD
use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use std::fmt::Write; // Allows us to write to a String

// 1. The Habit Structure
struct Habit {
    name: String,
    history: Vec<u32>,
    goal: u32,
}

impl Habit {
    fn new(name: &str, goal: u32) -> Self {
        Habit {
            name: name.to_string(),
            history: Vec::new(),
            goal,
        }
    }

    // Instead of printing, this function returns a String of text
    fn generate_report(&self) -> String {
        let mut report = String::new();
        let _ = write!(report, "{:<15} Trend: ", self.name);

        for &val in &self.history {
            if val >= self.goal {
                let _ = write!(report, "* ");
            } else {
                let _ = write!(report, ". ");
            }
        }
        
        // Calculate average
        let sum: u32 = self.history.iter().sum();
        let avg = if self.history.is_empty() { 0.0 } else { sum as f64 / self.history.len() as f64 };
        
        let _ = writeln!(report, " (Avg: {:.1})", avg);
        report
    }
}

// 2. The Web Page Handler
// This function runs every time you refresh the browser
async fn index() -> impl Responder {
    let mut reading = Habit::new("Reading", 30);
    reading.history = vec![10, 30, 45, 25, 30];

    let mut workout = Habit::new("Workout", 60);
    workout.history = vec![0, 60, 60, 45, 70];

    // Combine the reports
    let output = format!(
        "HABITUAL TRENDS TRACKER\n\n{}\n{}", 
        reading.generate_report(), 
        workout.generate_report()
    );

    // Send it to the browser as plain text
    HttpResponse::Ok().content_type("text/plain").body(output)
}

// 3. The Main Server Starter
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Server starting on port 8080...");
    
    // Start the web server on port 8080
    HttpServer::new(|| {
        App::new().route("/", web::get().to(index))
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
=======
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
>>>>>>> e62bd8ecca84d86e5c3958f2a32fa3ae4e2f198e
