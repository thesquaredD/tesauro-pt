import {
  Box,
  Button,
  IconButton,
  Stack,
  Tab,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { sinonimos } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { SinonimoPanel } from "../../components/SinonimoPanel";
import { SinonimoTabs } from "../../components/SinonimoTabs";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import prisma from "../../lib/prisma";
import { AuthContext } from "../_app";
import { useUser } from "@supabase/auth-helpers-react";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

function toObject(el: any) {
  return JSON.parse(
    JSON.stringify(
      el,
      (key, value) =>
        typeof value === "bigint" ? console.log("kill me") : value // return everything else unchanged
    )
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response: sinonimos[] = await prisma.sinonimos.findMany({
    where: {
      palavra_sinonimada: String(params?.palavra),
    },
  });
  const palavra = params?.palavra;
  const sinonimo_list = toObject(response);
  return {
    props: { sinonimo_list, palavra },
  };
};

function Palavra({
  sinonimo_list,
  palavra,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [value, setValue] = useState(0);
  const [sinonimos, setSinonimos] = useState<Object[]>([]);
  const [selected, setSelected] = useState(false);
  const { user, error } = useUser();

  const handleFavorite = async () => {
    const userId = user?.id;
    const body = { userId, palavra };
    if (!selected) {
      setSelected(true);
      await fetch("/api/favourite/", {
        method: "POST",
        body: JSON.stringify(body),
      });
    } else {
      setSelected(false);
      await fetch("/api/favourite/", {
        method: "DELETE",
        body: JSON.stringify(body),
      });
    }
  };

  useEffect(() => {
    setValue(0);
    setSinonimos(sinonimo_list);
    const checkBookmark = async () => {
      try {
        if (user) {
          await fetch(
            "/api/favourite?" +
              new URLSearchParams({
                userId: user.id as string,
                palavra: palavra,
              }),
            {
              method: "GET",
            }
          ).then((res) => {
            res.json().then((data) => {
              if (data) setSelected(true);
            });
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
    checkBookmark();
  }, [palavra, user, sinonimo_list]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box width={"95%"} maxWidth={"800px"}>
        <Stack
          mb={2}
          display="flex"
          alignItems="center"
          direction={"row"}
          gap={2}
        >
          <Typography variant="h2" color={"textPrimary"}>
            {palavra}
          </Typography>
          <IconButton onClick={() => handleFavorite()}>
            {!selected ? (
              <BookmarkBorderIcon color="primary" />
            ) : (
              <BookmarkIcon color="primary" />
            )}
          </IconButton>
          <Link
            href={`https://dicionario.priberam.org/${palavra}`}
            passHref={true}
          >
            <Button color={"primary"}>Ver definição</Button>
          </Link>
        </Stack>
        {sinonimos.length !== 0 ? (
          <>
            <SinonimoTabs value={value} onChange={handleChange}>
              {sinonimos.map((sinonimo: any, key: number) => {
                return <Tab key={key} label={key} {...a11yProps(key)} />;
              })}
            </SinonimoTabs>
            {sinonimos.map((sinonimo: any, key: number) => (
              <SinonimoPanel
                key={key}
                sinonimo={sinonimo}
                index={key}
                value={value}
              />
            ))}
          </>
        ) : (
          <Typography color="primary">
            Ainda não há sinónimos para esta palavra.
          </Typography>
        )}
      </Box>
    </>
  );
}

export default Palavra;

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
