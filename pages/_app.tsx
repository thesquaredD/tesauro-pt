import {
  createTheme,
  CssBaseline,
  PaletteMode,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { UserProvider } from "@supabase/auth-helpers-react";
import { Session } from "@supabase/supabase-js";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import "../styles/globals.css";
import { getDesignTokens } from "../styles/theme";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export const AuthContext = createContext<Session | null>(null);

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<PaletteMode>("dark");
  const router = useRouter();

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
    supabaseClient.auth.onAuthStateChange(async (_event, session) => {
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
        <UserProvider supabaseClient={supabaseClient}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default MyApp;
