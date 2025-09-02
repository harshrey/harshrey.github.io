import React from 'react';
import { motion } from 'framer-motion';
import './Bookshelf.css';

const books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "/assets/books/atomic-habits.jpg",
    description: "Tiny Changes, Remarkable Results"
  },
  {
    id: 2,
    title: "Deep Work",
    author: "Cal Newport",
    cover: "/assets/books/deep-work.jpg",
    description: "Rules for Focused Success in a Distracted World"
  },
  {
    id: 3,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cover: "/assets/books/psychology-of-money.jpg",
    description: "Timeless lessons on wealth, greed, and happiness"
  },
  {
    id: 4,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    cover: "/assets/books/think-and-grow-rich.jpg",
    description: "The Landmark Bestseller Now Revised and Updated for the 21st Century"
  },
  {
    id: 5,
    title: "The Alchemist",
    author: "Paulo Coelho",
    cover: "/assets/books/the-alchemist.jpg",
    description: "A Fable About Following Your Dream"
  }
];

const Bookshelf = () => {
  console.log('[DEBUG] Rendering Bookshelf component');
  console.log('[DEBUG] Books data:', books);
  console.log('[DEBUG] Component mount time:', new Date().toISOString());
  return (
    <div className="bookshelf-container">
      <h1 className="bookshelf-title">My Top 5 Books</h1>
      <div className="bookshelf">
        {books.map((book) => (
          <motion.div
            key={book.id}
            className="book-card"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0px 10px 20px rgba(0,0,0,0.2)"
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="book-cover">
              <img src={book.cover} alt={book.title} />
            </div>
            <div className="book-info">
              <h3>{book.title}</h3>
              <h4>{book.author}</h4>
              <p>{book.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Bookshelf;
