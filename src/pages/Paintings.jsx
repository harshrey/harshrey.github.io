import React from 'react';
import { Box, Container, Text, VStack, SimpleGrid, Image } from "@chakra-ui/react";

// ============================================
// PAINTINGS - Add your paintings here!
// ============================================
// Each painting has: id, title, image (path in public/assets/paintings/), description (optional)

const PAINTINGS = [
  { id: 1, image: "/assets/paintings/1.jpg", position: "left center", zoom: 1.4 },
  { id: 2, image: "/assets/paintings/2.jpg", position: "center", zoom: 1.4 },
  { id: 3, image: "/assets/paintings/3.jpg", position: "center", zoom: 1 },
  { id: 4, image: "/assets/paintings/4.jpg", position: "center", zoom: 1.3 },
  { id: 5, image: "/assets/paintings/mountain-meadow.png", position: "center", zoom: 1, fit: "contain", alt: "Snow-capped mountains above pine trees, cabins, and a flower-filled meadow" },
  { id: 6, image: "/assets/paintings/mountain-lake-watercolor.png", position: "center", zoom: 1, fit: "contain", alt: "Watercolor of a snowy mountain, pine trees, and a small alpine lake" },
  { id: 7, image: "/assets/paintings/snowy-mountain-forest.png", position: "center", zoom: 1, fit: "contain", alt: "Snow-covered peaks above a forest of green and golden trees" },
  { id: 8, image: "/assets/paintings/clear-lake-watercolor.png", position: "center", zoom: 1, fit: "contain", alt: "Watercolor of a clear blue lake with submerged stones, pine trees, and distant green mountains" },
  { id: 9, image: "/assets/paintings/winter-woodland-watercolor.png", position: "center", zoom: 1, fit: "contain", alt: "Watercolor of a snowy woodland with bare branches, evergreen trees, and soft golden light" },
];

const Paintings = () => {
  return (
    <Container maxW="5xl" py={8} fontFamily="Georgia, 'Times New Roman', serif">
      <VStack spacing={10} align="start">
        <Box w="100%">
          <Text fontSize="lg" lineHeight="1.9" mb={6}>
            I love seeing colors — they brighten up my mood in ways I can't quite explain. I especially love flowers. 
            Growing up, my parents would try to grow a hibiscus or a rose in any corner they could find. 
            I remember my mom making me pluck flowers for pooja. Maybe that's why I started painting them.
          </Text>
          <Text fontSize="lg" lineHeight="1.9" mb={6}>
            I love mountains, too. Snow is especially fun to paint. What seems like something as simple as white
            makes me look closer — at the blue in a shadow, a little warmth in the light, and all the quiet shifts in between.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="100%">
          {PAINTINGS.map(painting => (
            <Box 
              key={painting.id}
              position="relative"
              overflow="hidden"
              borderRadius="lg"
              boxShadow="md"
              _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
              transition="all 0.3s ease"
            >
              <Box
                w="100%"
                h={{ base: "240px", md: "280px" }}
                position="relative"
              >
                <Image 
                  src={painting.image} 
                  alt={painting.alt || `Painting ${painting.id}`}
                  w="100%"
                  h="100%"
                  objectFit={painting.fit || "cover"}
                  objectPosition={painting.position}
                  transform={`scale(${painting.zoom})`}
                />
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Paintings;
