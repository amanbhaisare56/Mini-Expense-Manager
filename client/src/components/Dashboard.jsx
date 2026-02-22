import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard({ refresh }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/dashboard").then((res) => {
      setData(res.data);
    });
  }, [refresh]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      {/* Monthly Totals */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4">
          📊 Monthly Totals
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.monthlyTotals.map((item) => (
            <div
              key={item._id}
              className="bg-indigo-50 p-4 rounded-xl shadow text-center"
            >
              <p className="text-gray-600">{item._id}</p>
              <p className="text-lg font-bold text-indigo-700">
                ₹{item.total}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Vendors */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4">
          🏆 Top Vendors
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.topVendors.map((v) => (
            <div
              key={v._id}
              className="bg-green-50 p-4 rounded-xl shadow text-center"
            >
              <p className="text-gray-600">{v._id}</p>
              <p className="text-lg font-bold text-green-700">
                ₹{v.total}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Anomalies */}
      {data.anomalies.length > 0 && (
        <div className="bg-red-50 p-6 rounded-2xl shadow-lg border border-red-200">
          <h2 className="text-xl font-semibold text-red-600 mb-4">
            🚨 Anomalies Detected
          </h2>
          {data.anomalies.map((a) => (
            <div key={a._id} className="mb-2">
              ⚠️ {a.vendor} spent ₹{a.amount}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}