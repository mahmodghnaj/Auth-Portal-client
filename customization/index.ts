const colors = require("./themes/theming/index");
const colorFunctions = require("./themes/theming/functions");
const themes = require("./themes/theming/themes");
const base = require("../dist/customization/base");
const styled = require("../dist/customization/components");
const utilities = require("../dist/customization/utilities");

const mainFunction = ({ addBase, addComponents, config }: any) => {
  addBase(base);
  const themeInjectorHsl = colorFunctions.injectThemes(
    addBase,
    config,
    themes,
    "hsl"
  );
  themeInjectorHsl;
  addComponents(styled);
  addComponents(utilities);
};

module.exports = require("tailwindcss/plugin")(mainFunction, {
  theme: {
    extend: {
      colors: {
        ...colors,
      },
    },
  },
});
