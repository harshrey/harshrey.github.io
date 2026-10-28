import { useLayoutEffect, useRef, useState } from 'react';

export function getBookThickness(pageCount) {
  const pages = Number.isFinite(pageCount) && pageCount > 0 ? pageCount : 300;
  return Math.min(44, Math.max(20, 0.85 * pages ** 0.6));
}

function coverAppearance(image) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 16;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  context.drawImage(image, 0, 0, 16, 16);
  const pixels = context.getImageData(1, 2, 2, 12).data;
  const rgb = [0, 0, 0];
  let count = 0;
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] < 128) continue;
    rgb.forEach((_, channel) => { rgb[channel] += pixels[i + channel]; });
    count++;
  }
  if (!count) return {};
  const channels = rgb.map(value => Math.round(value / count));
  const luminance = channels.map(value => {
    const channel = value / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  }).reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
  return {
    color: `rgb(${channels.join(', ')})`,
    ink: luminance > 0.179 ? '#000000' : '#ffffff',
  };
}

export default function ShelfBook({ book, offset, phase, onSelect, onSettled }) {
  const [appearance, setAppearance] = useState({});
  const [failedCover, setFailedCover] = useState(false);
  const spineRef = useRef(null);
  const width = 160;
  const height = width / (appearance.aspectRatio || book.coverWidth / book.coverHeight);
  const depth = getBookThickness(book.pageCount);
  const selected = phase !== 'resting';
  const action = !selected ? 'Take off the shelf' : phase === 'back' ? 'Put back' : 'Turn over';

  useLayoutEffect(() => {
    let disposed = false;
    const fitSpine = () => {
      if (disposed || !spineRef.current) return;
      const spine = spineRef.current;
      const style = getComputedStyle(spine);
      const length = height - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom) - 2;
      const breadth = depth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) - parseFloat(style.gap);
      let size = 13;
      spine.style.setProperty('--spine-font-size', `${size}px`);
      // Measure the vertical line boxes, allowing for glyph overhang and rounding.
      for (let pass = 0; pass < 3; pass++) {
        const textLength = Math.max(...Array.from(spine.children, child => child.scrollHeight));
        const textBreadth = Array.from(spine.children).reduce((sum, child) => sum + child.offsetWidth, 0);
        const scale = Math.min(1, length / Math.max(1, textLength), breadth / Math.max(1, textBreadth));
        if (scale >= 1) break;
        size *= scale * 0.98;
        spine.style.setProperty('--spine-font-size', `${size}px`);
      }
    };
    fitSpine();
    document.fonts.ready.then(fitSpine);
    return () => { disposed = true; };
  }, [book.title, book.author, height, depth]);

  const loadCover = event => {
    const image = event.currentTarget;
    let colors = {};
    try {
      colors = coverAppearance(image);
    } catch {
      // Cross-origin covers may be displayed even when canvas sampling is unavailable.
    }
    setAppearance({
      ...colors,
      aspectRatio: image.naturalWidth / image.naturalHeight,
    });
  };

  return (
    <div
      className={`reading-shelf__slot${selected ? ' reading-shelf__slot--selected' : ''}`}
      style={{
        '--book-offset': `${offset}px`,
        '--book-width': `${width}px`,
        '--book-height': `${height}px`,
        '--book-depth': `${depth}px`,
        '--book-color': appearance.color || '#354f5a',
        '--book-ink': appearance.ink || '#ffffff',
      }}
    >
      <button
        type="button"
        className="reading-shelf__book"
        data-state={phase}
        aria-label={`${book.title} by ${book.author}: ${action}`}
        aria-pressed={selected}
        aria-describedby="bookshelf-instructions"
        onClick={onSelect}
        onTransitionEnd={event => {
          if (event.target === event.currentTarget && event.propertyName === 'transform') onSettled();
        }}
      >
        <span className="reading-shelf__cover" aria-hidden="true">
          {!failedCover ? (
            <img src={book.cover} alt="" draggable="false" onLoad={loadCover} onError={() => setFailedCover(true)} />
          ) : (
            <span className="reading-shelf__cover-fallback">
              <small>{book.author}</small>
              <span>{book.title}</span>
            </span>
          )}
        </span>
        <span ref={spineRef} className="reading-shelf__spine" aria-hidden="true">
          <span>{book.title}</span>
          <small>{book.author}</small>
        </span>
        <span className="reading-shelf__back" aria-hidden="true">
          <span className="reading-shelf__back-heading">what stayed with me</span>
          <span>{book.thoughts || 'Notes coming soon.'}</span>
          <small>click to put back</small>
        </span>
        <span className="reading-shelf__pages" aria-hidden="true" />
        <span className="reading-shelf__page-top" aria-hidden="true" />
        <span className="reading-shelf__page-bottom" aria-hidden="true" />
      </button>
    </div>
  );
}
