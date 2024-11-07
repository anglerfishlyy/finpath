# FinPath - Personal Finance Management Application

A full-stack financial management application built with React, Node.js, and MongoDB. Helps users track expenses, manage budgets, and monitor investments with a modern, responsive interface.

![FinPath Screenshot](screenshot_url)

## 🚀 Features

- **Budget Management**: Create and track budgets with visual progress indicators
- **Expense Tracking**: Log and categorize expenses with detailed analytics
- **Investment Portfolio**: Monitor investment performance and returns (coming soon)
- **User Authentication**: Firebase auth with demo mode for recruiters
- **Responsive Design**: Full mobile support with dark mode

## 💻 Tech Stack

**Frontend**
- React.js with Vite
- TailwindCSS for styling
- Firebase Authentication
- Context API for state management
- Axios for API calls

**Backend**
- Node.js & Express.js
- MongoDB with Mongoose
- RESTful API architecture
- JWT authentication

## ⚡ Quick Start

Steps to Set Up and Run the Finpath Application

**1.Clone the Repository**
```
git clone https://github.com/yourusername/finpath.git
```
**2.Install Dependencies**

- Navigate to the root folder and install general dependencies:
```
npm install
```
- Move to the backend folder and install backend-specific dependencies:
```
cd backend
npm install
```
**3.Install Frontend Packages Install the required frontend packages:**

```
npm install redux react-redux axios react-router-dom tailwindcss chart.js
```
**4.Set Up the Backend**

- Initialize the Node.js Project (if not done):

```
mkdir finpath-backend
cd finpath-backend
npm init -y
```
- Install Backend Dependencies (if needed): Make sure you’re in the finpath-backend directory and run:

```
npm install
```
**5.Run the Application**

- Start the frontend:
```
npm run dev
```
- Start the backend:
```
cd backend
npm start
  ```

## 🌟 Key Features Implemented

- Real-time budget tracking with visual indicators
- Expense categorization and filtering
- Protected routes with demo mode
- Dark mode support
- Responsive design

## 🔍 Project Structure

```
finpath/
├── src/                  # Frontend source
│   ├── components/       # React components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   └── context/         # Context providers
└── backend/             # Backend source
    ├── controllers/     # Route controllers
    ├── models/         # Database models
    └── routes/         # API routes
```

## 🎯 Future Enhancements

- Mobile application
- Advanced analytics
- Stock market integration
- PDF report generation



## 📝 License

MIT License






