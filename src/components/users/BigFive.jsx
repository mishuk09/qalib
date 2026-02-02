import axios from "axios";
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import { BarChart3, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const BigFive = () => {
  const [chartData, setChartData] = useState(null);
  const [traitScores, setTraitScores] = useState({});
  const [big5Score, setBig5Score] = useState(0);
  const [loading, setLoading] = useState(true);

  // Use your exact scoring formula:
  // Extraversion = (6-Q1)+Q5
  // Agreeableness = Q2 + (6-Q7)
  // Conscientiousness = (6-Q3)+Q8
  // Neuroticism = (6-Q4)+Q9
  // Openness = (6-Q5)+Q10
  const calculateBigFiveFrom10 = (bf) => {
    if (!bf || typeof bf !== "object") return {};

    const toNum = (x) => {
      const n = Number(x);
      return Number.isNaN(n) ? 0 : n;
    };

    const q1 = toNum(bf.q1);
    const q2 = toNum(bf.q2);
    const q3 = toNum(bf.q3);
    const q4 = toNum(bf.q4);
    const q5 = toNum(bf.q5);
    const q6 = toNum(bf.q6);
    const q7 = toNum(bf.q7);
    const q8 = toNum(bf.q8);
    const q9 = toNum(bf.q9);
    const q10 = toNum(bf.q10);

    const Extraversion = 6 - q1 + q5;
    const Agreeableness = q2 + (6 - q7);
    const Conscientiousness = 6 - q3 + q8;
    const Neuroticism = 6 - q4 + q9;
    const Openness = 6 - q5 + q10;

    return {
      Extraversion,
      Agreeableness,
      Conscientiousness,
      Neuroticism,
      "Openness to Experience": Openness,
    };
  };

  useEffect(() => {
    const fetchBigFive = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://qalib.cloud/api/user-profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const bigfiveRaw = res.data?.user?.bigfive || {};
        const scores = calculateBigFiveFrom10(bigfiveRaw);

        // remove traits that are all zeros (no valid answers)
        const entries = Object.entries(scores).filter(
          ([, value]) => typeof value === "number" && value > 0
        );

        if (!entries.length) {
          setTraitScores({});
          setChartData(null);
          setBig5Score(0);
          return;
        }

        const labels = entries.map(([trait]) => trait);
        const values = entries.map(([, value]) => value);

        const traitsObj = {};
        entries.forEach(([trait, value]) => {
          traitsObj[trait] = value;
        });
        setTraitScores(traitsObj);

        const totalBig5 = values.reduce((a, b) => a + b, 0);
        setBig5Score(totalBig5);

        setChartData({
          labels,
          datasets: [
            {
              label: "Big Five Scores",
              data: values,
              backgroundColor: "rgba(34, 202, 236, 0.2)",
              borderColor: "rgba(34, 202, 236, 1)",
              borderWidth: 2,
              pointBackgroundColor: "rgba(34, 202, 236, 1)",
            },
          ],
        });
      } catch (err) {
        console.error(err);
        setChartData(null);
        setTraitScores({});
        setBig5Score(0);
      } finally {
        setLoading(false);
      }
    };

    fetchBigFive();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        <p className="ml-3 text-gray-600 text-lg">Loading your Big Five data...</p>
      </div>
    );
  }

  // No data state
  if (!chartData) {
    return (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold">This is Big Five Component</h1>

        <div className="my-4">
          <a
            href="/big-five-add"
            target="_blank"
            className="text-blue-600 px-4 py-2 border-2 border-blue-500 rounded hover:underline"
          >
            + Add Your Big Five Data
          </a>
        </div>

        <p>Others Functionality will be there...</p>
        <p className="text-gray-600 mt-4">
          No Big Five data found yet. Please add your Big Five data first.
        </p>
      </div>
    );
  }

  // With data
  return (
    <div className="max-w-7xl mx-auto pb-10 mt-8 px-4">
      <h1 className="text-4xl font-semibold">This is Big Five Component</h1>

      <div className="my-4">
        <a
          href="/big-five-add"
          target="_blank"
          className="text-blue-600 px-4 py-2 border-2 border-blue-500 rounded hover:underline"
        >
          + Add Your Big Five Data
        </a>
      </div>

      <p className="mb-6">Others Functionality will be there...</p>

      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* Trait Scores + Big5 total */}
        <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Your Big Five Scores</h2>
          <p className="text-gray-700 mb-4 font-medium">
            Big5 Total Score: <span className="text-indigo-600">{big5Score.toFixed(2)}</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(traitScores).map(([trait, value]) => (
              <div key={trait} className="p-3 rounded-lg border border-gray-100 bg-gray-50">
                <p className="text-sm font-medium text-gray-600">{trait}</p>
                <p className="text-lg font-semibold text-gray-800 mt-1">{value.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Spider Web */}
        <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BarChart3 className="text-blue-500 w-6 h-6" />
            <h2 className="text-xl font-bold text-gray-800">Big Five Spider Web</h2>
          </div>

          <Radar
            data={chartData}
            options={{
              responsive: true,
              scales: {
                r: {
                  beginAtZero: true,
                  // Each trait = 2 items, each 1–5 → max 10
                  max: 10,
                  ticks: { stepSize: 2 },
                  grid: { color: "rgba(0,0,0,0.1)" },
                  angleLines: { color: "rgba(0,0,0,0.1)" },
                },
              },
              plugins: {
                legend: { position: "top" },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      const index = tooltipItem.dataIndex;
                      const group = chartData.labels[index];
                      const val = traitScores[group] || 0;
                      return `${group}: ${val.toFixed(2)}`;
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

export default BigFive;
