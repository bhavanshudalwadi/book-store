import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    Card,
    CardContent,
    Container,
    Button,
    TextField,
    Typography,
    Grid
} from "@mui/material";
import { useUserContext } from "../contexts/UserContext";

const Register = () => {
    const [page, setPage] = useState(1);
    const { registerUser } = useUserContext();

    const [registrationDetails, setRegistrationDetails] = useState({
        fname: "",
        lname: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setRegistrationDetails({...registrationDetails, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser(registrationDetails, setPage);
    }

    return (
        <div>
            <Container maxWidth={page === 1?"sm":"md"}>
                <Card variant="outlined">
                    {page === 1?
                        <CardContent>
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{ mb: 2, textAlign: "center" }}
                            >
                                Registration
                            </Typography>
                            <Grid
                                container
                                columns={{ xs: 11, sm: 11, md: 11 }}
                                sx={{ mb: 0, display: 'flex', justifyContent: 'space-between' }}
                            >
                                <Grid item xs={11} sm={5.3} md={5.3}>
                                    <TextField
                                        type="text"
                                        name="fname"
                                        label="Enter your first name"
                                        margin="normal"
                                        size="small"
                                        required
                                        fullWidth
                                        value={registrationDetails.fname}
                                        onChange={handleChange}
                                    />            
                                </Grid>
                                <Grid item xs={11} sm={5.3} md={5.3}>
                                    <TextField
                                        type="text"
                                        name="lname"
                                        label="Enter your last name"
                                        margin="normal"
                                        size="small"
                                        required
                                        fullWidth
                                        value={registrationDetails.lname}
                                        onChange={handleChange}
                                    />            
                                </Grid>
                            </Grid>
                            
                            <TextField
                                type="email"
                                name="email"
                                label="Email Id"
                                margin="normal"
                                size="small"
                                required
                                fullWidth
                                value={registrationDetails.email}
                                onChange={handleChange}
                            />
                            <TextField
                                type="password"
                                name="password"
                                label="Password"
                                margin="normal"
                                size="small"
                                required
                                fullWidth
                                value={registrationDetails.password}
                                onChange={handleChange}
                            />
                            <Button
                                variant="contained"
                                style={{ marginTop: 20 }}
                                onClick={handleSubmit}
                                fullWidth
                                disableElevation
                            >
                                Register
                            </Button>
                            <Typography
                                style={{ marginTop: 20, textAlign: "center" }}
                                variant="body2"
                                component="div"
                            >
                                Already an user <Link to="/login">Login</Link> Now
                            </Typography>
                        </CardContent>
                    :page === 2?
                        <CardContent sx={{textAlign: 'center', p: 3}}>
                            <h2 style={{marginBottom: 0}}>Thank You for choosing Online Bookstore Managment System</h2><br />
                            <p>Please check your email sent to <b>{registrationDetails.email}</b> for verification.</p>
                            <p>If you do not see the email in inbox, check your “junk mail” folder or “spam” folder.<br/> We make every effort to ensure that these emails are delivered.</p>
                        </CardContent>
                    :<></>}
                </Card>
            </Container>
        </div>
    );
};

export default Register;