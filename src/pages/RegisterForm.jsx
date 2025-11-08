// RegisterForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = "http://127.0.0.1:5000/api/register";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
 const navigate = useNavigate();
  // central form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    // cohortinformation (program name, dates, venue)
    cohortinformation: {
      programName: "",
      programDates: "",
      programVenue: "",
    },
    // demographics
    demographics: {
      ageGroup: "",
      gender: "",
      genderOther: "",
      educationLevels: [], // multi
      employmentStatus: "",
      priorBusinessExperience: "", // yes/no
      currentLocation: "",
      preferredLanguages: [], // multi
      preferredLanguageOther: "",
      hobbiesInfluence: "", // yes/no
      hobbiesDetails: "",
      skills: [], // multiselect
      workingStyle: [], // multiselect
      enjoysCreativeProblemSolving: "", // yes/no
      areasConfident: [], // multiselect
      preferredLearningStyle: [], // multiselect
      comfortableTakingRisks: "", // yes/no
      traits: [], // multi up to 3 (frontend won't enforce limit but UI note)
      everStartedBusiness: "", // yes/no
      businessType: [], // multiselect with "Other text"
      businessTypeOther: "",
      entrepreneurshipLevel: "",
      attendedTraining: "", // yes/no
      followEntrepreneurContent: "", // yes/no
      hasMentor: "", // yes/no
      exposureAreas: [], // multiselect
      familiarWithDigitalTools: "", // yes/no
      whyStartBusiness: [], // multiselect with other
      whyStartBusinessOther: "",
      hasClearVision: "", // yes/no
      plannedCommitment: "",
      interestedBusinessTypes: [], // multiselect
      preferCreateOrImprove: "",
      preferredBusinessModel: [], // multiselect
    },
  });

  // option lists
  const ageGroups = [
    "Under 18",
    "18–24",
    "25–34",
    "35–44",
    "45–54",
    "55+",
  ];
  const genderOptions = ["Male", "Female", "Prefer not to say", "Other"];
  const educationLevels = [
    "Primary school",
    "Secondary school",
    "Diploma/Certificate",
    "Bachelor’s degree",
    "Master’s degree or higher",
  ];
  const employmentStatuses = [
    "Student",
    "Employed full-time",
    "Employed part-time",
    "Self-employed",
    "Unemployed",
    "Retired",
  ];
  const locationOptions = ["Urban area", "Suburban area", "Rural area"];
  const languageOptions = ["English", "Malay", "Mandarin", "Tamil", "Other"];
  const skillOptions = [
    "Marketing",
    "Design",
    "Finance",
    "Customer service",
    "Tech/IT",
    "Product development",
  ];
  const workingStyleOptions = [
    "I prefer working independently",
    "I enjoy collaborating with others",
    "I like leading and managing teams",
    "I prefer flexible and spontaneous work environments",
  ];
  const areasConfidentOptions = [
    "Marketing and branding",
    "Financial planning",
    "Product development",
    "Customer service",
    "Technology and innovation",
    "Operations and logistics",
  ];
  const learningStyleOptions = [
    "Hands-on experience",
    "Workshops or courses",
    "Reading and researching",
    "Mentorship and networking",
  ];
  const traitOptions = [
    "Creative",
    "Analytical",
    "Detail-oriented",
    "Visionary",
    "Resilient",
    "Empathetic",
  ];
  const businessTypes = [
    "Product-based",
    "Service-based",
    "Online business",
    "Brick-and-mortar store",
    "Other",
  ];
  const entrepreneurshipLevels = [
    "Beginner (no experience)",
    "Intermediate (some experience or training)",
    "Advanced (actively running or have run a business)",
  ];
  const exposureAreas = [
    "Business planning",
    "Marketing and branding",
    "Financial management",
    "Product development",
    "Customer engagement",
    "Legal and regulatory compliance",
  ];
  const whyStartOptions = [
    "To solve a problem",
    "To pursue a passion",
    "To earn extra income",
    "To be my own boss",
    "Other",
  ];
  const commitmentOptions = [
    "Less than 1 year",
    "1–3 years",
    "3–5 years",
    "Long-term (5+ years)",
  ];
  const interestedBusinessTypes = [
    "Product-based (e.g., food, fashion)",
    "Service-based (e.g., consulting, wellness)",
    "Experience-based (e.g., tourism, events)",
    "Tech/digital solutions",
  ];
  const preferCreateImprove = ["Creating something new", "Improving existing ideas"];
  const businessModelOptions = [
    "Online only",
    "Physical store",
    "Hybrid (online + offline)",
    "Pop-up or seasonal",
  ];

  // helpers
  const updateTopLevel = (key, value) =>
    setFormData((p) => ({ ...p, [key]: value }));

  const updateCohort = (key, value) =>
    setFormData((p) => ({
      ...p,
      cohortinformation: { ...p.cohortinformation, [key]: value },
    }));

  const updateDemographics = (key, value) =>
    setFormData((p) => ({
      ...p,
      demographics: { ...p.demographics, [key]: value },
    }));

  // toggle item in array field inside demographics
  const toggleArrayField = (field, value) => {
    setFormData((p) => {
      const arr = p.demographics[field] || [];
      const exists = arr.includes(value);
      const newArr = exists ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...p, demographics: { ...p.demographics, [field]: newArr } };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    // basic validation
    if (!formData.fullName || !formData.email) {
      setMessage({ type: "error", text: "Full name and email required." });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }

    setLoading(true);
    try {
      // Prepare payload similar to backend expectations
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        cohortinformation: formData.cohortinformation,
        demographics: formData.demographics,
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data?.error || "Registration failed" });
      } else {
        // store token for subsequent calls
        if (data.token) localStorage.setItem("token", data.token);
        setMessage({ type: "success", text: "Registered successfully!" });
        // optionally clear or redirect
        // ✅ Redirect to dashboard and pass state
            navigate("/dashboard", { state: { showModalAfter: true } });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto relative p-6 bg-white shadow-md rounded-lg my-8">
      <h2 className="text-2xl font-semibold mb-4">QALIB – New User Registration</h2>

      {message && (
        <div
          className={`mb-4 p-3 rounded absolute top-2 right-2 ${
            message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <section>
          <h3 className="text-lg font-medium mb-2">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="text-sm">Full Name</span>
              <input
                className="mt-1 p-2 border rounded"
                value={formData.fullName}
                onChange={(e) => updateTopLevel("fullName", e.target.value)}
                required
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm">Email Address</span>
              <input
                type="email"
                className="mt-1 p-2 border rounded"
                value={formData.email}
                onChange={(e) => updateTopLevel("email", e.target.value.toLowerCase())}
                required
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm">Password</span>
              <input
                type="password"
                className="mt-1 p-2 border rounded"
                value={formData.password}
                onChange={(e) => updateTopLevel("password", e.target.value)}
                required
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm">Confirm Password</span>
              <input
                type="password"
                className="mt-1 p-2 border rounded"
                value={formData.confirmPassword}
                onChange={(e) => updateTopLevel("confirmPassword", e.target.value)}
                required
              />
            </label>
          </div>
        </section>

        {/* Cohort Information */}
        <section>
          <h3 className="text-lg font-medium mb-2">Cohort Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex flex-col">
              <span className="text-sm">Program Name</span>
              <input
                className="mt-1 p-2 border rounded"
                value={formData.cohortinformation.programName}
                onChange={(e) => updateCohort("programName", e.target.value)}
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm">Program Dates</span>
              <input
                className="mt-1 p-2 border rounded"
                placeholder="e.g., 2025-01-10 to 2025-02-10"
                value={formData.cohortinformation.programDates}
                onChange={(e) => updateCohort("programDates", e.target.value)}
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm">Program Venue</span>
              <input
                className="mt-1 p-2 border rounded"
                value={formData.cohortinformation.programVenue}
                onChange={(e) => updateCohort("programVenue", e.target.value)}
              />
            </label>
          </div>
        </section>

        {/* Demographics */}
        <section>
          <h3 className="text-lg font-medium mb-2">Demographic Details</h3>

          {/* Age Group */}
          <div className="mb-4">
            <div className="text-sm font-medium mb-2">1. Age Group</div>
            <div className="flex flex-wrap gap-2">
              {ageGroups.map((g) => (
                <label key={g} className="inline-flex items-center space-x-2">
                  <input
                    type="radio"
                    name="ageGroup"
                    checked={formData.demographics.ageGroup === g}
                    onChange={() => updateDemographics("ageGroup", g)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{g}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div className="mb-4">
            <div className="text-sm font-medium mb-2">2. Gender</div>
            <div className="flex flex-wrap gap-2 items-center">
              {genderOptions.map((g) => (
                <label key={g} className="inline-flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    checked={formData.demographics.gender === g}
                    onChange={() => updateDemographics("gender", g)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{g}</span>
                </label>
              ))}
              {formData.demographics.gender === "Other" && (
                <input
                  className="ml-3 p-2 border rounded"
                  placeholder="Please specify"
                  value={formData.demographics.genderOther}
                  onChange={(e) => updateDemographics("genderOther", e.target.value)}
                />
              )}
            </div>
          </div>

          {/* Education */}
          <div className="mb-4">
            <div className="text-sm font-medium mb-2">3. Highest Level of Education</div>
            <div className="flex flex-wrap gap-2">
              {educationLevels.map((ed) => (
                <label key={ed} className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={(formData.demographics.educationLevels || []).includes(ed)}
                    onChange={() => toggleArrayField("educationLevels", ed)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{ed}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Employment Status */}
          <div className="mb-4">
            <div className="text-sm font-medium mb-2">4. Current Employment Status</div>
            <div className="flex flex-wrap gap-2">
              {employmentStatuses.map((s) => (
                <label key={s} className="inline-flex items-center space-x-2">
                  <input
                    type="radio"
                    name="employmentStatus"
                    checked={formData.demographics.employmentStatus === s}
                    onChange={() => updateDemographics("employmentStatus", s)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{s}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Prior business experience */}
          <div className="mb-4">
            <div className="text-sm font-medium mb-2">
              5. Do you have prior experience running a business?
            </div>
            <div className="flex gap-4">
              <label className="inline-flex items-center space-x-2">
                <input
                  type="radio"
                  name="priorBusinessExperience"
                  checked={formData.demographics.priorBusinessExperience === "Yes"}
                  onChange={() => updateDemographics("priorBusinessExperience", "Yes")}
                />
                <span>Yes</span>
              </label>
              <label className="inline-flex items-center space-x-2">
                <input
                  type="radio"
                  name="priorBusinessExperience"
                  checked={formData.demographics.priorBusinessExperience === "No"}
                  onChange={() => updateDemographics("priorBusinessExperience", "No")}
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Location */}
          <div className="mb-4">
            <div className="text-sm font-medium mb-2">6. Current Location</div>
            <div className="flex gap-4">
              {locationOptions.map((loc) => (
                <label key={loc} className="inline-flex items-center space-x-2">
                  <input
                    type="radio"
                    name="currentLocation"
                    checked={formData.demographics.currentLocation === loc}
                    onChange={() => updateDemographics("currentLocation", loc)}
                  />
                  <span className="text-sm">{loc}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Preferred Language */}
          <div className="mb-4">
            <div className="text-sm font-medium mb-2">
              7. Preferred Language for Business Communication
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {languageOptions.map((lang) => (
                <label key={lang} className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={(formData.demographics.preferredLanguages || []).includes(lang)}
                    onChange={() => toggleArrayField("preferredLanguages", lang)}
                  />
                  <span className="text-sm">{lang}</span>
                </label>
              ))}
              {formData.demographics.preferredLanguages?.includes("Other") && (
                <input
                  className="ml-3 p-2 border rounded"
                  placeholder="Other language"
                  value={formData.demographics.preferredLanguageOther}
                  onChange={(e) => updateDemographics("preferredLanguageOther", e.target.value)}
                />
              )}
            </div>
          </div>

          {/* Personal Interests & Strengths */}
          <div className="mb-4">
            <div className="text-sm font-medium mb-2">Personal Interests & Strengths</div>

            <div className="mb-2">
              <div className="text-sm">8. Do you have hobbies or interests that could influence your business idea?</div>
              <div className="flex gap-4 mt-2">
                <label className="inline-flex items-center space-x-2">
                  <input
                    type="radio"
                    name="hobbiesInfluence"
                    checked={formData.demographics.hobbiesInfluence === "Yes"}
                    onChange={() => updateDemographics("hobbiesInfluence", "Yes")}
                  />
                  <span>Yes</span>
                </label>
                <label className="inline-flex items-center space-x-2">
                  <input
                    type="radio"
                    name="hobbiesInfluence"
                    checked={formData.demographics.hobbiesInfluence === "No"}
                    onChange={() => updateDemographics("hobbiesInfluence", "No")}
                  />
                  <span>No</span>
                </label>
              </div>

              {formData.demographics.hobbiesInfluence === "Yes" && (
                <input
                  className="mt-2 p-2 border rounded w-full"
                  placeholder="If yes, please specify"
                  value={formData.demographics.hobbiesDetails}
                  onChange={(e) => updateDemographics("hobbiesDetails", e.target.value)}
                />
              )}
            </div>

            {/* Skills */}
            <div className="mt-3">
              <div className="text-sm mb-1">9. Skills You Possess (Select all that apply)</div>
              <div className="flex flex-wrap gap-2">
                {skillOptions.map((s) => (
                  <label key={s} className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={(formData.demographics.skills || []).includes(s)}
                      onChange={() => toggleArrayField("skills", s)}
                    />
                    <span className="text-sm">{s}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Working style */}
            <div className="mt-3">
              <div className="text-sm mb-1">10. Working Style</div>
              <div className="flex flex-wrap gap-2">
                {workingStyleOptions.map((w) => (
                  <label key={w} className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={(formData.demographics.workingStyle || []).includes(w)}
                      onChange={() => toggleArrayField("workingStyle", w)}
                    />
                    <span className="text-sm">{w}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Creative problem solving */}
            <div className="mt-3">
              <div className="text-sm mb-1">11. Do you enjoy solving problems creatively?</div>
              <div className="flex gap-4">
                <label className="inline-flex items-center space-x-2">
                  <input
                    type="radio"
                    name="enjoySolving"
                    checked={formData.demographics.enjoysCreativeProblemSolving === "Yes"}
                    onChange={() => updateDemographics("enjoysCreativeProblemSolving", "Yes")}
                  />
                  <span>Yes</span>
                </label>
                <label className="inline-flex items-center space-x-2">
                  <input
                    type="radio"
                    name="enjoySolving"
                    checked={formData.demographics.enjoysCreativeProblemSolving === "No"}
                    onChange={() => updateDemographics("enjoysCreativeProblemSolving", "No")}
                  />
                  <span>No</span>
                </label>
              </div>
            </div>

            {/* Areas confident */}
            <div className="mt-3">
              <div className="text-sm mb-1">12. Areas You Feel Most Confident In</div>
              <div className="flex flex-wrap gap-2">
                {areasConfidentOptions.map((a) => (
                  <label key={a} className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={(formData.demographics.areasConfident || []).includes(a)}
                      onChange={() => toggleArrayField("areasConfident", a)}
                    />
                    <span className="text-sm">{a}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Preferred learning style */}
            <div className="mt-3">
              <div className="text-sm mb-1">13. Preferred Learning Style</div>
              <div className="flex flex-wrap gap-2">
                {learningStyleOptions.map((l) => (
                  <label key={l} className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={(formData.demographics.preferredLearningStyle || []).includes(l)}
                      onChange={() => toggleArrayField("preferredLearningStyle", l)}
                    />
                    <span className="text-sm">{l}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Comfortable taking risks */}
            <div className="mt-3">
              <div className="text-sm mb-1">14. Are you comfortable taking calculated risks in business?</div>
              <div className="flex gap-4">
                <label className="inline-flex items-center space-x-2">
                  <input
                    type="radio"
                    name="takingRisks"
                    checked={formData.demographics.comfortableTakingRisks === "Yes"}
                    onChange={() => updateDemographics("comfortableTakingRisks", "Yes")}
                  />
                  <span>Yes</span>
                </label>
                <label className="inline-flex items-center space-x-2">
                  <input
                    type="radio"
                    name="takingRisks"
                    checked={formData.demographics.comfortableTakingRisks === "No"}
                    onChange={() => updateDemographics("comfortableTakingRisks", "No")}
                  />
                  <span>No</span>
                </label>
              </div>
            </div>

            {/* Traits (select up to 3) */}
            <div className="mt-3">
              <div className="text-sm mb-1">15. Traits That Best Describe You (Select up to 3)</div>
              <div className="flex flex-wrap gap-2">
                {traitOptions.map((t) => (
                  <label key={t} className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={(formData.demographics.traits || []).includes(t)}
                      onChange={() => toggleArrayField("traits", t)}
                    />
                    <span className="text-sm">{t}</span>
                  </label>
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-1">Note: Please choose up to three traits.</div>
            </div>

            {/* Entrepreneurship Experience 16-23 */}
            <div className="mt-4">
              <div className="text-sm font-medium mb-2">Entrepreneurship Experience</div>

              <div className="mb-2">
                <div className="text-sm">16. Have you ever started or managed a business before?</div>
                <div className="flex gap-4 mt-2">
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      name="everStartedBusiness"
                      checked={formData.demographics.everStartedBusiness === "Yes"}
                      onChange={() => updateDemographics("everStartedBusiness", "Yes")}
                    />
                    <span>Yes</span>
                  </label>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      name="everStartedBusiness"
                      checked={formData.demographics.everStartedBusiness === "No"}
                      onChange={() => updateDemographics("everStartedBusiness", "No")}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div className="mb-2">
                <div className="text-sm">17. If yes, what type of business was it?</div>
                <div className="flex flex-wrap gap-2">
                  {businessTypes.map((b) => (
                    <label key={b} className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={(formData.demographics.businessType || []).includes(b)}
                        onChange={() => toggleArrayField("businessType", b)}
                      />
                      <span className="text-sm">{b}</span>
                    </label>
                  ))}
                  {formData.demographics.businessType?.includes("Other") && (
                    <input
                      className="ml-3 p-2 border rounded"
                      placeholder="Other business type"
                      value={formData.demographics.businessTypeOther}
                      onChange={(e) => updateDemographics("businessTypeOther", e.target.value)}
                    />
                  )}
                </div>
              </div>

              <div className="mb-2">
                <div className="text-sm">18. Entrepreneurship Experience Level</div>
                <div className="flex flex-wrap gap-2">
                  {entrepreneurshipLevels.map((l) => (
                    <label key={l} className="inline-flex items-center space-x-2">
                      <input
                        type="radio"
                        name="entrepreneurshipLevel"
                        checked={formData.demographics.entrepreneurshipLevel === l}
                        onChange={() => updateDemographics("entrepreneurshipLevel", l)}
                      />
                      <span className="text-sm">{l}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-2">
                <div className="text-sm">19. Have you attended any entrepreneurship-related training, workshops, or courses?</div>
                <div className="flex gap-4 mt-2">
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      name="attendedTraining"
                      checked={formData.demographics.attendedTraining === "Yes"}
                      onChange={() => updateDemographics("attendedTraining", "Yes")}
                    />
                    <span>Yes</span>
                  </label>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      name="attendedTraining"
                      checked={formData.demographics.attendedTraining === "No"}
                      onChange={() => updateDemographics("attendedTraining", "No")}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div className="mb-2">
                <div className="text-sm">20. Do you follow entrepreneurship content (e.g., podcasts, books, social media)?</div>
                <div className="flex gap-4 mt-2">
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      name="followContent"
                      checked={formData.demographics.followEntrepreneurContent === "Yes"}
                      onChange={() => updateDemographics("followEntrepreneurContent", "Yes")}
                    />
                    <span>Yes</span>
                  </label>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      name="followContent"
                      checked={formData.demographics.followEntrepreneurContent === "No"}
                      onChange={() => updateDemographics("followEntrepreneurContent", "No")}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div className="mb-2">
                <div className="text-sm">21. Do you have a mentor or advisor in business?</div>
                <div className="flex gap-4 mt-2">
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      name="hasMentor"
                      checked={formData.demographics.hasMentor === "Yes"}
                      onChange={() => updateDemographics("hasMentor", "Yes")}
                    />
                    <span>Yes</span>
                  </label>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      name="hasMentor"
                      checked={formData.demographics.hasMentor === "No"}
                      onChange={() => updateDemographics("hasMentor", "No")}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div className="mb-2">
                <div className="text-sm">22. Areas You've Been Exposed To</div>
                <div className="flex flex-wrap gap-2">
                  {exposureAreas.map((ea) => (
                    <label key={ea} className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={(formData.demographics.exposureAreas || []).includes(ea)}
                        onChange={() => toggleArrayField("exposureAreas", ea)}
                      />
                      <span className="text-sm">{ea}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-2">
                <div className="text-sm">23. Are you familiar with digital tools for business?</div>
                <div className="flex gap-4 mt-2">
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      name="familiarWithDigital"
                      checked={formData.demographics.familiarWithDigitalTools === "Yes"}
                      onChange={() => updateDemographics("familiarWithDigitalTools", "Yes")}
                    />
                    <span>Yes</span>
                  </label>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      name="familiarWithDigital"
                      checked={formData.demographics.familiarWithDigitalTools === "No"}
                      onChange={() => updateDemographics("familiarWithDigitalTools", "No")}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Vision & Motivation */}
            <div className="mt-4">
              <div className="text-sm font-medium mb-2">Vision & Motivation</div>

              <div className="mb-2">
                <div className="text-sm">24. Why do you want to start a business? (select all that apply)</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {whyStartOptions.map((w) => (
                    <label key={w} className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={(formData.demographics.whyStartBusiness || []).includes(w)}
                        onChange={() => toggleArrayField("whyStartBusiness", w)}
                      />
                      <span className="text-sm">{w}</span>
                    </label>
                  ))}
                  {formData.demographics.whyStartBusiness?.includes("Other") && (
                    <input
                      className="ml-3 p-2 border rounded"
                      placeholder="Other reason"
                      value={formData.demographics.whyStartBusinessOther}
                      onChange={(e) => updateDemographics("whyStartBusinessOther", e.target.value)}
                    />
                  )}
                </div>
              </div>

              <div className="mb-2">
                <div className="text-sm">25. Do you have a clear vision for your business?</div>
                <div className="flex gap-4 mt-2">
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      name="clearVision"
                      checked={formData.demographics.hasClearVision === "Yes"}
                      onChange={() => updateDemographics("hasClearVision", "Yes")}
                    />
                    <span>Yes</span>
                  </label>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      name="clearVision"
                      checked={formData.demographics.hasClearVision === "No"}
                      onChange={() => updateDemographics("hasClearVision", "No")}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div className="mb-2">
                <div className="text-sm">26. How long do you plan to commit to this business?</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {commitmentOptions.map((c) => (
                    <label key={c} className="inline-flex items-center space-x-2">
                      <input
                        type="radio"
                        name="plannedCommitment"
                        checked={formData.demographics.plannedCommitment === c}
                        onChange={() => updateDemographics("plannedCommitment", c)}
                      />
                      <span className="text-sm">{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-2">
                <div className="text-sm">27. Type of Business You’re Interested In</div>
                <div className="flex flex-wrap gap-2">
                  {interestedBusinessTypes.map((b) => (
                    <label key={b} className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={(formData.demographics.interestedBusinessTypes || []).includes(b)}
                        onChange={() => toggleArrayField("interestedBusinessTypes", b)}
                      />
                      <span className="text-sm">{b}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-2">
                <div className="text-sm">28. Do you prefer: Creating something new or Improving existing ideas?</div>
                <div className="flex gap-4 mt-2">
                  {preferCreateImprove.map((p) => (
                    <label key={p} className="inline-flex items-center space-x-2">
                      <input
                        type="radio"
                        name="preferCreateOrImprove"
                        checked={formData.demographics.preferCreateOrImprove === p}
                        onChange={() => updateDemographics("preferCreateOrImprove", p)}
                      />
                      <span className="text-sm">{p}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-2">
                <div className="text-sm">29. Preferred Business Model</div>
                <div className="flex flex-wrap gap-2">
                  {businessModelOptions.map((bm) => (
                    <label key={bm} className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={(formData.demographics.preferredBusinessModel || []).includes(bm)}
                        onChange={() => toggleArrayField("preferredBusinessModel", bm)}
                      />
                      <span className="text-sm">{bm}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Register"}
          </button>

          <div className="text-sm text-gray-500">You can complete other parts after login.</div>
        </div>
      </form>
    </div>
  );
}
