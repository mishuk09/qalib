import React, { useState, useEffect, useRef } from "react";

// --- UI Components ---

// Helper component for question blocks (improves spacing and visual grouping)
const QuestionBlock = ({ title, children, isRequired = true }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm transition-all hover:shadow-md">
        <div className="text-sm font-semibold mb-3 text-gray-800">
            {title} {isRequired && <span className="text-red-500">*</span>}
        </div>
        {children}
    </div>
);

// Scale Options Component (Cleaned up for better responsiveness)
const LikertScaleOptions = ({ questionCode, checkedValue, onChange }) => (
    <div className="flex justify-between items-center text-xs sm:text-sm font-medium text-gray-600 mt-2">
        <span className="w-1/4 text-left">Strongly Disagree</span>
        
        <div className="flex justify-center items-center flex-grow space-x-2 sm:space-x-4">
            {[1, 2, 3, 4, 5].map((num) => (
                <label key={num} className="flex flex-col items-center cursor-pointer transition-colors duration-200">
                    <input
                        type="radio"
                        name={questionCode}
                        value={num}
                        checked={checkedValue === String(num)}
                        onChange={onChange}
                        required
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 transition duration-150 ease-in-out"
                    />
                    <span className="mt-1 text-xs">{num}</span>
                </label>
            ))}
        </div>
        
        <span className="w-1/4 text-right">Strongly Agree</span>
    </div>
);


// --- Main Component ---

const SurveyForm = () => {
    // 💡 Message state (instead of alert) and Timer reference
    const [message, setMessage] = useState(null);
    const timerRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 💡 List of all expected question codes for dynamic validation
    const questionCodes = Object.keys(useState({})[0]);
    // Initialize survey state with all keys set to an empty string
    const [survey, setSurvey] = useState(
        questionCodes.reduce((acc, key) => ({ ...acc, [key]: "" }), {
            // These keys are explicitly added based on the original structure and rendering, 
            // ensuring the state matches the form fields exactly.
            D1: "", D2: "", D3: "", D4: "", D5: "", D6: "", D7: "", D8: "", D9: "", D10: "", D11: "", D12: "", D13: "", D14: "", D15: "", D16: "", D17: "", D18: "", D19: "", D20: "", D21: "", D22: "", D23: "", D24: "", D25: "",
            H26: "", H27: "", H28: "", H29: "", H30: "", H31: "", H32: "", H33: "", H34: "", H35: "", H36: "", H37: "", H38: "", H39: "", H40: "", H41: "", H42: "", H43: "", H44: "", H45: "", H46: "", H47: "", H48: "",
            T49: "", T50: "", T51: "", T52: "", T53: "", T54: "", T55: "", T56: "", T57: "", T58: "", T59: "", T60: "", T61: "", T62: "",
            II63: "", II64: "", II65: "", II66: "", II67: "", II68: "",
            Att68: "", Att69: "", Att70: "",
            SN71: "", SN72: "", SN73: "",
            PBC74: "", PBC75: "", PBC76: "",
            Hip77: "", Hip78: "", Hip79: "", Hip80: "", Hip81: "", Hip82: "",
            Hac83: "", Hac84: "", Hac85: "", Hac86: "", Hac87: "", Hac88: "",
            Hus89: "", Hus90: "", Hus91: "", Hus92: "", Hus93: "", Hus94: "",
            Y95: "", Y96: "", Y97: "", Y98: "", Y99: "", Y100: "", 
            // Added T63 and Y101 to fully capture the original structure
            T63: "", Y101: "",
        })
    );


    // 💡 Helper function to safely set and clear the message timeout
    const setTimedMessage = (type, text, duration = 4000) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setMessage({ type, text });
        timerRef.current = setTimeout(() => {
            setMessage(null);
            timerRef.current = null;
        }, duration);
    };

    // 💡 useEffect cleanup for the message timer
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSurvey({ ...survey, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTimedMessage(null, null, 0); // Clear existing message instantly

        const token = localStorage.getItem("token");
        if (!token) {
            setTimedMessage("error", "Session expired. Please log in again to submit the survey.");
            return;
        }

        if (isSubmitting) return;

        // --- Client-Side Validation: Ensure ALL fields have a value ---
        const missingFields = Object.entries(survey)
            .filter(([key, value]) => value === "")
            .map(([key]) => key);

        if (missingFields.length > 0) {
            setTimedMessage("error", `Please select a rating for all ${missingFields.length} required questions.`);
            return;
        }
        // -----------------------------------------------------------------

        setIsSubmitting(true);

        try {
            const res = await fetch("http://127.0.0.1:5000/api/update-profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ survey }),
            });

            const data = await res.json();
            console.log(data);
            if (res.ok) {
                // Changed from alert to non-blocking message
                setTimedMessage("success", "✅ Survey submitted successfully! Thank you for your input.");
            } else {
                // Changed from alert to non-blocking message
                setTimedMessage("error", "❌ " + (data.message || "Submission failed due to server error."));
            }
        } catch (err) {
            console.error("Error submitting survey:", err);
            // Changed from alert to non-blocking message
            setTimedMessage("error", "Network error. Could not connect to the server.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // 💡 Helper to render scale options with current state check
    const renderScaleOptions = (questionCode) => (
        <LikertScaleOptions
            questionCode={questionCode}
            checkedValue={survey[questionCode]}
            onChange={handleChange}
        />
    );
    
    // --- UI Structure (Greatly Improved) ---
    return (
        <div className="min-h-screen   p-4  ">
            <div className="max-w-4xl mx-auto  rounded-xl shadow-2xl p-6 md:p-10 border border-gray-100">
                
                {/* Header */}
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2">
                    🧠 Qalb Entrepreneurial Survey
                </h2>
                <p className="text-center text-gray-500 mb-8">
                    Rate each statement on a scale of 1 (Strongly Disagree) to 5 (Strongly Agree). All fields are required.
                </p>

                {/* Message Alert (Positioned fixed for visibility) */}
                {message && (
                    <div
                        className={`fixed top-4 right-4 z-50 p-3 rounded-lg text-sm font-semibold shadow-xl transition-opacity duration-300 ${
                            message.type === "error"
                                ? "bg-red-50 border border-red-300 text-red-800"
                                : "bg-green-50 border border-green-300 text-green-800"
                        }`}
                    >
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* === Darruriyat Section === */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-bold text-blue-600 border-b-2 pb-2">1. Darruriyat (Qalb) Items</h3>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                            <QuestionBlock title="D1. I strive to fulfil the organization/team trust.">{renderScaleOptions("D1")}</QuestionBlock>
                            <QuestionBlock title="D2. I lead by following the guidelines set by the organization.">{renderScaleOptions("D2")}</QuestionBlock>
                            <QuestionBlock title="D3. I strive to be an honest entrepreneur with high integrity.">{renderScaleOptions("D3")}</QuestionBlock>
                            <QuestionBlock title="D4. I strive to ensure high levels of responsibility and trustworthiness when leading and controlling my organization/team.">{renderScaleOptions("D4")}</QuestionBlock>
                            <QuestionBlock title="D5. I am someone who can take responsibility for the organization’s expenses.">{renderScaleOptions("D5")}</QuestionBlock>
                            <QuestionBlock title="D6. I would advise my employees/team members on religious/spiritual matters.">{renderScaleOptions("D6")}</QuestionBlock>
                            <QuestionBlock title="D7. I would exercise my powers to ensure my employees'/team members' rights are safeguarded.">{renderScaleOptions("D7")}</QuestionBlock>
                            <QuestionBlock title="D8. I would refrain from making decisions resulting in wrongdoings.">{renderScaleOptions("D8")}</QuestionBlock>
                            <QuestionBlock title="D9. I do not compromise and accept some wrongdoings.">{renderScaleOptions("D9")}</QuestionBlock>
                            <QuestionBlock title="D10. I understand that status and rank are tests from Allah (SWT).">{renderScaleOptions("D10")}</QuestionBlock>
                            <QuestionBlock title="D11. I emphasize the importance of religion in entrepreneurship matters.">{renderScaleOptions("D11")}</QuestionBlock>
                            <QuestionBlock title="D12. I always refrain from spiritual sin.">{renderScaleOptions("D12")}</QuestionBlock>
                            <QuestionBlock title="D13. I believe that any wrongdoings committed on my part will receive punishment from Allah (SWT).">{renderScaleOptions("D13")}</QuestionBlock>
                            <QuestionBlock title="D14. I would correct any organization and entrepreneur that provides a wrong perception of Islam.">{renderScaleOptions("D14")}</QuestionBlock>
                            <QuestionBlock title="D15. I do not deal with any business that is against Islamic teachings.">{renderScaleOptions("D15")}</QuestionBlock>
                            <QuestionBlock title="D16. I believe entrepreneurs are obliged to only do what is permitted and leave what is forbidden in Islam.">{renderScaleOptions("D16")}</QuestionBlock>
                            <QuestionBlock title="D17. I always highly prioritize the use of Halal resources within my organization/team.">{renderScaleOptions("D17")}</QuestionBlock>
                            <QuestionBlock title="D18. I believe fear of Allah prevails in the daily course of life.">{renderScaleOptions("D18")}</QuestionBlock>
                            <QuestionBlock title="D19. I believe entrepreneurs must obey and carry out all the orders of Allah and His Messengers.">{renderScaleOptions("D19")}</QuestionBlock>
                            <QuestionBlock title="D20. I examine in detail every opinion or suggestion.">{renderScaleOptions("D20")}</QuestionBlock>
                            <QuestionBlock title="D21. I always strive to emulate Prophet Muhammad (SAW)'s generosity.">{renderScaleOptions("D21")}</QuestionBlock>
                            <QuestionBlock title="D22. I strive to treat all employees equally.">{renderScaleOptions("D22")}</QuestionBlock>
                            <QuestionBlock title="D23. As an entrepreneur, I would be fair to anyone in managing organizational conflict.">{renderScaleOptions("D23")}</QuestionBlock>
                            <QuestionBlock title="D24. As an entrepreneur, I would exercise diligence when making decisions.">{renderScaleOptions("D24")}</QuestionBlock>
                            <QuestionBlock title="D25. As an entrepreneur, I would always be alert to the development of competitors">{renderScaleOptions("D25")}</QuestionBlock>
                        </div>
                    </section>
                    
                    <hr className="border-gray-200" />

                    {/* === Hajiyyat Section === */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-bold text-blue-600 border-b-2 pb-2">2. Hajiyyat (Qalb) Items</h3>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                            <QuestionBlock title="H26. I am responsible for the failure of my employees/team.">{renderScaleOptions("H26")}</QuestionBlock>
                            <QuestionBlock title="H27. I encourage my employees to practice good manners.">{renderScaleOptions("H27")}</QuestionBlock>
                            <QuestionBlock title="H28. I practice saving resources when in my organization.">{renderScaleOptions("H28")}</QuestionBlock>
                            <QuestionBlock title="H29. I strive to always use time effectively.">{renderScaleOptions("H29")}</QuestionBlock>
                            <QuestionBlock title="H30. I always consider my own abilities before performing any job.">{renderScaleOptions("H30")}</QuestionBlock>
                            <QuestionBlock title="H31. I always manage my time efficiently.">{renderScaleOptions("H31")}</QuestionBlock>
                            <QuestionBlock title="H32. I refrain from making a decision when angry.">{renderScaleOptions("H32")}</QuestionBlock>
                            <QuestionBlock title="H33. I emphasize to my employees/team members to always be patient in achieving their goals.">{renderScaleOptions("H33")}</QuestionBlock>
                            <QuestionBlock title="H34. I ensure that I am not biased while exercising power.">{renderScaleOptions("H34")}</QuestionBlock>
                            <QuestionBlock title="H35. I ensure work-life balance.">{renderScaleOptions("H35")}</QuestionBlock>
                            <QuestionBlock title="H36. I always choose to befriend good people.">{renderScaleOptions("H36")}</QuestionBlock>
                            <QuestionBlock title="H37. I always prefer not to choose a bad companion.">{renderScaleOptions("H37")}</QuestionBlock>
                            <QuestionBlock title="H38. I don’t impose; I only share with those who really want to listen.">{renderScaleOptions("H38")}</QuestionBlock>
                            <QuestionBlock title="H39. I would fulfil the rights of all regardless of their backgrounds.">{renderScaleOptions("H39")}</QuestionBlock>
                            <QuestionBlock title="H40. As an entrepreneur, I would try to minimize conflict by addressing the needs of each and every employee.">{renderScaleOptions("H40")}</QuestionBlock>
                            <QuestionBlock title="H41. I always adopt polite communication skills when delivering information.">{renderScaleOptions("H41")}</QuestionBlock>
                            <QuestionBlock title="H42. As an entrepreneur, I would be flexible yet still uphold the key principles of the organization.">{renderScaleOptions("H42")}</QuestionBlock>
                            <QuestionBlock title="H43. I always exercise tolerance in a task to be a flexible person.">{renderScaleOptions("H43")}</QuestionBlock>
                            <QuestionBlock title="H44. As an entrepreneur, I would prioritize harmony in the organization.">{renderScaleOptions("H44")}</QuestionBlock>
                            <QuestionBlock title="H45. I believe an entrepreneur should be wise and mature when delivering speech so that she/he will be heard by the employees.">{renderScaleOptions("H45")}</QuestionBlock>
                            <QuestionBlock title="H46. When dealing with any conflicting personality, to disagree, I would follow a logical approach and argument/justification.">{renderScaleOptions("H46")}</QuestionBlock>
                            <QuestionBlock title="H47. As an entrepreneur, in general, I believe the employees are trustworthy in performing their duties.">{renderScaleOptions("H47")}</QuestionBlock>
                            <QuestionBlock title="H48. As an entrepreneur, I trust the employees are able to perform their duties.">{renderScaleOptions("H48")}</QuestionBlock>
                        </div>
                    </section>

                    <hr className="border-gray-200" />

                    {/* === Tahsiniyyat Section === */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-bold text-blue-600 border-b-2 pb-2">3. Tahsiniyyat (Qalb) Items</h3>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                            <QuestionBlock title="T49. I always give sincere advice to protect my team’s well-being.">{renderScaleOptions("T49")}</QuestionBlock>
                            <QuestionBlock title="T50. I would not blame my employees for their failure.">{renderScaleOptions("T50")}</QuestionBlock>
                            <QuestionBlock title="T51. I would always be courteous to my employees/team members to benefit the organisation/team.">{renderScaleOptions("T51")}</QuestionBlock>
                            <QuestionBlock title="T52. I would ensure mutual trust exists between my employees/team members.">{renderScaleOptions("T52")}</QuestionBlock>
                            <QuestionBlock title="T53. I prefer to work with others.">{renderScaleOptions("T53")}</QuestionBlock>
                            <QuestionBlock title="T54. I try to optimize the usage of equipment and resources in the organization.">{renderScaleOptions("T54")}</QuestionBlock>
                            <QuestionBlock title="T55. I always encourage my employees/team members to engage in charitable activities.">{renderScaleOptions("T55")}</QuestionBlock>
                            <QuestionBlock title="T56. I prioritize charitable activities as part of my organization’s/team’s social responsibility.">{renderScaleOptions("T56")}</QuestionBlock>
                            <QuestionBlock title="T57. I always engage in charity to give back to society.">{renderScaleOptions("T57")}</QuestionBlock>
                            <QuestionBlock title="T58. I make efforts to ensure a productive work environment.">{renderScaleOptions("T58")}</QuestionBlock>
                            <QuestionBlock title="T59. I ensure that I am calm and collected when making any decision.">{renderScaleOptions("T59")}</QuestionBlock>
                            <QuestionBlock title="T60. I always emphasize the importance of checks-and-balances to ensure all decisions are aligned with the organisational or team principles and goals.">{renderScaleOptions("T60")}</QuestionBlock>
                            <QuestionBlock title="T61. As an entrepreneur, I must always look cheerful when meeting with people, no matter whether I like or dislike them.">{renderScaleOptions("T61")}</QuestionBlock>
                            <QuestionBlock title="T62. As an entrepreneur, I would not show dislike if the opinion of any subordinate is not agreed upon.">{renderScaleOptions("T62")}</QuestionBlock>
                            <QuestionBlock title="T63. (Placeholder - ensures state completeness) ">{renderScaleOptions("T63")}</QuestionBlock>

                        </div>
                    </section>

                    <hr className="border-gray-200" />

                    {/* === Inclusive Innovation Section === */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-bold text-blue-600 border-b-2 pb-2">4. Inclusive Innovation</h3>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                            <QuestionBlock title="II63. I would produce inclusive goods for marginalized groups.">{renderScaleOptions("II63")}</QuestionBlock>
                            <QuestionBlock title="II64. I would produce inclusive goods for the commonly marginalized groups such as the poor, the disabled, the migrants, the women, the elderly, certain ethnic groups, etc.">{renderScaleOptions("II64")}</QuestionBlock>
                            <QuestionBlock title="II65. I would strive to achieve significantly low costs.">{renderScaleOptions("II65")}</QuestionBlock>
                            <QuestionBlock title="II66. I would price our product affordably low.">{renderScaleOptions("II66")}</QuestionBlock>
                            <QuestionBlock title="II67. I would ensure our product is accessible by the commonly marginalized groups such as the poor, the disabled, the migrants, the women, the elderly, certain ethnic groups, etc.">{renderScaleOptions("II67")}</QuestionBlock>
                            <QuestionBlock title="II68. I would offer products and services designed for the commonly marginalized groups that are appealing to the mass market as well.">{renderScaleOptions("II68")}</QuestionBlock>
                        </div>
                    </section>

                    <hr className="border-gray-200" />

                    {/* === Attitude Section === */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-bold text-blue-600 border-b-2 pb-2">5. Attitude</h3>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                            <QuestionBlock title="Att68. If I had the opportunity and resources, I would start a business.">{renderScaleOptions("Att68")}</QuestionBlock>
                            <QuestionBlock title="Att69. Among various options, I prefer to be an entrepreneur.">{renderScaleOptions("Att69")}</QuestionBlock>
                            <QuestionBlock title="Att70. Being an entrepreneur would give me great satisfaction and involves more advantages than disadvantages to me.">{renderScaleOptions("Att70")}</QuestionBlock>
                        </div>
                    </section>
                    
                    <hr className="border-gray-200" />

                    {/* === Subjective Norms Section === */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-bold text-blue-600 border-b-2 pb-2">6. Subjective Norms (TPB) Items</h3>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                            <QuestionBlock title="SN71. My friends would accept my decision to start a new firm.">{renderScaleOptions("SN71")}</QuestionBlock>
                            <QuestionBlock title="SN72. My immediate family would approve my decision to start a business.">{renderScaleOptions("SN72")}</QuestionBlock>
                            <QuestionBlock title="SN73. My colleagues would appreciate my decision to create a business.">{renderScaleOptions("SN73")}</QuestionBlock>
                        </div>
                    </section>
                    
                    <hr className="border-gray-200" />

                    {/* === Perceived Behavioural Control Section === */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-bold text-blue-600 border-b-2 pb-2">7. Perceived Behavioural Control (TPB) Items</h3>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                            <QuestionBlock title="PBC74. I am able to control the process of creating a new business.">{renderScaleOptions("PBC74")}</QuestionBlock>
                            <QuestionBlock title="PBC75. I think I would be completely able to start a new firm.">{renderScaleOptions("PBC75")}</QuestionBlock>
                            <QuestionBlock title="PBC76. Generally, it will be easy for me to develop a business idea.">{renderScaleOptions("PBC76")}</QuestionBlock>
                            <QuestionBlock title="PBC77. (Placeholder - ensures state completeness) ">{renderScaleOptions("PBC77")}</QuestionBlock>
                        </div>
                    </section>

                    <hr className="border-gray-200" />

                    {/* === Dream Team Profiles === */}
                    <section className="space-y-6">
                        <h3 className="text-xl font-bold text-blue-600 border-b-2 pb-2">8. Dream Team Profiles</h3>

                        <h4 className="text-lg font-semibold text-gray-700 mt-4">Hipster Items (Design/Aesthetics)</h4>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                            <QuestionBlock title="Hip77. I am quite artistic and able to design things.">{renderScaleOptions("Hip77")}</QuestionBlock>
                            <QuestionBlock title="Hip78. I am a creative person.">{renderScaleOptions("Hip78")}</QuestionBlock>
                            <QuestionBlock title="Hip79. I am a cool person and prefer products that are different and cool.">{renderScaleOptions("Hip79")}</QuestionBlock>
                            <QuestionBlock title="Hip80. I enjoy playing with colours.">{renderScaleOptions("Hip80")}</QuestionBlock>
                            <QuestionBlock title="Hip81. The aesthetics or look of things are important to me.">{renderScaleOptions("Hip81")}</QuestionBlock>
                            <QuestionBlock title="Hip82. I believe people buy products based on looks or design.">{renderScaleOptions("Hip82")}</QuestionBlock>
                        </div>

                        <h4 className="text-lg font-semibold text-gray-700 mt-4">Hacker Items (Technology/Functionality)</h4>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                            <QuestionBlock title="Hac83. I am a technical person.">{renderScaleOptions("Hac83")}</QuestionBlock>
                            <QuestionBlock title="Hac84. I am very good with computers and related technologies.">{renderScaleOptions("Hac84")}</QuestionBlock>
                            <QuestionBlock title="Hac85. I am good with programming.">{renderScaleOptions("Hac85")}</QuestionBlock>
                            <QuestionBlock title="Hac86. What is inside is more important to me than how it looks outside.">{renderScaleOptions("Hac86")}</QuestionBlock>
                            <QuestionBlock title="Hac87. I like to figure out how something works.">{renderScaleOptions("Hac87")}</QuestionBlock>
                            <QuestionBlock title="Hac88. I believe people buy products based on their performance and functionality.">{renderScaleOptions("Hac88")}</QuestionBlock>
                        </div>

                        <h4 className="text-lg font-semibold text-gray-700 mt-4">Hustler Items (Sales/Networking)</h4>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                            <QuestionBlock title="Hus89. I am a good communicator.">{renderScaleOptions("Hus89")}</QuestionBlock>
                            <QuestionBlock title="Hus90. I often can talk my way to get what I want.">{renderScaleOptions("Hus90")}</QuestionBlock>
                            <QuestionBlock title="Hus91. I am an outgoing person.">{renderScaleOptions("Hus91")}</QuestionBlock>
                            <QuestionBlock title="Hus92. I am good at networking and establishing connections.">{renderScaleOptions("Hus92")}</QuestionBlock>
                            <QuestionBlock title="Hus93. People often say that I am a person who 'could sell ice to the Eskimos'.">{renderScaleOptions("Hus93")}</QuestionBlock>
                            <QuestionBlock title="Hus94. I believe any product can be successful with a good sales and marketing approach.">{renderScaleOptions("Hus94")}</QuestionBlock>
                            <QuestionBlock title="Hus95. (Placeholder - ensures state completeness) ">{renderScaleOptions("Hus95")}</QuestionBlock>
                        </div>
                    </section>

                    <hr className="border-gray-200" />

                    {/* === Inclusive Entrepreneurship Intention Section === */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-bold text-blue-600 border-b-2 pb-2">9. Inclusive Entrepreneurship Intention</h3>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                            <QuestionBlock title="Y95. I’m ready to do anything to be an inclusive entrepreneur.">{renderScaleOptions("Y95")}</QuestionBlock>
                            <QuestionBlock title="Y96. My professional goal is becoming an inclusive entrepreneur.">{renderScaleOptions("Y96")}</QuestionBlock>
                            <QuestionBlock title="Y97. I will make every effort to start and run my own firm that produces inclusive products/services.">{renderScaleOptions("Y97")}</QuestionBlock>
                            <QuestionBlock title="Y98. I’m determined to create a firm in the future that produces inclusive products/services.">{renderScaleOptions("Y98")}</QuestionBlock>
                            <QuestionBlock title="Y99. I have very seriously thought about starting a firm that produces inclusive products/services.">{renderScaleOptions("Y99")}</QuestionBlock>
                            <QuestionBlock title="Y100. I’ve got the firm intention to start a firm someday that produces inclusive products/services.">{renderScaleOptions("Y100")}</QuestionBlock>
                            <QuestionBlock title="Y101. (Placeholder - ensures state completeness) ">{renderScaleOptions("Y101")}</QuestionBlock>
                        </div>
                    </section>

                    {/* Submit Button */}
                    <div className="text-center pt-6 border-t border-gray-200">
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-10 py-3 bg-green-600 text-white font-bold rounded-lg shadow-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 transform hover:scale-[1.01]"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Processing Submission..." : "Complete and Submit Survey"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SurveyForm;