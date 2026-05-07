# 📚 Library Management System (MERN Stack)

A **full-stack Library Management System** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.
The system provides **role-based access** for **Admins and Students**, allowing efficient management of books, student accounts, and borrowing requests.

This application is designed to simplify library operations such as **user approval, book management, and borrow request tracking**.

---

# 🚀 Features

## 👨‍💼 Admin Features

Admins have full control over the system and can manage users, books, and borrow requests.

- View **dashboard statistics**
- Manage **student accounts**
- **Approve or reject** newly registered student accounts
- View **all registered students and their details**
- **Add new books**
- **Edit existing books**
- **Delete books**
- View **borrow requests submitted by students**
- Update borrow request status:
  - Pending
  - Borrowed
  - Returned
  - Late Return

- Automatic **date updates when status changes**

### 📊 Admin Dashboard Includes

- Total number of **books**
- Total number of **students**
- Total **borrowed books**
- **Recently added books**
- **Recently created account requests**
- **Recent borrow requests**

---

## 🎓 Student Features

Students can browse books and submit borrowing requests once their account is approved.

### Account Registration

Students must register by providing:

- First Name
- Last Name
- Email
- University ID Number
- Date of Birth
- Contact Number
- Department
- Password

After registration:

- The account is sent to the **Admin for approval**
- Students **cannot perform actions until approved**

### Student Capabilities

After approval, students can:

- Browse **all available books**
- **Search books**
- **Filter books by genre**
- **Submit a borrow request**
- View borrowing status
- Update their **profile information**
- Upload a **profile picture**

### Borrow Request Status Tracking

Students can track their requests:

- Pending
- Borrowed
- Returned
- Late Return

---

# 🏗️ Tech Stack

## Frontend

- **React.js**
- **Axios**
- **React Router**
- **CSS / Tailwind / Bootstrap** _(adjust depending on what you used)_

## Backend

- **Node.js**
- **Express.js**

## Database

- **MongoDB**
- **Mongoose**

## Authentication

- **JWT (JSON Web Token)**

---

# 📂 Project Structure

```
library-management-system
│
├── client/                # React Frontend
│   ├── src
│   ├── components
│   ├── pages
│   └── services
│
├── server/                # Node.js Backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   └── config
│
├── package.json
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/library-management-system.git
```

```
cd library-management-system
```

---

## 2️⃣ Install dependencies

### Install backend dependencies

```bash
cd server
npm install
```

### Install frontend dependencies

```bash
cd client
npm install
```

---

## 3️⃣ Setup Environment Variables

Create a `.env` file inside the **server folder**.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 4️⃣ Run the application

### Start backend

```bash
cd server
npm start
```

### Start frontend

```bash
cd client
npm run dev
```

---

# 🔐 User Roles

| Role    | Permissions                                                             |
| ------- | ----------------------------------------------------------------------- |
| Admin   | Manage students, approve accounts, manage books, handle borrow requests |
| Student | Browse books, request borrowing, manage profile                         |

---

# 📊 Borrow Request Workflow

1. Student submits **borrow request**
2. Request status becomes **Pending**
3. Admin reviews the request
4. Admin updates status:
   - Borrowed
   - Returned
   - Late Return

5. Dates update automatically when status changes

---

# 📸 Future Improvements

- Email notifications for approvals
- Book return reminders
- Fine calculation for late returns
- Admin analytics dashboard

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 👨‍💻 Author

Developed by **Shoaib Muhammad**

GitHub:
https://github.com/shoaibmuhammad-dev
