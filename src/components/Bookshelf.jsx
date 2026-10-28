import React, { useEffect, useReducer, useState } from 'react';
import { Box, usePrefersReducedMotion } from "@chakra-ui/react";
import ShelfBook, { getBookThickness } from './ShelfBook';
import ShelfScroller from './ShelfScroller';
import './Bookshelf.css';

const defaultBooks = [
  {
    title: "And the Mountains Echoed",
    shelf: "past",
    author: "Khaled Hosseini",
    cover: "/assets/books/mountains.svg",
    coverWidth: 180,
    coverHeight: 270,
    pageCount: 448,
    edition: "Riverhead Books paperback",
    isbn: "9781594632389",
    pageCountSource: "https://www.penguinrandomhouseretail.com/book/?isbn=9781594632389",
    thoughts: "A story that stayed with me long after I finished it. Made me realize how different cultures experience love, loss, and family."
  },
  {
    title: "The Kite Runner",
    shelf: "past",
    author: "Khaled Hosseini",
    cover: "/assets/books/kite.svg",
    coverWidth: 180,
    coverHeight: 256,
    pageCount: 400,
    edition: "Riverhead Books paperback",
    isbn: "9781594631931",
    pageCountSource: "https://www.penguinrandomhouseretail.com/book/?isbn=9781594631931",
    thoughts: "Opened my eyes to a world I knew nothing about."
  },
  {
    title: "The Stationery Shop of Tehran",
    shelf: "past",
    author: "Marjan Kamali",
    cover: "/assets/books/tehran.svg",
    coverWidth: 180,
    coverHeight: 270,
    pageCount: 308,
    edition: "Simon & Schuster UK paperback",
    isbn: "9781471189180",
    pageCountSource: "https://www.goodreads.com/work/editions/65814486-the-stationery-shop",
  },
  {
    title: "HBR's 10 Must Reads on Emotional Intelligence",
    shelf: "2026",
    author: "Harvard Business Review",
    cover: "/assets/books/emotional-intelligence.svg",
    coverWidth: 180,
    coverHeight: 266,
    pageCount: 166,
    edition: "Harvard Business Review Press paperback",
    isbn: "9781633690196",
    pageCountSource: "https://www.goodreads.com/work/editions/42799988-hbr-s-10-must-reads-on-emotional-intelligence",
  },
  {
    title: "HBR's 10 Must Reads on Reinventing HR",
    author: "Harvard Business Review",
    shelf: "2026",
    cover: "/assets/books/hbr-reinventing-hr.png",
    coverWidth: 1264,
    coverHeight: 1657,
    pageCount: 208,
    edition: "Harvard Business Review Press paperback",
    isbn: "9781633697843",
    pageCountSource: "https://business.walmart.com/ip/HBR-s-10-Must-Reads-Hbr-s-10-Must-Reads-Reinventing-HR-with-Bonus-Article-People-Strategy-RAM-Charan-Dominic-Barton-Denn-Paperback-9781633697843/246115240",
  },
  {
    title: "The Lion Women of Tehran",
    author: "Marjan Kamali",
    shelf: "2026",
    cover: "/assets/books/lion-women.svg",
    coverWidth: 360,
    coverHeight: 540,
    pageCount: 336,
    edition: "Simon & Schuster UK paperback",
    isbn: "9781398534759",
    pageCountSource: "https://www.dymocks.com.au/the-lion-women-of-tehran-by-marjan-kamali-9781398534759",
  },
  {
    title: "How to Talk to Anyone",
    author: "Leil Lowndes",
    shelf: "2026",
    cover: "/assets/books/talk-to-anyone.svg",
    coverWidth: 360,
    coverHeight: 540,
    pageCount: 368,
    edition: "McGraw Hill paperback",
    isbn: "9780071418584",
    pageCountSource: "https://business.walmart.com/ip/How-to-Talk-to-Anyone-92-Little-Tricks-for-Big-Success-in-Relationships-Paperback-9780071418584/2156745",
  },
  {
    title: "The Mountain Is You",
    author: "Brianna Wiest",
    shelf: "2026",
    cover: "/assets/books/mountain-is-you.svg",
    coverWidth: 360,
    coverHeight: 540,
    pageCount: 248,
    edition: "Thought Catalog Books paperback",
    isbn: "9781949759228",
    pageCountSource: "https://www.harryhartog.com.au/products/the-mountain-is-you-brianna-wiest-9781949759228",
  },
  {
    title: "When Breath Becomes Air",
    author: "Paul Kalanithi",
    shelf: "2026",
    cover: "/assets/books/when-breath.svg",
    coverWidth: 360,
    coverHeight: 540,
    pageCount: 256,
    edition: "Random House hardcover",
    isbn: "9780812988406",
    pageCountSource: "https://www.penguinrandomhouse.com/books/258507/when-breath-becomes-air-by-paul-kalanithi/",
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    shelf: "2026",
    cover: "/assets/books/psychology-money.svg",
    coverWidth: 360,
    coverHeight: 540,
    pageCount: 256,
    edition: "Harriman House paperback",
    isbn: "9780857197689",
    pageCountSource: "https://www.harriman-house.com/authors/morgan-housel/the-psychology-of-money/9780857197689",
  },
];

const restingShelf = { active: null, phase: 'resting', next: null, closing: false };

function shelfReducer(state, action) {
  if (action.type === 'reset') return restingShelf;
  if (action.type === 'select') {
    if (state.active === null) return { ...restingShelf, active: action.index, phase: 'pulling' };
    if (state.active !== action.index) {
      return {
        ...state,
        next: action.index,
        closing: true,
        phase: state.phase === 'front' ? 'unturning-front' : state.phase === 'back' ? 'unturning-back' : state.phase,
      };
    }
    if (state.closing) return { ...state, next: action.index };
    if (state.phase === 'front') return { ...state, phase: 'flipping' };
    if (state.phase === 'back') return { ...state, phase: 'unturning-back', closing: true, next: null };
    return state;
  }
  if (action.type === 'close') {
    return {
      ...state,
      next: null,
      closing: true,
      phase: state.phase === 'front' ? 'unturning-front' : state.phase === 'back' ? 'unturning-back' : state.phase,
    };
  }
  if (action.type === 'settled') {
    switch (state.phase) {
      case 'pulling': return { ...state, phase: 'presenting' };
      case 'presenting': return { ...state, phase: state.closing ? 'unturning-front' : 'front' };
      case 'flipping': return { ...state, phase: state.closing ? 'unturning-back' : 'back' };
      case 'unturning-front':
      case 'unturning-back': return { ...state, phase: 'returning' };
      case 'returning': return state.next === null
        ? restingShelf
        : { ...restingShelf, active: state.next, phase: 'pulling' };
      default: return state;
    }
  }
  return state;
}

const Bookshelf = ({ books: collection = defaultBooks }) => {
  const [period, setPeriod] = useState('2026');
  const books = collection.filter(book => (book.shelf || '2026') === period);
  const [shelf, dispatch] = useReducer(shelfReducer, restingShelf);
  const reducedMotion = usePrefersReducedMotion();
  const moving = !['resting', 'front', 'back'].includes(shelf.phase);
  const totalWidth = books.reduce((width, book) => width + getBookThickness(book.pageCount) + 12, 0) - 12;
  let position = -totalWidth / 2;
  const selectedBook = shelf.active === null ? null : books[shelf.active];

  useEffect(() => {
    if (reducedMotion && moving) dispatch({ type: 'settled' });
  }, [reducedMotion, moving, shelf.phase]);

  return (
    <Box
      className="reading-shelf"
      data-book-open={selectedBook !== null}
      position="relative"
      left="50%"
      transform="translateX(-50%)"
      w={{ base: '100%', lg: 'min(1080px, calc(100vw - 64px))' }}
      py={8}
      onKeyDown={event => {
        if (event.key === 'Escape') dispatch({ type: 'close' });
      }}
    >
      <div className="reading-shelf__periods" role="group" aria-label="Reading period">
        {['2026', 'past'].map(value => (
          <button
            type="button"
            key={value}
            aria-pressed={period === value}
            onClick={() => {
              setPeriod(value);
              dispatch({ type: 'reset' });
            }}
          >
            {value === 'past' ? 'Past' : value}
          </button>
        ))}
      </div>
      <div className="reading-shelf__layout">
        <div className="reading-shelf__intro">
          <p className="reading-shelf__eyebrow">
            {selectedBook
              ? `${String(shelf.active + 1).padStart(2, '0')} / FROM MY BOOKSHELF`
              : `A PERSONAL COLLECTION / ${period === 'past' ? 'PAST' : period}`}
          </p>
          <div className="reading-shelf__story" aria-live="polite" aria-atomic="true">
            <h2>{selectedBook ? selectedBook.title : <>Stories worth<br />keeping.</>}</h2>
            {selectedBook ? (
              <>
                <p className="reading-shelf__author">{selectedBook.author}</p>
                {selectedBook.pageCount && (
                  <p className="reading-shelf__book-meta">
                    {selectedBook.pageCount} pages{selectedBook.edition && ` / ${selectedBook.edition}`}
                    {selectedBook.pageCountSource && (
                      <>
                        <br />
                        <a href={selectedBook.pageCountSource} target="_blank" rel="noopener noreferrer">
                          Edition source
                        </a>
                        {' / ISBN '}{selectedBook.isbn}
                      </>
                    )}
                  </p>
                )}
                <p className="reading-shelf__note-label">{selectedBook.thoughts ? 'WHAT STAYED WITH ME' : 'READING NOTES'}</p>
                <p className="reading-shelf__thoughts">{selectedBook.thoughts || 'Notes coming soon.'}</p>
              </>
            ) : (
              <p className="reading-shelf__thoughts">
                {period === 'past'
                  ? "Earlier reads, and the stories that have stayed with me."
                  : "Committing myself to 12 books in 2026. Here's what I'm reading and what's stayed with me."}
              </p>
            )}
          </div>
          <button
            type="button"
            className="reading-shelf__put-back"
            hidden={!selectedBook}
            onClick={() => dispatch({ type: 'close' })}
          >
            <span aria-hidden="true">&#8592;</span> Put back on shelf
          </button>
          <div className="reading-shelf__collection-meta">
            <span>{books.length.toString().padStart(2, '0')} BOOKS{period === '2026' ? ' / 12 BOOK GOAL' : ' / EARLIER READS'}</span>
            <span>Last updated: October 2026</span>
          </div>
        </div>

        <div className="reading-shelf__collection">
          <div className="reading-shelf__display">
            <ShelfScroller key={period} width={totalWidth} activeIndex={shelf.active} busy={moving}>
            {books.map((book, index) => {
              const thickness = getBookThickness(book.pageCount);
              const offset = position + thickness / 2;
              position += thickness + 12;
              return (
                <ShelfBook
                  key={book.title}
                  book={book}
                  offset={offset}
                  phase={shelf.active === index ? shelf.phase : 'resting'}
                  onSelect={() => dispatch({ type: 'select', index })}
                  onSettled={() => {
                    if (shelf.active === index) dispatch({ type: 'settled' });
                  }}
                />
              );
            })}
            </ShelfScroller>
          </div>
          <p id="bookshelf-instructions" className="reading-shelf__instructions">
            Pick a spine. Click to turn it over, then click again to put it back.
          </p>
          <div className="reading-shelf__index" aria-label="Choose a book">
            {books.map((book, index) => (
              <button
                type="button"
                key={book.title}
                aria-label={`Select ${book.title}`}
                aria-pressed={shelf.active === index}
                onClick={() => dispatch({ type: 'select', index })}
              >
                <small aria-hidden="true">{String(index + 1).padStart(2, '0')}</small>
                {book.title}
              </button>
            ))}
          </div>
        </div>
      </div>
      <footer className="reading-shelf__footer">
          <p>
            These books represent different milestones in my reading journey, each one
            contributing to my personal and professional growth in its own way.
          </p>
          <p>
            3D shelf adapted from{' '}
            <a href="https://github.com/mawise/bookshelf" target="_blank" rel="noopener noreferrer">
              mawise/bookshelf
            </a>
            {' '}(MIT). Some covers are illustrative. Thickness follows page counts
            for the linked reference editions; your copy may differ.
          </p>
      </footer>
    </Box>
  );
};

export default Bookshelf;
