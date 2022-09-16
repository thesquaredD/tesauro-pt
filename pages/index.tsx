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

const Home: NextPage = () => {
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState<string[]>();
  const router = useRouter();

  const submitData = async (value: string) => {
    setSearch(value);
    try {
      await fetch(`/api/autocomplete/${value}`)
        .then((res) => res.json())
        .then((data) => {
          const sugestoes = data.map((x: any) => x.a_palavra);
          setOptions(sugestoes);
          console.log(sugestoes);
        });
    } catch (error) {
      console.error(error);
    }
  };

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
          value={search}
          handleClick={() => router.push("/sinonimo/" + search)}
          handleValue={submitData}
          options={options || []}
        />
      </Stack>
    </Box>
  );
};

export default Home;
