import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Autocomplete,
  Box,
  Button,
  createFilterOptions,
  FilterOptionsState,
  InputAdornment,
  Popper,
  PopperProps,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import prisma from "../lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const palavras = await prisma.palavra.findMany({
    where: { palavra_mae: null },
  });
  return {
    props: { palavras },
    revalidate: 10,
  };
};

const Home: NextPage = ({
  palavras,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const [value, setValue] = useState("");

  let options = palavras.map((x: any) => x.a_palavra);

  const defaultFilterOptions = createFilterOptions<string>();
  const filterOptions = (options: string[], state: FilterOptionsState<any>) =>
    defaultFilterOptions(options, state).slice(0, 7);

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      justifyContent={"center"}
      alignItems="center"
      sx={{
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Stack
        mt={-10}
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
        gap={2}
      >
        <Typography
          textTransform={"uppercase"}
          variant="h1"
          color="textPrimary"
        >
          Tesauro.pt
        </Typography>
        <SearchBar
          value={value}
          handleClick={() => router.push("/sinonimo/" + value)}
          handleValue={(value: string) => {
            console.log(value);
            setValue(value);
          }}
          options={options}
        />
      </Stack>
    </Box>
  );
};

export default Home;
