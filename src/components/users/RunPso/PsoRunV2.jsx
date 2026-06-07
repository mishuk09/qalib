import axios from "axios";
import { Download, Loader2, Upload, X } from "lucide-react";
import { useState } from "react";

const PsoRunV2 = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fileContent, setFileContent] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const runV2 = async () => {
    if (!file) {
      alert("Please upload an Excel file!");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("https://qalib.cloud/api/admin/pso-run-v2", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(response.data);

      if (response.data.download_url) {
        const fileResponse = await axios.get(`https://qalib.cloud${response.data.download_url}`);
        setFileContent(fileResponse.data);
        setShowModal(true);
      }
    } catch (error) {
      console.error(error);
      alert("Profile Matching V2 execution failed!");
    }

    setLoading(false);
  };

  const downloadFile = () => {
    const element = document.createElement("a");
    const generatedFile = new Blob([fileContent], { type: "text/plain" });
    element.href = URL.createObjectURL(generatedFile);
    element.download = "group_final_v2.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="w-full mt-10 bg-white shadow-xl rounded-2xl p-8 border border-indigo-200">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Profile Matching V1
      </h2>

      <div className="mb-8">
        <label className="block text-lg font-semibold text-gray-700 mb-2">Upload Excel File</label>

        <div className="flex items-center gap-3">
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="border border-gray-300 p-3 rounded-lg w-full bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 transition"
          />
          <Upload className="text-indigo-600 h-6 w-6" />
        </div>

        <p className="text-sm text-gray-500 mt-2 italic">Runs only on Qalib V2 endpoint.</p>

        {file && (
          <div className="mt-3 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md p-2">
            <strong>Selected:</strong> {file.name}
          </div>
        )}
      </div>

      <button
        onClick={runV2}
        disabled={loading}
        className="w-full px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md
                   hover:bg-indigo-700 active:scale-95 transition-transform flex items-center justify-center gap-2 disabled:bg-gray-400"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin h-5 w-5" />
            Running V2...
          </>
        ) : (
          "Prompt User for Qalib V1.0"
        )}
      </button>

      {result?.download_url && (
        <div className="mt-6 text-center">
          <a
            href={`https://qalib.cloud${result.download_url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 font-medium underline hover:text-indigo-800 transition"
          >
            Download Result
          </a>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[500px] mx-4 flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">V2 Results</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              <pre className="text-sm text-gray-700 font-mono whitespace-pre-wrap break-words">
                {fileContent}
              </pre>
            </div>

            <div className="flex gap-3 p-6 border-t border-gray-200 bg-white">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
              >
                Close
              </button>
              <button
                onClick={downloadFile}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
              >
                <Download className="h-5 w-5" />
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PsoRunV2;
