# 💰 Mini Expense Manager

A full-stack web application to track daily expenses with automatic categorization, CSV bulk upload, anomaly detection, and dashboard analytics.

---

## 🚀 Features

### ✅ Core Features

* Add expenses manually (date, amount, vendor, description)
* Automatic category assignment using vendor mapping
* Upload multiple expenses via CSV
* Rule-based categorization
* Anomaly detection (expenses > 3× category average)
* Dashboard with:

  * Monthly totals per category
  * Top 5 vendors by total spend
  * Anomalies list

---

## 🛠️ Technologies Used

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Multer (file upload)
* csv-parser

---

## 📁 Project Structure

```
mini-expense-tracker/
│
├── client/                  # React + Tailwind frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddExpense.jsx
│   │   │   ├── UploadCSV.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                  # Express backend
│   ├── models/
│   │   ├── Expense.js
│   │   └── VendorMap.js
│   ├── uploads/             # CSV upload storage
│   ├── index.js             # main server file
│   ├── expenses.csv         # sample CSV
│   └── package.json
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone <your-repo-link>
cd mini-expense-tracker
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
node index.js
```

Server runs at:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 📡 API Endpoints

### ➕ Add Expense

```
POST /expenses
```

### 📂 Upload CSV

```
POST /upload-csv
Form-data → file
```

### 📊 Dashboard

```
GET /dashboard
```

---

## 📄 CSV Format

```
date,amount,vendor,description
2026-02-21,120,Swiggy,Breakfast
2026-02-21,800,Uber,Office travel
```

---

## Design Note

### Rule-based Categorization
Vendor-to-category mapping is handled using a `VendorMap` collection in MongoDB.  
When a new expense is added, the system checks if the vendor exists in the mapping:
- If found → assigned mapped category  
- If not found → defaults to **"Other"**

### Anomaly Detection Logic
An anomaly is detected when an expense amount exceeds **3× the average amount** of its category.  
The average is calculated dynamically using MongoDB aggregation.

### Data Model Choices
Two collections are used:
- `Expense` → stores transaction data with category & anomaly flag
- `VendorMap` → stores vendor-category mappings

### Trade-offs
- Rule-based anomaly detection instead of ML
- Manual vendor mapping
- Sequential CSV processing

## ⚠️ Assumptions

* Unknown vendors are categorized as **"Other"**
* CSV format must match required columns
* First expense in a category may be marked anomaly due to no prior average
* MongoDB Atlas is used for database hosting

---

## 🌟 Future Improvements

* Edit/Delete expenses
* Authentication
* Charts & data visualization
* Dark mode
* Deployment (Render/Vercel)

---

## 👨‍💻 Author

**Aman Bhaisare**
