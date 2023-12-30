import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "./GlobalContext";
import { createBook, deleteBook, fetchBooks, fetchBook, updateBook, fetchHomeBooks } from "../API";

const bookContext = createContext();

export const BookState = ({ children }) => {
    const navigate = useNavigate();
    const { setAlert, setLoading, dialog, setDialog } = useGlobalContext();

    const [books, setBooks] = useState([]);
    const [homeBooks, setHomeBooks] = useState([]);
    const [bookDetails, setBookDetails] = useState({
        title: "",
        description: "",
        cat_ids: [],
        mrp: 0,
        price: 0,
        in_stock: 0,
        author: "",
        publisher: "",
        lang: "",
        isbn: "",
        imgs: []
    });
    
    const addBook = (data) => {
        setLoading(true);
        createBook(data)
            .then((res) => {
                setLoading(false);
                if(res.data.success) {
                    setAlert({ type: "success", msg: res.data.msg });
                    setBookDetails({
                        title: "",
                        description: "",
                        author: "",
                        mrp: 0,
                        price: 0,
                        in_stock: 0,
                        publisher: "",
                        lang: "",
                        isbn: ""
                    });
                    navigate('/books');
                }else {
                    setAlert({ type: "error", msg: res.data.msg });
                }
            })
            .catch((error) => {
                setLoading(false);
                setAlert({ type: "error", msg: "Failed to add book" });
                console.log(error);
            });
    }

    const getBooks = () => {
        setLoading(true);
        fetchBooks()
            .then((res) => {
                setLoading(false);
                if(res.data.success) {
                    setBooks(res.data.data);
                }else {
                    setAlert({ type: "error", msg: res.data.msg });
                }
            })
            .catch((error) => {
                setLoading(false);
                setAlert({ type: "error", msg: "Failed to get books" });
                console.log(error);
            });
    }

    const getBook = (id) => {
        setLoading(true);
        fetchBook(id)
            .then((res) => {
                setLoading(false);
                if(res.data.success) {
                    setBookDetails(res.data.data);
                }else {
                    setAlert({ type: "error", msg: res.data.msg });
                }
            })
            .catch((error) => {
                setLoading(false);
                setAlert({ type: "error", msg: "Failed to get book details" });
                console.log(error);
            });
    }

    const modifyBook = (data) => {
        setLoading(true);
        updateBook(data)
            .then((res) => {
                setLoading(false);
                if(res.data.success) {
                    setAlert({ type: "success", msg: res.data.msg });
                    setBookDetails({
                        title: "",
                        description: "",
                        author: "",
                        mrp: 0,
                        price: 0,
                        in_stock: 0,
                        publisher: "",
                        lang: "",
                        isbn: ""
                    });
                    navigate('/books');
                }else {
                    setAlert({ type: "error", msg: res.data.msg });
                }
            })
            .catch((error) => {
                setLoading(false);
                setAlert({ type: "error", msg: "Failed to update book" });
                console.log(error);
            });
    }

    const removeBook = () => {
        setLoading(true);
        deleteBook({ id: dialog.id })
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
                    getBooks();
                }else {
                    setAlert({ type: "error", msg: res.data.msg });
                }
            })
            .catch((error) => {
                setLoading(false);
                setAlert({ type: "error", msg: "Failed to delete book" });
                console.log(error);
            });
    }

    const getHomeBooks = () => {
        setLoading(true);
        fetchHomeBooks()
            .then((res) => {
                setLoading(false);
                if(res.data.success) {
                    setHomeBooks(res.data.data);
                }else {
                    setAlert({ type: "error", msg: res.data.msg });
                }
            })
            .catch((error) => {
                setLoading(false);
                setAlert({ type: "error", msg: "Failed to get books" });
                console.log(error);
            });
    }

    return (
        <bookContext.Provider
            value={{
                books,
                setBooks,
                bookDetails,
                setBookDetails,
                addBook,
                getBooks,
                getBook,
                modifyBook,
                removeBook,
                homeBooks,
                setHomeBooks,
                getHomeBooks
            }}
        >
            { children }
        </bookContext.Provider>
    );
};

export const useBookContext = () => {
    return useContext(bookContext);
};