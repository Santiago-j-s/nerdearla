"use client";

import {
  Box,
  ChakraProvider,
  Container,
  Grid,
  GridItem,
  Stack,
  Text,
  extendTheme,
} from "@chakra-ui/react";
import { useState } from "react";
import { GetTicketsButton } from "./components/FreeTicketsButton";
import { HeaderBanner } from "./components/HeaderBanner";
import { NavBar } from "./components/NavBar";
import { TalkCard } from "./components/TalkCard";
import { TRACK_COLORS } from "./constants";
import "./fonts.css";

const theme = extendTheme({
  colors: {
    brand: {
      nerdRed: "#ff323c",
      nerdGreen: "#00aca8",
      nerdYellow: "#ffba00",
      nerdOrange: "#f98232",
    },
  },
  fonts: {
    style: {
      body: "Helvetica Neue, sans-serif",
      heading: "Rift Soft, sans-serif",
    },
  },
});

const App = ({ talks }) => {
  const [filteredTalks, setFilteredTalks] = useState(() => talks["2023-09-26"]);

  const onDateButtonClick = (date) => {
    setFilteredTalks(talks[date]);
  };

  return (
    <ChakraProvider theme={theme}>
      <Container
        maxW="full"
        minH="100vh"
        bg="black"
        color="white"
        py={4}
        px={{ base: 4, md: 7 }}
      >
        <GetTicketsButton />

        <NavBar onDateButtonClick={onDateButtonClick} />

        <HeaderBanner url="https://nerdear.la/" />

        <Grid
          sx={{ overflowY: "auto" }}
          templateColumns={`repeat(${Object.keys(filteredTalks).length}, 1fr)`}
          gap={{ sm: 0.5, md: 2 }}
        >
          {Object.keys(filteredTalks)
            .sort()
            .map((type) => (
              <GridItem key={type} colSpan={1}>
                <Stack
                  gap={{ base: 1, sm: 0.5, md: 2 }}
                  minW={{ base: 240, md: 0 }}
                  marginX={1}
                >
                  <Box bg={TRACK_COLORS[type]} textAlign="center">
                    <Text
                      color="white"
                      fontWeight="medium"
                      fontFamily="style.heading"
                    >
                      {type}
                    </Text>
                  </Box>
                  <Stack overflowY="scroll" maxH={{ base: "90vh", md: "none" }}>
                    {filteredTalks[type]
                      .sort((a, b) => (a.beginsAt >= b.beginsAt ? 1 : -1))
                      .map((talk) => (
                        <TalkCard
                          key={talk.id}
                          beginsAt={talk.beginsAt}
                          endsAt={talk.endsAt}
                          title={talk.withEvent.title}
                          bannerUrl={talk.bannerUrl}
                          htmlDescription={talk.htmlDescription}
                          type={talk.type}
                        />
                      ))}
                  </Stack>
                </Stack>
              </GridItem>
            ))}
        </Grid>
      </Container>
    </ChakraProvider>
  );
};

export default App;
