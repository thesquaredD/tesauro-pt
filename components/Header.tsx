import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext } from "../pages/_app";
import { SearchBar } from "./SearchBar";
import Image from "next/image";

export const Header = () => {
  const colorMode = useContext(ColorModeContext);
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));
  const theme = useTheme();
  const router = useRouter();

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
        maxWidth="90%"
        alignItems="center"
        spacing={2}
        sx={{
          maxWidth: "800px",
        }}
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
            pt={1}
            sx={{
              borderRadius: "5px",
              transition: "background-color linear 0.15s",
              "&:hover": {
                cursor: "pointer",
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <Image
              onClick={() => router.push("/")}
              width="70%"
              height="70%"
              objectFit="contain"
              src={
                theme.palette.mode === "dark"
                  ? "/logoLightDiff.svg"
                  : "/logoDark.svg"
              }
              alt="logo"
            />
          </Box>
        </Grid>
        <Grid sx={{ display: { xs: "none", sm: "flex" } }} item xs={12} sm={8}>
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
        </Grid>
      </Grid>
    </Box>
  );
};
