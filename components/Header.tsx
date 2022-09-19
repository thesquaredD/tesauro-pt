import { AccountCircle, Google } from "@mui/icons-material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AuthContext, ColorModeContext } from "../pages/_app";
import { supabase } from "../utility/supabaseClient";
import { SearchBar } from "./SearchBar";

export const Header = () => {
  const colorMode = useContext(ColorModeContext);
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const theme = useTheme();
  const router = useRouter();
  const { user, error } = useUser();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      alert(router.pathname);

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

  const ColorModeIcon = () => {
    return (
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon color="primary" />
        ) : (
          <Brightness4Icon color="primary" />
        )}
      </IconButton>
    );
  };

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      position={isSmall ? "relative" : "fixed"}
      bgcolor={(theme: Theme) => theme.palette.background.paper}
    >
      <Grid
        container
        display={"flex"}
        maxWidth="95%"
        alignItems="center"
        spacing={2}
        py={2}
      >
        <Grid
          display={"flex"}
          alignItems="center"
          justifyContent={isSmall ? "center" : "flex-start"}
          item
          xs={12}
          sm
        >
          <Box
            onClick={() => router.push("/")}
            p={1}
            sx={{
              borderRadius: "5px",
              transition: "background-color linear 0.15s",
              "&:hover": {
                cursor: "pointer",
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <Stack
              display={"flex"}
              alignItems="center"
              direction={"row"}
              spacing={2}
            >
              <Image
                width="50%"
                height="50%"
                objectFit="contain"
                src={
                  theme.palette.mode === "dark"
                    ? "/logoLightDiff.svg"
                    : "/logoDark.svg"
                }
                alt="logo"
              />
              <Typography variant="h5" textTransform={"uppercase"}>
                Tesauro.pt
              </Typography>
            </Stack>
          </Box>
        </Grid>
        <Grid sx={{ display: { xs: "none", sm: "flex" } }} item xs={12} sm={7}>
          <SearchBar />
        </Grid>
        <Grid
          display={"flex"}
          xs={12}
          sx={{ display: { xs: "none", sm: "flex" } }}
          justifyContent={"flex-end"}
          item
          sm
        >
          {!user ? (
            <Button
              onClick={handleLogin}
              startIcon={<Google />}
              variant="outlined"
            >
              Log in
            </Button>
          ) : (
            <Button
              onClick={() => router.push("/profile")}
              startIcon={<AccountCircle />}
              variant="outlined"
            >
              {user.user_metadata.name}
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
