import React, { useEffect, useState } from 'react'
import { useUserContext } from '../contexts/UserContext';
import { Button, Card, CardContent, Container, FormControl, Grid, InputLabel, ListItem, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { userDetails, setUserDetails, updateProfile, getProfile } = useUserContext();

    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile();
    };

    useEffect(() => {
        getProfile();
        document.getElementById("dob").max = new Date().toLocaleDateString('fr-ca');
    }, [])

    return (
        <div>
            <Container maxWidth="md">
                <Card variant="outlined">
                    <CardContent>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ mb: 2, textAlign: "center" }}
                        >
                            Profile Information
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid
                                container
                                columns={{ xs: 11, sm: 11, md: 11 }}
                                sx={{ mb: 0, display: 'flex', justifyContent: 'space-between' }}
                            >
                                <Grid item xs={11} sm={5.3} md={5.3}>
                                    <label htmlFor="fname">First Name</label>
                                    <TextField
                                        id='fname'
                                        type="text"
                                        name="fname"
                                        margin="dense"
                                        size="small"
                                        required
                                        fullWidth
                                        value={userDetails.fname}
                                        onChange={handleChange}
                                    />            
                                </Grid>
                                <Grid item xs={11} sm={5.3} md={5.3}>
                                    <label htmlFor="lname">Last Name</label>
                                    <TextField
                                        type="text"
                                        name="lname"
                                        margin="dense"
                                        size="small"
                                        required
                                        fullWidth
                                        value={userDetails.lname}
                                        onChange={handleChange}
                                    />            
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                columns={{ xs: 11, sm: 11, md: 11 }}
                                sx={{ mb: 0, display: 'flex', justifyContent: 'space-between' }}
                            >
                                <Grid item xs={11} sm={5.3} md={5.3}>
                                    <label htmlFor="phone">Phone</label>
                                    <TextField
                                        type="tel"
                                        name="phone"
                                        margin="dense"
                                        size="small"
                                        required
                                        fullWidth
                                        value={userDetails.phone}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={11} sm={5.3} md={5.3}>
                                    <label htmlFor="fname">Email</label>
                                    <TextField
                                        type="email"
                                        name="email"
                                        margin="dense"
                                        size="small"
                                        required
                                        fullWidth
                                        value={userDetails.email}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                columns={{ xs: 11, sm: 11, md: 11 }}
                                sx={{ mb: 0, display: 'flex', justifyContent: 'space-between' }}
                            >
                                <Grid item xs={11} sm={5.3} md={5.3}>
                                    <label htmlFor="gender">Gender</label>
                                    <Select
                                        id="gender"
                                        name="gender"
                                        size="small"
                                        style={{margin: '8px 0'}}
                                        placeholder='Select Gender'
                                        fullWidth
                                        required
                                        value={userDetails.gender}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value=""><em>Select</em></MenuItem>
                                        <MenuItem value={0}>Male</MenuItem>
                                        <MenuItem value={1}>Female</MenuItem>
                                        <MenuItem value={2}>Others</MenuItem>
                                        <MenuItem value={3}>Unspecified</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={11} sm={5.3} md={5.3}>
                                    <label htmlFor="dob">Date of Birth</label>
                                    <TextField
                                        id="dob"
                                        type="date"
                                        name="dob"
                                        margin="dense"
                                        size="small"
                                        required
                                        fullWidth
                                        value={userDetails.dob}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <div style={{textAlign: 'center'}}>
                                <Button
                                    variant="contained"
                                    style={{ marginTop: 20 }}
                                    disableElevation
                                    type="submit"
                                >
                                    Save Profile
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
}

export default Profile;