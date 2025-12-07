# Employee & Admin Dashboard

A full-featured web dashboard for managing employees, salary slips, and monthly expenses. Built with **React.js**, **Node.js**, **Express**, **MongoDB**, and **Tailwind CSS**, it supports data visualization, PDF export, and role-based functionality.

---

## **Features**

### Admin Features
- Create, update, and view employee salary slips.
- View salary and expense trends via interactive charts.
- Export salary slips as PDF.
- Approve or reject employee expenses (with status tracking).

### Employee Features
- Submit monthly expenses with amount, description, and month.
- View expense history and status (pending/approved/rejected).
- View personal salary slips.
- Interactive charts for salary and expense trends (optional).

### Optional / Good-to-Have
- Notifications for approvals (in-app alerts).
- Expense approval/rejection workflow.
- Modern UI with gradients, shadows, and responsive design.

---

## **Tech Stack**

- **Frontend:** React.js, Tailwind CSS, Recharts, react-toastify
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **PDF Export:** jsPDF
- **Charts:** Recharts
- **Authentication:** JWT-based role system (Admin & Employee)

---

## **Installation**

### Clone the repository
```bash
git clone https://github.com/yourusername/employee-dashboard.git
cd employee-dashboard


## Backend

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

### Start backend:
``` bash
npm run dev 
```

## Frontend

```bash
cd frontend
npm install
```

### Create .env file:
``` bash
VITE_BACKEND_PUBLIC_API_URL=http://localhost:5000
```

### Start frontend: 
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

1. react, react-dom, react-toastify
2. axios
3. recharts
4. jspdf, jspdf-autotable
5. tailwindcss
6. Backend
7. express, mongoose
8. bcryptjs, jsonwebtoken
9. dotenv
10. cors

# Screenshots

## Admin Dashboard
<img width="1911" height="851" alt="image" src="https://github.com/user-attachments/assets/440205b0-8e20-4118-9648-d43359fc85f2" />

## Employee Dashboard

<img width="1882" height="881" alt="image" src="https://github.com/user-attachments/assets/c45b5676-4785-4895-b454-070f567b776b" />

# Future Improvements

- Email notifications for expense approval.
- Add more charts (monthly, yearly trends).
- Enhance UI with dark/light theme toggle.
- Add filters for table data.
- Implement role-based route protection on frontend.

