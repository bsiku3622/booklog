import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import AstroPWA from "@vite-pwa/astro";

export default defineConfig({
  integrations: [
    react(),
    AstroPWA({
      registerType: "autoUpdate",
      injectRegister: false,
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "책갈피 — 나만의 책장",
        short_name: "책갈피",
        description: "읽고 싶은 책을 모으고, 다 읽은 책에는 감상을 남겨보세요.",
        theme_color: "#fcfcfc",
        background_color: "#fcfcfc",
        display: "standalone",
        orientation: "portrait-primary",
        start_url: "/",
        scope: "/",
        lang: "ko-KR",
        categories: ["books", "lifestyle"],
        icons: [
          { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png" },
          { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        navigateFallback: "/",
        globPatterns: ["**/*.{css,js,html,svg,png,woff2}"],
      },
    }),
  ],
});
