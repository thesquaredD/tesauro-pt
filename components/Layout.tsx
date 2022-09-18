import { Box } from "@mui/material";

export const Layout = ({ children }: { children: any }) => {
  return (
    <Box
      display={"flex"}
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
  );
};
