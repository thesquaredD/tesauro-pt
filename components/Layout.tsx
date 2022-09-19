import { Box, Theme, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { Header } from "./Header";
import { MobileSearch } from "./MobileSearch";

export const Layout = ({ children }: { children: any }) => {
  const router = useRouter();
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <>
      {router.pathname === "/" ? <></> : <Header />}
      <Box
        display={"flex"}
        pt={router.pathname === "/" ? 0 : isSmall ? 3 : 20}
        flexDirection="column"
        justifyContent={"flex-start"}
        alignItems="center"
        sx={{
          minHeight: "100vh",
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        {children}
      </Box>
      {isSmall && router.pathname !== "/" ? <MobileSearch /> : <></>}
    </>
  );
};
