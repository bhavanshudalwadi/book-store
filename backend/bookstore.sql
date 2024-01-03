-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 03, 2024 at 02:31 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookstore`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `house_no` varchar(255) DEFAULT NULL,
  `floor_no` varchar(255) DEFAULT NULL,
  `tower_no` varchar(255) DEFAULT NULL,
  `apartment_name` varchar(500) NOT NULL,
  `address` varchar(2000) NOT NULL,
  `landmark` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` bigint(20) NOT NULL,
  `cat_ids` varchar(500) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `mrp` decimal(8,2) DEFAULT NULL,
  `price` decimal(8,2) NOT NULL,
  `in_stock` int(11) NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  `publisher` varchar(255) DEFAULT NULL,
  `lang` varchar(255) DEFAULT NULL,
  `isbn` varchar(20) DEFAULT NULL,
  `active_status` int(11) NOT NULL DEFAULT 0 COMMENT '0 - active\r\n1 - deactive',
  `timestamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `cat_ids`, `title`, `description`, `mrp`, `price`, `in_stock`, `author`, `publisher`, `lang`, `isbn`, `active_status`, `timestamp`) VALUES
(1, 'Fiction', 'Harry Potter and the Philosopher\'s Stone', 'Escape to Hogwarts with the unmissable series that has sparked a lifelong reading journey for children and families all over the world. The magic starts here.Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle.', '550.00', '354.00', 10, 'J.K. Rowling', 'Bloomsbury Children\'s Books', 'English', '9781408855652', 0, '2023-12-30 12:57:59'),
(2, 'Fiction,Mystery', 'hfhgfhg', 'gfhgfgh', '100.00', '80.00', 5, 'jkghgh', 'hjfghgf', 'fghfhgfh', '5675765', 0, '2023-12-30 16:26:16');

-- --------------------------------------------------------

--
-- Table structure for table `book_imgs`
--

CREATE TABLE `book_imgs` (
  `id` bigint(20) NOT NULL,
  `book_id` bigint(20) NOT NULL,
  `img` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `book_imgs`
--

INSERT INTO `book_imgs` (`id`, `book_id`, `img`) VALUES
(1, 1, '858img2.jpg'),
(2, 1, '958img1.jpg'),
(3, 2, '36620231220_140922-COLLAGE (1).jpg'),
(4, 2, '747Documents_6 (1).jpg');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `book_id` bigint(20) NOT NULL,
  `qty` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0 COMMENT '0 - Cart Item\r\n1 - Order Item',
  `timestamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `book_id`, `qty`, `status`, `timestamp`) VALUES
(17, 7, 1, 1, 0, '2024-01-03 18:39:52');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `img` varchar(1000) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `img`, `timestamp`) VALUES
(3, 'Horror', NULL, '2023-12-29 15:23:04'),
(4, 'Fiction', NULL, '2023-12-29 15:25:06'),
(7, 'Historical Fiction', NULL, '2023-12-29 15:25:40'),
(9, 'Science fiction', NULL, '2023-12-29 15:26:02'),
(12, 'Mystery', NULL, '2023-12-29 16:54:57'),
(13, 'Thriller', NULL, '2023-12-29 16:55:12'),
(14, 'Romance novel', NULL, '2023-12-29 16:55:22'),
(15, 'Non-fiction', NULL, '2023-12-29 16:55:43'),
(16, 'Narrative', NULL, '2023-12-29 16:55:52'),
(17, 'History', NULL, '2023-12-29 16:56:09'),
(18, 'Memoir', NULL, '2023-12-29 16:56:22'),
(19, 'Poetry', NULL, '2023-12-29 16:56:41'),
(20, 'Fantasy', NULL, '2023-12-29 16:56:50'),
(21, 'jhgfgfgebavhg', '494audio.png', '2023-12-29 17:35:04'),
(22, 'Some How', '309audio.some.how.png', '2023-12-29 17:35:47');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `cart_ids` varchar(500) NOT NULL,
  `order_status` varchar(255) NOT NULL COMMENT 'Ordered / Pending / Under Process / Shipped / Out for Delivery / Delivered / Cancelled / Refunded / On Hold / Returned / Completed',
  `total_amt` decimal(8,2) NOT NULL,
  `disc_amt` decimal(8,2) NOT NULL,
  `ship_id` varchar(255) DEFAULT NULL,
  `ship_cost` decimal(8,2) NOT NULL,
  `order_amt` decimal(8,2) NOT NULL,
  `ship_address` bigint(20) NOT NULL,
  `pay_status` varchar(255) NOT NULL COMMENT 'Panding\r\nSuccessful\r\nFailed',
  `pay_mode` varchar(255) DEFAULT NULL COMMENT 'COD\r\nUPI\r\nWallet\r\nCard',
  `pay_UTR` varchar(12) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `email` varchar(300) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `gender` int(11) DEFAULT NULL COMMENT '0 - Male\r\n1 - Female',
  `dob` date DEFAULT NULL,
  `role` int(11) NOT NULL DEFAULT 0 COMMENT '0 - Customer\r\n1 - Manager\r\n2 - Admin',
  `status` int(11) NOT NULL DEFAULT 0 COMMENT '0 - Not Verified\r\n1 - Verified',
  `timestamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fname`, `lname`, `email`, `phone`, `password`, `gender`, `dob`, `role`, `status`, `timestamp`) VALUES
(7, 'Splitz', 'Pro', 'splitzpro7@gmail.com', '7383537838', '202cb962ac59075b964b07152d234b70', 0, '2002-11-08', 0, 1, '2023-12-25 20:47:38');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `book_id` bigint(20) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`id`, `user_id`, `book_id`, `timestamp`) VALUES
(7, 7, 1, '2024-01-03 13:53:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `book_imgs`
--
ALTER TABLE `book_imgs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `book_imgs`
--
ALTER TABLE `book_imgs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
