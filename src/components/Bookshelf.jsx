import React from 'react';
import { Box, VStack, Text, Heading } from "@chakra-ui/react";

const books = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    thoughts: "A practical guide that changed how I think about building good habits and breaking bad ones. The concept of 1% improvements really resonated with me."
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    thoughts: "Made me rethink my relationship with focus and productivity. I've implemented dedicated deep work blocks in my daily schedule."
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    thoughts: "Brilliant insights on how personal finance is more about behavior than mathematics. The chapter on long-term thinking was particularly impactful."
  },
  {
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    thoughts: "A timeless classic that emphasizes the power of personal belief and persistence. The mastermind principle has influenced how I approach networking."
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    thoughts: "A beautiful reminder to follow your dreams and trust the journey. I return to this book whenever I need perspective on life's bigger questions."
  }
];

const Bookshelf = () => {
  return (
    <Box maxW="650px" mx="auto" px={4} py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Text fontSize="sm" color="gray.600" mb={2}>
            Last updated: September 2, 2025
          </Text>
          <Text fontSize="lg" mb={6}>
            Books have been my constant companions through different phases of life. 
            Here are some that have particularly influenced my thinking and approach to life.
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
