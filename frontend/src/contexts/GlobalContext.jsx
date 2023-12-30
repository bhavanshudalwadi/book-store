import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const globalContext = createContext();

export const GlobalState = ({ children }) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [dialog, setDialog] = useState({
        open: false,
        title: "",
        description: "",
        id: 0,
        delete: false
    });
    const [alert, setAlert] = useState({
        type: "info",
        msg: "",
    });

    return (
        <globalContext.Provider
            value={{
                loading,
                setLoading,
                alert,
                setAlert,
                dialog,
                setDialog,
            }}
        >
            { children }
        </globalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(globalContext);
};