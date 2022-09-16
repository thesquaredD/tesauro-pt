import {
  createTheme,
  CssBaseline,
  PaletteMode,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import type { AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";
import { getDesignTokens } from "../styles/theme";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = React.useState<PaletteMode>("dark");
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  let theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  theme = responsiveFontSizes(theme);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default MyApp;
