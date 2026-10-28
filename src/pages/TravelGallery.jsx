import { useRef, useState } from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import './TravelGallery.css';

const PLACEHOLDERS = [
  { title: 'Mountain air', scene: 'mountains' },
  { title: 'Somewhere by the sea', scene: 'coast' },
  { title: 'A city to get lost in', scene: 'city' },
];

export default function TravelGallery() {
  const [openness, setOpenness] = useState(0);
  const [dragging, setDragging] = useState(false);
  const gesture = useRef(null);
  const windowRef = useRef(null);
  const galleryOpen = openness >= 0.9;
  const clamp = value => Math.max(0, Math.min(1, value));

  const moveShade = event => {
    if (!gesture.current) return;
    const distance = gesture.current.y - event.clientY;
    if (Math.abs(distance) > 5) gesture.current.moved = true;
    if (gesture.current.moved) {
      setDragging(true);
      setOpenness(clamp(gesture.current.openness + distance / windowRef.current.clientHeight));
    }
  };

  const finishDrag = () => {
    setDragging(false);
    if (gesture.current?.moved) {
      setOpenness(value => value >= 0.5 ? 1 : 0);
    }
  };

  const handleKeyDown = event => {
    const values = {
      ArrowUp: openness + 0.2,
      ArrowDown: openness - 0.2,
      Home: 0,
      End: 1,
    };
    if (event.key in values) {
      event.preventDefault();
      setOpenness(clamp(values[event.key]));
    }
  };

  return (
    <VStack className="travel-gallery" spacing={7} pb={12}>
      <Box textAlign="center">
        <Text className="travel-gallery__eyebrow">a seat by the window</Text>
        <Heading as="h2" size="xl" fontWeight="400" fontFamily="Georgia, serif" mt={3}>
          travel gallery
        </Heading>
        <Text mt={3} color="gray.600" fontSize="sm">
          A little window into the places along the way.
        </Text>
      </Box>

      <Box className="airplane-cabin" w="100%">
        <Text className="airplane-cabin__seat" aria-hidden="true">WINDOW SEAT / 01</Text>
        <div className="airplane-window-frame">
          <button
            ref={windowRef}
            type="button"
            className={`airplane-window${dragging ? ' airplane-window--dragging' : ''}`}
            aria-label={galleryOpen ? 'Close airplane window shade' : 'Open airplane window shade'}
            aria-expanded={galleryOpen}
            aria-controls="travel-gallery-photos"
            aria-describedby="window-instructions"
            onClick={() => {
              if (!gesture.current?.moved) setOpenness(value => value >= 0.5 ? 0 : 1);
              gesture.current = null;
            }}
            onWheel={event => {
              if (event.deltaY !== 0) setOpenness(value => clamp(value - event.deltaY / 400));
            }}
            onPointerDown={event => {
              if (event.button !== 0) return;
              gesture.current = { y: event.clientY, openness, moved: false };
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={moveShade}
            onPointerUp={finishDrag}
            onPointerCancel={() => {
              finishDrag();
              gesture.current = null;
            }}
            onKeyDown={handleKeyDown}
          >
            <span className="airplane-window__sky" aria-hidden="true">
              <span className="airplane-window__sun" />
              <span className="airplane-window__cloud airplane-window__cloud--one" />
              <span className="airplane-window__cloud airplane-window__cloud--two" />
              <span className="airplane-window__wing" />
              <span className="airplane-window__view-label">somewhere above the clouds</span>
            </span>
            <span
              className="airplane-window__shade"
              style={{ transform: `translateY(${-openness * 100}%)` }}
              aria-hidden="true"
            >
              <span className="airplane-window__shade-label">a new perspective awaits</span>
              <span className="airplane-window__handle" />
            </span>
            <span className="airplane-window__glass" aria-hidden="true" />
          </button>
        </div>
        <Text id="window-instructions" className="airplane-cabin__instructions">
          Click to {galleryOpen ? 'close' : 'open'} the shade
          <br />
          <span>or drag / scroll up and down. Keyboard: use the arrow keys.</span>
        </Text>
      </Box>

      <Box id="travel-gallery-photos" hidden={!galleryOpen} w="100%" className="travel-gallery__photos">
        <Text className="travel-gallery__eyebrow">the view beyond</Text>
        <Heading as="h3" size="md" fontWeight="400" fontFamily="Georgia, serif" mt={3}>
          Travel photos coming soon
        </Heading>
        <Text fontSize="sm" color="gray.600" mt={3} mb={6}>
          These illustrated placeholders are just a preview, not travel photographs.
        </Text>
        <div className="travel-gallery__grid">
          {PLACEHOLDERS.map(({ title, scene }) => (
            <figure className="travel-gallery__card" key={scene}>
              <div className={`travel-gallery__scene travel-gallery__scene--${scene}`} aria-hidden="true" />
              <figcaption>
                <span>{title}</span>
                <small>PHOTO PLACEHOLDER</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </Box>
    </VStack>
  );
}
