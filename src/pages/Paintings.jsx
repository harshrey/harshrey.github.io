import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton,
} from '@chakra-ui/react';
import './Paintings.css';

const PAINTINGS = [
  {
    id: 1, title: 'Flowers in a little cart', image: '/assets/paintings/1.jpg',
    alt: 'A cart filled with red, yellow, and blue flowers against a purple background',
    photo: [2160, 2180], crop: [128, 570, 1560, 1320], shape: 'square',
  },
  {
    id: 2, title: 'Golden woods', image: '/assets/paintings/2.jpg',
    alt: 'Tall trees and a winding path through a golden forest',
    photo: [3024, 4032], crop: [250, 900, 2530, 2590], shape: 'square',
  },
  {
    id: 3, title: 'Into the green', image: '/assets/paintings/3.jpg',
    alt: 'A sunlit path winding through a green woodland',
    photo: [3024, 3187], crop: [240, 330, 2640, 2560], shape: 'square',
  },
  {
    id: 4, title: 'A window in bloom', image: '/assets/paintings/4.jpg',
    alt: 'Three pots of colorful flowers at a window overlooking sailboats',
    photo: [900, 1600], crop: [115, 410, 675, 670], shape: 'square',
  },
  {
    id: 5, title: 'Mountains & meadows', image: '/assets/paintings/mountain-meadow.png',
    alt: 'Snow-capped mountains above pine trees, cabins, and a flower-filled meadow',
    photo: [1024, 870], crop: [104, 104, 840, 640], shape: 'landscape',
  },
  {
    id: 6, title: 'Mount Rainier', image: '/assets/paintings/mountain-lake-watercolor.png',
    alt: 'Watercolor of Mount Rainier, pine trees, and a small alpine lake',
    photo: [768, 1024], crop: [120, 110, 560, 850], shape: 'portrait',
  },
  {
    id: 7, title: 'Snow & evergreens', image: '/assets/paintings/snowy-mountain-forest.png',
    alt: 'Snow-covered peaks above a forest of green and golden trees',
    photo: [768, 1024], crop: [32, 238, 696, 690], shape: 'square',
  },
  {
    id: 8, title: 'Clear water', image: '/assets/paintings/clear-lake-watercolor.png',
    alt: 'Watercolor of a clear blue lake with submerged stones, pine trees, and distant green mountains',
    photo: [576, 1024], crop: [55, 208, 390, 605], shape: 'portrait',
  },
  {
    id: 9, title: 'Winter light', image: '/assets/paintings/winter-woodland-watercolor.png',
    alt: 'Watercolor of a snowy woodland with bare branches, evergreen trees, and soft golden light',
    photo: [768, 1024], crop: [116, 134, 574, 890], shape: 'portrait',
  },
];

function Artwork({ painting, enlarged = false }) {
  const [left, top, width, height] = painting.crop;
  return (
    <span
      className={`painting-art${enlarged ? ' painting-art--enlarged' : ''}`}
      style={{ aspectRatio: `${width} / ${height}`, '--art-ratio': width / height }}
    >
      <img
        src={painting.image}
        alt={painting.alt}
        width={painting.photo[0]}
        height={painting.photo[1]}
        loading={enlarged ? 'eager' : 'lazy'}
        decoding="async"
        style={{
          width: `${painting.photo[0] / width * 100}%`,
          left: `${-left / width * 100}%`,
          top: `${-top / height * 100}%`,
        }}
      />
    </span>
  );
}

export default function Paintings() {
  const [selected, setSelected] = useState(null);
  const active = selected === null ? null : PAINTINGS[selected];
  const close = () => setSelected(null);
  const step = direction => setSelected(index => (index + direction + PAINTINGS.length) % PAINTINGS.length);

  return (
    <main className="painting-room" aria-label="Paintings">
      <header className="painting-room__intro">
        <div>
          <p className="painting-room__eyebrow">on paper &amp; canvas</p>
          <h2>paintings.</h2>
        </div>
        <div className="painting-room__copy">
          <p>
            I love seeing colors — they brighten up my mood in ways I can't quite explain. I especially love flowers.
            Growing up, my parents would try to grow a hibiscus or a rose in any corner they could find.
            I remember my mom making me pluck flowers for pooja. Maybe that's why I started painting them.
          </p>
          <p>
            I love mountains, too. Snow is especially fun to paint. What seems like something as simple as white
            makes me look closer — at the blue in a shadow, a little warmth in the light, and all the quiet shifts in between.
          </p>
        </div>
      </header>

      <div className="painting-room__note">
        <span>{String(PAINTINGS.length).padStart(2, '0')} paintings</span>
        <span>Pick one up for a closer look <span aria-hidden="true">&#8599;</span></span>
      </div>
      <section className="painting-wall" aria-label="Painting gallery">
        {PAINTINGS.map((painting, index) => (
          <figure className="painting-wall__piece" data-shape={painting.shape} key={painting.id}>
            <button
              type="button"
              className="painting-wall__frame"
              aria-label={`View painting: ${painting.title}`}
              aria-haspopup="dialog"
              onClick={() => setSelected(index)}
            >
              <Artwork painting={painting} />
              <span className="painting-wall__closer" aria-hidden="true">&#8599;</span>
            </button>
            <figcaption>
              <span className="painting-wall__number">{String(index + 1).padStart(2, '0')}</span>
              <span className="painting-wall__title">{painting.title}</span>
            </figcaption>
          </figure>
        ))}
      </section>

      <Modal isOpen={active !== null} onClose={close} size="full" motionPreset="none">
        <ModalOverlay />
        <ModalContent
          className="painting-viewer"
          bg="#f6f3ed"
          m={0}
          minH="100dvh"
          borderRadius={0}
          onKeyDown={event => {
            if (event.altKey || event.ctrlKey || event.metaKey) return;
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
              event.preventDefault();
              step(event.key === 'ArrowLeft' ? -1 : 1);
            }
          }}
        >
          <ModalHeader px={{ base: 4, md: 8 }} py={4}>
            <p className="painting-viewer__count" aria-live="polite">
              {selected === null ? '' : `${selected + 1} / ${PAINTINGS.length}`}
            </p>
            <h3 className="painting-viewer__title">{active?.title}</h3>
          </ModalHeader>
          <ModalCloseButton aria-label="Close painting" top={5} right={{ base: 4, md: 8 }} />
          <ModalBody display="flex" alignItems="center" justifyContent="center" minH={0} p={{ base: 4, md: 6 }}>
            {active && <Artwork painting={active} enlarged />}
          </ModalBody>
          <ModalFooter justifyContent="space-between" px={{ base: 4, md: 8 }} py={4} gap={3}>
            <button type="button" className="painting-viewer__control" onClick={() => step(-1)}>
              <span aria-hidden="true">&larr;</span> Previous
            </button>
            {active && (
              <a className="painting-viewer__original" href={active.image} target="_blank" rel="noopener noreferrer">
                Original photo <span aria-hidden="true">&#8599;</span>
              </a>
            )}
            <button type="button" className="painting-viewer__control" onClick={() => step(1)}>
              Next <span aria-hidden="true">&rarr;</span>
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </main>
  );
}
