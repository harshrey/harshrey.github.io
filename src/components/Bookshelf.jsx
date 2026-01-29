import React from 'react';
import { Box, VStack, Text, Heading } from "@chakra-ui/react";

const books = [
  {
    title: "And the Mountains Echoed",
    author: "Khaled Hosseini",
    thoughts: "A story that stayed with me long after I finished it. Made me realize how different cultures experience love, loss, and family."
  },
  {
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    thoughts: "Opened my eyes to a world I knew nothing about."
  }
];

const Bookshelf = () => {
  return (
    <Box maxW="650px" mx="auto" px={4} py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Text fontSize="sm" color="gray.600" mb={2}>
            Last updated: January 2026
          </Text>
          <Text fontSize="lg" mb={6}>
            Committing myself to 12 books in 2026. Here's what I'm reading and what's stayed with me.
          </Text>
        </Box>

        <VStack spacing={12} align="stretch">
          {books.map((book, index) => (
            <Box key={index}>
              <Heading as="h3" size="md" fontFamily="serif" mb={1}>
                {book.title}
              </Heading>
              <Text fontSize="sm" color="gray.600" mb={3}>
                {book.author}
              </Text>
              <Text>
                {book.thoughts}
              </Text>
            </Box>
          ))}
        </VStack>

        <Box pt={8}>
          <Text fontSize="sm" color="gray.600">
            These books represent different milestones in my reading journey, each one 
            contributing to my personal and professional growth in its own way.
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default Bookshelf;
