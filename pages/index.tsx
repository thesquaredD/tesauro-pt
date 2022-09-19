import {
  Box,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { NextPage } from "next";
import Image from "next/image";
import { SearchBar } from "../components/SearchBar";

const Home: NextPage = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <Box display={"flex"} justifyContent={"center"} minHeight={"100vh"}>
      <Stack
        mt={-10}
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
        gap={2}
      >
        <Stack
          justifyContent={"center"}
          alignItems="center"
          direction={isSmall ? "column" : "row"}
          gap={2}
        >
          <Image
            width="100%"
            height="100%"
            objectFit="contain"
            priority
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
        </Stack>
        <SearchBar />
      </Stack>
    </Box>
  );
};

export default Home;
