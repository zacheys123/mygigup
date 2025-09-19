import { ColorScheme } from "./types";

export const darkColors: ColorScheme = {
  bg: "#0f172a",
  surface: "#1e293b",
  text: "#f1f5f9",
  textMuted: "#94a3b8",
  border: "#334155",
  primary: "#60a5fa",
  success: "#34d399",
  warning: "#fbbf24",
  danger: "#f87171",
  shadow: "#00000060",
  accent: "#50500bff", // Darker shadow for dark mode
  gradients: {
    background: ["#0f172a", "#1e293b", "#334155"], // Enhanced with 3 colors
    surface: ["#1e293b", "#334155", "#475569"], // Enhanced with 3 colors
    primary: ["#3b82f6", "#2563eb", "#1d4ed8"],
    success: ["#10b981", "#059669", "#047857"],
    warning: ["#f59e0b", "#d97706", "#b45309"],
    danger: ["#ef4444", "#dc2626", "#b91c1c"],
    muted: ["#374151", "#4b5563", "#6b7280"],
    empty: ["#1e293b", "#334155", "#475569"],

    // New beautiful gradients for dark mode
    premium: ["#7f53ac", "#647dee"], // Deep purple to blue
    premiumVertical: ["#a8c0ff", "#3f2b96"], // Light blue to deep blue
    glass: ["#1e293b40", "#1e293b20", "#1e293b10"], // Dark glass effect
    sunset: ["#ff6b6b", "#ff9a3d"], // Coral to orange
    ocean: ["#00c9ff", "#92fe9d"], // Bright blue to green
    forest: ["#0ba360", "#3cba92"], // Green to teal
    lavender: ["#ba68c8", "#8e24aa"], // Light purple to deep purple
    peach: ["#ff758c", "#ff7eb3"], // Pink to hot pink
  },
  backgrounds: {
    input: "#1e293b",
    editInput: "#0f172a",
    card: "#1e293b",
    modal: "#1e293b",
  },
  statusBarStyle: "light-content",
};
