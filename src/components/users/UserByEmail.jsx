import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import {
  ArrowLeft,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Copy,
  GraduationCap,
  Mail,
  MapPin,
  Star,
  TrendingUp,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import { Link, useSearchParams } from "react-router-dom";
import Sidebar from "../../utills/Sidebar";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const FALLBACK_AVATAR =
  "https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff&size=256";

const normalizeText = (value) => {
  if (value === undefined || value === null) return "N/A";
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed ? trimmed : "N/A";
  }
  return String(value);
};

const formatDate = (dateValue) => {
  if (!dateValue) return "N/A";
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) return normalizeText(dateValue);
  return parsed.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
};

const labelFromKey = (key) =>
  key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/^./, (char) => char.toUpperCase());

const SurveySummary = ({ survey }) => {
  const entries = Object.entries(survey || {});
  const numericValues = entries
    .map(([, value]) => Number(value))
    .filter((value) => Number.isFinite(value));

  const average =
    numericValues.length > 0
      ? (numericValues.reduce((sum, value) => sum + value, 0) / numericValues.length).toFixed(2)
      : null;

  const averagePercent = average ? Math.min((Number(average) / 5) * 100, 100) : 0;

  return (
    <div className="bg-white shadow-sm rounded-lg p-4">
      <h3 className="font-semibold text-gray-800 mb-3">Survey Overview</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-700">
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-xs uppercase tracking-wide text-gray-500">Responses</p>
          <p className="text-xl font-semibold text-blue-700">{entries.length}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-xs uppercase tracking-wide text-gray-500">Numeric Values</p>
          <p className="text-xl font-semibold text-blue-700">{numericValues.length}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-xs uppercase tracking-wide text-gray-500">Average Score</p>
          <p className="text-xl font-semibold text-blue-700">{average || "N/A"}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Survey Strength</span>
          <span>{average ? `${average}/5` : "N/A"}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
            style={{ width: `${averagePercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const DemographicsSection = ({ demographics }) => {
  const entries = Object.entries(demographics || {});
  const [showAll, setShowAll] = useState(false);
  const visibleEntries = showAll ? entries : entries.slice(0, 12);

  if (entries.length === 0) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-2">Demographics</h3>
        <p className="text-sm text-gray-500">No demographics data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Demographics</h3>
        <span className="text-xs text-gray-500">{entries.length} fields</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {visibleEntries.map(([key, rawValue]) => {
          const label = labelFromKey(key);

          if (Array.isArray(rawValue)) {
            return (
              <div key={key} className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">{label}</p>
                <div className="flex flex-wrap gap-2">
                  {rawValue.length > 0 ? (
                    rawValue.map((item, index) => (
                      <span
                        key={`${key}-${index}`}
                        className="text-xs bg-white border border-blue-200 text-blue-700 px-2 py-1 rounded-full"
                      >
                        {normalizeText(item)}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">N/A</span>
                  )}
                </div>
              </div>
            );
          }

          return (
            <div key={key} className="bg-blue-50 rounded-lg p-3">
              <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
              <p className="text-sm text-gray-700 mt-1">{normalizeText(rawValue)}</p>
            </div>
          );
        })}
      </div>
      {entries.length > 12 && (
        <button
          type="button"
          onClick={() => setShowAll((prev) => !prev)}
          className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          {showAll ? "Show less" : `Show all (${entries.length})`}
        </button>
      )}
    </div>
  );
};

const QEQScoreSection = ({ survey }) => {
  const summarizeSurvey = (surveyData) => {
    const groups = {};

    if (!surveyData) return { summarized: {}, info: {} };

    Object.keys(surveyData).forEach((key) => {
      const match = key.match(/[A-Za-z]+/);
      if (!match) return;

      const group = match[0];
      if (!groups[group]) groups[group] = [];

      const value = parseFloat(surveyData[key]);
      if (!Number.isNaN(value)) {
        groups[group].push(value);
      }
    });

    const summarized = {};
    const info = {};

    Object.keys(groups).forEach((group) => {
      const values = groups[group];
      if (!values.length) return;

      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      summarized[group] = avg;
      info[group] = {
        average: avg,
        answered: values.length,
      };
    });

    return { summarized, info };
  };

  const { summarized, info } = summarizeSurvey(survey || {});

  // IEI = D + H + Att + PBC + II
  const ieiGroups = ["D", "H", "Att", "PBC", "II"];
  const ieiValues = ieiGroups
    .map((key) => summarized[key])
    .filter((val) => typeof val === "number" && !Number.isNaN(val));

  const totalIei = ieiValues.length > 0 ? ieiValues.reduce((a, b) => a + b, 0) : 0;
  const ieiScore = totalIei.toFixed(2);

  // Build chart data
  const cleanedEntries = Object.entries(summarized).filter(([key]) => key !== "I" && key !== "II");
  const limitedEntries = cleanedEntries.slice(0, 10);
  const labels = limitedEntries.map(([key]) => key);
  const values = limitedEntries.map(([_, val]) => val);

  const chartData =
    labels.length > 0
      ? {
          labels,
          datasets: [
            {
              label: "Average Scores",
              data: values,
              backgroundColor: "rgba(34, 202, 236, 0.2)",
              borderColor: "rgba(34, 202, 236, 1)",
              borderWidth: 2,
              pointBackgroundColor: "rgba(34, 202, 236, 1)",
            },
          ],
        }
      : null;

  if (!chartData) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-4">
        <p className="text-sm text-gray-500">No QEQ profile data available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <Star className="text-yellow-500 w-5 h-5" />
          Qalb Entrepreneurial Quotient (QEQ) Score
        </h3>
        <div className="text-center">
          <h2 className="text-5xl font-bold text-blue-600 flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            {ieiScore}
          </h2>
          <p className="text-sm text-gray-600">IEI Score (D + H + Att + PBC + II)</p>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 className="text-blue-600 w-5 h-5" />
          QEQ Spider Web Profile
        </h3>
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
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
                    label: (tooltipItem) => {
                      const labelIndex = tooltipItem.dataIndex;
                      const group = chartData.labels[labelIndex];
                      const avg = info[group]?.average ? info[group].average.toFixed(2) : "0.00";
                      const answered = info[group]?.answered ?? 0;
                      return `${group}: ${avg} (${answered} answered)`;
                    },
                  },
                },
              },
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-700">
          <span>
            <strong>D:</strong> Darruriyat
          </span>
          <span>
            <strong>H:</strong> Hajiyyat
          </span>
          <span>
            <strong>T:</strong> Tahsiniyyat
          </span>
          <span>
            <strong>Hip:</strong> Hipster
          </span>
          <span>
            <strong>Hac:</strong> Hacker
          </span>
          <span>
            <strong>Hus:</strong> Hustler
          </span>
          <span>
            <strong>Att:</strong> Attitude
          </span>
          <span>
            <strong>SN:</strong> Subjective Norms
          </span>
          <span>
            <strong>PBC:</strong> Perceived Behavioral Control
          </span>
          <span>
            <strong>Y:</strong> Intention
          </span>
        </div>
      </div>
    </div>
  );
};

const UserByEmail = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email")?.trim() || "";

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    const value = user?.email || email;
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 1500);
    } catch (copyError) {
      console.error("Copy failed:", copyError);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!email) {
        setError("Email query parameter is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/users/by-email?email=${encodeURIComponent(email)}`, {
          method: "GET",
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data.user || null);
          setError("");
        } else {
          setError(data.error || "Failed to load user");
        }
      } catch (err) {
        console.error("Error loading user by email:", err);
        setError("Error loading user. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [email]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3">
            <Sidebar />
          </aside>
          <main className="lg:col-span-9">
            <div className="bg-white rounded-2xl border shadow-sm p-6 animate-pulse">
              <div className="h-40 rounded-xl bg-blue-100 mb-4" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-blue-100" />
                <div className="space-y-2">
                  <div className="h-5 w-48 bg-blue-100 rounded" />
                  <div className="h-4 w-32 bg-blue-100 rounded" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="h-20 bg-blue-100 rounded-lg" />
                <div className="h-20 bg-blue-100 rounded-lg" />
                <div className="h-20 bg-blue-100 rounded-lg" />
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-cyan-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-3">
          <Sidebar />
        </aside>

        <main className="lg:col-span-9 space-y-6">
          <div className="bg-white rounded-lg shadow-sm  p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
              <Link
                to="/my-connections"
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <ArrowLeft size={14} />
                Back to Connections
              </Link>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                {error}
              </div>
            )}

            {!error && user && (
              <div className="space-y-6">
                <div className="rounded-lg overflow-hidden   bg-white shadow-sm">
                  <div className="h-48 bg-blue-200 relative">
                    <img
                      src={user.coverPhoto?.url || user.coverPhoto?.path || FALLBACK_AVATAR}
                      alt="User cover"
                      className="w-full h-full object-cover"
                      onError={(event) => {
                        event.currentTarget.src = FALLBACK_AVATAR;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  <div className="px-6 pb-6">
                    <div className="mt-2 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                      <div className="flex items-end gap-4">
                        <img
                          src={user.profilePhoto?.url || user.profilePhoto?.path || FALLBACK_AVATAR}
                          alt={user.fullName || "User"}
                          className="w-24 h-24 rounded-full border-4 border-white object-cover bg-white"
                          onError={(event) => {
                            event.currentTarget.src = FALLBACK_AVATAR;
                          }}
                        />
                        <div className="pb-1">
                          <h2 className="text-2xl font-semibold text-gray-800">
                            {user.fullName || "Unknown User"}
                          </h2>
                          <p className="text-sm text-gray-600">
                            {user.demographics.employmentStatus}
                          </p>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg border inline-flex items-center gap-2">
                        <CalendarDays size={14} className="text-blue-600" />
                        Created: {formatDate(user.created_at)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
                      <div className="bg-blue-50 rounded-lg p-4 flex items-center gap-2 text-sm text-gray-700">
                        <Mail size={16} className="text-blue-600" />
                        <span className="font-semibold">Email:</span>
                        <span className="truncate">{normalizeText(user.email || email)}</span>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4 flex items-center gap-2 text-sm text-gray-700">
                        <MapPin size={16} className="text-blue-600" />
                        <span className="font-semibold">Location:</span>
                        <span className="truncate">
                          {normalizeText(user.demographics?.currentLocation)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="text-xs text-gray-600 inline-flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-emerald-600" />
                        Survey Completed: {user.issurveyDone ? "Yes" : "No"}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Copy size={14} />
                          {copiedEmail ? "Copied" : "Copy Email"}
                        </button>
                        <a
                          href={`mailto:${normalizeText(user.email || email)}`}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
                        >
                          <Mail size={14} />
                          Send Email
                        </a>
                      </div>
                    </div>

                    {copiedEmail && (
                      <p className="text-xs text-emerald-600 mt-2">Email copied to clipboard.</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-white shadow-sm rounded-lg p-4">
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                      Program Name
                    </p>
                    <p className="text-sm text-gray-700 inline-flex items-center gap-2">
                      <GraduationCap size={14} className="text-blue-600" />
                      {normalizeText(user.cohortinformation?.programName)}
                    </p>
                  </div>

                  <div className="bg-white shadow-sm rounded-lg p-4">
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                      Program Venue
                    </p>
                    <p className="text-sm text-gray-700 inline-flex items-center gap-2">
                      <Building2 size={14} className="text-blue-600" />
                      {normalizeText(user.cohortinformation?.programVenue)}
                    </p>
                  </div>

                  <div className="bg-white shadow-sm rounded-lg p-4">
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                      Program Date
                    </p>
                    <p className="text-sm text-gray-700 inline-flex items-center gap-2">
                      <CalendarDays size={14} className="text-blue-600" />
                      {normalizeText(user.cohortinformation?.programDates)}
                    </p>
                  </div>
                </div>

                {/* <div className="bg-white shadow-sm rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3 inline-flex items-center gap-2">
                    <ClipboardList size={16} className="text-blue-600" />
                    Account Snapshot
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs uppercase tracking-wide text-gray-500">Batch</p>
                      <p className="text-gray-700 mt-1">
                        {normalizeText(user.batch_name || user.batch)}
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs uppercase tracking-wide text-gray-500">Survey Done</p>
                      <p className="text-gray-700 mt-1">{user.issurveyDone ? "Yes" : "No"}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs uppercase tracking-wide text-gray-500">Big Five</p>
                      <p className="text-gray-700 mt-1">
                        {Object.keys(user.bigfive || {}).length} entries
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs uppercase tracking-wide text-gray-500">Dream Team</p>
                      <p className="text-gray-700 mt-1">
                        {Object.keys(user.dreamteam || {}).length} entries
                      </p>
                    </div>
                  </div>
                </div> */}

                {/* <DemographicsSection demographics={user.demographics} /> */}
                <SurveySummary survey={user.survey} />
                <QEQScoreSection survey={user.survey} />

                {user.note && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-gray-700">
                    <p className="font-semibold text-yellow-800 mb-1">Note</p>
                    <p>{user.note}</p>
                  </div>
                )}

                {user.connectedAt && (
                  <p className="text-xs text-gray-500 text-center">
                    Connected on {new Date(user.connectedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}

            {!error && !user && (
              <div className="text-center py-12 text-gray-600">
                <User size={32} className="mx-auto text-blue-600 mb-3" />
                User data is not available.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserByEmail;
