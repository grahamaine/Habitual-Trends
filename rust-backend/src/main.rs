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