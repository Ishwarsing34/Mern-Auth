# 🔐 MERN Authentication System (Production-Ready)

A full-stack authentication system built using the **MERN stack**, designed with **real-world, production-level security practices**.  
This project covers complete user authentication flows including registration, email verification, login, logout, and secure password reset using OTP.

---

## 🚀 Features

- User Registration with email & password
- Secure Login & Logout
- Email Verification using OTP
- Forgot Password / Reset Password with OTP
- Two-step Password Reset Flow (Verify OTP → Set New Password)
- OTP Expiry & Single-use OTP handling
- Password hashing using bcrypt
- Secure authentication middleware
- Clean and scalable folder structure
- Production-ready backend APIs
- Modern, responsive UI

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Context API
- Tailwind CSS
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- Nodemailer
- dotenv

---

## 🔐 Authentication Flows

### 1. User Registration
- User signs up with email and password
- Password is hashed before storing
- Verification OTP is sent to email
- Account is activated after OTP verification

### 2. Login
- Secure login with email & password
- Authentication middleware protects private routes

### 3. Password Reset (Production Flow)
1. User enters registered email
2. OTP is sent to email
3. OTP is verified
4. Temporary reset token is generated
5. User sets a new password
6. Old OTP and tokens are invalidated

---

## 📂 Project Structure

project-root/
│
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ ├── assets/
│ │ └── App.jsx
│
├── server/ # Node + Express backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── utils/
│ └── server.js
│
├── .env
├── package.json
└── README.md





---

## 🧪 API Endpoints (Auth)

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| POST | /api/auth/logout | Logout user |
| POST | /api/auth/send-verify-otp | Send email verification OTP |
| POST | /api/auth/verify-account | Verify user account |
| POST | /api/auth/send-reset-otp | Send reset password OTP |
| POST | /api/auth/verify-reset-otp | Verify reset OTP |
| POST | /api/auth/set-new-password | Set new password |

---

## 🖼 Screenshots

> Add screenshots here to showcase your UI

### 🔹 Register Page
<img width="1890" height="941" alt="image" src="https://github.com/user-attachments/assets/7b4aaa9b-ce68-4de2-a9fe-ffbaa8c74aa5" />


### 🔹 Email Verification OTP
<img width="1861" height="858" alt="image" src="https://github.com/user-attachments/assets/bdba37c5-f8fd-4602-af9f-5d58496972df" />


### 🔹 Reset Password – Email
<img width="1861" height="858" alt="image" src="https://github.com/user-attachments/assets/86681c0f-8698-4bea-87c4-615af4408885" />


### 🔹 Reset Password – OTP

<img width="1907" height="987" alt="image" src="https://github.com/user-attachments/assets/f7772cff-84a7-45c4-8756-c7d9393d96d5" />




### 🔹 Set New Password

<img width="1910" height="948" alt="image" src="https://github.com/user-attachments/assets/f19ce8b0-6f37-4ae4-8abc-8dd0158af73a" />


---

## ⚙️ Environment Variables

Create a `.env` file in the backend directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
SENDER_EMAIL=your_email@gmail.com

EMAIL_PASSWORD=your_email_app_password



---

## 🧠 Security Practices Used

- Password hashing with bcrypt
- OTP expiration handling
- Single-use OTP logic
- Temporary password reset tokens
- Protected routes using middleware
- No sensitive data stored on frontend

---

