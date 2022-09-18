import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  createTheme,
  PaletteMode,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import { getDesignTokens } from "../styles/theme";
import React from "react";
import { ColorModeContext } from "../pages/_app";

const ThemeRenderer = ({ children }: { children: any }) => {
  const [mode, setMode] = React.useState<PaletteMode>("dark");
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  let theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  theme = responsiveFontSizes(theme);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>;
    </ColorModeContext.Provider>
  );
};

const customRender = ({ ui, options }: { ui: any; options: any }) => {
  render(ui, {
    wrapper: ThemeRenderer,
    ...options,
  });
};

export * from "@testing-library/react";
export { customRender as render };
