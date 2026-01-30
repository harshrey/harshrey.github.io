import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Box, Container, Text, VStack, Heading, HStack, Badge } from "@chakra-ui/react";
import Globe from 'react-globe.gl';

const GLOBE_TEXTURE = "//unpkg.com/three-globe/example/img/earth-day.jpg";
const NIGHT_TEXTURE = "//unpkg.com/three-globe/example/img/earth-night.jpg";

// Category icons and colors
const CATEGORIES = {
  beach: { icon: '🏖️', color: '#0EA5E9', label: 'Beach' },
  mountain: { icon: '🏔️', color: '#22C55E', label: 'Mountain' },
  city: { icon: '🏙️', color: '#F59E0B', label: 'City' },
  temple: { icon: '🛕', color: '#EC4899', label: 'Temple' },
  nature: { icon: '🌲', color: '#10B981', label: 'Nature' },
};

// ============================================
// TRAVEL DATA - Add your trips here!
// ============================================
// Each trip has: id, name, lat, lng, date, story, type, category
// Find coordinates: https://www.latlong.net/

const TRIPS = [
  {
    id: 1,
    name: "Andaman",
    lat: 11.6683,
    lng: 92.7378,
    date: "2022",
    type: "visited",
    category: "beach",
    story: "Scuba diving in crystal clear waters. Havelock beach sunsets. Island hopping adventures."
  },
  {
    id: 2,
    name: "Bali",
    lat: -8.3405,
    lng: 115.0920,
    date: "2024",
    type: "visited",
    category: "beach",
    story: "Paragliding over rice terraces. Nasi goreng & tropical fruits. Wearing a sarong, ATV riding through jungles."
  },
  {
    id: 3,
    name: "Switzerland",
    lat: 46.9480,
    lng: 7.4474,
    date: "",
    type: "visited",
    category: "mountain",
    story: "Snow-capped Alps & apple pie. Chocolate & cheese fondue. Train rides through picture-perfect villages."
  },
  {
    id: 4,
    name: "New York",
    lat: 40.7580,
    lng: -73.9855,
    date: "",
    type: "visited",
    category: "city",
    story: "Times Square lights. Central Park walks. Pizza slices and Broadway shows."
  },
  {
    id: 5,
    name: "Chicago",
    lat: 41.8827,
    lng: -87.6233,
    date: "",
    type: "visited",
    category: "city",
    story: "Deep dish pizza. Architecture boat tour. Windy city vibes by Lake Michigan."
  },
  {
    id: 6,
    name: "Washington DC",
    lat: 38.8977,
    lng: -77.0365,
    date: "",
    type: "visited",
    category: "city",
    story: "Monuments & museums. Cherry blossoms. History at every corner."
  },
  {
    id: 7,
    name: "Bhutan",
    lat: 27.5142,
    lng: 90.4336,
    date: "",
    type: "visited",
    category: "temple",
    story: "Tiger's Nest monastery hike. Prayer flags in the wind. Happiness is a place."
  },
  {
    id: 8,
    name: "Brahmatal",
    lat: 29.8,
    lng: 79.2,
    date: "",
    type: "visited",
    category: "mountain",
    story: "Frozen lake at 12,000 ft. Pahadi chicken & snow trek through oak forests. Starry Himalayan nights."
  },
  {
    id: 9,
    name: "Pangarchulla",
    lat: 30.7,
    lng: 80.0,
    date: "",
    type: "visited",
    category: "mountain",
    story: "Summit at sunrise. 360° Himalayan views. Chamba vibes & the climb that tests and rewards."
  },
  {
    id: 10,
    name: "Beas Kund",
    lat: 32.2883,
    lng: 77.2017,
    date: "",
    type: "visited",
    category: "mountain",
    story: "Glacial lake trek. Manikaran hot springs & Solang Valley meadows. Where River Beas begins."
  },
  {
    id: 11,
    name: "Irvine",
    lat: 33.6846,
    lng: -117.8265,
    date: "",
    type: "visited",
    category: "beach",
    story: "Balboa Island ferry rides. Laguna Beach sunsets. Orange County charm."
  },
  {
    id: 12,
    name: "San Diego",
    lat: 32.7157,
    lng: -117.1611,
    date: "",
    type: "visited",
    category: "beach",
    story: "Cactus tacos & beach vibes. Zoo adventures. Perfect weather city."
  },
  {
    id: 13,
    name: "Los Angeles",
    lat: 34.0522,
    lng: -118.2437,
    date: "",
    type: "visited",
    category: "city",
    story: "Hollywood lights. Venice Beach strolls. City of dreams and traffic."
  },
  {
    id: 14,
    name: "Joshua Tree",
    lat: 33.8734,
    lng: -115.9010,
    date: "",
    type: "visited",
    category: "nature",
    story: "Milky Way nights under desert skies. Alien landscapes. Stargazing paradise."
  },
  {
    id: 15,
    name: "Palm Springs",
    lat: 33.8303,
    lng: -116.5453,
    date: "",
    type: "visited",
    category: "nature",
    story: "Desert oasis vibes. Mid-century modern architecture. Palm trees & pool days."
  },
  {
    id: 16,
    name: "Big Bear",
    lat: 34.2439,
    lng: -116.9114,
    date: "",
    type: "visited",
    category: "mountain",
    story: "Mountain lake escape. Pine forest hikes. SoCal's snowy retreat."
  },
  {
    id: 17,
    name: "Bangalore",
    lat: 12.9716,
    lng: 77.5946,
    date: "",
    type: "visited",
    category: "city",
    story: "Garden city & tech hub. Filter coffee mornings. Cubbon Park walks."
  },
  {
    id: 18,
    name: "Pondicherry",
    lat: 11.9416,
    lng: 79.8083,
    date: "",
    type: "visited",
    category: "beach",
    story: "French colony vibes. Beach promenades. Auroville & croissants."
  },
  {
    id: 19,
    name: "Udupi",
    lat: 13.3409,
    lng: 74.7421,
    date: "",
    type: "visited",
    category: "beach",
    story: "Surfing the Arabian Sea. Krishna temple blessings. Coastal Karnataka magic."
  },
  {
    id: 20,
    name: "Spiti",
    lat: 32.2460,
    lng: 78.0349,
    date: "",
    type: "visited",
    category: "mountain",
    story: "Moon valley on Earth. Key monastery serenity. High altitude desert dreams."
  },
  {
    id: 21,
    name: "Vaishno Devi",
    lat: 33.0307,
    lng: 74.9490,
    date: "",
    type: "visited",
    category: "temple",
    story: "Sacred pilgrimage trek. Mountain shrine devotion. Jai Mata Di."
  },
  {
    id: 22,
    name: "Rajasthan",
    lat: 26.9124,
    lng: 75.7873,
    date: "",
    type: "visited",
    category: "city",
    story: "Onion kachori & dal bati churma. Desert forts & palaces. Royal colors everywhere."
  },
  {
    id: 24,
    name: "San Francisco",
    lat: 37.7749,
    lng: -122.4194,
    date: "",
    type: "visited",
    category: "city",
    story: "Golden Gate fog. Cable car rides. Sourdough & Fisherman's Wharf vibes."
  },
  {
    id: 25,
    name: "Lake Tahoe",
    lat: 39.0968,
    lng: -120.0324,
    date: "",
    type: "visited",
    category: "mountain",
    story: "Crystal blue alpine lake. Ski slopes & beach days. Sierra Nevada paradise."
  },
  {
    id: 26,
    name: "Leavenworth",
    lat: 47.5962,
    lng: -120.6615,
    date: "",
    type: "visited",
    category: "city",
    story: "Bavarian village in Washington. Christmas lights & nutcrackers. Alpine charm in the PNW."
  },
  {
    id: 27,
    name: "Lepakshi",
    lat: 13.8033,
    lng: 77.6074,
    date: "",
    type: "visited",
    category: "temple",
    story: "Hanging pillar mystery. Veerabhadra temple marvels. Nandi bull & ancient art."
  },
  {
    id: 28,
    name: "Madurai",
    lat: 9.9252,
    lng: 78.1198,
    date: "",
    type: "visited",
    category: "temple",
    story: "Meenakshi temple grandeur. Temple city of Tamil Nadu. Ancient Dravidian architecture."
  },
  {
    id: 29,
    name: "Sikkim",
    lat: 27.5330,
    lng: 88.5122,
    date: "",
    type: "visited",
    category: "mountain",
    story: "Kanchenjunga views. Buddhist monasteries. Himalayan orchids & momos."
  },
];

// Calculate sun position for real-time day/night
const getSunPosition = () => {
  const now = new Date();
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const hour = now.getUTCHours() + now.getUTCMinutes() / 60;
  
  // Sun longitude (based on time of day)
  const sunLng = (12 - hour) * 15;
  
  // Sun latitude (based on season, simplified)
  const sunLat = 23.5 * Math.sin((dayOfYear - 81) * 2 * Math.PI / 365);
  
  return { lat: sunLat, lng: sunLng };
};

const Travel = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const globeEl = useRef();
  
  // Real-time sun position for day/night effect
  const sunPosition = useMemo(() => getSunPosition(), []);

  const getMarkerColor = (type) => {
    switch (type) {
      case 'home': return '#DC2626'; // bold red
      case 'lived': return '#2563EB'; // bold blue
      default: return '#16A34A'; // bold green
    }
  };

  // Auto-rotate and initial view with zoom limits
  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: 20, lng: 40, altitude: 0.8 }, 1000);
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.3;
      // Enable zoom
      globeEl.current.controls().enableZoom = true;
      globeEl.current.controls().minDistance = 120;
      globeEl.current.controls().maxDistance = 400;
    }
  }, []);

  // Fly to location when selected
  useEffect(() => {
    if (globeEl.current && selectedTrip) {
      globeEl.current.controls().autoRotate = false;
      globeEl.current.pointOfView({ 
        lat: selectedTrip.lat, 
        lng: selectedTrip.lng, 
        altitude: 0.8 
      }, 1000);
    }
  }, [selectedTrip]);

  return (
    <Container maxW="5xl" py={8} fontFamily="Georgia, 'Times New Roman', serif">
      <VStack spacing={6} align="start">
        <Box w="100%">
          <Text fontSize="lg" lineHeight="1.9" mb={4}>
            Places I've called home, cities I've explored, and corners of the world that left a mark.
            Drag to rotate, click a pin to read the story.
          </Text>
          <Text fontSize="sm" fontStyle="italic" color="gray.500" mb={4}>
            🚧 Work in progress — still working on 3D transformation of a line in 3D space to make the map better. You can't leave maths, can you?
          </Text>
          {/* Category Legend */}
          <HStack spacing={4} mb={4} flexWrap="wrap">
            {Object.entries(CATEGORIES).map(([key, { icon, label }]) => (
              <HStack key={key} spacing={1}>
                <Text fontSize="lg">{icon}</Text>
                <Text fontSize="sm">{label}</Text>
              </HStack>
            ))}
          </HStack>
        </Box>

        {/* 3D Globe */}
        <Box 
          w="100%" 
          h="700px"
          borderRadius="lg" 
          overflow="hidden" 
          boxShadow="md"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Globe
            ref={globeEl}
            width={900}
            height={700}
            globeImageUrl={GLOBE_TEXTURE}
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            showAtmosphere={true}
            atmosphereColor="lightskyblue"
            atmosphereAltitude={0.15}
            enablePointerInteraction={true}
            
            // Custom HTML markers with emoji icons
            htmlElementsData={TRIPS}
            htmlLat="lat"
            htmlLng="lng"
            htmlAltitude={0.01}
            htmlElement={d => {
              const cat = CATEGORIES[d.category] || CATEGORIES.city;
              const el = document.createElement('div');
              el.innerHTML = `<div style="
                cursor: pointer;
                font-size: 20px;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
                transition: transform 0.2s, filter 0.2s;
              ">${cat.icon}</div>`;
              el.style.pointerEvents = 'auto';
              el.onmouseenter = () => {
                el.firstChild.style.transform = 'scale(1.3)';
                el.firstChild.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.7))';
              };
              el.onmouseleave = () => {
                el.firstChild.style.transform = 'scale(1)';
                el.firstChild.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))';
              };
              el.onclick = () => setSelectedTrip(d);
              return el;
            }}
            
            // Only show label for selected location
            labelsData={selectedTrip ? [selectedTrip] : []}
            labelLat="lat"
            labelLng="lng"
            labelText="name"
            labelSize={1.2}
            labelDotRadius={0}
            labelColor={() => 'rgba(255, 255, 255, 1)'}
            labelResolution={2}
            labelAltitude={0.03}
            labelsTransitionDuration={300}
          />
        </Box>

        {/* Selected Trip Details */}
        {selectedTrip && (
          <Box 
            w="100%" 
            p={6} 
            borderRadius="lg" 
            bg="gray.50" 
            boxShadow="sm"
            borderLeft="4px solid"
            borderLeftColor={CATEGORIES[selectedTrip.category]?.color || '#16A34A'}
          >
            <HStack justify="space-between" align="start" mb={2}>
              <HStack spacing={2}>
                <Text fontSize="2xl">{CATEGORIES[selectedTrip.category]?.icon || '📍'}</Text>
                <Heading as="h3" size="md" fontFamily="serif">
                  {selectedTrip.name}
                </Heading>
              </HStack>
              <Badge 
                bg={CATEGORIES[selectedTrip.category]?.color || '#16A34A'}
                color="white"
                px={2}
                py={1}
                borderRadius="md"
              >
                {CATEGORIES[selectedTrip.category]?.label || 'Place'}
              </Badge>
            </HStack>
            <Text fontSize="sm" color="gray.600" mb={3}>
              {selectedTrip.date}
            </Text>
            <Text fontSize="md" lineHeight="1.8">
              {selectedTrip.story}
            </Text>
          </Box>
        )}

      </VStack>
    </Container>
  );
};

export default Travel;
