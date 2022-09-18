import {
  Autocomplete,
  Button,
  createFilterOptions,
  FilterOptionsState,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  TextFieldProps,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { FormEvent, SyntheticEvent, useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useRouter } from "next/router";

type SearchBarProps = {};

const defaultFilterOptions = createFilterOptions<string>();
const filterOptions = (options: string[], state: FilterOptionsState<any>) =>
  defaultFilterOptions(options, state).slice(0, 7);

export const SearchBar = ({}: SearchBarProps) => {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState<string[]>();
  const router = useRouter();
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const submitData = async (value: string) => {
    setSearch(value);
    try {
      await fetch(`/api/autocomplete/${value}`)
        .then((res) => res.json())
        .then((data) => {
          const sugestoes = data.map((x: any) => x.a_palavra);
          setOptions(sugestoes);
        });
    } catch (error) {}
  };

  return (
    <form
      style={{ width: "100%" }}
      onSubmit={(event: FormEvent) => {
        event.preventDefault();
        router.push("/sinonimo/" + search);
      }}
    >
      <Stack width={"100%"} direction={isSmall ? "column" : "row"} gap={2}>
        <Autocomplete
          filterOptions={filterOptions}
          freeSolo
          onChange={(
            event: SyntheticEvent<Element | Event>,
            value: string | null
          ) => {
            submitData(value || "");
          }}
          options={options || []}
          value={search}
          sx={{ width: "100%", maxWidth: 500 }}
          renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      onClick={() => router.push("/sinonimo/" + search)}
                    >
                      <SearchRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                submitData(event.target.value);
              }}
              focused
              placeholder="Palavra a sinonimizar"
            />
          )}
        />
        <Button type="submit" variant="contained" size="medium" color="primary">
          Procurar
        </Button>
      </Stack>
    </form>
  );
};
