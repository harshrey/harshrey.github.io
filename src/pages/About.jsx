import React from 'react';
import { Box, Grid, Image, Text, VStack } from "@chakra-ui/react";

const About = () => {
  return (
    <Box
      as="main"
      aria-label="About Shreya"
      position="relative"
      left="50%"
      transform="translateX(-50%)"
      w={{ base: "100%", md: "min(900px, calc(100vw - 64px))" }}
      py={{ base: 4, md: 8 }}
      pb={12}
      fontFamily="Georgia, 'Times New Roman', serif"
    >
      <Grid
        templateColumns={{ base: "minmax(0, 1fr)", md: "240px minmax(0, 1fr)" }}
        gap={{ base: 8, md: 12 }}
        alignItems="start"
      >
        <Image
          src="/assets/home-portrait.png"
          alt="Shreya Hardas"
          w={{ base: "180px", md: "240px" }}
          maxW="100%"
          h="auto"
          aspectRatio={3 / 4}
          justifySelf={{ base: "center", md: "start" }}
        />
        <VStack spacing={6} align="start" fontSize="md" lineHeight="1.75">
          <Text>
            I'm Shreya, a UC Irvine computer science graduate now working at Microsoft. I grew up in Pune, and Washington is home these days.
          </Text>
          <Text>
            Lately, I've been learning about security. A single network connection can keep me occupied for a while: following the protocols, tracing the data, and figuring out what each side is trusting.
          </Text>
          <Text>
            As for life outside work, you'll probably find little pieces of it around the rest of this website.
          </Text>
        </VStack>
      </Grid>
    </Box>
  );
};

export default About;
