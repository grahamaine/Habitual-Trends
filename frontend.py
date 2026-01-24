import streamlit as st
import pandas as pd
import plotly.express as px

# --- 1. CONFIG & BRIGHT THEME ---
st.set_page_config(page_title="Habitual Trends", layout="wide")

# FIX: Ensure these triple quotes are not interrupted
st.markdown("""
    <style>
    .stApp { background-color: #F8F9FA; color: #1A1C21; }
    [data-testid="stMetricValue"] { color: #007BFF !important; }
    .stButton>button { 
        background-color: #007BFF; 
        color: white; 
        border-radius: 8px;
    }
    </style>
""", unsafe_allow_html=True)

# --- 2. DATA ---
if 'habits' not in st.session_state:
    st.session_state.habits = [
        {"name": "Rust Coding", "streak": 12},
        {"name": "Gym", "streak": 12}
    ]

# --- 3. UI BODY ---
st.title("☀️ Habitual Trends")
st.caption("(Data-driven consistency for your daily rituals)")

# Chart Section
df = pd.DataFrame({
    "Day": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "Completion %": [30, 40, 70, 90, 60, 80, 100]
})
fig = px.area(df, x="Day", y="Completion %", template="plotly_white")
fig.update_traces(line_color='#007BFF')
st.plotly_chart(fig, use_container_width=True)

# Habit Cards
for i, habit in enumerate(st.session_state.habits):
    cols = st.columns([3, 1])
    cols[0].write(f"### {habit['name']}")
    cols[0].write(f"Streak: **{habit['streak']} days**")
    if cols[1].button("Check", key=f"btn_{i}"):
        st.balloons()

# --- 4. LLM SIDEBAR ---
with st.sidebar:
    st.header("🤖 LLM Coach")
    # FIX: Ensure this prompt string is closed properly
    prompt = """
    You are a coach helping the user with Habitual Trends.
    Give them a quick tip on staying consistent.
    """
    st.info(prompt)
    