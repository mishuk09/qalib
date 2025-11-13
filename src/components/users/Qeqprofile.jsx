'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { BarChart3, Star, TrendingUp, Loader2 } from "lucide-react";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const Qeqprofile = () => {
  const [chartData, setChartData] = useState(null);
  const [groupInfo, setGroupInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [ieiScore, setIeiScore] = useState(null);

  const summarizeSurvey = (survey) => {
    const groups = {};
    Object.keys(survey).forEach((key) => {
      const match = key.match(/[A-Za-z]+/);
      if (!match) return;
      const group = match[0];
      if (!groups[group]) groups[group] = [];
      const value = parseFloat(survey[key]);
      if (!isNaN(value)) groups[group].push(value);
    });

    const summarized = {};
    const info = {};
    Object.keys(groups).forEach((group) => {
      const values = groups[group];
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      summarized[group] = avg;
      info[group] = {
        average: avg,
        answered: values.length,
      };
    });

    return { summarized, info };
  };

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://127.0.0.1:5000/api/user-profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { summarized, info } = summarizeSurvey(res.data.user.survey);
        setGroupInfo(info);

        const ieiGroups = ["D", "H", "Att", "PBC", "II"];
        const ieiValues = ieiGroups
          .map((key) => summarized[key])
          .filter((val) => !isNaN(val));

        const totalIei =
          ieiValues.length > 0
            ? ieiValues.reduce((a, b) => a + b, 0)
            : 0;

        setIeiScore(totalIei.toFixed(2));

        setChartData({
          labels: Object.keys(summarized),
          datasets: [
            {
              label: "Average Scores",
              data: Object.values(summarized),
              backgroundColor: "rgba(34, 202, 236, 0.2)",
              borderColor: "rgba(34, 202, 236, 1)",
              borderWidth: 2,
              pointBackgroundColor: "rgba(34, 202, 236, 1)",
            },
          ],
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurvey();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        <p className="ml-3 text-gray-600 text-lg">Loading your QEQ Profile...</p>
      </div>
    );

  if (!chartData)
    return <p className="text-center text-gray-600 mt-6">No survey data found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 pb-10">
      {/* Header */}
      <div className="text-center mb-10 mt-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <BarChart3 className="text-indigo-600 w-7 h-7" />
          QEQ Profile
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Your personal growth and performance dashboard
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* Your Score Section */}
        <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="text-yellow-500 w-6 h-6" />
            <h1 className="text-xl font-bold text-gray-800">Your Score</h1>
          </div>

          {/* IEI Total */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold text-indigo-600 flex items-center justify-center gap-2">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
              IEI Total: {ieiScore}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              (IEI = D + H + Att + PBC + II)
            </p>
          </div>

          {/* Individual Scores */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center mt-6">
            {["D", "H", "Att", "PBC", "II"].map((group) => (
              <div
                key={group}
                className="p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-indigo-50 transition-all duration-300"
              >
                <p className="text-sm font-medium text-gray-600">{group}</p>
                <p className="text-lg font-semibold text-gray-800 mt-1">
                  {groupInfo[group]?.average
                    ? groupInfo[group].average.toFixed(2)
                    : "N/A"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Spider Web Section */}
        <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BarChart3 className="text-blue-500 w-6 h-6" />
            <h1 className="text-xl font-bold text-gray-800">Your Spider Web</h1>
          </div>

          <Radar
            data={chartData}
            options={{
              responsive: true,
              scales: {
                r: {
                  beginAtZero: true,
                  max: 5,
                  ticks: { stepSize: 1 },
                  grid: { color: "rgba(0,0,0,0.1)" },
                  angleLines: { color: "rgba(0,0,0,0.1)" },
                },
              },
              plugins: {
                legend: { position: "top" },
                tooltip: {
                  callbacks: {
                    label: function (tooltipItem) {
                      const group = chartData.labels[tooltipItem.dataIndex];
                      const avg = groupInfo[group]?.average.toFixed(2);
                      const answered = groupInfo[group]?.answered;
                      return `${group}: ${avg} (${answered} answered)`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Qeqprofile;
