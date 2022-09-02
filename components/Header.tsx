import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Box, Button, Grid, IconButton, Theme, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext } from "../pages/_app";
import { SearchBar } from "./SearchBar";

export const Header = ({
  options,
  value,
  handleValue,
}: {
  options: string[];
  value: string;
  handleValue: (value: string) => void;
}) => {
  const router = useRouter();
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
      }}
      bgcolor={(theme: Theme) => theme.palette.background.paper}
    >
      <Grid
        container
        display={"flex"}
        alignItems="center"
        sx={{
          maxWidth: "800px",
        }}
        py={2}
      >
        <Grid item xs>
          <Button onClick={() => router.push("/")} variant="outlined">
            Home
          </Button>
        </Grid>
        <Grid item xs={8}>
          <SearchBar
            value={value}
            handleValue={handleValue}
            options={options}
            handleClick={() => router.push(`/sinonimo/${value}`)}
          />
        </Grid>
        <Grid display={"flex"} justifyContent={"flex-end"} item xs>
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
