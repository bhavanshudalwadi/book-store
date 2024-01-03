import axios from "axios";

export const apiURL = "http://localhost/book-store/backend/";

const axiosInstance = axios.create({
    baseURL: apiURL,
    timeout: 300000
});

// Register User
export function createUser(data) {
    return axiosInstance.post(`register.php`, data);
}

export function checkEmail(uid) {
    if(uid != null && uid != '') {
        return axiosInstance.get(`verify-email.php?uid=${uid}`);
    }else {
        alert("uid is invalid in API call");
    }
}

// Login User
export function authUser(data) {
    return axiosInstance.post(`login.php`, data);
}

// Fetch user details
export function fetchProfile(data) {
    return axiosInstance.post(`fetch-profile.php`, data);
}

// Update user details
export function updateUser(data) {
    return axiosInstance.post(`update-profile.php`, data);
}

// Categories
export function createCategory(data) {
    return axiosInstance.post(`create-category.php`, data , {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

export function fetchCategories() {
    return axiosInstance.get(`fetch-categories.php`);
}

export function fetchCategory(id) {
    return axiosInstance.get(`fetch-category.php?id=${id}`);
}

export function updateCategory(data) {
    return axiosInstance.post(`update-category.php`, data);
}

export function deleteCategory(data) {
    return axiosInstance.post(`delete-category.php`, data);
}

// Books
export function createBook(data) {
    return axiosInstance.post(`create-book.php`, data , {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

export function fetchBooks() {
    return axiosInstance.get(`fetch-books.php`);
}

export function fetchBook(id) {
    return axiosInstance.get(`fetch-book.php?id=${id}`);
}

export function updateBook(data) {
    return axiosInstance.post(`update-book.php`, data);
}

export function deleteBook(data) {
    return axiosInstance.post(`delete-book.php`, data);
}

// Home Books
export function fetchHomeBooks(data) {
    if(data?.user_id != '') {
        return axiosInstance.post(`home.php`, data);
    }else {
        return axiosInstance.get(`home.php`);
    }
}

export function addOrRemoveWishlist(data) {
    return axiosInstance.post(`add-remove-wishlist.php`, data);
}

export function addOrUpdateOrRemoveCart(data) {
    return axiosInstance.post(`add-update-remove-cart.php`, data);
}

export function fetchCartCount(data) {
    return axiosInstance.post(`cart-count.php`, data);
}