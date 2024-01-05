import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, CardMedia, Chip, Container, Grid, IconButton, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useCartContext } from '../contexts/CartContext';

const Cart = () => {
    const { cartItems, getCartItems } = useCartContext();

    const [total, setTotal] = useState(0);
    
    const calculateTotal = () => {
        let bookTotal = 0;
        cartItems.forEach(book => bookTotal = bookTotal + (book.price * book.qty));
        setTotal(bookTotal);
    }

    useEffect(() => {
        getCartItems();
    }, [])

    useEffect(() => {
        calculateTotal();
    }, [cartItems])

    return (
        <div>
            <div style={{textAlign: 'center'}}>
                <Typography variant='h5'>Cart</Typography>
            </div>
            <Container sx={{mt: 3}} maxWidth="sm">
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography><b>Books Basket </b>({cartItems.length})</Typography>
                    <Typography>₹ <b>{total}</b></Typography>
                </Box>
                {cartItems && cartItems.map((book) => 
                    <Card sx={{ display: 'flex', mt: 2 }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 120 }}
                            image={book.img}
                            alt={book.title}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography sx={{textAlign: 'justify'}}><b>{book.title}</b></Typography>
                                <Box sx={{ justifyContent: 'space-between', display: {xs: 'none', sm: 'flex', md: 'flex'}}}>
                                    <Typography sx={{display: {xs: 'none', sm: 'block', md: 'block'}}} variant='h6'>₹<b>{book.price}</b>&nbsp;<span style={{textDecoration: 'line-through'}}>{book.mrp}</span></Typography>
                                    <Chip style={{backgroundColor: '#e5f7ee', color: '#03753c', fontWeight: 700, borderRadius: 5}} size="small" label={`You Save ₹${Math.round(book.mrp - book.price)}`} />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                    <Typography>By <b>{book.author}</b></Typography>
                                    <Typography sx={{display: {xs: 'none', sm: 'block', md: 'block'}}}>Pub.: <b>{book.publisher}</b></Typography>
                                </Box>
                                <Box sx={{ display: {xs: 'none', sm: 'flex', md: 'flex'}, justifyContent: 'space-between'}}>
                                    <Typography>Genres: <b>{book.cat_ids}</b></Typography>
                                    <Typography>Lang.: <b>{book.lang}</b></Typography>
                                </Box>
                                <Typography sx={{display: {xs: 'none', sm: 'block', md: 'block'}}}>ISBN: <b>{book.isbn}</b></Typography>
                                <Typography sx={{display: {xs: 'block', sm: 'none', md: 'none'}}} variant='h6'>₹<b>{book.price}</b>&nbsp;<span style={{textDecoration: 'line-through'}}>{book.mrp}</span></Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', pl: 2, pr: 2, pb: 2}}>
                                <Box>
                                    {/* <Button onClick={() => {}}>Add to Wishlist</Button> */}
                                    {book.in_wishlist ?
                                        <FavoriteRoundedIcon style={{ color: 'red' }} onClick={() => {}} />
                                        : <FavoriteBorderRoundedIcon style={{ color: '#555' }} onClick={() => {}} />
                                    }
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                    <Button sx={{minWidth: 0, width: 37, mr: 1, borderRadius: 100}} onClick={() => {}} variant="contained"><RemoveRoundedIcon /></Button>
                                    <Chip style={{mr: 1, borderRadius: 5}} label={book.qty} variant="outlined" />
                                    <Button sx={{minWidth: 0, width: 37, ml: 1, borderRadius: 100}} onClick={() => {}} variant="contained"><AddRoundedIcon /></Button>
                                </Box>
                            </Box>
                        </Box>
                    </Card>
                )}
            </Container>
        </div>
    )
}

export default Cart;