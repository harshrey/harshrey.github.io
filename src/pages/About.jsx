import React from 'react';
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";

const About = () => {
  return (
    <Container maxW="lg">
      <VStack spacing={8} align="start">
        <Heading as="h1" size="xl" fontFamily="serif">About Me</Heading>
        <Text fontSize="lg">
          Welcome to my personal site. I'm a developer, writer, and minimalist. 
          This site is a place for my thoughts and projects.
        </Text>
        <Text fontSize="lg">
          I am a computer science graduate, trekker, and book lover. 
          I believe in simplicity, clarity, and the power of good writing.
        </Text>
      </VStack>
    </Container>
  );
};

export default About;
