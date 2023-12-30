import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "./GlobalContext";
import { createCategory, deleteCategory, fetchCategories, fetchCategory, updateCategory } from "../API";

const categoryContext = createContext();

export const CategoryState = ({ children }) => {
    const navigate = useNavigate();
    const { setAlert, setLoading, dialog, setDialog } = useGlobalContext();

    const [categories, setCategories] = useState([]);
    const [categoryDetails, setCategoryDetails] = useState({
        name: "",
        img: ""
    });
    
    const addCategory = (data) => {
        setLoading(true);
        createCategory(data)
            .then((res) => {
                setLoading(false);
                if(res.data.success) {
                    setAlert({ type: "success", msg: res.data.msg });
                    setCategoryDetails({
                        name: "",
                        img: ""
                    });
                    navigate('/categories');
                }else {
                    setAlert({ type: "error", msg: res.data.msg });
                }
            })
            .catch((error) => {
                setLoading(false);
                setAlert({ type: "error", msg: "Failed to add category" });
                console.log(error);
            });
    }

    const getCategories = () => {
        setLoading(true);
        fetchCategories()
            .then((res) => {
                setLoading(false);
                if(res.data.success) {
                    setCategories(res.data.data);
                }else {
                    setAlert({ type: "error", msg: res.data.msg });
                }
            })
            .catch((error) => {
                setLoading(false);
                setAlert({ type: "error", msg: "Failed to get categories" });
                console.log(error);
            });
    }

    const getCategory = (id) => {
        setLoading(true);
        fetchCategory(id)
            .then((res) => {
                setLoading(false);
                if(res.data.success) {
                    setCategoryDetails(res.data.data);
                }else {
                    setAlert({ type: "error", msg: res.data.msg });
                }
            })
            .catch((error) => {
                setLoading(false);
                setAlert({ type: "error", msg: "Failed to get category details" });
                console.log(error);
            });
    }

    const modifyCategory = (data) => {
        setLoading(true);
        updateCategory(data)
            .then((res) => {
                setLoading(false);
                if(res.data.success) {
                    setAlert({ type: "success", msg: res.data.msg });
                    setCategoryDetails({
                        name: "",
                        img: ""
                    });
                    navigate('/categories');
                }else {
                    setAlert({ type: "error", msg: res.data.msg });
                }
            })
            .catch((error) => {
                setLoading(false);
                setAlert({ type: "error", msg: "Failed to update category" });
                console.log(error);
            });
    }

    const removeCategory = () => {
        setLoading(true);
        deleteCategory({ id: dialog.id })
            .then((res) => {
                setLoading(false);
                if(res.data.success) {
                    setAlert({ type: "success", msg: res.data.msg });
                    setDialog({
                        open: false,
                        title: "",
                        description: "",
                        id: 0,
                        delete: false
                    });
                    getCategories();
                }else {
                    setAlert({ type: "error", msg: res.data.msg });
                }
            })
            .catch((error) => {
                setLoading(false);
                setAlert({ type: "error", msg: "Failed to delete category" });
                console.log(error);
            });
    }

    return (
        <categoryContext.Provider
            value={{
                categoryDetails,
                setCategoryDetails,
                addCategory,
                categories,
                setCategories,
                getCategories,
                getCategory,
                modifyCategory,
                removeCategory
            }}
        >
            { children }
        </categoryContext.Provider>
    );
};

export const useCategoryContext = () => {
    return useContext(categoryContext);
};