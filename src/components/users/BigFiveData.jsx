import { useEffect, useRef, useState } from "react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timerRef = useRef(null);

  // Helper function to set message and auto-hide after duration
  const setTimedMessage = (text, duration = 4000) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setMessage(text);
    timerRef.current = setTimeout(() => {
      setMessage("");
      timerRef.current = null;
    }, duration);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBigFive((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setTimedMessage("❌ Session expired. Please log in again.");
        setIsSubmitting(false);
        return;
      }

      const res = await fetch("http://localhost:5000/api/add-bigfive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bigfive: bigFive }),
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setTimedMessage("✅ Big Five data submitted successfully!");
        // Optional: Reset form after success
        // setBigFive({ q1: "", q2: "", q3: "", q4: "", q5: "", q6: "", q7: "", q8: "", q9: "", q10: "" });
      } else {
        setTimedMessage(`❌ ${data.message || "Something went wrong."}`);
      }
    } catch (error) {
      console.error(error);
      setTimedMessage("❌ Network error. Could not connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderScale = (qKey, questionText) => (
    <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <p className="font-medium mb-4 text-gray-800">{questionText}</p>
      <div className="flex justify-between items-center text-xs sm:text-sm font-medium text-gray-600">
        <span className="w-1/4 text-left">Strongly Disagree</span>

        <div className="flex justify-center items-center flex-grow space-x-2 sm:space-x-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <label key={num} className="flex flex-col items-center cursor-pointer">
              <input
                type="radio"
                name={qKey}
                value={num}
                checked={bigFive[qKey] === String(num)}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 accent-blue-500"
              />
              <span className="text-xs mt-1">{num}</span>
            </label>
          ))}
        </div>

        <span className="w-1/4 text-right">Strongly Agree</span>
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
          disabled={isSubmitting}
          className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
        >
          {isSubmitting ? "Processing..." : "Submit Survey"}
        </button>
      </form>

      {message && (
        <div
          className="fixed top-26 right-4 z-50 p-3 rounded-lg text-sm font-semibold shadow-xl transition-opacity duration-300 max-w-sm"
          style={{
            backgroundColor: message.includes("✅") ? "#dcfce7" : "#fee2e2",
            borderColor: message.includes("✅") ? "#86efac" : "#fca5a5",
            color: message.includes("✅") ? "#166534" : "#991b1b",
            border: "1px solid",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default BigFiveData;
