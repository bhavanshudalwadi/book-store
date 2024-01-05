import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EmailVerification from './pages/EmailVerification';
import { useUserContext } from './contexts/UserContext';
import Profile from './pages/Profile';
import Addresses from './pages/Addresses';
import EditCategory from './pages/EditCategory';
import CategoryList from './pages/CategoryList';
import EditBook from './pages/EditBook';
import BookList from './pages/BookList';
import Cart from './pages/Cart';

const MainNavigation = () =>{
    const { user } = useUserContext();

    const RedirectLogin = <Navigate to="/login" />;
    const RedirectHome = <Navigate to="/" />;

    return (
        <Routes>
            <Route path="/" element={user ? <Home /> : RedirectLogin}/>
            
            <Route path="/profile" element={user ? <Profile /> : RedirectLogin}/>
            <Route path="/addresses" element={user ? <Addresses /> : RedirectLogin}/>
            <Route path="/cart" element={user ? <Cart /> : RedirectLogin}/>

            <Route path="/categories" element={user && (user.role === 2 || user.role === 1) ? <CategoryList /> : RedirectLogin}/>
            <Route path="/add-category" element={user && (user.role === 2 || user.role === 1) ? <EditCategory /> : RedirectLogin}/>
            <Route path="/edit-category/:id" element={user && (user.role === 2 || user.role === 1) ? <EditCategory /> : RedirectLogin}/>

            <Route path="/books" element={user && (user.role === 2 || user.role === 1) ? <BookList /> : RedirectLogin}/>
            <Route path="/add-book" element={user && (user.role === 2 || user.role === 1) ? <EditBook /> : RedirectLogin}/>
            <Route path="/edit-book/:id" element={user && (user.role === 2 || user.role === 1) ? <EditBook /> : RedirectLogin}/>

            <Route path="/login" element={!user ? <Login /> : RedirectHome} />
            <Route path="/register" element={!user ? <Register /> : RedirectHome} />

            <Route path="/email-verification/:uid" element={!user ? <EmailVerification /> : RedirectHome} />
        </Routes>
    )
}

export default MainNavigation;