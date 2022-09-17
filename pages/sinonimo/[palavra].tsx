import { Box, Button, Chip, Stack, Tab, Tabs, Typography } from "@mui/material";
import { sinonimos } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Header } from "../../components/Header";

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Header value={search} handleValue={submitData} options={options || []} />
      <Box
        display={"flex"}
        flexDirection="column"
        justifyContent={"flex-start"}
        pt={15}
        alignItems="center"
        sx={{
          minHeight: "100vh",
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Box width={"95%"} maxWidth={"800px"}>
          <Stack mb={2} direction={"row"} gap={2}>
            <Typography variant="h2" color={"textPrimary"}>
              {palavra}
              {sinonimo_list.map((el: any) => JSON.stringify(el))}
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
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {sinonimo_list?.map((sinonimo: any, key: number) => {
                  return <Tab key={key} label={key} {...a11yProps(key)} />;
                })}
              </Tabs>
              {sinonimo_list?.map((sinonimo: any, jkey: number) => (
                <TabPanel key={jkey} value={value} index={jkey}>
                  <Box>
                    <Stack direction={"row"} gap={2}>
                      {Object.values(sinonimo)
                        .slice(2)
                        .filter((n) => n)
                        .map((sinonimo: any, key: number) => {
                          return (
                            <Chip
                              onClick={() =>
                                router.push(`/sinonimo/${sinonimo}`)
                              }
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
              ))}
            </>
          ) : (
            <Typography color="primary">
              Ainda não há sinónimos para esta palavra.
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default Palavra;
