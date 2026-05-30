# 🛍️ UrbanStore

A full-stack MERN E-Commerce application built using React, Node.js, Express.js, and MongoDB.

UrbanStore allows users to browse products, view product details, manage a shopping cart, and provides an admin dashboard for product management through complete CRUD operations.

---

# 🚀 Features

## Customer Features

* Browse Products
* View Product Details
* Add Products to Cart
* Update Product Quantity
* Remove Products from Cart
* Persistent Cart using Local Storage
* Responsive User Interface

## Admin Features

* View All Products
* Add New Products
* Edit Existing Products
* Delete Products
* Manage Product Data through MongoDB

---

# 🏗️ Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* Context API

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Version Control

* Git
* GitHub

---

# 📂 Project Structure

```text
UrbanStore-Website
│
├── urban-store
│   ├── public
│   ├── src
│   ├── package.json
│   └── vite.config.js
│
└── urban-store-backend
    ├── models
    ├── server.js
    ├── package.json
    └── .env
```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/Shivani-2712/urbanstore-website.git
```

## Frontend Setup

```bash
cd urban-store
npm install
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

## Backend Setup

```bash
cd urban-store-backend
npm install
npm start
```

Backend will run on:

```text
http://localhost:5000
```

---

# 🔧 Environment Variables

Create a `.env` file inside `urban-store-backend`.

```env
MONGO_URI=mongodb://127.0.0.1:27017/urbanstore
PORT=5000
```

---

# 🔌 API Endpoints

## Get All Products

```http
GET /products
```

## Get Single Product

```http
GET /products/:id
```

## Create Product

```http
POST /products
```

## Update Product

```http
PUT /products/:id
```

## Delete Product

```http
DELETE /products/:id
```

---

# 📚 What I Learned

This project helped me gain hands-on experience with:

* React Component Architecture
* React Router
* Context API
* State Management
* REST API Development
* MongoDB Integration
* Mongoose Models
* CRUD Operations
* Frontend & Backend Integration
* Git & GitHub Workflow

---

# 🚀 Future Enhancements

* Admin Authentication (JWT)
* User Authentication
* Cloudinary Image Uploads
* Razorpay Payment Gateway
* Order Management System
* Product Search & Filters
* Wishlist Functionality
* User Profiles
* Deployment

---

# 👩‍💻 Author

**Shivani Rana**

GitHub: https://github.com/Shivani-2712
