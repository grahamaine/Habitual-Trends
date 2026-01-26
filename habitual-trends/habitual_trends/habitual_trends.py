import reflex as rx

# 1. Define your State
class State(rx.State):
    """The app state for Habitual Trends."""
    count: int = 0

    def increment(self):
        self.count += 1

    def decrement(self):
        self.count -= 1

# 2. Define your UI (The Page)
def index() -> rx.Component:
    return rx.center(
        rx.vstack(
            rx.heading("Habitual Trends", size="9"),
            rx.text("Track your medical habits and wellness data."),
            
            # Using hstack (Horizontal Stack) instead of the outdated hbox
            rx.hstack(
                rx.button(
                    "Decrement", 
                    on_click=State.decrement, 
                    color_scheme="ruby", # Updated color scheme names
                    variant="soft"
                ),
                rx.heading(State.count, size="7"),
                rx.button(
                    "Increment", 
                    on_click=State.increment, 
                    color_scheme="grass", 
                    variant="soft"
                ),
                spacing="4",
                align="center",
            ),
            
            rx.divider(),
            rx.text("System Status: Operational", color_content_hint=True),
            
            spacing="5",
            align="center",
            text_align="center",
        ),
        height="100vh",
    )

# 3. Initialize the App
app = rx.App()
app.add_page(index, title="Habitual Trends")