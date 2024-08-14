import {defineConfig} from "@pandacss/dev";

export default defineConfig({
    // Whether to use css reset
    preflight: true,
    hash: {
        className: true,
        cssVar: false,
    },
    // Where to look for your css declarations
    include: ['./app/**/*.{js,jsx,ts,tsx}'],

    presets: [
        '@pandacss/preset-base'
    ],
    theme:{
      extend:{
          semanticTokens:{
              colors:{
                  bg : {value:{base: "#F7F8F9", _dark: "#151c19"}},
                  border:{value: {base: "#e0dddd", _dark: "#424f4a"}},
                  surface: {value: {base: "#FFFFFF", _dark: "#2f3834"}},
                  textPrimary:{value: {base: "#051126", _dark: "#ecd2c5"}},
                  textSecondary:{value: {base: "#626F86", _dark: "#C0AB92"}},
                  primary:{value: {base: "#151c19", _dark: "#C0AB92"}},
                  textInverse:{value: {base: "#FFFFFF", _dark: "#151c19"}}
              }
          },
          tokens:{
              fonts:{
                  body: {value: "Work Sans, sans-serif"},
                  heading: {value: "Unbounded, sans-serif"},
              }
          }
      }
    },
    globalCss:{
        "*" :{
            transition: "color 0.15s, background-color 0.15s",
        },
        "body":{
            backgroundColor: "bg",
            fontFamily: "body"
        },
        "h1,h2,h3,h4,h5,h6":{
            fontFamily: "heading"
        },
    },
    // Files to exclude
    exclude: [],

    jsxFramework: 'react',
    // The output directory for your css system
    outdir: "styled-system",
});
