import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@chakra-ui/react';

export default function ShelfScroller({ width, activeIndex, busy, children }) {
  const viewportRef = useRef(null);
  const rowRef = useRef(null);
  const frameRef = useRef(null);
  const [edges, setEdges] = useState({ left: false, right: false });
  const reducedMotion = usePrefersReducedMotion();

  const stopScrolling = () => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    if (rowRef.current) delete rowRef.current.dataset.panning;
  };

  const updatePosition = () => {
    const viewport = viewportRef.current;
    const row = rowRef.current;
    const limit = Math.max(0, row.offsetWidth - viewport.clientWidth);
    if (viewport.scrollLeft > limit) viewport.scrollLeft = limit;
    row.style.setProperty('--shelf-center', `${viewport.scrollLeft - (row.offsetWidth - viewport.clientWidth) / 2}px`);
    const left = viewport.scrollLeft > 1;
    const right = viewport.scrollLeft < limit - 1;
    setEdges(previous => previous.left === left && previous.right === right ? previous : { left, right });
  };

  const startScrolling = (event, direction) => {
    if (event.pointerType !== 'mouse' || reducedMotion || busy) return;
    stopScrolling();
    rowRef.current.dataset.panning = 'true';
    let previousTime;
    const tick = time => {
      const viewport = viewportRef.current;
      const previousLeft = viewport.scrollLeft;
      const elapsed = previousTime === undefined ? 0 : Math.min(time - previousTime, 64);
      previousTime = time;
      viewport.scrollLeft += direction * elapsed * 0.18;
      updatePosition();
      if (elapsed && viewport.scrollLeft === previousLeft) {
        stopScrolling();
        return;
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
  };

  const scrollStep = direction => {
    if (busy) return;
    viewportRef.current.scrollLeft += direction * viewportRef.current.clientWidth * 0.65;
    updatePosition();
  };

  useLayoutEffect(() => {
    const observer = new ResizeObserver(updatePosition);
    observer.observe(viewportRef.current);
    observer.observe(rowRef.current);
    updatePosition();
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (activeIndex === null) return;
    const viewport = viewportRef.current;
    const slot = rowRef.current.querySelectorAll('.reading-shelf__slot')[activeIndex];
    if (!slot) return;
    const center = slot.offsetLeft + slot.offsetWidth / 2;
    if (center < viewport.scrollLeft + 48 || center > viewport.scrollLeft + viewport.clientWidth - 48) {
      viewport.scrollLeft = center - viewport.clientWidth / 2;
    }
    updatePosition();
  }, [activeIndex]);

  useEffect(() => {
    if (busy || reducedMotion) stopScrolling();
  }, [busy, reducedMotion]);

  useEffect(() => {
    window.addEventListener('blur', stopScrolling);
    const handleVisibility = () => {
      if (document.hidden) stopScrolling();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      stopScrolling();
      window.removeEventListener('blur', stopScrolling);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <>
      <div className="reading-shelf__stage" role="group" aria-label="Interactive bookshelf" aria-busy={busy} onPointerLeave={stopScrolling}>
        <span className="reading-shelf__edition" aria-hidden="true">THE READING ROOM / 01</span>
        <div className="reading-shelf__ledge" aria-hidden="true" />
        <div
          ref={viewportRef}
          className="reading-shelf__viewport"
          style={{ overflowX: busy ? 'hidden' : 'auto' }}
          tabIndex={0}
          role="region"
          aria-label="Book spines. Scroll horizontally to browse."
          onScroll={updatePosition}
          onKeyDown={event => {
            if (event.target !== event.currentTarget || busy) return;
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
              event.preventDefault();
              scrollStep(event.key === 'ArrowLeft' ? -1 : 1);
            }
          }}
        >
          <div ref={rowRef} className="reading-shelf__row" style={{ minWidth: `${width + 192}px` }}>
            {children}
          </div>
        </div>
        {(edges.left || edges.right) && [-1, 1].map(direction => (
          <button
            type="button"
            key={direction}
            className={`reading-shelf__edge reading-shelf__edge--${direction < 0 ? 'left' : 'right'}`}
            aria-label={`Scroll bookshelf ${direction < 0 ? 'left' : 'right'}`}
            disabled={busy || !(direction < 0 ? edges.left : edges.right)}
            onPointerEnter={event => startScrolling(event, direction)}
            onPointerLeave={stopScrolling}
            onBlur={stopScrolling}
            onClick={() => scrollStep(direction)}
          >
            <span aria-hidden="true">{direction < 0 ? '\u2039' : '\u203a'}</span>
          </button>
        ))}
      </div>
      {(edges.left || edges.right) && (
        <p className="reading-shelf__browse-hint">
          Hover at either edge to browse, or swipe / use the arrow buttons.
        </p>
      )}
    </>
  );
}
