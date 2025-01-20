const vuetifyOpts = {
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#000000", // Black
          accent: "#374151", // Gray 700 (Tailwind equivalent)
          secondary: "#D97706", // Amber 600
          info: "#14B8A6", // Teal 500
          warning: "#F59E0B", // Amber 500
          error: "#EF4444", // Red 500
          success: "#22C55E", // Green 500
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: "#FFFFFF", // White
          accent: "#374151", // Gray 700 (Tailwind equivalent)
          secondary: "#D97706", // Amber 600
          info: "#14B8A6", // Teal 500
          warning: "#F59E0B", // Amber 500
          error: "#EF4444", // Red 500
          success: "#22C55E", // Green 500
        },
      },
    },
  },
  defaults: {
    VBtn: {
      class: "text-none",
      rounded: "lg",
      variant: "flat",
    },
    VCard: {
      border: true,
      flat: true,
      rounded: "lg",
      color: "rgb(var(--v-theme-background))",
    },
    VTextField: {
      density: "compact",
      variant: "outlined",
    },
    VTextarea: {
      variant: "outlined",
    },
    VDataTableServer: {
      class: "bg-transparent",
      hover: true,
    },
  },
};

export default vuetifyOpts;
