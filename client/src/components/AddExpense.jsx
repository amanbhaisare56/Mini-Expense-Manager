import { useState } from "react";
import axios from "axios";

export default function AddExpense({ onAdded }) {
  const [form, setForm] = useState({
    date: "",
    amount: "",
    vendor: "",
    description: "",
  });

  const submitExpense = async () => {
    await axios.post("http://localhost:5000/expenses", {
      ...form,
      amount: Number(form.amount),
    });

    onAdded();
    setForm({ date: "", amount: "", vendor: "", description: "" });
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border">
      <h2 className="text-xl font-semibold mb-4 text-indigo-600">
        ➕ Add Expense
      </h2>

      <div className="space-y-3">
        <input
          type="date"
          className="w-full border p-2 rounded-lg"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          placeholder="Amount"
          className="w-full border p-2 rounded-lg"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <input
          placeholder="Vendor"
          className="w-full border p-2 rounded-lg"
          value={form.vendor}
          onChange={(e) => setForm({ ...form, vendor: e.target.value })}
        />
        <input
          placeholder="Description"
          className="w-full border p-2 rounded-lg"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button
          onClick={submitExpense}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
}