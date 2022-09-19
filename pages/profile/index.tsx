import { Bookmarks } from "@mui/icons-material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { favoritos } from "@prisma/client";
import { getUser, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { InferGetServerSidePropsType, NextPage } from "next";
import { useRouter } from "next/router";
import prisma from "../../lib/prisma";

export const getServerSideProps = withPageAuth({
  redirectTo: "/",
  async getServerSideProps(ctx) {
    const { user } = await getUser(ctx);
    const favoritos: favoritos[] = await prisma.favoritos.findMany({
      where: {
        userId: user?.id as string,
      },
    });
    return { props: { favoritos } };
  },
});

const Profile: NextPage = ({
  favoritos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const User = () => {
    return (
      <Stack
        spacing={2}
        width={"100%"}
        display={"flex"}
        justifyContent="flex-start"
      >
        <Stack
          display={"flex"}
          alignItems="center"
          direction={"row"}
          spacing={1}
        >
          <Bookmarks color="primary" />
          <Typography fontWeight={"bold"} variant="h5">
            Palavras Favoritas
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={2}>
          {favoritos.map((fav: favoritos, key: number) => {
            return (
              <Chip
                key={key}
                label={fav.palavra}
                clickable
                onClick={() => router.push(`/sinonimo/${fav.palavra}`)}
              />
            );
          })}
        </Stack>
      </Stack>
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
        <User />
      </Stack>
    </Box>
  );
};

export default Profile;
