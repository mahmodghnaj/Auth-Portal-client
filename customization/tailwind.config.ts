const plugin = require("tailwindcss/plugin");
import type { Config } from "tailwindcss";
const config: Config = {
  content: [{ raw: "" }],
  theme: {
    extend: {
      colors: require("./themes/theming"),
    },
  },
  plugins: [
    plugin(function ({ addBase, addUtilities }: any) {
      addUtilities(require("../dist/customization/utilities"), {
        variants: ["responsive"],
      });
    }),
  ],
};
export default config;
