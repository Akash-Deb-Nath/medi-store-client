# 💊 MediStore Frontend

"Your Trusted Online Medicine Shop"

Frontend application for **MediStore**, a full-stack OTC medicine e-commerce platform.

This application provides UI for:

- 🧑 Customers to browse and order medicines
- 🏪 Sellers to manage inventory and orders
- 🛡 Admins to manage users and platform data

> ⚠️ OTC Medicines Only (No prescription drugs supported)

---

# 🚀 Project Overview

MediStore is a modern e-commerce web application where users can purchase over-the-counter medicines online. The platform supports role-based access for Customers, Sellers, and Admins.

Users select their role during registration.

> 💡 Admin accounts should be seeded from the backend/database.

---

# 👥 Roles & Permissions

| Role     | Description                  | Key Permissions                                    |
| -------- | ---------------------------- | -------------------------------------------------- |
| Customer | Users who purchase medicines | Browse, Cart, Order, Track status, Leave reviews   |
| Seller   | Medicine vendors/pharmacies  | Manage inventory, View orders, Update order status |
| Admin    | Platform moderators          | Manage inventory, Users, Orders, Categories        |

---

# 🛠 Tech Stack

> See backend README for complete API specifications.

Typical Frontend Stack (Example):

- ⚛️ React / Next.js
- 🎨 Tailwind CSS, ShadCn
- 🔐 Better Auth Authentication
- 📦 Context API
- 🌐 Fetch API

---

# ✨ Features

## 🌍 Public Features

- Browse all available medicines
- Search and filter by category, price, manufacturer
- View detailed medicine information

---

## 🧑 Customer Features

- Register and login as Customer
- Add medicines to cart
- Place orders with shipping address (Cash on Delivery)
- Track order status
- Leave reviews after ordering
- Manage profile

---

## 🏪 Seller Features

- Register and login as Seller
- Add, edit, and remove medicines
- Manage stock levels
- View incoming orders
- Update order status

---

## 🛡 Admin Features

- View all users (Customers & Sellers)
- Ban / Unban users
- View all medicines and orders
- Manage categories

---

# 🗺 Pages & Routes

---

## 🌍 Public Routes

| Route       | Page             | Description                                  |
| ----------- | ---------------- | -------------------------------------------- |
| `/`         | Home             | Hero section, categories, featured medicines |
| `/shop`     | Shop             | All medicines with filters                   |
| `/shop/:id` | Medicine Details | Medicine info & add to cart                  |
| `/login`    | Login            | Login form                                   |
| `/register` | Register         | Registration form                            |

---

## 🧑 Customer Routes (Private)

| Route         | Page          | Description                      |
| ------------- | ------------- | -------------------------------- |
| `/cart`       | Cart          | View cart items                  |
| `/checkout`   | Checkout      | Shipping address & confirm order |
| `/orders`     | My Orders     | Order history                    |
| `/orders/:id` | Order Details | Items & status tracking          |
| `/profile`    | Profile       | Edit personal information        |

---

## 🏪 Seller Routes (Private)

| Route               | Page           | Description         |
| ------------------- | -------------- | ------------------- |
| `/seller`           | Seller Profile | Seller Profile |
| `/seller/medicines` | Inventory      | Manage medicines    |
| `/seller/orders`    | Orders         | Update order status |

---

## 🛡 Admin Routes (Private)

| Route               | Page       | Description                |
| ------------------- | ---------- | -------------------------- |
| `/admin`            | Profile    | Admin Profile              |
| `/admin/users`      | Users      | Manage users               |
| `/admin/orders`     | Orders     | View all orders            |
| `/admin/categories` | Categories | Manage medicine categories |

---

# 🔐 Authentication Flow

```text
User Registers (Select Role)
        ↓
Login
        ↓
Session Stored
        ↓
Protected Routes Accessible Based on Role
```

---

# 🧩 Application Structure (Example)

```text
src/
 ├── components/
 ├── app/
 ├── layouts/
 ├── context/
 ├── services/ (API calls)
 ├── hooks/
 └── utils/
```

---

# 📦 Future Improvements

- 💳 Online Payment Integration
- 📊 Seller Analytics Dashboard
- 🔔 Real-time Notifications
- ⭐ Advanced Review System
- 🌙 Dark Mode UI

---

# 📄 License

This project is intended for educational and commercial OTC pharmacy platform usage.
