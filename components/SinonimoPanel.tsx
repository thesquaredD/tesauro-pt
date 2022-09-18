import { Box, Chip, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { TabPanel } from "./TabPanel";

type SinonimoProps = {
  sinonimo: Object;
  index: number;
  value: number;
};

export const SinonimoPanel = ({ sinonimo, index, value }: SinonimoProps) => {
  const router = useRouter();

  return (
    <TabPanel value={value} index={index}>
      <Box>
        <Stack direction={"row"} gap={2}>
          {Object.values(sinonimo)
            .slice(2)
            .filter((n) => n)
            .map((sinonimo: any, key: number) => {
              return (
                <Chip
                  onClick={() => router.push(`/sinonimo/${sinonimo}`)}
                  size="medium"
                  label={sinonimo}
                  key={key}
                  color="primary"
                />
              );
            })}
        </Stack>
      </Box>
    </TabPanel>
  );
};
