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
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
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
    <Stack width={"100%"} direction={"row"} gap={2}>
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
      <Button
        type="submit"
        onClick={() => {
          console.log(search);
          router.push("/sinonimo/" + search);
        }}
        variant="text"
        size="large"
        color="primary"
      >
        Procurar
      </Button>
    </Stack>
  );
};
