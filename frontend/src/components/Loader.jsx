import React, { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { Backdrop } from "@mui/material";
import loaderImg from "/loader-img.gif";

const Loader = () => {
    const { loading, setLoading } = useGlobalContext();

    return (
        <Backdrop
            sx={{ color: "#fff", zIndex: 1400 }}
            open={loading}
            onClick={() => {
                setLoading(false);
            }}
        >
            <img src={loaderImg} alt="Loading..." width="203" height="138" />
        </Backdrop>
    );
};

export default Loader;