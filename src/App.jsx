
import { Box, Container, Heading, Text, VStack, HStack, Link as ChakraLink } from "@chakra-ui/react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";

function Nav() {
  return (
    <HStack spacing={8} justify="center" mt={8} mb={12}>
      <Link to="/" style={{ fontWeight: "bold" }}>home</Link>
      <Link to="/about" style={{ fontWeight: "bold" }}>about</Link>
      <Link to="/blog" style={{ fontWeight: "bold" }}>blog</Link>
      <Link to="/bookshelf" style={{ fontWeight: "bold" }}>bookshelf</Link>
      <Link to="/projects" style={{ fontWeight: "bold" }}>projects</Link>
    </HStack>
  );
}
function Home() {
  return (
    <VStack align="center" spacing={8}>
      <Box>
        <img
          src={require('../assets/image (1).png')}
          alt="Profile"
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            objectFit: 'cover',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            marginBottom: 16
          }}
        />
      </Box>
      <Box>
        <Heading as="h2" size="md" mb={2} fontFamily="serif">about</Heading>
        <Text fontSize="lg">I am a computer science graduate, trekker, and book lover. This site is a collection of my thoughts, essays, and projects. I believe in simplicity, clarity, and the power of good writing.</Text>
      </Box>
      <Box>
        <Heading as="h2" size="md" mb={2} fontFamily="serif">philosophy</Heading>
        <Text fontSize="lg">Minimalism is not about less, but about more of what matters. I write about technology, learning, and the art of living well. I value deep work, curiosity, and honest communication.</Text>
      </Box>
      <Box>
        <Heading as="h2" size="md" mb={2} fontFamily="serif">projects</Heading>
        <Text fontSize="lg">From AI code assistants to thread schedulers, I enjoy building things that solve real problems. My work spans software engineering, machine learning, and cloud infrastructure.</Text>
      </Box>
      <Box>
        <Heading as="h2" size="md" mb={2} fontFamily="serif">contact</Heading>
        <Text fontSize="lg">
          Find me on <ChakraLink href="https://linkedin.com/in/shreya-hardas" isExternal>LinkedIn</ChakraLink> or <ChakraLink href="https://github.com/harshrey" isExternal>GitHub</ChakraLink>. <br />
          Email: <ChakraLink href="mailto:hardass@uci.edu">hardass@uci.edu</ChakraLink>
        </Text>
      </Box>
    </VStack>
  );
}

function About() {
  return <Text fontSize="xl">About page coming soon.</Text>;
}
function Blog() {
  return <Text fontSize="xl">Blog page coming soon.</Text>;
}
import { SimpleGrid, Image, Tooltip, Box as ChakraBox } from '@chakra-ui/react';

const books = [
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    cover: 'https://covers.openlibrary.org/b/id/9259256-L.jpg',
  },
  {
    title: 'Deep Work',
    author: 'Cal Newport',
    cover: 'https://covers.openlibrary.org/b/id/8155436-L.jpg',
  },
  {
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt, David Thomas',
    cover: 'https://covers.openlibrary.org/b/id/8228691-L.jpg',
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    cover: 'https://covers.openlibrary.org/b/id/8231996-L.jpg',
  },
  // Add more books as desired
];

function Bookshelf() {
  return (
    <Box>
      <Heading as="h2" size="lg" mb={6} fontFamily="serif" textAlign="center">bookshelf</Heading>
      <SimpleGrid columns={[2, 3, 4]} spacing={8} justifyItems="center">
        {books.map((book, idx) => (
          <Tooltip label={`${book.title} by ${book.author}`} key={idx}>
            <ChakraBox textAlign="center">
              <Image
                src={book.cover}
                alt={book.title}
                boxSize="120px"
                objectFit="cover"
                borderRadius="md"
                boxShadow="md"
                mb={2}
              />
              <Text fontSize="md" fontWeight="bold" noOfLines={1}>{book.title}</Text>
              <Text fontSize="sm" color="gray.500" noOfLines={1}>{book.author}</Text>
            </ChakraBox>
          </Tooltip>
        ))}
      </SimpleGrid>
    </Box>
  );
}
function Projects() {
  return <Text fontSize="xl">Projects page coming soon.</Text>;
}

export default function App() {
  return (
    <Box bg="white" minH="100vh" color="black">
      <Container maxW="lg" pt={12}>
        <Heading as="h1" size="2xl" textAlign="center" fontWeight="400" mb={2} letterSpacing="0.5px" fontFamily="serif">
          shreya hardas
        </Heading>
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/bookshelf" element={<Bookshelf />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </Router>
      </Container>
    </Box>
  );
}
