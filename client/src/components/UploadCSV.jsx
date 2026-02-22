import { useState } from "react";
import axios from "axios";

export default function UploadCSV({ onUpload }) {
  const [file, setFile] = useState(null);

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file);

    await axios.post("http://localhost:5000/upload-csv", formData);
    onUpload();
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border">
      <h2 className="text-xl font-semibold mb-4 text-indigo-600">
        📂 Upload CSV
      </h2>

      <input
        type="file"
        className="mb-3"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={uploadFile}
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
      >
        Upload
      </button>
    </div>
  );
}