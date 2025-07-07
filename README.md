# 🧠 BrainSync Fullstack Application

BrainSync is a full-stack productivity app designed to help users manage notes, to-dos, links, and share content across a responsive interface. The project is built using **React (Vite)** for the frontend and **Node.js + Express + MongoDB** for the backend.

---

## 📁 Project Structure

BrainSync/
│
├── frontend/ # React (Vite) frontend app
│ ├── public/ # Static assets (images, icons)
│ ├── src/ # Source code (components, pages, context)
│ ├── index.html # Main HTML file
│ └── package.json # Frontend dependencies
│
├── Backend/ # Express backend
│ ├── config/ # Database configuration
│ ├── controller/ # Route logic controllers
│ ├── middlewares/ # Auth middleware
│ ├── models/ # Mongoose data models
│ ├── routes/ # Express routes
│ ├── utils/ # Utility functions
│ └── index.js # Main entry point
│
└── .gitignore # Git ignored files

yaml
Always show details

Copy

---


## 🚀 Tech Stack

### 🖥️ Frontend (Vite + React)
- React 18+
- React Router
- Context API
- Custom Components (NoteItem, Todo, Navbar, etc.)

### 🌐 Backend (Node.js + Express)
- Express.js
- MongoDB with Mongoose
- Authentication Middleware
- RESTful API routes for users, todos, and shared content

---


## ⚙️ How to Run

### 🟦 Frontend:
cd frontend
npm install
npm run dev


### 🟧 Backend:
cd Backend
npm install
node index.js
💡 Make sure to create a .env file in the Backend folder for database and JWT config.

🛡️ Features
User Authentication (Signup, Login)

Create, Read, Update, Delete:

Notes

To-Do Items

Shared Content

Responsive Dashboard UI

Auth-protected routes

Context API-based state management

📸 Screenshots
You can add screenshots here by dragging images into your GitHub issue or Markdown preview.

🧾 License
This project is licensed under the MIT License.
