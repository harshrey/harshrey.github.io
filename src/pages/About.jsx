import React from 'react';
import { Box, Container, Text, VStack, Link as ChakraLink, ListItem, UnorderedList } from "@chakra-ui/react";

const About = () => {
  return (
    <Container maxW="2xl" py={8} fontFamily="Georgia, 'Times New Roman', serif">
      <VStack spacing={10} align="start">
        
        {/* Intro */}
        <Box w="100%">
          <Text fontSize="lg" lineHeight="1.9">
            I'm Shreya Hardas. This is my personal website / blog. You can find my professional profile on{' '}
            <ChakraLink href="https://linkedin.com/in/shreya-hardas" isExternal color="blue.600">LinkedIn</ChakraLink>.
            I grew up in Pune, spent few years here and there, and now live in Washington.
          </Text>
        </Box>

        {/* Some things about me */}
        <Box w="100%">
          <Text fontSize="lg" fontWeight="600" mb={4}>
            Some things about me:
          </Text>
          <UnorderedList spacing={2} ml={6} styleType="disc" fontSize="md" lineHeight="1.9">
            <ListItem>Computer science graduate from <ChakraLink href="https://uci.edu" isExternal color="blue.600">UC Irvine</ChakraLink></ListItem>
            <ListItem>Trekker and nature enthusiast — happiest in the mountains</ListItem>
          </UnorderedList>
        </Box>

        {/* Some things I believe */}
        <Box w="100%">
          <Text fontSize="lg" fontWeight="600" mb={4}>
            Some things I believe:
          </Text>
          <UnorderedList spacing={3} ml={6} styleType="disc" fontSize="md" lineHeight="1.9">
            <ListItem>Most advice is autobiographical</ListItem>
            <ListItem>The things you consistently avoid reveal more than the things you pursue</ListItem>
            <ListItem>Espresso {">>>"} drip</ListItem>
            <ListItem>Better to get your dopamine from improving your ideas than from having them validated</ListItem>
            <ListItem>Mentorship should be free if it's a side gig — don't monetize guidance when you're already doing fine</ListItem>
            <ListItem><ChakraLink href="https://sbmueller.github.io/nohello/" isExternal color="blue.600">No hello</ChakraLink></ListItem>
          </UnorderedList>
        </Box>

      </VStack>
    </Container>
  );
};

export default About;
