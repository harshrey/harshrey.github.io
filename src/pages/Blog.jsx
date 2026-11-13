import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Heading, Text, VStack, UnorderedList, ListItem, Divider, Collapse, HStack, Icon, Image, Link as ChakraLink } from "@chakra-ui/react";

// ============================================
// BLOG POSTS - Add new posts here!
// ============================================
// Each post has: id, title, date, location, content (array of paragraphs/lists)
// Content types: 
//   - { type: 'text', value: 'Your paragraph here' }
//   - { type: 'list', items: ['item 1', 'item 2', 'item 3'] }

const BLOG_POSTS = [
  {
    id: 5,
    title: "This, Too, Is Home",
    date: "November 13, 2026",
    content: [
      {
        type: 'text',
        value: "It is a rainy November afternoon, and I am drinking coffee from a mug that is far too big for a normal serving. My dad gave it to me. If you know him, you know his collection of enormous mugs and how much he enjoys his chaha. Every time I use this one, I think of him."
      },
      {
        type: 'text',
        value: "Outside the window, the branches are bare, their fall leaves already on the ground. Behind them, pine trees cover the hills. A classic Washington scene. I have grown used to this view, though sometimes I still catch myself noticing how different it is from where I grew up."
      },
      {
        type: 'text',
        value: "As I lift my mug, I notice the mehendi on my hands. We had a Diwali celebration at the office yesterday, and today I have carried a little of it home with me."
      },
      {
        type: 'image',
        src: "/assets/blog/this-too-is-home.png",
        alt: "A hand with mehendi holding a coffee mug by a window overlooking bare branches and distant evergreen trees."
      },
      {
        type: 'text',
        value: "There was something comforting about celebrating at work. Being Indian in a space where I spend so much of my everyday life, moving between festivities and familiar work challenges. The office has become a place where I feel at ease, too. I like going in, seeing people, and having something to figure out."
      },
      {
        type: 'text',
        value: "Yesterday was our second Diwali celebration of the week. I am still recovering from the first."
      },
      {
        type: 'text',
        value: "Last Sunday, we had all our friends over for a potluck. Everyone brought food that reminded them of home. For an evening, dishes from different households ended up on the same table, each familiar to someone."
      },
      {
        type: 'text',
        value: "We served food on coconut leaves and did Lakshmi poojan, trying to follow the customs we had grown up watching. Only this time, we were responsible for making it happen. I had watched my parents do this for years; now, in my own home, I was trying to remember the order of things."
      },
      {
        type: 'text',
        value: "But we did it. We gathered, ate, and lit phuljhadis, reaching for a little of the excitement we remembered from childhood."
      },
      {
        type: 'text',
        value: "Looking back at Sunday from this quiet afternoon, I wonder what we were making. Were we trying to recreate Diwali back home? Were we making our own version? At what point does something stop being an imitation of your parents' traditions and become a tradition of your own?"
      },
      {
        type: 'text',
        value: "We were probably too busy serving food to think about any of this then."
      },
      {
        type: 'text',
        value: "I take another sip of coffee."
      },
      {
        type: 'text',
        value: "I keep chasing something or the other. There is always work to do, a plan to make, another part of life to figure out. Yet so many of the things that make me happiest are these familiar moments I don't have to work very hard to recognise."
      },
      {
        type: 'text',
        value: "A conversation with my roommate that somehow carries on until 2 a.m. My undergrad best friend living in the next town. A call to my parents, with the usual chaos and some funny little argument happening in the background. I can be sitting here, thousands of miles away, and know exactly what that room feels like."
      },
      {
        type: 'text',
        value: "Home seems to have spread out while I wasn't paying attention."
      },
      {
        type: 'text',
        value: "And still, there are conversations that make me feel suddenly unfamiliar with my own stage of life. Friends talk about being married, and I listen, interested but unable to quite picture myself in their stories. Relatives and family friends ask about what comes next, and I find myself wanting to retreat into what I already know."
      },
      {
        type: 'text',
        value: "I wonder whether I am uncomfortable with those possibilities, or simply with the expectation that I should be moving towards them."
      },
      {
        type: 'text',
        value: "I have made a life here that I like. There are people I love nearby, people I love on the other end of the phone, and friends who will bring a dish from their childhood into my home on a Sunday evening. Perhaps I am protective of all this because it took time to become familiar."
      },
      {
        type: 'text',
        value: "I hope that doesn't make me stop exploring. I want to be open to things I cannot picture yet, without feeling that I must hurry towards them."
      },
      {
        type: 'text',
        value: "For now, I turn back to the window. The bare branches, the rain, the pine trees on the hills. My hands around my dad's mug, yesterday's mehendi still dark against my skin."
      },
      {
        type: 'text',
        value: "Home is the friends around you. It is the routine you have grown to love, the food that comforts you, the small, familiar things that make an ordinary day feel like your own."
      },
      {
        type: 'text',
        value: "I think home is in the mind, too. In what we learn to love and what we choose to carry with us. And maybe that means we can make a home wherever we go."
      }
    ]
  },
  {
    id: 6,
    title: "Highway 395: A Road Trip",
    date: "October 29, 2026",
    href: "/blog/highway-395"
  },
  {
    id: 4,
    title: "Some things I believe",
    date: "April 2026",
    content: [
      {
        type: 'list',
        items: [
          "Most advice is autobiographical",
          "The things you consistently avoid reveal more than the things you pursue",
          "Espresso >>> drip",
          "Better to get your dopamine from improving your ideas than from having them validated",
          "Mentorship should be free if it's a side gig — don't monetize guidance when you're already doing fine",
          <ChakraLink href="https://sbmueller.github.io/nohello/" isExternal color="blue.600" textDecoration="underline">No hello</ChakraLink>,
        ]
      }
    ]
  },
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
  {
    id: 3,
    title: "From a Cloudy Afternoon in Redmond",
    date: "March 2026",
    location: "Redmond, WA",
    content: [
      {
        type: 'text',
        value: "The sky stayed gray all afternoon, the kind of soft blanket that makes everything feel quieter than usual. Redmond has a way of doing that — slowing your thoughts just enough to hear them clearly."
      },
      {
        type: 'text',
        value: "I was sipping my chai by the window, watching sparrows play around the cherry blossom branches — playful with each other, drifting with the wind. Soon the breeze grew stronger, and they found a quieter corner to rest."
      },
      {
        type: 'text',
        value: "Ajji says there is a lot to observe in the tiniest of things."
      },
      {
        type: 'list',
        items: [
          "Warm chai cooling faster than expected",
        ]
      },
      {
        type: 'text',
        value: "There is so much to learn when you live by yourself. Slowly, your life starts sounding like your own voice, and you notice what you truly want to keep and what you can gently let go. You begin to know what you want in life, absolutely uninfluenced by anyone. Your 20s are such a good stage of life to think deeply about your priorities."
      },
      {
        type: 'list',
        items: [
          "How to shape your days around what matters most to you",
          "Whether your room needs a reading chair, or just open empty space",
          "What kind of food feels like comfort after a long day",
          "How your own independent habits quietly take shape"
        ]
      },
      {
        type: 'text',
        value: "Living this way does a lot for personal growth. It makes you more intentional, more honest with yourself, and more grounded in the choices you make."
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

  if (post.href) {
    return (
      <Box as="article" aria-label="Highway 395 road trip" w="100%">
        <Heading as="h2" size="xl" fontFamily="var(--title-font)" fontWeight="400" color="black">
          <Link to={post.href}>{post.title}</Link>
        </Heading>
        <Text fontSize="sm" color="gray.500" mb={2}>
          {post.date}
        </Text>
      </Box>
    );
  }
  
  return (
    <Box as="article" w="100%">
      <Box 
        onClick={() => setIsOpen(!isOpen)} 
        cursor="pointer"
        _hover={{ opacity: 0.8 }}
      >
        <HStack justify="space-between" align="center">
          <Heading as="h2" size="xl" fontWeight="400" fontFamily="var(--title-font)">
            {post.title}
          </Heading>
          <Text fontSize="xl" color="gray.400" transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"} transition="transform 0.2s">
            ▼
          </Text>
        </HStack>
        <Text fontSize="sm" color="gray.500" mb={2}>
          {post.date}{post.location && ` · ${post.location}`}
        </Text>
      </Box>
      
      <Collapse in={isOpen} animateOpacity>
        <Box pt={4}>
          {post.content.map((block, index) => {
            if (block.type === 'image') {
              return (
                <Image key={index} src={block.src} alt={block.alt} loading="lazy" maxW="100%" h="auto" borderRadius="md" mb={6} />
              );
            }
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
  const sortedPosts = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <Container maxW="2xl" py={8}>
      <VStack spacing={8} align="start" divider={<Divider borderColor="gray.300" />}>
        {sortedPosts.map(post => (
          <BlogPost key={post.id} post={post} />
        ))}
      </VStack>
    </Container>
  );
};

export default Blog;
