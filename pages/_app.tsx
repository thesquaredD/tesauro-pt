import {
  createTheme,
  CssBaseline,
  PaletteMode,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import { Session } from "@supabase/supabase-js";
import type { AppProps } from "next/app";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import "../styles/globals.css";
import { getDesignTokens } from "../styles/theme";
import { supabase } from "../utility/supabaseClient";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export const AuthContext = createContext<Session | null>(null);

function MyApp({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [mode, setMode] = useState<PaletteMode>("dark");

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

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={session}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default MyApp;
