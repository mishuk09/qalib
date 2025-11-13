// RegisterForm.jsx
import React, { useState, useEffect, useRef } from "react"; // 💡 Import useEffect and useRef
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:5000/api/register";

// Component for a professional-looking Input Field
const ProfessionalInput = ({ label, type = "text", value, onChange, placeholder, required = true }) => (
  <label className="flex flex-col text-gray-700">
    <span className="text-sm font-medium mb-1">{label} {required && <span className="text-red-500">*</span>}</span>
    <input
      type={type}
      className="mt-1 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out shadow-sm w-full"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  </label>
);

// Component for professional Radio/Checkbox Groups (Pill Style)
const OptionPill = ({ label, value, isChecked, isRadio, onChange, name }) => (
  <label
    className={`
      px-4 py-2 text-sm font-medium rounded-full cursor-pointer transition duration-150 ease-in-out whitespace-nowrap
      ${isChecked
        ? "bg-blue-600 text-white shadow-md border border-blue-600"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
      }
    `}
  >
    <input
      type={isRadio ? "radio" : "checkbox"}
      name={name}
      value={value}
      checked={isChecked}
      onChange={onChange}
      className="hidden"
      // Added required for single-select radio groups. For multi-select (checkboxes), 
      // this is complex/unreliable in HTML5, relying on visual cue and backend validation.
      required={isRadio ? "required" : undefined} 
    />
    {label}
  </label>
);

// Helper component for question blocks (improves spacing and visual grouping)
const QuestionBlock = ({ questionNumber, title, children, isMulti = false, note = null }) => (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="text-base font-semibold mb-3">
        {questionNumber}. {title}
        <span className="text-red-500 ml-1">*</span>
      </div>
      {children}
      {isMulti && <p className="text-xs text-gray-500 mt-2">Select all that apply.</p>}
      {note && <p className="text-xs text-gray-500 mt-2">{note}</p>}
    </div>
);


export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  
  // 💡 useRef to hold the timer ID
  const timerRef = useRef(null); 

  // 💡 useEffect cleanup function for the message timer
  useEffect(() => {
    // This will run when the component unmounts
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []); // Empty dependency array means this runs only on mount and unmount

  // 💡 Helper function to safely set and clear the message timeout
  const setTimedMessage = (type, text, duration = 3000) => {
    // Clear any existing timer before setting a new one
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setMessage({ type, text });

    // Set new timer and store its ID in the ref
    timerRef.current = setTimeout(() => {
      setMessage(null);
      timerRef.current = null; // Clear the ref after timeout fires
    }, duration);
  };
  
  // central form state (UNCHANGED LOGIC)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    // cohortinformation (program name, dates, venue) - NOTE: Making these required in UI only, if empty string is acceptable logic needs update.
    cohortinformation: {
      programName: "",
      programDates: "",
      programVenue: "",
    },
    // demographics (All fields required for UI)
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

  // option lists (UNCHANGED LOGIC)
  const ageGroups = [
    "Under 18", "18–24", "25–34", "35–44", "45–54", "55+",
  ];
  const genderOptions = ["Male", "Female", "Prefer not to say", "Other"];
  const educationLevels = [
    "Primary school", "Secondary school", "Diploma/Certificate", "Bachelor’s degree", "Master’s degree or higher",
  ];
  const employmentStatuses = [
    "Student", "Employed full-time", "Employed part-time", "Self-employed", "Unemployed", "Retired",
  ];
  const locationOptions = ["Urban area", "Suburban area", "Rural area"];
  const languageOptions = ["English", "Malay", "Mandarin", "Tamil", "Other"];
  const skillOptions = [
    "Marketing", "Design", "Finance", "Customer service", "Tech/IT", "Product development",
  ];
  const workingStyleOptions = [
    "I prefer working independently", "I enjoy collaborating with others", "I like leading and managing teams", "I prefer flexible and spontaneous work environments",
  ];
  const areasConfidentOptions = [
    "Marketing and branding", "Financial planning", "Product development", "Customer service", "Technology and innovation", "Operations and logistics",
  ];
  const learningStyleOptions = [
    "Hands-on experience", "Workshops or courses", "Reading and researching", "Mentorship and networking",
  ];
  const traitOptions = [
    "Creative", "Analytical", "Detail-oriented", "Visionary", "Resilient", "Empathetic",
  ];
  const businessTypes = [
    "Product-based", "Service-based", "Online business", "Brick-and-mortar store", "Other",
  ];
  const entrepreneurshipLevels = [
    "Beginner (no experience)", "Intermediate (some experience or training)", "Advanced (actively running or have run a business)",
  ];
  const exposureAreas = [
    "Business planning", "Marketing and branding", "Financial management", "Product development", "Customer engagement", "Legal and regulatory compliance",
  ];
  const whyStartOptions = [
    "To solve a problem", "To pursue a passion", "To earn extra income", "To be my own boss", "Other",
  ];
  const commitmentOptions = [
    "Less than 1 year", "1–3 years", "3–5 years", "Long-term (5+ years)",
  ];
  const interestedBusinessTypes = [
    "Product-based (e.g., food, fashion)", "Service-based (e.g., consulting, wellness)", "Experience-based (e.g., tourism, events)", "Tech/digital solutions",
  ];
  const preferCreateImprove = ["Creating something new", "Improving existing ideas"];
  const businessModelOptions = [
    "Online only", "Physical store", "Hybrid (online + offline)", "Pop-up or seasonal",
  ];

  // helpers (UNCHANGED LOGIC)
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

  // toggle item in array field inside demographics (UNCHANGED LOGIC)
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
    setMessage(null); // Clear any message on submit

    // basic validation (UNCHANGED LOGIC - but calling setTimedMessage)
    if (!formData.fullName || !formData.email) {
      setTimedMessage("error", "Full name and email required.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setTimedMessage("error", "Passwords do not match.");
      return;
    } 

    // --- ENHANCED CLIENT-SIDE VALIDATION FOR REQUIRED FIELDS ---
    const requiredDemographicsFields = [
        'ageGroup', 'gender', 'employmentStatus', 'priorBusinessExperience', 'currentLocation', 'hobbiesInfluence',
        'enjoysCreativeProblemSolving', 'comfortableTakingRisks', 'everStartedBusiness', 'entrepreneurshipLevel',
        'attendedTraining', 'followEntrepreneurContent', 'hasMentor', 'familiarWithDigitalTools',
        'hasClearVision', 'plannedCommitment', 'preferCreateOrImprove'
    ];

    const requiredArrayFields = [
        'educationLevels', 'preferredLanguages', 'skills', 'workingStyle', 'areasConfident',
        'preferredLearningStyle', 'traits', 'businessType', 'exposureAreas', 'whyStartBusiness',
        'interestedBusinessTypes', 'preferredBusinessModel'
    ];

    let missingField = null;

    for (const field of requiredDemographicsFields) {
        if (!formData.demographics[field]) {
            missingField = field;
            break;
        }
    }

    if (!missingField) {
        for (const field of requiredArrayFields) {
            if (formData.demographics[field].length === 0) {
                missingField = field;
                break;
            }
        }
    }
    
    if (missingField) {
      setTimedMessage("error", `Please fill out all required fields. Missing: ${missingField}`);
      setLoading(false);
      return;
    }
    // -----------------------------------------------------------


    setLoading(true);
    try {
      // Prepare payload similar to backend expectations (UNCHANGED LOGIC)
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
        setTimedMessage("error", data?.error || "Registration failed");
      } else {
        // store token for subsequent calls (UNCHANGED LOGIC)
        if (data.token) localStorage.setItem("token", data.token);
        setTimedMessage("success", "Registered successfully!");
        
        // Redirect (UNCHANGED LOGIC)
        // 💡 Note: setTimedMessage fires a timeout, so the message might flash briefly before navigation. 
        // If you want the message to stay until navigation, you could set a longer timeout 
        // or delay navigation slightly, but immediate navigation is common practice.
        navigate("/dashboard", { state: { showModalAfter: true } });
      }
    } catch (err) {
      setTimedMessage("error", "Network error");
    } finally {
      setLoading(false);
    }
  };

  // Improved UI/UX structure and styling (NO CHANGES)
  return (
    <div className="min-h-screen relative bg-gray-50 flex items-center justify-center p-2 ">
      <div className="max-w-5xl w-full relative bg-white shadow-2xl rounded-xl p-6 sm:p-10 my-8 border border-gray-100">

        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2">
          🚀 QALIB User Registration
        </h2>
        <p className="text-center text-gray-500 mb-8">
          All fields are **required** to complete your profile.
        </p>

        {/* Message Alert */}
        {message && (
          <div
            className={`fixed top-20 right-2 mb-4 p-3 rounded-lg text-sm font-medium border ${
              message.type === "error"
                ? "bg-red-50 border-red-200 text-red-700"
                : "bg-green-50 border-green-200 text-green-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* === Personal Information Section (Retained two-column layout) === */}
          <section className="border-b border-gray-200 pb-6">
            <h3 className="text-xl font-bold mb-3 text-gray-800">1. Account Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfessionalInput
                label="Full Name"
                value={formData.fullName}
                onChange={(e) => updateTopLevel("fullName", e.target.value)}
              />
              <ProfessionalInput
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => updateTopLevel("email", e.target.value.toLowerCase())}
              />
              <ProfessionalInput
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => updateTopLevel("password", e.target.value)}
              />
              <ProfessionalInput
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => updateTopLevel("confirmPassword", e.target.value)}
              />
            </div>
          </section>

          {/* === Cohort Information Section (Retained three-column layout) === */}
          <section className="border-b border-gray-200 pb-6">
            <h3 className="text-xl font-bold mb-3 text-gray-800">2. Cohort Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ProfessionalInput
                label="Program Name"
                value={formData.cohortinformation.programName}
                onChange={(e) => updateCohort("programName", e.target.value)}
                placeholder="e.g., Entrepreneur Bootcamp"
              />
              <ProfessionalInput
                label="Program Dates"
                placeholder="e.g., 2025-01-10 to 2025-02-10"
                value={formData.cohortinformation.programDates}
                onChange={(e) => updateCohort("programDates", e.target.value)}
              />
              <ProfessionalInput
                label="Program Venue"
                value={formData.cohortinformation.programVenue}
                onChange={(e) => updateCohort("programVenue", e.target.value)}
                placeholder="e.g., Virtual / City Hall"
              />
            </div>
          </section>

          {/* === Demographics & Profile Section (MAIN CHANGE: Single Column) === */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">3. Profile & Demographic Questions</h3>
            
            {/* The single column container for all questions */}
            <div className="space-y-4 max-w-4xl mx-auto"> 

              {/* Question 1-7: Demographic & Background */}
              <h4 className="text-xl font-semibold text-blue-600 border-b pb-2">Demographic & Background</h4>

              {/* Q1: Age Group */}
              <QuestionBlock questionNumber={1} title="Age Group">
                <div className="flex flex-wrap gap-2">
                  {ageGroups.map((g) => (
                    <OptionPill key={g} label={g} value={g} isRadio={true} isChecked={formData.demographics.ageGroup === g} onChange={() => updateDemographics("ageGroup", g)} name="ageGroup" />
                  ))}
                </div>
              </QuestionBlock>
              
              {/* Q2: Gender */}
              <QuestionBlock questionNumber={2} title="Gender">
                <div className="flex flex-wrap gap-2 items-center">
                  {genderOptions.map((g) => (
                    <OptionPill key={g} label={g} value={g} isRadio={true} isChecked={formData.demographics.gender === g} onChange={() => { updateDemographics("gender", g); if (g !== "Other") updateDemographics("genderOther", ""); }} name="gender" />
                  ))}
                  {formData.demographics.gender === "Other" && (
                    <input className="p-2 border border-gray-300 rounded-lg shadow-sm" placeholder="Please specify" value={formData.demographics.genderOther} onChange={(e) => updateDemographics("genderOther", e.target.value)} required />
                  )}
                </div>
              </QuestionBlock>

              {/* Q3: Education */}
              <QuestionBlock questionNumber={3} title="Highest Level of Education" isMulti={true}>
                <div className="flex flex-wrap gap-2">
                  {educationLevels.map((ed) => (
                    <OptionPill key={ed} label={ed} value={ed} isRadio={false} isChecked={(formData.demographics.educationLevels || []).includes(ed)} onChange={() => toggleArrayField("educationLevels", ed)} name="educationLevels" />
                  ))}
                </div>
              </QuestionBlock>

              {/* Q4: Employment Status (Now full width) */}
              <QuestionBlock questionNumber={4} title="Current Employment Status">
                  <div className="flex flex-wrap gap-2">
                      {employmentStatuses.map((s) => (
                          <OptionPill key={s} label={s} value={s} isRadio={true} isChecked={formData.demographics.employmentStatus === s} onChange={() => updateDemographics("employmentStatus", s)} name="employmentStatus" />
                      ))}
                  </div>
              </QuestionBlock>

              {/* Q6: Current Location (Now full width) */}
              <QuestionBlock questionNumber={6} title="Current Location">
                  <div className="flex flex-wrap gap-2">
                      {locationOptions.map((loc) => (
                          <OptionPill key={loc} label={loc} value={loc} isRadio={true} isChecked={formData.demographics.currentLocation === loc} onChange={() => updateDemographics("currentLocation", loc)} name="currentLocation" />
                      ))}
                  </div>
              </QuestionBlock>

              {/* Q5: Prior business experience */}
              <QuestionBlock questionNumber={5} title="Prior business experience">
                  <div className="flex gap-2">
                      {["Yes", "No"].map((choice) => (
                          <OptionPill key={choice} label={choice} value={choice} isRadio={true} isChecked={formData.demographics.priorBusinessExperience === choice} onChange={() => updateDemographics("priorBusinessExperience", choice)} name="priorBusinessExperience" />
                      ))}
                  </div>
              </QuestionBlock>


              {/* Q7: Preferred Language */}
              <QuestionBlock questionNumber={7} title="Preferred Language for Business" isMulti={true}>
                <div className="flex flex-wrap gap-2 items-center">
                  {languageOptions.map((lang) => (
                    <OptionPill key={lang} label={lang} value={lang} isRadio={false} isChecked={(formData.demographics.preferredLanguages || []).includes(lang)} onChange={() => toggleArrayField("preferredLanguages", lang)} name="preferredLanguages" />
                  ))}
                  {formData.demographics.preferredLanguages?.includes("Other") && (
                    <input className="p-2 border border-gray-300 rounded-lg shadow-sm" placeholder="Other language" value={formData.demographics.preferredLanguageOther} onChange={(e) => updateDemographics("preferredLanguageOther", e.target.value)} required />
                  )}
                </div>
              </QuestionBlock>

              {/* Question 8-15: Personal Interests & Strengths */}
              <h4 className="text-xl font-semibold text-blue-600 border-b pb-2 pt-4">Personal Interests & Strengths</h4>

              {/* Q8: Hobbies Influence */}
              <QuestionBlock questionNumber={8} title="Hobbies that could influence business idea">
                <div className="flex gap-2 items-center">
                  {["Yes", "No"].map((choice) => (
                      <OptionPill key={choice} label={choice} value={choice} isRadio={true} isChecked={formData.demographics.hobbiesInfluence === choice} onChange={() => { updateDemographics("hobbiesInfluence", choice); if (choice === "No") updateDemographics("hobbiesDetails", ""); }} name="hobbiesInfluence" />
                  ))}
                  {formData.demographics.hobbiesInfluence === "Yes" && (
                      <input className="p-3 border border-gray-300 rounded-lg shadow-sm flex-grow ml-4" placeholder="If yes, please specify" value={formData.demographics.hobbiesDetails} onChange={(e) => updateDemographics("hobbiesDetails", e.target.value)} required />
                  )}
                </div>
              </QuestionBlock>

              {/* Q9: Skills */}
              <QuestionBlock questionNumber={9} title="Skills You Possess" isMulti={true}>
                <div className="flex flex-wrap gap-2">
                  {skillOptions.map((s) => (
                    <OptionPill key={s} label={s} value={s} isRadio={false} isChecked={(formData.demographics.skills || []).includes(s)} onChange={() => toggleArrayField("skills", s)} name="skills" />
                  ))}
                </div>
              </QuestionBlock>

              {/* Q10: Working Style */}
              <QuestionBlock questionNumber={10} title="Working Style" isMulti={true}>
                  <div className="flex flex-wrap gap-2">
                      {workingStyleOptions.map((w) => (
                          <OptionPill key={w} label={w} value={w} isRadio={false} isChecked={(formData.demographics.workingStyle || []).includes(w)} onChange={() => toggleArrayField("workingStyle", w)} name="workingStyle" />
                      ))}
                  </div>
              </QuestionBlock>

              {/* Q11: Creative problem solving */}
              <QuestionBlock questionNumber={11} title="Enjoy solving problems creatively?">
                  <div className="flex gap-2">
                      {["Yes", "No"].map((choice) => (
                          <OptionPill key={choice} label={choice} value={choice} isRadio={true} isChecked={formData.demographics.enjoysCreativeProblemSolving === choice} onChange={() => updateDemographics("enjoysCreativeProblemSolving", choice)} name="enjoySolving" />
                      ))}
                  </div>
              </QuestionBlock>

              {/* Q12: Areas confident */}
              <QuestionBlock questionNumber={12} title="Areas You Feel Most Confident In" isMulti={true}>
                <div className="flex flex-wrap gap-2">
                  {areasConfidentOptions.map((a) => (
                    <OptionPill key={a} label={a} value={a} isRadio={false} isChecked={(formData.demographics.areasConfident || []).includes(a)} onChange={() => toggleArrayField("areasConfident", a)} name="areasConfident" />
                  ))}
                </div>
              </QuestionBlock>

              {/* Q13: Preferred learning style */}
              <QuestionBlock questionNumber={13} title="Preferred Learning Style" isMulti={true}>
                  <div className="flex flex-wrap gap-2">
                      {learningStyleOptions.map((l) => (
                          <OptionPill key={l} label={l} value={l} isRadio={false} isChecked={(formData.demographics.preferredLearningStyle || []).includes(l)} onChange={() => toggleArrayField("preferredLearningStyle", l)} name="preferredLearningStyle" />
                      ))}
                  </div>
              </QuestionBlock>

              {/* Q14: Comfortable taking risks */}
              <QuestionBlock questionNumber={14} title="Comfortable taking calculated risks?">
                  <div className="flex gap-2">
                      {["Yes", "No"].map((choice) => (
                          <OptionPill key={choice} label={choice} value={choice} isRadio={true} isChecked={formData.demographics.comfortableTakingRisks === choice} onChange={() => updateDemographics("comfortableTakingRisks", choice)} name="takingRisks" />
                      ))}
                  </div>
              </QuestionBlock>

              {/* Q15: Traits */}
              <QuestionBlock questionNumber={15} title="Traits That Best Describe You" isMulti={true} note="Please choose up to three traits.">
                <div className="flex flex-wrap gap-2">
                  {traitOptions.map((t) => (
                    <OptionPill key={t} label={t} value={t} isRadio={false} isChecked={(formData.demographics.traits || []).includes(t)} onChange={() => toggleArrayField("traits", t)} name="traits" />
                  ))}
                </div>
              </QuestionBlock>


              {/* Question 16-23: Entrepreneurship Experience */}
              <h4 className="text-xl font-semibold text-blue-600 border-b pb-2 pt-4">Entrepreneurship Experience</h4>

              {/* Q16: Ever Started Business */}
              <QuestionBlock questionNumber={16} title="Ever started or managed a business before?">
                  <div className="flex gap-2">
                      {["Yes", "No"].map((choice) => (
                          <OptionPill key={choice} label={choice} value={choice} isRadio={true} isChecked={formData.demographics.everStartedBusiness === choice} onChange={() => updateDemographics("everStartedBusiness", choice)} name="everStartedBusiness" />
                      ))}
                  </div>
              </QuestionBlock>

              {/* Q17: Business Type */}
              <QuestionBlock questionNumber={17} title="If yes, what type of business was it?" isMulti={true}>
                <div className="flex flex-wrap gap-2 items-center">
                  {businessTypes.map((b) => (
                    <OptionPill key={b} label={b} value={b} isRadio={false} isChecked={(formData.demographics.businessType || []).includes(b)} onChange={() => toggleArrayField("businessType", b)} name="businessType" />
                  ))}
                  {formData.demographics.businessType?.includes("Other") && (
                    <input className="p-2 border border-gray-300 rounded-lg shadow-sm" placeholder="Other business type" value={formData.demographics.businessTypeOther} onChange={(e) => updateDemographics("businessTypeOther", e.target.value)} required />
                  )}
                </div>
              </QuestionBlock>

              {/* Q18: Entrepreneurship Level */}
              <QuestionBlock questionNumber={18} title="Entrepreneurship Experience Level">
                <div className="flex flex-wrap gap-2">
                  {entrepreneurshipLevels.map((l) => (
                    <OptionPill key={l} label={l} value={l} isRadio={true} isChecked={formData.demographics.entrepreneurshipLevel === l} onChange={() => updateDemographics("entrepreneurshipLevel", l)} name="entrepreneurshipLevel" />
                  ))}
                </div>
              </QuestionBlock>

              {/* Q19: Attended Training */}
              <QuestionBlock questionNumber={19} title="Attended training/workshops?">
                  <div className="flex gap-2">
                      {["Yes", "No"].map((choice) => (
                          <OptionPill key={choice} label={choice} value={choice} isRadio={true} isChecked={formData.demographics.attendedTraining === choice} onChange={() => updateDemographics("attendedTraining", choice)} name="attendedTraining" />
                      ))}
                  </div>
              </QuestionBlock>

              {/* Q20: Follow Entrepreneur Content */}
              <QuestionBlock questionNumber={20} title="Follow entrepreneurship content?">
                  <div className="flex gap-2">
                      {["Yes", "No"].map((choice) => (
                          <OptionPill key={choice} label={choice} value={choice} isRadio={true} isChecked={formData.demographics.followEntrepreneurContent === choice} onChange={() => updateDemographics("followEntrepreneurContent", choice)} name="followContent" />
                      ))}
                  </div>
              </QuestionBlock>

              {/* Q21: Has Mentor */}
              <QuestionBlock questionNumber={21} title="Have a mentor or advisor?">
                  <div className="flex gap-2">
                      {["Yes", "No"].map((choice) => (
                          <OptionPill key={choice} label={choice} value={choice} isRadio={true} isChecked={formData.demographics.hasMentor === choice} onChange={() => updateDemographics("hasMentor", choice)} name="hasMentor" />
                      ))}
                  </div>
              </QuestionBlock>

              {/* Q22: Exposure Areas */}
              <QuestionBlock questionNumber={22} title="Areas You've Been Exposed To" isMulti={true}>
                <div className="flex flex-wrap gap-2">
                  {exposureAreas.map((ea) => (
                    <OptionPill key={ea} label={ea} value={ea} isRadio={false} isChecked={(formData.demographics.exposureAreas || []).includes(ea)} onChange={() => toggleArrayField("exposureAreas", ea)} name="exposureAreas" />
                  ))}
                </div>
              </QuestionBlock>

              {/* Q23: Digital Tools */}
              <QuestionBlock questionNumber={23} title="Familiar with digital tools for business?">
                  <div className="flex gap-2">
                      {["Yes", "No"].map((choice) => (
                          <OptionPill key={choice} label={choice} value={choice} isRadio={true} isChecked={formData.demographics.familiarWithDigitalTools === choice} onChange={() => updateDemographics("familiarWithDigitalTools", choice)} name="familiarWithDigital" />
                      ))}
                  </div>
              </QuestionBlock>


              {/* Question 24-29: Vision & Motivation */}
              <h4 className="text-xl font-semibold text-blue-600 border-b pb-2 pt-4">Vision & Motivation</h4>

              {/* Q24: Why Start Business */}
              <QuestionBlock questionNumber={24} title="Why do you want to start a business?" isMulti={true}>
                <div className="flex flex-wrap gap-2 items-center">
                  {whyStartOptions.map((w) => (
                    <OptionPill key={w} label={w} value={w} isRadio={false} isChecked={(formData.demographics.whyStartBusiness || []).includes(w)} onChange={() => toggleArrayField("whyStartBusiness", w)} name="whyStartBusiness" />
                  ))}
                  {formData.demographics.whyStartBusiness?.includes("Other") && (
                    <input className="p-2 border border-gray-300 rounded-lg shadow-sm" placeholder="Other reason" value={formData.demographics.whyStartBusinessOther} onChange={(e) => updateDemographics("whyStartBusinessOther", e.target.value)} required />
                  )}
                </div>
              </QuestionBlock>

              {/* Q25: Has Clear Vision */}
              <QuestionBlock questionNumber={25} title="Do you have a clear vision for your business?">
                  <div className="flex gap-2">
                      {["Yes", "No"].map((choice) => (
                          <OptionPill key={choice} label={choice} value={choice} isRadio={true} isChecked={formData.demographics.hasClearVision === choice} onChange={() => updateDemographics("hasClearVision", choice)} name="clearVision" />
                      ))}
                  </div>
              </QuestionBlock>

              {/* Q26: Planned Commitment */}
              <QuestionBlock questionNumber={26} title="Planned Commitment">
                  <div className="flex flex-wrap gap-2">
                      {commitmentOptions.map((c) => (
                          <OptionPill key={c} label={c} value={c} isRadio={true} isChecked={formData.demographics.plannedCommitment === c} onChange={() => updateDemographics("plannedCommitment", c)} name="plannedCommitment" />
                      ))}
                  </div>
              </QuestionBlock>

              {/* Q27: Interested Business Types */}
              <QuestionBlock questionNumber={27} title="Type of Business You’re Interested In" isMulti={true}>
                <div className="flex flex-wrap gap-2">
                  {interestedBusinessTypes.map((b) => (
                    <OptionPill key={b} label={b} value={b} isRadio={false} isChecked={(formData.demographics.interestedBusinessTypes || []).includes(b)} onChange={() => toggleArrayField("interestedBusinessTypes", b)} name="interestedBusinessTypes" />
                  ))}
                </div>
              </QuestionBlock>

              {/* Q28: Prefer Create or Improve */}
              <QuestionBlock questionNumber={28} title="Prefer: Creating new or Improving existing ideas?">
                  <div className="flex flex-wrap gap-2">
                      {preferCreateImprove.map((p) => (
                          <OptionPill key={p} label={p} value={p} isRadio={true} isChecked={formData.demographics.preferCreateOrImprove === p} onChange={() => updateDemographics("preferCreateOrImprove", p)} name="preferCreateOrImprove" />
                      ))}
                  </div>
              </QuestionBlock>

              {/* Q29: Preferred Business Model */}
              <QuestionBlock questionNumber={29} title="Preferred Business Model" isMulti={true}>
                  <div className="flex flex-wrap gap-2">
                      {businessModelOptions.map((bm) => (
                          <OptionPill key={bm} label={bm} value={bm} isRadio={false} isChecked={(formData.demographics.preferredBusinessModel || []).includes(bm)} onChange={() => toggleArrayField("preferredBusinessModel", bm)} name="preferredBusinessModel" />
                      ))}
                  </div>
              </QuestionBlock>
            </div>
          </section>

          {/* Submit Button & Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out transform hover:scale-[1.01]"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Complete Registration"}
            </button>

            <div className="text-sm text-gray-500 mt-4 sm:mt-0">
              <span className="font-semibold text-red-500">*</span> indicates a required field.
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}