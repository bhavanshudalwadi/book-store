import { Button, Card, CardContent, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useCategoryContext } from '../contexts/CategoryContext';
import { useGlobalContext } from '../contexts/GlobalContext';

const EditCategory = () => {
    const params = useParams();
    const { setAlert } = useGlobalContext();
    const { categoryDetails, setCategoryDetails, addCategory, getCategory, modifyCategory } = useCategoryContext();
    
    const [imgPreview, setImgPreview] = useState(null);

    const handleChange = (e) => {
        setCategoryDetails({...categoryDetails, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        if(params.id) {
            getCategory(params.id);
            setImgPreview(categoryDetails.img);
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('name', categoryDetails.name);
        formData.append('img', categoryDetails.img);
        
        if(params.id) {
            formData.append('id', params.id);
            modifyCategory(formData);
        }else {
            addCategory(formData);
        }
    }

    const handleFileUpload = (e) => {
        if(e.target.files.length > 0) {
            let exts = e.target.files[0].name.split('.');
            let ext = exts[exts.length-1];
            
            if(ext === 'jpg' || ext === 'jpeg' || ext === 'png'){
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = function () {
                    setImgPreview(reader.result);
                    setCategoryDetails({...categoryDetails, [e.target.name]: e.target.files[0]});       
                };
                reader.onerror = function (error) {
                    console.log('Error: ', error);
                    setAlert({ type: "error", msg: "Image Coversion Failed. Try Again" });
                };
            }else {
                setAlert({ type: "error", msg: "Only .jpg, .jpeg or .png files are allowed" });
            }   
        }
    }

    return (
        <div>
            <Container maxWidth="md">
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant='h5'>{params.id?"Edit":"Add"} Category</Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid
                                container
                                columns={{ xs: 11, sm: 11, md: 11 }}
                                sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}
                            >
                                <Grid item xs={11} sm={5.3} md={5.3}>
                                    <label htmlFor="name">Category Name</label>
                                    <TextField
                                        id='name'
                                        type="text"
                                        name="name"
                                        margin="dense"
                                        size="small"
                                        required
                                        fullWidth
                                        value={categoryDetails.name}
                                        onChange={handleChange}
                                    />            
                                </Grid>
                                <Grid item xs={11} sm={5.3} md={5.3}>
                                    <label htmlFor="img">Category Image</label>
                                    <TextField
                                        id="img"
                                        sx={{mt: 1, ".MuiInputBase-input": {p: "9px 9px 9px 9px"}}}
                                        type="file"
                                        name="img"
                                        margin="dense"
                                        size="small"
                                        accept="image/*"
                                        fullWidth
                                        onChange={handleFileUpload}
                                    /> 
                                    {imgPreview && <img src={imgPreview} style={{height: 'auto', width: 'auto', maxHeight: 50, borderRadius: 5}} />}
                                </Grid>
                            </Grid>
                            <Button
                                variant="contained"
                                sx={{mt: 2}}
                                disableElevation
                                type="submit"
                            >
                                {params.id?"Update":"Add"} Category
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
}

export default EditCategory;