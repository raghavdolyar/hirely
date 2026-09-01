# Hirely: AI-Powered Interview Strategist

Hirely is an AI-powered web application designed to help job seekers prepare for interviews. By analyzing a target Job Description alongside the user's Resume or Self-Description, Hirely leverages AI to instantly generate a highly personalized, comprehensive interview preparation strategy.

**[🚀 View Live Demo Here](https://hirely-frontend-xduc.onrender.com)**

## ✨ Features

- **Custom Interview Strategies**: Instantly generates a customized interview plan based on the exact job you are applying for.
- **AI Resume Parsing**: Upload your resume (PDF/DOCX) and the AI will analyze your existing skills and experience against the job requirements.
- **Technical & Behavioral Questions**: Get a list of tailored practice questions along with the interviewer's intention and model answers.
- **Skill Gap Analysis**: Identifies areas where your profile falls short of the job description, categorized by severity (High, Medium, Low).
- **Match Score**: Calculates a percentage match score to show how well your profile aligns with the role.
- **Preparation Roadmap**: Generates a day-by-day roadmap focusing on the specific skills and topics you need to master before the interview.
- **Secure Authentication**: Full user authentication system using JWTs stored in secure, HTTP-only cookies.
- **Soothing Dark Mode UI**: A premium, highly responsive user interface built with SCSS, featuring a distraction-free dark theme.

## 🛠️ Tech Stack

**Frontend:**

- React (Vite)
- React Router
- SCSS (Custom Styling & Theming)

**Backend:**

- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) & bcryptjs for Auth
- Google Gemini AI API (`gemini-3.5-flash-lite`) for generation
- `multer` and `pdf-parse` for file handling

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB connection string
- Google Gemini API Key

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/raghavdolyar/hirely.git
   cd hirely
   ```

2. **Setup the Backend:**

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the `backend` directory:

   ```env
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   GEMINI_API_KEY=your_gemini_api_key
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
   ```

3. **Setup the Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```
   _(Ensure your frontend API calls are pointing to `http://localhost:8000/api`)_

### Running the Application

You will need two terminal windows to run both servers simultaneously.

**Terminal 1 (Backend):**

```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**

```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` in your browser to start using Hirely.

## 🔒 Security Features

- Passwords are securely hashed using `bcryptjs`.
- JWTs are handled entirely via `httpOnly`, `sameSite`, and `secure` cookies, preventing XSS attacks from accessing the tokens.
- Token blacklisting is implemented for secure and immediate logouts.
- Route protection ensures unauthorized users cannot access or generate reports.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
