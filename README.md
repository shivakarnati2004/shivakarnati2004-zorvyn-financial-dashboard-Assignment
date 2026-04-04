# Zorvyn Financial Ecosystem — Full-Stack Portfolio Dashboard

[![Zorvyn Logo](https://raw.githubusercontent.com/shivakarnati2004/shivakarnati2004-zorvyn-financial-dashboard-Assignment/main/frontend/public/logo.png)](https://github.com/shivakarnati2004/)

Welcome to the **Zorvyn Financial Dashboard**, a premium, industrial-grade personal finance management system. This project was developed as a technical assignment, with a core focus on replicating the sophisticated aesthetics and high-performance user experience of the Zorvyn ecosystem.

## 🚀 Vision & Execution

### **Software Development Philosophy**
This application follows the **Decoupled Architecture** pattern, separating the presentation layer (Frontend) from the business logic and persistence layer (Backend). This ensures scalability, maintainability, and clean code standards typical of modern enterprise software.

- **Frontend (React 18):** A high-performance, responsive SPA built with Vite for near-instant load times.
- **Backend (Node.js/Express):** A robust RESTful API handling data integrity and asynchronous operations.
- **Persistence:** Efficient JSON-based persistence to ensure state consistency without the overhead of a heavy RDBMS for this specific use-case.

## ✨ Key Features

- **Dynamic Interactive Dashboard:** Real-time visualization of financial trends using Recharts.
- **Seamless Transaction Management:** Add, Edit, and Delete transactions with a refined, professional modal system.
- **Advanced UI/UX:**
  - Smooth 60fps animations with **Framer Motion**.
  - Interactive Canvas elements via **Three.js** on the landing page for a premium "Scrollytelling" experience.
  - Persistent Dark/Light Mode toggle for optimal readability.
- **Clean Architecture:** Strict separation of concerns (SoC) between frontend components and backend services.

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion, Three.js, Recharts, Lucide Icons |
| **Backend** | Node.js, Express, File System (FS) Persistence, CORS |
| **Tooling** | Concurrently, PostCSS, ESLint |

---

## 📈 A Personal Note for the Team

> "I have dedicated significant effort to meticulously replicate the Zorvyn website's premium aesthetic. This project represents more than just a completed assignment—it is a demonstration of my commitment to high-class design and technical excellence. I believe I can contribute even more value to the company and am eager to apply my skills to your larger vision. Thank you for this opportunity."

---

## 👨‍💻 Author Details

- **Name:** Shiva Karnati
- **Phone:** [+91-9014266763](tel:+919014266763)
- **Email:** [shivakarnati2004@gmail.com](mailto:shivakarnati2004@gmail.com)
- **GitHub:** [shivakarnati2004](https://github.com/shivakarnati2004)
- **LinkedIn:** [shiva-karnati123](https://www.linkedin.com/in/shiva-karnati123)

---

## 📦 Local Setup & Deployment

### **Installation**
From the root directory, run:
```bash
npm run install:all
```

### **Run Locally**
```bash
npm run dev
```

### **Deploy to Netlify (Frontend)**
The frontend is optimized for **Netlify**.
1. Set the Build Command to `npm run build`.
2. Set the Publish Directory to `frontend/dist`.
3. (Optional) Add a `netlify.toml` for header configurations.

### **Deploy to Render (Backend)**
The backend can be deployed on **Render** (as a Web Service):
1. Build Command: `npm install`
2. Start Command: `node index.js` (inside `backend` folder)

---

© 2026 Shiva Karnati. Developed with Passion for Zorvyn.
