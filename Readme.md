# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Backend

``` bash
cd backend
npm install
```

## Create .env file:

``` bash
MONGO_URI=<your-mongo-db-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=5000
```

## Start backend:
``` bash
npm run dev 
```

# Frontend

```bash
cd frontend
npm install
```

## Create .env file:
``` bash
VITE_BACKEND_PUBLIC_API_URL=http://localhost:5000
```

## Start frontend: 
```bash
npm run dev
```

The app should now be running at http://localhost:5173 (Vite default).

# Project Structure

```bash
frontend/
 ├─ src/
 │   ├─ api/          # Axios API calls
 │   ├─ components/   # Dashboard components, charts, forms
 │   ├─ pages/        # AdminDashboard.jsx, EmployeeDashboard.jsx
 │   └─ App.jsx
backend/
 ├─ controllers/      # API controllers for salary and expenses
 ├─ models/           # Mongoose schemas (User, Expense, SalarySlip)
 ├─ routes/           # Express routes
 ├─ middleware/       # Auth middleware
 └─ server.js
```
# Usage
## Admin

1. Log in as Admin.
2. Create or update employee salary slips.
3. View interactive charts for salaries and expenses.
4. Export salary slips as PDF.
5. View all employee expenses and approve/reject them.

## Employee

1. Log in as Employee.
2. Submit monthly expenses.
3. View expense history and approval status.
4. View personal salary slips.
5. See visual charts for personal salary and expenses trends.

# Dependencies
## Frontend

• react, react-dom, react-toastify
• axios
• recharts
• jspdf, jspdf-autotable
• tailwindcss
• Backend
• express, mongoose
• bcryptjs, jsonwebtoken
• dotenv
• cors

# Screenshots

## Admin Dashboard

## Employee Dashboard


# Future Improvements

• Email notifications for expense approval.
• Add more charts (monthly, yearly trends).
• Enhance UI with dark/light theme toggle.
• Add filters for table data.
• Implement role-based route protection on frontend.

