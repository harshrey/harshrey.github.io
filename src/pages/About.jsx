import React from 'react';
import { Box, Container, Heading, Text, VStack, Link as ChakraLink, List, ListItem, UnorderedList } from "@chakra-ui/react";

const About = () => {
  return (
    <Container maxW="2xl" py={8}>
      <VStack spacing={10} align="start">
        
        {/* Some things about me */}
        <Box w="100%">
          <Text fontSize="lg" fontWeight="500" mb={4} fontFamily="serif">
            Some things about me:
          </Text>
          <UnorderedList spacing={2} ml={6} styleType="disc" fontSize="md" lineHeight="1.8">
            <ListItem>Computer science graduate from <ChakraLink href="https://uci.edu" isExternal color="blue.600">UC Irvine</ChakraLink></ListItem>
            <ListItem>Trekker and nature enthusiast — happiest in the mountains</ListItem>
            <ListItem>Book lover with a soft spot for fiction and philosophy</ListItem>
            <ListItem>Building things at the intersection of software and AI</ListItem>
            <ListItem>Believer in minimalism, clarity, and good writing</ListItem>
            <ListItem>Currently exploring machine learning and cloud infrastructure</ListItem>
          </UnorderedList>
        </Box>

        {/* Some things I believe */}
        <Box w="100%">
          <Text fontSize="lg" fontWeight="500" mb={4} fontFamily="serif">
            Some things I believe:
          </Text>
          <UnorderedList spacing={4} ml={6} styleType="disc" fontSize="md" lineHeight="1.8">
            <ListItem>
              Simplicity is powerful
              <UnorderedList mt={2} spacing={1} ml={6} styleType="circle" fontSize="sm" color="gray.700">
                <ListItem>The best solutions are often the simplest ones</ListItem>
                <ListItem>Complexity is a form of debt</ListItem>
                <ListItem>Clarity beats cleverness</ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem>
              Learning never stops
              <UnorderedList mt={2} spacing={1} ml={6} styleType="circle" fontSize="sm" color="gray.700">
                <ListItem>Curiosity is the best compass</ListItem>
                <ListItem>Reading widely is a superpower</ListItem>
                <ListItem>Teaching is the best way to learn</ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem>
              Deep work matters
              <UnorderedList mt={2} spacing={1} ml={6} styleType="circle" fontSize="sm" color="gray.700">
                <ListItem>Focus is a scarce and valuable resource</ListItem>
                <ListItem>Distraction is the enemy of meaning</ListItem>
                <ListItem>Great things take time and attention</ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem>
              Build things that solve real problems
              <UnorderedList mt={2} spacing={1} ml={6} styleType="circle" fontSize="sm" color="gray.700">
                <ListItem>Start small, iterate fast</ListItem>
                <ListItem>Ship early, learn from feedback</ListItem>
                <ListItem>Impact over perfection</ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem>
              Life is about experiences, not possessions
              <UnorderedList mt={2} spacing={1} ml={6} styleType="circle" fontSize="sm" color="gray.700">
                <ListItem>Travel expands perspective</ListItem>
                <ListItem>Relationships are the real wealth</ListItem>
                <ListItem>Time is the most precious resource</ListItem>
              </UnorderedList>
            </ListItem>
          </UnorderedList>
        </Box>

        {/* Contact */}
        <Box w="100%">
          <Text fontSize="lg" fontWeight="500" mb={4} fontFamily="serif">
            Get in touch:
          </Text>
          <UnorderedList spacing={2} ml={6} styleType="disc" fontSize="md" lineHeight="1.8">
            <ListItem>
              <ChakraLink href="https://linkedin.com/in/shreya-hardas" isExternal color="blue.600">LinkedIn</ChakraLink>
            </ListItem>
            <ListItem>
              <ChakraLink href="https://github.com/harshrey" isExternal color="blue.600">GitHub</ChakraLink>
            </ListItem>
            <ListItem>
              <ChakraLink href="mailto:hardass@uci.edu" color="blue.600">hardass@uci.edu</ChakraLink>
            </ListItem>
          </UnorderedList>
        </Box>

      </VStack>
    </Container>
  );
};

export default About;
