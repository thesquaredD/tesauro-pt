import { Box, Typography } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          bgcolor={(theme) => theme.palette.background.paper}
          borderRadius={"0px 10px 10px 10px"}
          p={5}
        >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
