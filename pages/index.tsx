import {
  Box,
  Button,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { NextPage } from "next";
import Image from "next/image";
import { useContext, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { supabase } from "../utility/supabaseClient";
import { AuthContext } from "./_app";
import GoogleIcon from "@mui/icons-material/Google";

const Home: NextPage = () => {
  const theme = useTheme();
  const session = useContext(AuthContext);
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const { user, session, error } = await supabase.auth.signIn({
        provider: "google",
      });
      if (error) throw error;
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  async function signout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error);
    }
  }

  return (
    <Box display={"flex"} justifyContent={"center"} minHeight={"100vh"}>
      <Stack
        mt={-10}
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
        gap={2}
      >
        {session?.user ? (
          <Typography variant="h4" fontWeight={200}>
            Welcome back{" "}
            <Box
              component={"span"}
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              {session.user.user_metadata.name}
            </Box>
          </Typography>
        ) : (
          <></>
        )}
        <Stack
          justifyContent={"center"}
          alignItems="center"
          direction={isSmall ? "column" : "row"}
          gap={2}
        >
          <Image
            width="100%"
            unselectable="on"
            height="100%"
            objectFit="contain"
            priority
            style={{
              userSelect: "none",
            }}
            src={
              theme.palette.mode === "dark"
                ? "/logoLightDiff.svg"
                : "/logoDark.svg"
            }
            alt="logo"
          />
          <Typography
            textTransform={"uppercase"}
            variant="h1"
            color="textPrimary"
          >
            Tesauro.pt
          </Typography>
          <Typography></Typography>
          {/* {!session?.user ? <></> : <Button onClick={signout}>Logout</Button>} */}
        </Stack>
        <SearchBar />
        {!session?.user ? (
          <Box mt={4}>
            <Button
              startIcon={<GoogleIcon />}
              variant="outlined"
              onClick={handleLogin}
            >
              entra com o google
            </Button>
          </Box>
        ) : (
          <></>
        )}
      </Stack>
    </Box>
  );
};

export default Home;
