import { useState } from "react";

const BigFiveData = () => {
  const [bigFive, setBigFive] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    q10: "",
  });

  const [message, setMessage] = useState("");

  const API_BASE = "https://qalib.cloud/api"; // adjust if needed

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBigFive((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Please log in again. Token missing.");
        return;
      }

      const res = await fetch(`${API_BASE}/update-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bigfive: bigFive }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Big Five data submitted successfully!");
      } else {
        setMessage(`❌ ${data.message || "Something went wrong."}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Server error while submitting data.");
    }
  };

  const renderScale = (qKey, questionText) => (
    <div className="mb-4">
      <p className="font-medium mb-2">{questionText}</p>
      <div className="flex space-x-4">
        {[1, 2, 3, 4, 5].map((num) => (
          <label key={num} className="flex flex-col items-center">
            <input
              type="radio"
              name={qKey}
              value={num}
              checked={bigFive[qKey] === String(num)}
              onChange={handleChange}
              className="accent-blue-500"
            />
            <span className="text-sm">{num}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-8">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        🧩 Big Five Personality Survey
      </h2>

      <form onSubmit={handleSubmit}>
        {renderScale("q1", "1. I see myself as someone who is reserved.")}
        {renderScale("q2", "2. I see myself as someone who is generally trusting.")}
        {renderScale("q3", "3. I see myself as someone who tends to be lazy.")}
        {renderScale("q4", "4. I see myself as someone who is relaxed, handles stress well.")}
        {renderScale("q5", "5. I see myself as someone who has few artistic interests.")}
        {renderScale("q6", "6. I see myself as someone who is outgoing, sociable.")}
        {renderScale("q7", "7. I see myself as someone who tends to find fault with others.")}
        {renderScale("q8", "8. I see myself as someone who does a thorough job.")}
        {renderScale("q9", "9. I see myself as someone who gets nervous easily.")}
        {renderScale("q10", "10. I see myself as someone who has an active imagination.")}

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>

      {message && <p className="text-center mt-4 font-medium text-gray-700">{message}</p>}
    </div>
  );
};

export default BigFiveData;
