import React from 'react'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, IconButton, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useUserContext } from '../contexts/UserContext';
import { useBookContext } from '../contexts/BookContext';

const Book = ({ book }) => {
    const { user } = useUserContext();
    const { addOrRemoveToWishlist, addOrUpdateOrRemoveFromCart } = useBookContext();

    const handleAddOrRemoveWishlist = (book_id) => {
        addOrRemoveToWishlist(book_id);
    }

    const handleAddToCart = (book_id) => {
        addOrUpdateOrRemoveFromCart(book_id, "INSERT");
    }

    const handleUpdateCart = (book_id, mode) => {
        addOrUpdateOrRemoveFromCart(book_id, mode);
    }

    return (
        <Card sx={{ width: 150, margin: '10px 5px' }} variant='outlined'>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={book.img}
                    alt={book.title}
                    style={{ padding: 5, borderRadius: 16, boxSizing: 'border-box', maxHeight: 230, width: '100%', height: 'auto'}}
                    onClick={() => alert(book.description)}
                />
                <CardContent style={{ padding: 5 }} onClick={() => alert(book.description)}>
                    <Typography className='elipsedText' color="text.primary"> {book.title} </Typography>
                    <Typography variant='subtitle2' color="text.primary">by {book.author}</Typography>
                    <Typography variant="h6" color="text.primary" style={{ fontWeight: 'bold' }}>
                        ₹ {book.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <span style={{ textDecoration: 'line-through' }}>₹ {book.mrp}</span> <Chip style={{ backgroundColor: '#e5f7ee', color: '#03753c', fontWeight: 700 }} size="small" label={`${Math.round(100 - ((book.price * 100) / book.mrp))}% OFF`} />
                    </Typography>
                </CardContent>
                {user != null && book.in_wishlist ?
                    <FavoriteRoundedIcon style={{ position: 'absolute', top: 0, right: 0, color: 'red' }} onClick={() => handleAddOrRemoveWishlist(book.id)} />
                    : <FavoriteBorderRoundedIcon style={{ position: 'absolute', top: 0, right: 0, color: '#555' }} onClick={() => handleAddOrRemoveWishlist(book.id)} />
                }
            </CardActionArea>
            {/* <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste labore nisi, dolores aspernatur nesciunt amet deleniti totam itaque, illum sequi molestiae nam non. Natus, sint aut. Pariatur, sequi ab ullam hic ea corrupti voluptate asperiores autem ut cum, tempore numquam modi ipsa, magni fugit reprehenderit similique placeat. Quo nesciunt id sequi. Qui cupiditate excepturi, totam incidunt rerum ab tenetur aliquid fugiat hic explicabo, labore porro est molestiae ipsam impedit itaque? Dolor deleniti recusandae excepturi molestiae nostrum error quas, quos eum illo iusto dolores veniam hic voluptatibus fugit, maiores impedit odio eligendi, necessitatibus voluptas voluptatem labore quo consequatur saepe. Aut, possimus?
          </p> */}
            <CardActions>
                {
                    user != null && book.in_cart > 0 ?
                        <>
                            <IconButton aria-label="remove" color="primary" size="small" style={{ border: '1px solid rgba(25, 118, 210, 0.5)' }} onClick={() => handleUpdateCart(book.id, "REMOVE")}>
                                <RemoveIcon />
                            </IconButton>
                            <span style={{ padding: '3px 5px' }}>{book.in_cart}</span>
                            <IconButton aria-label="add" color="primary" size="small" style={{ border: '1px solid rgba(25, 118, 210, 0.5)', marginRight: 8 }} onClick={() => handleUpdateCart(book.id, "ADD")}>
                                <AddIcon />
                            </IconButton>
                        </>
                        :
                        <Button sx={{ borderRadius: 20, justifyContent: 'space-between', fontSize: 12 }} size="small" color="primary" variant='outlined' fullWidth endIcon={<AddIcon />} onClick={() => handleAddToCart(book.id)}>Add to Cart</Button>
                }
            </CardActions>
        </Card>
    )
}

export default Book;