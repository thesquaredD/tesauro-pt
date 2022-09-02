import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import React from "react";
import { getDesignTokens } from "../styles/theme";
import { Header } from "../components/Header";
import { useRouter } from "next/router";

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

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const router = useRouter();

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
