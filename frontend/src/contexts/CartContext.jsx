import React, { createContext, useContext, useState } from "react";
import { useGlobalContext } from "./GlobalContext";
import { useUserContext } from "./UserContext";
import { fetchCart, fetchCartCount } from "../API";

const cartContext = createContext();

export const CartState = ({ children }) => {
    const { user } = useUserContext();
    const { setLoading, setAlert } = useGlobalContext();

    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    const getCartCount = () => {
        setLoading(true);
        fetchCartCount({ user_id: user?.id })
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

    const getCartItems = () => {
        setLoading(true);
        fetchCart({ user_id: user?.id })
            .then((res) => {
                setLoading(false);
                if(res.data.success) {
                    setCartItems(res.data.data);
                }else {
                    setAlert({ type: "error", msg: res.data.msg });
                }
            })
            .catch((error) => {
                setLoading(false);
                setAlert({ type: "error", msg: "Failed to get cart items" });
                console.log(error);
            });
    }

    return (
        <cartContext.Provider
            value={{
                cartCount,
                setCartCount,
                getCartCount,
                cartItems,
                setCartItems,
                getCartItems
            }}
        >
            { children }
        </cartContext.Provider>
    );
};

export const useCartContext = () => {
    return useContext(cartContext);
};