import { Tabs } from "@mui/material";
import { SyntheticEvent } from "react";

type SinonimoTabsProps = {
  children: any;
  onChange: (event: SyntheticEvent<Element, Event>, value: any) => void;
  value: any;
};

export const SinonimoTabs = ({
  children,
  onChange,
  value,
}: SinonimoTabsProps) => {
  return (
    <Tabs
      sx={{
        "& .MuiTab-root": {
          borderRadius: "5px 5px 0px 0px",
        },
        "& .Mui-selected": {
          backgroundColor: (theme) => theme.palette.background.paper,
        },
      }}
      value={value}
      onChange={onChange}
      aria-label="basic tabs example"
    >
      {children}
    </Tabs>
  );
};
