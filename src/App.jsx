
import { Box, Container, Heading, Text, VStack, HStack, Link as ChakraLink, Input, Image } from "@chakra-ui/react";
import { HashRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState, useRef, useEffect, lazy, Suspense } from "react";
import Bookshelf from './components/Bookshelf.jsx';
import About from './pages/About';
import Blog from './pages/Blog';
import Paintings from './pages/Paintings';
import Pune from './pages/Pune';
import './App.css';

const Travel = import.meta.env.DEV ? lazy(() => import('./pages/Travel')) : null;
const TravelGallery = import.meta.env.DEV ? lazy(() => import('./pages/TravelGallery')) : null;
const Highway395 = lazy(() => import('./pages/Highway395'));

function Nav() {
  return (
    <HStack as="nav" aria-label="Main navigation" fontFamily="var(--title-font)" fontWeight="400" spacing={8} justify="center" flexWrap="wrap" rowGap={4} mt={8} mb={12}>
      <Link to="/" style={{ color: "#2D3748" }}>about</Link>
      <Link to="/blog" style={{ color: "#2D3748" }}>blog</Link>
      <Link to="/bookshelf" style={{ color: "#2D3748" }}>bookshelf</Link>
      <Link to="/paintings" style={{ color: "#2D3748" }}>paintings</Link>
      {import.meta.env.DEV && (
        <>
          <Link to="/travel" style={{ color: "#2D3748" }}>travel</Link>
          <Link to="/travel-gallery" style={{ color: "#2D3748" }}>travel gallery</Link>
        </>
      )}
      <Link to="/music" style={{ color: "#2D3748" }}>music</Link>
      <Link to="/fun" style={{ color: "#2D3748" }}>fun</Link>
    </HStack>
  );
}

// Fun error messages for unknown commands
const FUN_ERRORS = [
  "Nice try, but that's not in my vocabulary... yet.",
  "404: Command not found. Have you tried 'help'?",
  "I don't speak that language. Try 'help' for a phrasebook.",
  "*confused beeping* — type 'help' for guidance.",
  "That command is still in beta (aka doesn't exist).",
  "I'm just a humble terminal, not a mind reader. Try 'help'.",
  "Command not found. But hey, I appreciate the creativity!",
  "Hmm, I don't know that one. Did you make it up?",
  "Error 418: I'm a teapot. Just kidding. Try 'help'.",
  "That command went to get milk and never came back.",
  "I asked my magic 8-ball about that command. It said 'Ask again later'.",
  "Plot twist: that command doesn't exist.",
  "I searched everywhere. Under the couch cushions too. Nothing.",
  "That command is on vacation. Try 'help' instead.",
  "My neural networks are confused. Type 'help' to recalibrate.",
  "Command not found. But I found a cookie! 🍪 (jk, type 'help')",
  "Oops! That command got lost in the cloud somewhere.",
  "I'd love to help with that, but I literally can't. Try 'help'.",
  "Segmentation fault... just kidding! But seriously, try 'help'.",
  "That command is still loading... since 1999. Try 'help'.",
  "sudo make me a sandwich? Nope, still doesn't work. Try 'help'.",
  "Have you tried turning it off and on again? Or just type 'help'.",
  "I'm not angry, just disappointed. And confused. Try 'help'.",
];

// Available commands for the interactive terminal
const COMMANDS = {
  help: `Available commands:
  whoami      - About me
  location    - Where I'm based
  status      - Current status
  interests   - My interests
  ls -la      - Browse this site
  links       - Social links
  email       - Contact email
  clear       - Clear terminal
  help        - Show this help`,
  whoami: "Shreya Hardas — CS grad, trekker, builder of things",
  location: "📍 Seattle, WA",
  status: `🎓 MS Computer Science @ UC Irvine (Dec 2025)
💼 Trying to understand challenges that happen at scale`,
  interests: "machine-learning/  cloud-infra/  hiking/  books/  minimalism/",
  "ls -la": `drwxr-xr-x  home/      → about me
drwxr-xr-x  fun/       → you are here
drwxr-xr-x  blog/      → things I write
drwxr-xr-x  bookshelf/ → what I read`,
  links: { text: "github.com/harshrey", href: "https://github.com/harshrey" },
  email: { text: "hardass@uci.edu", href: "mailto:hardass@uci.edu" },
};

function Fun() {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome! Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: 'command', text: cmd }];

    if (trimmed === 'clear') {
      setHistory([{ type: 'output', text: 'Terminal cleared. Type "help" for commands.' }]);
      return;
    }

    if (trimmed === '') {
      setHistory(newHistory);
      return;
    }

    const result = COMMANDS[trimmed];
    if (result) {
      if (typeof result === 'object' && result.href) {
        newHistory.push({ type: 'link', text: result.text, href: result.href });
      } else {
        newHistory.push({ type: 'output', text: result });
      }
    } else {
      const funError = FUN_ERRORS[Math.floor(Math.random() * FUN_ERRORS.length)];
      newHistory.push({ type: 'error', text: funError });
    }

    setHistory(newHistory);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <VStack as="main" aria-label="Fun terminal" align="center" spacing={8}>
      <Box w="100%">
        <Heading as="h2" fontFamily="var(--title-font)" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="400" color="#981b20">
          the console.
        </Heading>
        <Text mt={3} fontSize="sm" fontFamily="Georgia, 'Times New Roman', serif" color="gray.600">
          A little place to poke around. Type <Text as="kbd" fontFamily="monospace">help</Text> to get started.
        </Text>
      </Box>
      
      {/* Terminal */}
      <Box 
        bg="#1a1a1a" 
        borderRadius="lg" 
        w="100%" 
        maxW="600px"
        boxShadow="0 4px 20px rgba(0,0,0,0.3)"
        overflow="hidden"
        onClick={focusInput}
        cursor="text"
      >
        {/* Terminal header */}
        <HStack spacing={2} px={4} py={3} bg="#2d2d2d">
          <Box w={3} h={3} borderRadius="full" bg="#ff5f56" />
          <Box w={3} h={3} borderRadius="full" bg="#ffbd2e" />
          <Box w={3} h={3} borderRadius="full" bg="#27ca40" />
          <Text fontSize="xs" color="gray.400" ml={4} fontFamily="monospace">shreya@portfolio ~ </Text>
        </HStack>
        
        {/* Terminal content */}
        <Box 
          ref={terminalRef}
          p={4} 
          minH="300px" 
          maxH="400px" 
          overflowY="auto"
          fontFamily="'Courier New', Consolas, monospace"
          fontSize="sm"
          css={{
            '&::-webkit-scrollbar': { width: '8px' },
            '&::-webkit-scrollbar-track': { background: '#1a1a1a' },
            '&::-webkit-scrollbar-thumb': { background: '#444', borderRadius: '4px' },
          }}
        >
          {history.map((item, i) => (
            <Box key={i} mb={1}>
              {item.type === 'command' && (
                <Text color="white">
                  <Text as="span" color="#27ca40">$ </Text>
                  {item.text}
                </Text>
              )}
              {item.type === 'output' && (
                <Text color="#e0e0e0" whiteSpace="pre-wrap" pl={2}>{item.text}</Text>
              )}
              {item.type === 'link' && (
                <ChakraLink href={item.href} isExternal color="#61dafb" pl={2} _hover={{ color: "#88e8ff" }}>
                  {item.text}
                </ChakraLink>
              )}
              {item.type === 'error' && (
                <Text color="#ff6b6b" pl={2}>{item.text}</Text>
              )}
            </Box>
          ))}
          
          {/* Input line */}
          <HStack spacing={0} align="center">
            <Text color="#27ca40">$ </Text>
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              variant="unstyled"
              color="white"
              fontFamily="'Courier New', Consolas, monospace"
              fontSize="sm"
              placeholder=""
              _placeholder={{ color: 'transparent' }}
              autoFocus
              spellCheck={false}
            />
            <Text color="#27ca40" className="blink">▋</Text>
          </HStack>
        </Box>
      </Box>
      
      <Text fontSize="sm" color="gray.500" fontStyle="italic">
        Click the terminal and type commands to explore
      </Text>
      
      <Text fontSize="xs" color="gray.400" mt={2}>
        🧪 I keep experimenting with this terminal as a fun project — it might look different next time you visit!
      </Text>
      
      <style>{`
        .blink {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </VStack>
  );
}

// Components are imported from their respective files

export default function App() {
  return (
    <Box bg="white" minH="100vh" color="gray.800">
      <Container maxW="lg" pt={12}>
        <VStack as={ChakraLink} href="#/" aria-label="shreya hardas home" spacing={1} justify="center" mb={2} _hover={{ textDecoration: "none" }}>
          <Heading
            as="h1"
            fontFamily="'DM Serif Display', Georgia, serif"
            fontSize={{ base: "clamp(2rem, 10.5vw, 2.75rem)", md: "3.5rem" }}
            fontWeight="400"
            lineHeight="1.05"
            letterSpacing="-0.045em"
            color="#981b20"
            textAlign="center"
            whiteSpace="nowrap"
          >
            shreya hardas
          </Heading>
          <Text lang="mr" fontFamily="'Nirmala UI', 'Noto Serif Devanagari', serif" fontSize="md" lineHeight="1.4" color="#7e5145">
            श्रेया
          </Text>
        </VStack>
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/fun" element={<Fun />} />
            <Route path="/blog" element={<Blog />} />
            <Route
              path="/blog/highway-395"
              element={<Suspense fallback={<Text>Loading road-trip notes...</Text>}><Highway395 /></Suspense>}
            />
            <Route 
              path="/bookshelf" 
              element={
                <>
                  {console.log('Rendering bookshelf route')}
                  <Bookshelf />
                </>
              } 
            />
            <Route path="/paintings" element={<Paintings />} />
            <Route
              path="/travel"
              element={import.meta.env.DEV
                ? <Suspense fallback={<Text>Loading travel...</Text>}><Travel /></Suspense>
                : <Navigate to="/" replace />}
            />
            <Route
              path="/travel-gallery"
              element={import.meta.env.DEV
                ? <Suspense fallback={<Text>Loading travel gallery...</Text>}><TravelGallery /></Suspense>
                : <Navigate to="/" replace />}
            />
            <Route path="/pune" element={<Pune />} />
            <Route path="/music" element={<Pune />} />
          </Routes>
        </Router>
      </Container>
    </Box>
  );
}
