import React from 'react';
import { Box, Container, Heading, Text, VStack, Link as ChakraLink, List, ListItem, UnorderedList } from "@chakra-ui/react";

const About = () => {
  return (
    <Container maxW="2xl" py={8}>
      <VStack spacing={10} align="start">
        
        {/* Intro */}
        <Box w="100%">
          <Text fontSize="lg" lineHeight="1.8">
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
          <UnorderedList spacing={2} ml={6} styleType="disc" fontSize="md" lineHeight="1.8">
            <ListItem>Computer science graduate from <ChakraLink href="https://uci.edu" isExternal color="blue.600">UC Irvine</ChakraLink></ListItem>
            <ListItem>Trekker and nature enthusiast — happiest in the mountains</ListItem>
            <ListItem>Book lover with a soft spot for fiction and philosophy</ListItem>
          </UnorderedList>
        </Box>

        {/* Some things I believe */}
        <Box w="100%">
          <Text fontSize="lg" fontWeight="600" mb={4}>
            Some things I believe:
          </Text>
          <UnorderedList spacing={4} ml={6} styleType="disc" fontSize="md" lineHeight="1.8">
            <ListItem>
              Clarity is a form of kindness
              <UnorderedList mt={2} spacing={1} ml={6} styleType="circle" fontSize="sm" color="gray.600">
                <ListItem>Ambiguity costs everyone time and energy</ListItem>
                <ListItem>Saying what you mean is harder than it sounds, but worth the effort</ListItem>
                <ListItem>Good communication is a craft, not a given</ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem>
              The map is not the territory
              <UnorderedList mt={2} spacing={1} ml={6} styleType="circle" fontSize="sm" color="gray.600">
                <ListItem>Models are useful approximations, not truths</ListItem>
                <ListItem>Be suspicious of anyone who confuses their framework for reality</ListItem>
                <ListItem>The best thinkers hold multiple mental models loosely</ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem>
              Incentives explain most behavior
              <UnorderedList mt={2} spacing={1} ml={6} styleType="circle" fontSize="sm" color="gray.600">
                <ListItem>Before attributing malice, look for misaligned incentives</ListItem>
                <ListItem>Systems produce the outcomes they're designed for — intended or not</ListItem>
                <ListItem>Change the structure, change the behavior</ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem>
              Compounding applies to more than money
              <UnorderedList mt={2} spacing={1} ml={6} styleType="circle" fontSize="sm" color="gray.600">
                <ListItem>Knowledge, relationships, and habits all compound</ListItem>
                <ListItem>Small consistent efforts beat sporadic bursts</ListItem>
                <ListItem>The best time to start was yesterday; the second best is now</ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem>
              Discomfort is information
              <UnorderedList mt={2} spacing={1} ml={6} styleType="circle" fontSize="sm" color="gray.600">
                <ListItem>That uneasy feeling usually points to something worth examining</ListItem>
                <ListItem>Growth rarely feels comfortable in the moment</ListItem>
                <ListItem>Learn to distinguish productive discomfort from harmful stress</ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem>
              Most things are reversible
              <UnorderedList mt={2} spacing={1} ml={6} styleType="circle" fontSize="sm" color="gray.600">
                <ListItem>Fear of wrong decisions often costs more than the wrong decision itself</ListItem>
                <ListItem>Bias toward action over analysis paralysis</ListItem>
                <ListItem>The few truly irreversible choices deserve careful thought; everything else, less so</ListItem>
              </UnorderedList>
            </ListItem>
          </UnorderedList>
        </Box>

        {/* Contact */}
        <Box w="100%">
          <Text fontSize="lg" fontWeight="600" mb={4}>
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
