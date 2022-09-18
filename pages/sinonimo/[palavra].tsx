import { Box, Button, Chip, Stack, Tab, Tabs, Typography } from "@mui/material";
import { sinonimos } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Header } from "../../components/Header";
import { SinonimoPanel } from "../../components/SinonimoPanel";
import { SinonimoTabs } from "../../components/SinonimoTabs";
import { TabPanel } from "../../components/TabPanel";

import prisma from "../../lib/prisma";

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
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Box pt={15} width={"95%"} maxWidth={"800px"}>
        <Stack mb={2} direction={"row"} gap={2}>
          <Typography variant="h2" color={"textPrimary"}>
            {palavra}
          </Typography>
          <Link
            href={`https://dicionario.priberam.org/${palavra}`}
            passHref={true}
          >
            <Button color={"primary"}>Ver definição</Button>
          </Link>
        </Stack>
        {sinonimo_list.length !== 0 ? (
          <>
            <SinonimoTabs value={value} onChange={handleChange}>
              {sinonimo_list?.map((sinonimo: any, key: number) => {
                return <Tab key={key} label={key} {...a11yProps(key)} />;
              })}
            </SinonimoTabs>
            {sinonimo_list?.map((sinonimo: any, key: number) => (
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
