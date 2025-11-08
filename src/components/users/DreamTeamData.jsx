import React, { useState } from "react";

const DreamTeamData = () => {
  const [dreamteam, setDreamteam] = useState({});
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const questions = [
    "I am quite artistic and able to design things.",
    "I am a creative person.",
    "I am a cool person and prefer products that are different and cool.",
    "I enjoy playing with colours.",
    "The aesthetics/look of things are important to me.",
    "I believe people buy product based on looks/design.",
    "I am a technical person.",
    "I normally will be the one coming out with the solutions needed.",
    "I am very good with computer and related technologies.",
    "I am good with programming.",
    "What inside is more important to me than how it looks outside.",
    "I like to figure out how something works.",
    "I believe people buy product based on its performance and functionality.",
    "I am a good communicator.",
    "I often can talk my way to what I want.",
    "I am an out-going person.",
    "I am good at networking and establishing connections.",
    "People often say that I am a person who 'could sell ice to the eskimos'.",
    "I believe any product can be successful with a good sales and marketing approach.",
  ];

  const handleChange = (index, value) => {
    setDreamteam((prev) => ({ ...prev, [index]: value }));
    setProgress(Math.round((Object.keys(dreamteam).length / questions.length) * 100));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please login first.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/api/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ dreamteam }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ DreamTeam data saved successfully!");
      } else {
        alert("❌ " + data.error);
      }
    } catch (err) {
      console.error("Error submitting dreamteam:", err);
      alert("Server error while submitting DreamTeam data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        EQ PROFILING SYSTEM - Dream Team
      </h2>

      <p className="text-center text-sm text-gray-500 mb-4">
        {Math.round((Object.keys(dreamteam).length / questions.length) * 100)}% Complete
      </p>

      <form onSubmit={handleSubmit}>
        {questions.map((q, i) => (
          <div key={i} className="mb-4 border-b pb-2">
            <p className="font-medium text-gray-700 mb-2">{`${i + 1}. ${q}`}</p>
            <div className="flex justify-between text-sm text-gray-600">
              {[1, 2, 3, 4, 5].map((num) => (
                <label key={num} className="flex flex-col items-center w-full">
                  <input
                    type="radio"
                    name={`q${i}`}
                    value={num}
                    checked={dreamteam[i] === num}
                    onChange={() => handleChange(i, num)}
                    className="mb-1"
                  />
                  {num}
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          {loading ? "Submitting..." : "Submit DreamTeam Data"}
        </button>
      </form>
    </div>
  );
};

export default DreamTeamData;
