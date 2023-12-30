import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "./GlobalContext";
import { authUser, createUser, checkEmail, updateUser, fetchProfile } from '../API';

const userContext = createContext();

export const UserState = ({ children }) => {
    const navigate = useNavigate();
    const { setLoading, setAlert } = useGlobalContext();

    const [user, setUser] = useState(
        localStorage.getItem("bookstore-user")
            ? JSON.parse(localStorage.getItem("bookstore-user"))
            : null
    );

    const [isEmailVerified, setIsEmailVerified] = useState(null);

    const [userDetails, setUserDetails] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        phone: "",
        dob: "",
        gender: ""
    });

    const registerUser = (data, next) => {
        setLoading(true);
        createUser(data)
            .then((res) => {
                setLoading(false);
                if(res.data.success) {
                    next(2);
                    // setAlert({ type: "success", msg: res.data.msg });
                }else {
                    setAlert({ type: "error", msg: res.data.msg });
                }
            })
            .catch((error) => {
                setLoading(false);
                setAlert({ type: "error", msg: "Failed To Register" });
                console.log(error);
            });
    };

    const VerifyEmail = (uid) => {
        setLoading(true);
        checkEmail(uid)
            .then((res) => {
                setLoading(false);
                if(res.data.success) {
                    setIsEmailVerified(true);
                }else {
                    setIsEmailVerified(false);
                    setAlert({ type: "error", msg: res.data.msg });
                }
            })
            .catch((error) => {
                setLoading(false);
                setAlert({ type: "error", msg: "Failed to verify email" });
                console.log(error);
            });
    }

    const loginUser = (data) => {
        setLoading(true);
        authUser(data)
            .then((res) => {
                setLoading(false);
                if(res.data.success) {
                    setUser(res.data.data);
                    localStorage.setItem("bookstore-user", JSON.stringify(res.data.data));
                    setAlert({ type: "success", msg: res.data.msg });
                    navigate("/");
                }else {
                    setAlert({ type: "error", msg: res.data.msg });
                }
            })
            .catch((error) => {
                setLoading(false);
                setAlert({ type: "error", msg: "Failed To Login" });
                console.log(error);
            });
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem("bookstore-user");
        navigate("/login");
    };

    const getProfile = () => {
        setLoading(true);
        fetchProfile({ id: user.id })
            .then((res) => {
                setLoading(false);
                if(res.data.success) {
                    setUserDetails(res.data.data);
                }else {
                    setAlert({ type: "error", msg: res.data.msg });
                }
            })
            .catch((error) => {
                setLoading(false);
                setAlert({ type: "error", msg: "Failed to get profile details" });
                console.log(error);
            });
    }

    const updateProfile = () => {
        setLoading(true);
        updateUser(userDetails)
            .then((res) => {
                setLoading(false);
                if(res.data.success) {
                    setAlert({ type: "success", msg: res.data.msg });
                    navigate('/');
                }else {
                    setAlert({ type: "error", msg: res.data.msg });
                }
            })
            .catch((error) => {
                setLoading(false);
                setAlert({ type: "error", msg: "Failed To Update Profile" });
                console.log(error);
            });
    }

    return (
        <userContext.Provider value={{ registerUser, loginUser, user, setUser, userDetails, setUserDetails, logoutUser, VerifyEmail, isEmailVerified, setIsEmailVerified, updateProfile, getProfile }}>
            {children}
        </userContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(userContext);
};