import { Button, Card, CardContent, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../contexts/GlobalContext';
import { useBookContext } from '../contexts/BookContext';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useCategoryContext } from '../contexts/CategoryContext';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, bookCategories, theme) {
    return {
      fontWeight:
        bookCategories.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
}

const EditBook = () => {
    const params = useParams();
    const { setAlert } = useGlobalContext();
    const { bookDetails, setBookDetails, addBook, getBook, modifyBook } = useBookContext();
    const { categories, getCategories } = useCategoryContext();

    const theme = useTheme();
    const [bookCategories, setBookCategories] = React.useState([]);
    let formData = new FormData();

    const handleCategoryChange = (event) => {
        const { value } = event.target;
        setBookCategories(typeof value === 'string' ? value.split(',') : value);
        setBookDetails({...bookDetails, cat_ids: value.join()});
    };

    const handleChange = (e) => {
        setBookDetails({...bookDetails, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        getCategories();
        if(params.id) {
            getBook(params.id);
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        formData.append('title', bookDetails.title);
        formData.append('description', bookDetails.description);
        formData.append('cat_ids', bookDetails.cat_ids);
        formData.append('mrp', bookDetails.mrp);
        formData.append('price', bookDetails.price);
        formData.append('in_stock', bookDetails.in_stock);
        formData.append('author', bookDetails.author);
        formData.append('publisher', bookDetails.publisher);
        formData.append('lang', bookDetails.lang);
        formData.append('isbn', bookDetails.isbn);
        for(let i=0; i<bookDetails.imgs.length; i++) {
            formData.append(`img-${i+1}`, bookDetails.imgs[i]);
        }
        
        if(params.id) {
            formData.append('id', params.id);
            modifyBook(formData);
        }else {
            addBook(formData);
        }
    }

    const handleFileUpload = (e) => {
        if(e.target.files.length > 0) {
            let flag = false;
            for(let i=0; i<e.target.files.length; i++) {
                let exts = e.target.files[i].name.split('.');
                let ext = exts[exts.length-1];
                if(!(ext === 'jpg' || ext === 'jpeg' || ext === 'png')) {
                    flag = true;
                    break;
                }
            }
            if(flag) {
                setAlert({ type: "error", msg: "Only .jpg, .jpeg or .png files are allowed" });
            }else {
                setBookDetails({...bookDetails, [e.target.name]: e.target.files});
            }
        }
    }

    return (
        <div>
            <Container maxWidth="md">
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant='h5'>{params.id?"Edit":"Add"} Book</Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid
                                container
                                columns={{ xs: 12, sm: 12, md: 12 }}
                                sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}
                            >
                                <Grid item xs={12} sm={5.8} md={3.8}>
                                    <label htmlFor="title">Title</label>
                                    <TextField
                                        id='title'
                                        type="text"
                                        name="title"
                                        margin="dense"
                                        size="small"
                                        required
                                        fullWidth
                                        value={bookDetails.title}
                                        onChange={handleChange}
                                    />            
                                </Grid>
                                <Grid item xs={12} sm={5.8} md={3.8}>
                                    <label htmlFor="description">Description</label>
                                    <TextField
                                        id='description'
                                        type="text"
                                        name="description"
                                        margin="dense"
                                        size="small"
                                        rows={2}
                                        multiline
                                        fullWidth
                                        value={bookDetails.description}
                                        onChange={handleChange}
                                    />            
                                </Grid>
                                <Grid item xs={12} sm={5.8} md={3.8}>
                                    <label htmlFor="cat_ids">Select Genres</label>
                                    <Select
                                        labelId="cat_ids"
                                        id="cat_ids"
                                        multiple
                                        size='small'
                                        margin='dense'
                                        fullWidth
                                        required
                                        value={bookCategories}
                                        onChange={handleCategoryChange}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((cat) => (
                                                    <Chip key={cat} label={cat} size='small'/>
                                                ))}
                                            </Box>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {categories.map((cat) => (
                                            <MenuItem
                                                key={cat.name}
                                                value={cat.name}
                                                style={getStyles(cat.name, bookCategories, theme)}
                                            >
                                                { cat.name }
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item xs={12} sm={5.8} md={3.8}>
                                    <label htmlFor="author">Auther</label>
                                    <TextField
                                        id='author'
                                        type="text"
                                        name="author"
                                        margin="dense"
                                        size="small"
                                        fullWidth
                                        value={bookDetails.author}
                                        onChange={handleChange}
                                    />            
                                </Grid>
                                <Grid item xs={12} sm={5.8} md={3.8}>
                                    <label htmlFor="mrp">MRP</label>
                                    <TextField
                                        id='mrp'
                                        type="number"
                                        name="mrp"
                                        margin="dense"
                                        size="small"
                                        fullWidth
                                        value={bookDetails.mrp}
                                        onChange={handleChange}
                                    />            
                                </Grid>
                                <Grid item xs={12} sm={5.8} md={3.8}>
                                    <label htmlFor="price">Price</label>
                                    <TextField
                                        id='price'
                                        type="number"
                                        name="price"
                                        margin="dense"
                                        size="small"
                                        required
                                        fullWidth
                                        value={bookDetails.price}
                                        onChange={handleChange}
                                    />            
                                </Grid>
                                <Grid item xs={12} sm={5.8} md={3.8}>
                                    <label htmlFor="in_stock">In Stock</label>
                                    <TextField
                                        id='in_stock'
                                        type="number"
                                        name="in_stock"
                                        margin="dense"
                                        size="small"
                                        required
                                        fullWidth
                                        value={bookDetails.in_stock}
                                        onChange={handleChange}
                                    />            
                                </Grid>
                                <Grid item xs={12} sm={5.8} md={3.8}>
                                    <label htmlFor="publisher">Publisher</label>
                                    <TextField
                                        id='publisher'
                                        type="text"
                                        name="publisher"
                                        margin="dense"
                                        size="small"
                                        fullWidth
                                        value={bookDetails.publisher}
                                        onChange={handleChange}
                                    />            
                                </Grid>
                                <Grid item xs={12} sm={5.8} md={3.8}>
                                    <label htmlFor="lang">Language</label>
                                    <TextField
                                        id='lang'
                                        type="text"
                                        name="lang"
                                        margin="dense"
                                        size="small"
                                        fullWidth
                                        value={bookDetails.lang}
                                        onChange={handleChange}
                                    />            
                                </Grid>
                                <Grid item xs={12} sm={5.8} md={3.8}>
                                    <label htmlFor="isbn">ISBN</label>
                                    <TextField
                                        id='isbn'
                                        type="number"
                                        name="isbn"
                                        margin="dense"
                                        size="small"
                                        fullWidth
                                        value={bookDetails.isbn}
                                        onChange={handleChange}
                                    />            
                                </Grid>
                                <Grid item xs={12} sm={5.8} md={3.8}>
                                    <label htmlFor="imgs">Images</label>
                                    <input
                                        type="file"
                                        name="imgs"
                                        id="imgs"
                                        style={{margin: '8px 0', width: '100%', boxSizing: 'border-box', border: '1px solid #bbb', borderRadius: 4, padding: 9}}
                                        accept="image/*"
                                        multiple
                                        onChange={handleFileUpload}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                variant="contained"
                                sx={{mt: 2}}
                                disableElevation
                                type="submit"
                            >
                                {params.id?"Update":"Add"} Book
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
}

export default EditBook;