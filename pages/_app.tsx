import {
  createTheme,
  CssBaseline,
  PaletteMode,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import { Session, User } from "@supabase/supabase-js";
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

  const getUser = async (session: Session | null) => {
    let userExists = false;
    try {
      await fetch(`/api/user/${session?.user?.id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.id === session?.user?.id) {
            userExists = true;
          }
        });
    } catch (e) {
      console.log(e);
    }
    return userExists;
  };

  const addUser = async (session: Session | null) => {
    try {
      await fetch(`/api/user/${session?.user?.id}`, {
        method: "POST",
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (_event == "SIGNED_IN") {
        if (!(await getUser(session))) {
          addUser(session);
        }
      }
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
