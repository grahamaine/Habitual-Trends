import streamlit as st
import os

def display_branded_header(logo_path="logo.jpg"):
    """
    Displays the Habitual Trends logo. 
    Make sure logo.jpg is in the same folder as this file.
    """
    col1, col2, col3 = st.columns([1, 2, 1])
    with col2:
        if os.path.exists(logo_path):
            st.image(logo_path, use_container_width=True)
        else:
            st.title("🏃 HABITUAL TRENDS")
            st.caption("AI Agent Interface (Logo file not found)")
    st.markdown("---")
