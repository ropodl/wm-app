import colors from "vuetify/util/colors";

const vuetifyOpts = {
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#ff7a03",
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
          primary: "#ff7a03",
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
    },
    VTextField: {
      density: "comfortable",
      variant: "outlined",
    },
    VTextarea: {
      variant: "outlined",
    },
  },
};

export default vuetifyOpts;
