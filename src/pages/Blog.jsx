import React from 'react';
import { Box, Container, Heading, Text, VStack, UnorderedList, ListItem, Divider } from "@chakra-ui/react";

// ============================================
// BLOG POSTS - Add new posts here!
// ============================================
// Each post has: id, title, date, location, content (array of paragraphs/lists)
// Content types: 
//   - { type: 'text', value: 'Your paragraph here' }
//   - { type: 'list', items: ['item 1', 'item 2', 'item 3'] }

const BLOG_POSTS = [
  {
    id: 1,
    title: "Notes from 3 AM",
    date: "January 2026",
    location: "Seattle, WA",
    content: [
      { 
        type: 'text', 
        value: "It's 3 AM. I can't sleep. My brain decided this was the perfect time to compile a list of tiny things that irrationally bother me. So here we are — me, my laptop, and a cup of cold coffee that I forgot to drink three hours ago." 
      },
      { 
        type: 'text', 
        value: "None of these are real problems. I know that. But sometimes the small stuff just... sticks. So consider this my therapy session, except the therapist is the internet and the copay is your time." 
      },
      { 
        type: 'list', 
        items: [
          "Writing a blog post or documentation without a date (WHEN was this written? Is React still a thing?)",
          "Responding to a detailed, thoughtful message with \"K\" or a thumbs up emoji",
          "Coffee shops that play music so loud you can't have a conversation (I came here to feel productive, not to yell)",
          "\"Works on my machine\" — the classic. We've all said it, we've all heard it, we've all sighed."
        ]
      },
      { 
        type: 'text', 
        value: "If you've made it this far — thank you for reading my late-night ramblings. Here's to laughing at the small stuff and not letting it ruin our day. ☕" 
      }
    ]
  },
  // ============================================
  // ADD NEW POSTS BELOW - Copy this template:
  // ============================================
  // {
  //   id: 2,
  //   title: "Your Post Title",
  //   date: "Month Year",
  //   location: "City, State",
  //   content: [
  //     { type: 'text', value: "First paragraph..." },
  //     { type: 'text', value: "Second paragraph..." },
  //     { type: 'list', items: ["Item 1", "Item 2", "Item 3"] },
  //     { type: 'text', value: "Closing paragraph..." }
  //   ]
  // },
];

// ============================================
// Blog Component - renders all posts
// ============================================
const BlogPost = ({ post }) => (
  <Box as="article" w="100%">
    <Heading as="h2" size="xl" mb={2} fontWeight="600">
      {post.title}
    </Heading>
    <Text fontSize="sm" color="gray.500" mb={6}>
      {post.date} · {post.location}
    </Text>
    
    {post.content.map((block, index) => {
      if (block.type === 'text') {
        return (
          <Text key={index} fontSize="md" lineHeight="1.8" mb={4}>
            {block.value}
          </Text>
        );
      }
      if (block.type === 'list') {
        return (
          <UnorderedList key={index} spacing={3} ml={6} styleType="disc" fontSize="md" lineHeight="1.8" mb={4}>
            {block.items.map((item, i) => (
              <ListItem key={i}>{item}</ListItem>
            ))}
          </UnorderedList>
        );
      }
      return null;
    })}
  </Box>
);

const Blog = () => {
  return (
    <Container maxW="2xl" py={8}>
      <VStack spacing={12} align="start" divider={<Divider borderColor="gray.300" />}>
        {BLOG_POSTS.map(post => (
          <BlogPost key={post.id} post={post} />
        ))}
      </VStack>
    </Container>
  );
};

export default Blog;
