import { createTheme, PaletteMode } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // palette values for light mode
            primary: {main : "#002D72"},
            background: {
              paper: "#DEDEDE"
            }
          }
        : {
            // palette values for dark mode
            primary: {main:"#0066FF"},
            background: {
              default:"#1C1C1C",
              paper: "#303030"
            }
          }),
    },
  });