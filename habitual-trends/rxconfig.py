import reflex as rx

config = rx.Config(
    app_name="habitual_trends",
    # We don't need to change app_name, but we must clear the cache
    disable_plugins=['reflex.plugins.sitemap.SitemapPlugin'],
)