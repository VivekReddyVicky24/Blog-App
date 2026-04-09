# ✨ BlogHub - Modern Content Publishing Platform

> **Empower Your Voice.** A full-featured, professional-grade blogging platform where writers discover their audience and readers find inspiring content.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Connected-brightgreen)](https://www.mongodb.com/)
[![Status](https://img.shields.io/badge/Status-Active-success)](#)

---

## 🎯 What Problem Does It Solve?

Modern content creators need a **powerful yet intuitive platform** to:
- 📝 Create and manage articles without technical barriers
- 🔐 Control access to premium content
- 👥 Build community through comments and engagement
- 📊 Track article performance with built-in analytics
- 🎨 Maintain a beautiful, professional presence

**BlogHub solves all of this** with an elegant, feature-rich platform built on proven technologies.

---

## ✨ Key Features

### 📰 **Content Management**
- ✍️ Rich article editor with image uploads
- 🏷️ Smart categorization and tagging
- 🔄 Auto-save & draft management
- 🗑️ Smart trash system with restore functionality
- ⏱️ Automatic reading time calculation

### 🔐 **Smart Access Control**
- 🎫 **Guest Preview System** - Show teaser content to non-subscribers
- 🔒 Content preview with login wall for unauthenticated users
- 👤 Role-based access (Readers, Authors, Admins)
- 🗝️ JWT-based authentication with secure tokens
- 📱 Session persistence across browser restarts

### 💬 **Community Engagement**
- 💭 Nested comments system
- ❤️ Article likes & engagement tracking
- 👥 Author profiles & bios
- 🔔 Comment notifications
- ⭐ Featured articles showcase

### 📊 **Analytics & Discovery**
- 📈 View count tracking per article
- 🎯 Top articles by popularity
- 🔍 Full-text search with filters
- 🏆 Featured articles on landing page
- 📋 Admin dashboard with insights

### 🎨 **User Experience**
- 🌙 Dark/Light theme switcher
- 📱 Fully responsive design
- ⚡ Lightning-fast performance (Vite)
- 🎯 Intuitive admin dashboard
- 🖼️ Beautiful UI with modern design patterns

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19.2** - Modern UI library with hooks
- **Vite** - Next-generation build tool (sub-second HMR)
- **React Router 7** - Client-side routing
- **Framer Motion** - Smooth animations
- **Axios** - HTTP client for API calls
- **CSS Variables** - Themeable design system

### **Backend**
- **Node.js 18+** - JavaScript runtime
- **Express 5.2** - Web framework
- **MongoDB 9.3** - NoSQL database
- **Mongoose 9.3** - ODM for MongoDB
- **JWT (jsonwebtoken 9.0)** - Secure authentication
- **Multer 2.1** - File upload handling
- **Bcryptjs 3.0** - Password hashing

### **DevTools**
- **Nodemon** - Auto-restart server during development
- **ESLint 9** - Code quality
- **Docker-ready** - Easy deployment

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18 or higher
- MongoDB Atlas account (free)
- npm or yarn package manager

### Installation

#### 1️⃣ Clone & Setup
```bash
# Clone the repository
git clone https://github.com/VivekReddyVicky24/Blog-App.git
cd bloghub

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

#### 2️⃣ Environment Setup

**Backend** - Create `.env` in `/backend`:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

**Frontend** - Create `.env` in `/frontend`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

#### 3️⃣ Start Development Servers

```bash
# Terminal 1 - Backend (from /backend)
npm run dev

# Terminal 2 - Frontend (from /frontend)
npm run dev
```

Visit `http://localhost:5173` in your browser 🎉

---

## 📖 How to Use

### For Readers
1. Visit the landing page to see featured articles
2. Click "Read Article" to view previews
3. Sign up to unlock full content access
4. Like articles, leave comments, and follow authors

### For Authors
1. Create an account and select "Author" role
2. Navigate to "Create Article"
3. Write your story with rich formatting
4. Upload hero image for visual appeal
5. Publish and share with the world 🌍

### For Admins
1. Access admin dashboard (`/admin`)
2. View all articles and user statistics
3. Manage published content
4. Restore accidentally deleted articles
5. Monitor platform activity

---

## 📁 Project Structure

```
bloghub/
├── backend/
│   ├── controllers/        # Business logic
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── middleware/         # Auth & validation
│   ├── config/             # Database config
│   └── server.js           # Express app
│
└── frontend/
    ├── src/
    │   ├── pages/          # Route components
    │   ├── components/     # Reusable UI
    │   ├── services/       # API client
    │   └── styles/         # CSS & themes
    └── index.html          # Entry point
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register      - Create user account
POST   /api/auth/login         - Login user
```

### Articles
```
GET    /api/articles           - Get all articles
GET    /api/articles/featured/top  - Get featured articles (PUBLIC)
GET    /api/articles/:id       - Get single article
POST   /api/articles           - Create article (auth required)
PUT    /api/articles/:id       - Update article (auth required)
DELETE /api/articles/:id       - Delete article (soft delete)
POST   /api/articles/:id/like  - Like/unlike article
```

### Comments
```
GET    /api/comments/:id       - Get article comments
POST   /api/comments/:id       - Add comment
DELETE /api/comments/:id       - Delete comment
```

---

## 🎨 Theme Customization

The app uses CSS variables for easy theming. Edit `src/global.css`:

```css
:root {
  --accent: #f43f5e;           /* Primary color */
  --accent-light: #fecdd3;     /* Light variant */
  --bg-page: #fafafa;          /* Page background */
  --bg-surface: #ffffff;       /* Surface background */
  --text-primary: #1f2937;     /* Primary text */
  /* ... more variables */
}
```

---

## 🚢 Deployment

### Deploy Backend (Heroku/Railway)
```bash
cd backend
# Push to your hosting service
```

### Deploy Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the dist/ folder
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 🎯 Future Roadmap

- [ ] 🔍 Advanced full-text search with Elasticsearch
- [ ] 📧 Email newsletter system
- [ ] 💰 Author monetization & paywall system
- [ ] 🤖 AI-powered content recommendations
- [ ] 📱 Mobile app (React Native)
- [ ] 🔄 Real-time collaboration on articles
- [ ] 🌐 Multi-language support
- [ ] 📊 Advanced analytics dashboard

---

## 💬 Support

Have questions? Open an issue on GitHub or contact the maintainers.

---

## 🌟 Show Your Support

If you find BlogHub helpful, please give it a ⭐ on GitHub!

**Made with ❤️ by [Vivek Reddy Vangala]**

