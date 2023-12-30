import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Card,
    CardContent,
    Container,
    Button,
    TextField,
    Typography,
} from "@mui/material";
import { useUserContext } from "../contexts/UserContext";

const Login = () => {
    const { loginUser } = useUserContext();

    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(loginDetails);
    };

    return (
        <div>
            <Container maxWidth="sm">
                <Card variant="outlined">
                    <CardContent>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ mb: 2, textAlign: "center" }}
                        >
                            Login
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                type="email"
                                name="email"
                                label="Email Id"
                                size="small"
                                value={loginDetails.email}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                            <TextField
                                type="password"
                                name="password"
                                label="Password"
                                margin="normal"
                                size="small"
                                value={loginDetails.password}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                            <Button
                                variant="contained"
                                style={{ marginTop: 20 }}
                                fullWidth
                                disableElevation
                                type="submit"
                            >
                                Login
                            </Button>
                        </form>
                        <Typography
                            style={{ marginTop: 20, textAlign: "center" }}
                            variant="body2"
                            component="div"
                        >
                            Not an user <Link to="/register">Register</Link> Now
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};

export default Login;