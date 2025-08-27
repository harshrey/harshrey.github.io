import React from 'react';
import { Box, Container, Heading, Text, VStack, Link, UnorderedList, ListItem } from "@chakra-ui/react";

const Blog = () => {
  const posts = [
    { title: "How I built this site", date: "Aug 2025", link: "#" },
    { title: "Minimalism in Web Design", date: "Jul 2025", link: "#" }
  ];

  return (
    <Container maxW="lg">
      <VStack spacing={8} align="start">
        <Heading as="h1" size="xl" fontFamily="serif">Blog</Heading>
        
        <Box as="section" w="100%">
          <Heading as="h2" size="md" mb={4}>All Posts</Heading>
          <UnorderedList styleType="none" spacing={2}>
            {posts.map((post, index) => (
              <ListItem key={index} display="flex" justifyContent="space-between">
                <Link href={post.link}>{post.title}</Link>
                <Text color="gray.500" ml={4}>{post.date}</Text>
              </ListItem>
            ))}
          </UnorderedList>
        </Box>

        <Box as="section" w="100%">
          <Heading as="h2" size="md" mb={4}>Trek in the Himalayas</Heading>
          <Text>
            Read about my recent trek in the Himalayas, the challenges, and the breathtaking views.
          </Text>
          <Link href="#" color="blue.500" mt={2} display="inline-block">
            Read more
          </Link>
        </Box>
      </VStack>
    </Container>
  );
};

export default Blog;
