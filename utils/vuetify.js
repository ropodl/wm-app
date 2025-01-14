import colors from "vuetify/util/colors";

const vuetifyOpts = {
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.shades.black,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: colors.shades.white,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  defaults: {
    VBtn: {
      class: "text-none",
      rounded: "lg",
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
