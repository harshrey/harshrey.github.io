import React from 'react';
import { Box, Container, Heading, Text, VStack, Image, SimpleGrid, Link } from "@chakra-ui/react";

const Projects = () => {
  const projects = [
    {
      title: "AI Code Assistant for SAP CAP Java Framework",
      period: "SAP Capstone, Jan–Jun 2025",
      description: "VS Code extension integrating LLMs into CAP Java, MultiHop RAG system for semantic code search."
    },
    {
      title: "Dynamic Thread Scheduling",
      period: "Oct 2024, UC Irvine",
      description: "User-level thread scheduler in C, supporting 128 threads, round robin scheduling, context switching."
    }
  ];

  return (
    <Container maxW="lg">
      <VStack spacing={8} align="start">
        <Box textAlign="center" w="100%">
          <Image
            src="/assets/image (1).png"
            alt="Profile picture"
            boxSize="120px"
            borderRadius="full"
            objectFit="cover"
            mx="auto"
            mb={4}
          />
          <Heading as="h1" size="xl" fontFamily="serif">Projects & Resume</Heading>
        </Box>

        <Box>
          <Text fontSize="lg">
            Irvine, CA 92617 | <Link href="mailto:hardass@uci.edu">hardass@uci.edu</Link> | 
            <Link href="https://linkedin.com/in/shreya-hardas" isExternal ml={2}>LinkedIn</Link> | 
            <Link href="https://github.com/harshrey" isExternal ml={2}>GitHub</Link>
          </Text>
        </Box>

        <Box>
          <Text fontSize="lg">
            Master of Computer Science, UC Irvine (GPA 3.9/4.0, expected Dec 2025)
            Bachelor of Technology in Information Technology, Pune University (GPA 3.74/4.0, 2018–2022)
          </Text>
        </Box>

        <SimpleGrid columns={1} spacing={6} w="100%">
          {projects.map((project, index) => (
            <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="md">
              <Heading as="h3" size="md" mb={2}>{project.title}</Heading>
              <Text color="gray.500" fontSize="sm" mb={2}>{project.period}</Text>
              <Text>{project.description}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Projects;
