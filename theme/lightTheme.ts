import { ColorScheme } from "./types";

export const lightColors: ColorScheme = {
  bg: "#f8fafc",
  surface: "#ffffff",
  text: "#1e293b",
  textMuted: "#64748b",
  border: "#e2e8f0",
  primary: "#3b82f6",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  shadow: "#00000020", // Added transparency
  accent: "#e0e102",
  textTertiary: "#6B7280", // Medium gray for secondary text
  gradients: {
    background: ["#f8fafc", "#e2e8f0", "#e1f7f0"],
    surface: ["#ffffff", "#f8fafc", "#f8fefd"],
    primary: ["#3b82f6", "#2563eb", "#1d4ed8"], // Enhanced with 3 colors
    success: ["#10b981", "#059669", "#047857"], // Enhanced with 3 colors
    warning: ["#f59e0b", "#d97706", "#b45309"], // Enhanced with 3 colors
    danger: ["#ef4444", "#dc2626", "#b91c1c"], // Enhanced with 3 colors
    muted: ["#f1f5f9", "#e2e8f0", "#cbd5e1"], // Softer muted gradient
    empty: ["#f8fafc", "#e2e8f0", "#cbd5e1"], // Enhanced empty gradient

    // New beautiful gradients for light mode
    premium: ["#667eea", "#764ba2"], // Purple to deep purple
    premiumVertical: ["#f093fb", "#f5576c"], // Pink to coral
    glass: ["#ffffff40", "#ffffff10", "#ffffff05"], // Glass effect
    sunset: ["#fa709a", "#fee140"], // Pink to yellow
    ocean: ["#4facfe", "#00f2fe"], // Blue to teal
    forest: ["#5ee7df", "#b490ca"], // Teal to lavender
    lavender: ["#e0c3fc", "#8ec5fc"], // Lavender to light blue
    peach: ["#ffecd2", "#fcb69f"], // Cream to peach
  },
  backgrounds: {
    input: "#ffffff",
    editInput: "#f1f5f9",
    elevated: "#FFFFFF", // Card backgrounds
    card: "#F9FAFB", // Slightly different for contrast
    modal: "#ffffff",
  },
  statusBarStyle: "dark-content",
};
