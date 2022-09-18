import {
  createTheme,
  CssBaseline,
  PaletteMode,
  responsiveFontSizes,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import React from "react";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { MobileSearch } from "../components/MobileSearch";
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
  let router = useRouter();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {router.pathname === "/" ? <></> : <Header />}
        <Layout>
          <Component {...pageProps} />
        </Layout>
        {isSmall && router.pathname !== "/" ? <MobileSearch /> : <></>}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default MyApp;
