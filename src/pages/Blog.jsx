import React, { useState } from 'react';
import { Box, Container, Heading, Text, VStack, UnorderedList, ListItem, Divider, Collapse, HStack, Icon } from "@chakra-ui/react";

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
        value: "It's 3 AM. I can't sleep. My brain decided this was the perfect time to compile a list of tiny things that irrationally bother me. So here we are — me and my laptop." 
      },
      { 
        type: 'text', 
        value: "None of these are real problems. I know that. But sometimes the small stuff just... sticks." 
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
  {
    id: 2,
    title: "Living in SoCal",
    date: "September 2025",
    location: "Irvine, CA",
    content: [
      { 
        type: 'text', 
        value: "Moving to Southern California felt like stepping into a Hollywood movie. The kind where everything is sun-soaked, upscale, and slightly unreal." 
      },
      { 
        type: 'text', 
        value: "Convertibles with the top down. Palm trees lining every street. Teslas everywhere. Beaches just a short drive away. Sunsets that look like someone turned up the saturation. It's the backdrop to every coming-of-age film I watched growing up — except now I'm actually living in it." 
      },
      { 
        type: 'text', 
        value: "Everything feels a little more upscale here. The shopping complexes look like resorts. The houses all have that Spanish vibe. It's like the entire place was designed as a movie set and they just forgot to take it down." 
      },
      { 
        type: 'text', 
        value: "There's something about the constant sunshine that rewires your brain a little. You start taking evening walks. You notice the mountains in the distance. You get used to the idea that the ocean is always right there — a huge expanse of emptiness, waiting." 
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
const BlogPost = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Box as="article" w="100%">
      <Box 
        onClick={() => setIsOpen(!isOpen)} 
        cursor="pointer"
        _hover={{ opacity: 0.8 }}
      >
        <HStack justify="space-between" align="center">
          <Heading as="h2" size="xl" fontWeight="600">
            {post.title}
          </Heading>
          <Text fontSize="xl" color="gray.400" transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"} transition="transform 0.2s">
            ▼
          </Text>
        </HStack>
        <Text fontSize="sm" color="gray.500" mb={2}>
          {post.date} · {post.location}
        </Text>
      </Box>
      
      <Collapse in={isOpen} animateOpacity>
        <Box pt={4}>
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
      </Collapse>
    </Box>
  );
};

const Blog = () => {
  return (
    <Container maxW="2xl" py={8}>
      <VStack spacing={8} align="start" divider={<Divider borderColor="gray.300" />}>
        {BLOG_POSTS.map(post => (
          <BlogPost key={post.id} post={post} />
        ))}
      </VStack>
    </Container>
  );
};

export default Blog;
