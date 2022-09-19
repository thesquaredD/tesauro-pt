import { Box, Stack, Typography } from "@mui/material";
import { NextPage } from "next";
import { useContext } from "react";
import { AuthContext } from "../_app";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Bookmarks } from "@mui/icons-material";

const Profile: NextPage = () => {
  const session = useContext(AuthContext);

  const User = () => {
    return (
      <Box width={"100%"} display={"flex"} justifyContent="flex-start">
        <Stack
          display={"flex"}
          alignItems="center"
          direction={"row"}
          spacing={1}
        >
          <Bookmarks color="primary" />
          <Typography fontWeight={"bold"} variant="h5" color="primary">
            Palavras Favoritas
          </Typography>
        </Stack>
      </Box>
    );
  };

  const UserNotFound = () => {
    return (
      <>
        <ErrorOutlineIcon fontSize={"large"} color="primary" />
        <Typography variant="h5" color="primary" fontWeight={200}>
          Hmmm... Parece que não tens conta. Faz log in para veres o teu perfil.
        </Typography>
      </>
    );
  };

  return (
    <Box width={"95%"} maxWidth={"800px"}>
      <Stack
        spacing={4}
        display={"flex"}
        alignItems="center"
        p={5}
        borderRadius={5}
        bgcolor={(theme) => theme.palette.background.paper}
      >
        {session?.user ? <User /> : <UserNotFound />}
      </Stack>
    </Box>
  );
};

export default Profile;
