import { useState } from "react";
import AddExpense from "./components/AddExpense";
import UploadCSV from "./components/UploadCSV";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100">
      {/* Navbar */}
      <div className="bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">
            💰 Mini Expense Manager
          </h1>
          <span className="text-sm text-gray-600">Smart Expense Tracking</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <AddExpense onAdded={triggerRefresh} />
          <UploadCSV onUpload={triggerRefresh} />
        </div>

        <Dashboard refresh={refresh} />
      </div>
    </div>
  );
}