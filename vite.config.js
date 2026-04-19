import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "icons/icon-72.svg",
        "icons/icon-192.svg",
        "icons/icon-512.svg",
      ],
      manifest: {
        name: "Triage AI Pakistan",
        short_name: "Triage AI",
        description: "Primary care clinical triage support for BHUs and RHCs",
        theme_color: "#0A1628",
        background_color: "#F0F4F8",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/icons/icon-72.svg", sizes: "72x72", type: "image/svg+xml" },
          {
            src: "/icons/icon-192.svg",
            sizes: "192x192",
            type: "image/svg+xml",
          },
          {
            src: "/icons/icon-512.svg",
            sizes: "512x512",
            type: "image/svg+xml",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,json}"],
      },
    }),
  ],
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: "ws",
      host: "127.0.0.1",
      port: 5173,
      clientPort: 5173,
    },
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
      },
    },
  },
});
