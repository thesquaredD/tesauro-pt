import { Box, Theme } from "@mui/material";
import { SearchBar } from "./SearchBar";

export const MobileSearch = () => {
  return (
    <Box
      display={"flex"}
      p={3}
      alignItems="center"
      justifyContent={"center"}
      position="fixed"
      left={0}
      bottom={0}
      width="100%"
      bgcolor={(theme: Theme) => theme.palette.background.paper}
    >
      <SearchBar />
    </Box>
  );
};
