import { Button, Container, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import Book from '../components/Book';
import { useBookContext } from '../contexts/BookContext';

const Home = () => {
  const { homeBooks, getHomeBooks } = useBookContext();

  useEffect(() => {
    getHomeBooks();
  }, []);

  return (
    <Container maxWidth="lg">
      {homeBooks.map((homeBook) => 
        <div key={homeBook.id} style={{marginBottom: 10}}>
          <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant='h6'>{homeBook.name} Books</Typography>
            <Button>View More</Button>
          </div>
          <div style={{display: 'flex', width: '100%', overflowX: 'scroll', marginBottom: 50, "body::-webkit-scrollbar-thumb": { backgroundColor: 'darkgrey', outline: '1px solid slategrey' }}}>
            {homeBook.books.map((book) =>
              <Book key={book.id} book={book} />
            )}
          </div>
        </div>
      )}
    </Container>
  )
}

export default Home;