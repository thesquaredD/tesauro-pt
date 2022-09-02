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
import { SyntheticEvent } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

type SearchBarProps = {
  value: string;
  handleValue: (value: string) => void;
  options: string[];
  handleClick: () => void;
};

const defaultFilterOptions = createFilterOptions<string>();
const filterOptions = (options: string[], state: FilterOptionsState<any>) =>
  defaultFilterOptions(options, state).slice(0, 7);

export const SearchBar = ({
  value,
  handleValue,
  handleClick,
  options,
}: SearchBarProps) => {
  return (
    <Stack width={"100%"} direction={"row"} gap={2}>
      <Autocomplete
        filterOptions={filterOptions}
        freeSolo
        onChange={(
          event: SyntheticEvent<Element | Event>,
          value: string | null
        ) => {
          handleValue(value || "");
        }}
        options={options}
        value={value}
        sx={{ width: "100%", maxWidth: 500 }}
        renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={handleClick}>
                    <SearchRoundedIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleValue(event.target.value);
            }}
            focused
            placeholder="Palavra a sinonimizar"
          />
        )}
      />
      <Button onClick={handleClick} variant="text" size="large" color="primary">
        Procurar
      </Button>
    </Stack>
  );
};
