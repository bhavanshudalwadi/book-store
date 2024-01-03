import React, { createContext, useContext, useState } from "react";
import { useGlobalContext } from "./GlobalContext";
import { useUserContext } from "./UserContext";

const cartContext = createContext();

export const CartState = ({ children }) => {
    const { user } = useUserContext();
    const { setLoading, setAlert } = useGlobalContext();

    const [cartCount, setCartCount] = useState(0);

    const getCartCount = () => {
        setLoading(true);
        fetchProfile({ user_id: user?.id })
            .then((res) => {
                setLoading(false);
                if(res.data.success) {
                    setCartCount(res.data.data.cart_count);
                }else {
                    setAlert({ type: "error", msg: res.data.msg });
                }
            })
            .catch((error) => {
                setLoading(false);
                setAlert({ type: "error", msg: "Failed to get cart count" });
                console.log(error);
            });
    }

    return (
        <cartContext.Provider
            value={{
                cartCount,
                setCartCount,
                getCartCount
            }}
        >
            { children }
        </cartContext.Provider>
    );
};

export const useCartContext = () => {
    return useContext(cartContext);
};