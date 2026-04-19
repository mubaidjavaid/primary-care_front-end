import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#0A1628",
          800: "#0F2040",
          700: "#1E3A5F",
          600: "#1D4ED8",
          500: "#2563EB",
          400: "#3B82F6",
        },
        medical: {
          bg: "#F0F4F8",
          card: "#FFFFFF",
          border: "#CBD5E1",
          muted: "#94A3B8",
        },
        routine: {
          bg: "#F0FDF4",
          text: "#166534",
          border: "#86EFAC",
        },
        urgent: {
          bg: "#FFFBEB",
          text: "#92400E",
          border: "#FCD34D",
        },
        emergency: {
          bg: "#FFF1F2",
          text: "#9F1239",
          border: "#FDA4AF",
        },
        insufficient: {
          bg: "#F8FAFC",
          text: "#475569",
          border: "#CBD5E1",
        },
      },
      fontFamily: {
        display: ["DM Serif Display", "serif"],
        ui: ["DM Sans", "sans-serif"],
        body: ["Lora", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
        modal: "0 20px 60px rgba(0,0,0,0.15)",
        nav: "0 1px 0 #E2E8F0",
      },
      borderRadius: {
        card: "16px",
        badge: "20px",
        input: "10px",
        button: "10px",
        modal: "20px",
      },
      transitionProperty: {
        default: "all",
        smooth: "all",
      },
      transitionDuration: {
        default: "200ms",
        smooth: "350ms",
      },
      transitionTimingFunction: {
        default: "ease",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        pulseBorder: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(220, 38, 38, 0.45)" },
          "50%": { boxShadow: "0 0 0 10px rgba(220, 38, 38, 0)" },
        },
      },
      animation: {
        pulseBorder: "pulseBorder 1.5s infinite",
      },
    },
  },
  plugins: [forms, typography],
};
