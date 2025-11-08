import React, { useState } from "react";

const SurveyForm = () => {
  const [survey, setSurvey] = useState({
    // Darruriyat (Qalb) Items 
    D1: "",
    D2: "",
    D3: "",
    D4: "",
    D5: "",
    D6: "",
    D7: "",
    D8: "",
    D9: "",
    D10: "",
    D11: "",
    D12: "",
    D13: "",
    D14: "",
    D15: "",
    D16: "",
    D17: "",
    D18: "",
    D19: "",
    D20: "",
    D21: "",
    D22: "",
    D23: "",
    D24: "",
    D25: "",

    // Hajiyyat (Qalb) Items 

    H26: "",
    H27: "",
    H28: "",
    H29: "",
    H30: "",
    H31: "",
    H32: "",
    H33: "",
    H34: "",
    H35: "",
    H36: "",
    H37: "",
    H38: "",
    H39: "",
    H40: "",
    H41: "",
    H42: "",
    H43: "",
    H44: "",
    H45: "",
    H46: "",
    H47: "",
    H48: "",

    // Tahsiniyyat (Qalb) Items
    T49: "",
    T50: "",
    T51: "",
    T52: "",
    T53: "",
    T54: "",
    T55: "",
    T56: "",
    T57: "",
    T58: "",
    T59: "",
    T60: "",
    T61: "",
    T62: "",


    // Inclusive Innovation
    II63: "",
    II64: "",
    II65: "",
    II66: "",
    II67: "",

    // Attitude

    Att68: "",
    Att69: "",
    Att70: "",

    // Subjective Norms (TPB) Items 
    SN71: "",
    SN72: "",
    SN73: "",

// Perceived Behavioural Control (TPB) Items 

    PBC74: "",
    PBC75: "",
    PBC76: "",

    // Hipster (Dream Team) Items 

    Hip77: "",
    Hip78: "",
    Hip79: "",
    Hip80: "",
    Hip81: "",
    Hip82: "",

    // Hacker (Dream Team) Items
    Hac83: "",
    Hac84: "",
    Hac85: "",
    Hac86: "",
    Hac87: "",
    Hac88: "",

    // Hustler (Dream Team) Items
    Hus89: "",
    Hus90: "",
    Hus91: "",
    Hus92: "",
    Hus93: "",
    Hus94: "",

    // Inclusive Entrepreneurship Intention Items 
    Y95: "",
    Y96: "",
    Y97: "",
    Y98: "",
    Y99: "",
    Y100: "",

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSurvey({ ...survey, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please login first.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/api/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // optional if backend validates token
        },
        body: JSON.stringify({ survey }),
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        alert("✅ Survey submitted successfully!");
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("Error submitting survey:", err);
      alert("Server error while submitting survey.");
    }
  };

  const renderScaleOptions = (questionCode) => (
    <div className="flex gap-2 mt-1">
      {[1, 2, 3, 4, 5].map((num) => (
        <label key={num} className="flex items-center gap-1">
          <input
            type="radio"
            name={questionCode}
            value={num}
            checked={survey[questionCode] === String(num)}
            onChange={handleChange}
            className="text-blue-500"
          />
          {num}
        </label>
      ))}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">
        Qalb Entrepreneurial Quotient and Profiling Survey
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Example Question Group */}
        <div>
          <h3 className="font-medium text-lg text-gray-800">
            Darruriyat (Qalb) Items
          </h3>
          {/* <label className="block mt-3">
            D1. I strive to fulfil the organization/team trust.
            {renderScaleOptions("D1")}
          </label>
          <label className="block mt-3">
            D2. I lead by following the guidelines set by the organization.
            {renderScaleOptions("D2")}
          </label>
          <label className="block mt-3">
            D3. I strive to be an honest entrepreneur with high integrity.
            {renderScaleOptions("D3")}
          </label> */}

            <label className="block mt-3">
            D1. I strive to fulfil the organization/team trust.
            {renderScaleOptions("D1")}
            </label>
            <label className="block mt-3">
            D2. I lead by following the guidelines set by the organization.
            {renderScaleOptions("D2")}
            </label>
            <label className="block mt-3">
            D3. I strive to be an honest entrepreneur with high integrity.
            {renderScaleOptions("D3")}
            </label>
            <label className="block mt-3">
            D4. I strive to ensure high levels of responsibility and trustworthiness when leading and controlling my organization/team.
            {renderScaleOptions("D4")}
            </label>
            <label className="block mt-3">
            D5. I am someone who can take responsibility for the organization’s expenses.
            {renderScaleOptions("D5")}
            </label>
            <label className="block mt-3">
            D6. I would advise my employees/team members on religious/spiritual matters.
            {renderScaleOptions("D6")}
            </label>
            <label className="block mt-3">
            D7. I would exercise my powers to ensure my employees'/team members' rights are safeguarded.
            {renderScaleOptions("D7")}
            </label>
            <label className="block mt-3">
            D8. I would refrain from making decisions resulting in wrongdoings.
            {renderScaleOptions("D8")}
            </label>
            <label className="block mt-3">
            D9. I do not compromise and accept some wrongdoings.
            {renderScaleOptions("D9")}
            </label>
            <label className="block mt-3">
            D10. I understand that status and rank are tests from Allah (SWT).
            {renderScaleOptions("D10")}
            </label>
            <label className="block mt-3">
            D11. I emphasize the importance of religion in entrepreneurship matters.
            {renderScaleOptions("D11")}
            </label>
            <label className="block mt-3">
            D12. I always refrain from spiritual sin.
            {renderScaleOptions("D12")}
            </label>
            <label className="block mt-3">
            D13. I believe that any wrongdoings committed on my part will receive punishment from Allah (SWT).
            {renderScaleOptions("D13")}
            </label>
            <label className="block mt-3">
            D14. I would correct any organization and entrepreneur that provides a wrong perception of Islam.
            {renderScaleOptions("D14")}
            </label>
            <label className="block mt-3">
            D15. I do not deal with any business that is against Islamic teachings.
            {renderScaleOptions("D15")}
            </label>
            <label className="block mt-3">
            D16. I believe entrepreneurs are obliged to only do what is permitted and leave what is forbidden in Islam.
            {renderScaleOptions("D16")}
            </label>
            <label className="block mt-3">
            D17. I always highly prioritize the use of Halal resources within my organization/team.
            {renderScaleOptions("D17")}
            </label>
            <label className="block mt-3">
            D18. I believe fear of Allah prevails in the daily course of life.
            {renderScaleOptions("D18")}
            </label>
            <label className="block mt-3">
            D19. I believe entrepreneurs must obey and carry out all the orders of Allah and His Messengers.
            {renderScaleOptions("D19")}
            </label>
            <label className="block mt-3">
            D20. I examine in detail every opinion or suggestion.
            {renderScaleOptions("D20")}
            </label>
            <label className="block mt-3">
            D21. I always strive to emulate Prophet Muhammad (SAW)'s generosity.
            {renderScaleOptions("D21")}
            </label>
            <label className="block mt-3">
            D22. I strive to treat all employees equally.
            {renderScaleOptions("D22")}
            </label>
            <label className="block mt-3">
            D23. As an entrepreneur, I would be fair to anyone in managing organizational conflict.
            {renderScaleOptions("D23")}
            </label>
            <label className="block mt-3">
            D24. As an entrepreneur, I would exercise diligence when making decisions.
            {renderScaleOptions("D24")}
            </label>

        </div>

        <div>
          <h3 className="font-medium text-lg text-gray-800 mt-6">
            Hajiyyat (Qalb) Items
          </h3>
          {/* <label className="block mt-3">
            H12. I am responsible for the failure of my employees/team.
            {renderScaleOptions("H12")}
          </label>
          <label className="block mt-3">
            H13. I encourage my employees to practice good manners.
            {renderScaleOptions("H13")}
          </label> */}

            <label className="block mt-3">
            H26. I am responsible for the failure of my employees/team.
            {renderScaleOptions("H26")}
            </label>
            <label className="block mt-3">
            H27. I encourage my employees to practice good manners.
            {renderScaleOptions("H27")}
            </label>
            <label className="block mt-3">
            H28. I practice saving resources when in my organization.
            {renderScaleOptions("H28")}
            </label>
            <label className="block mt-3">
            H29. I strive to always use time effectively.
            {renderScaleOptions("H29")}
            </label>
            <label className="block mt-3">
            H30. I always consider my own abilities before performing any job.
            {renderScaleOptions("H30")}
            </label>
            <label className="block mt-3">
            H31. I always manage my time efficiently.
            {renderScaleOptions("H31")}
            </label>
            <label className="block mt-3">
            H32. I refrain from making a decision when angry.
            {renderScaleOptions("H32")}
            </label>
            <label className="block mt-3">
            H33. I emphasize to my employees/team members to always be patient in achieving their goals.
            {renderScaleOptions("H33")}
            </label>
            <label className="block mt-3">
            H34. I ensure that I am not biased while exercising power.
            {renderScaleOptions("H34")}
            </label>
            <label className="block mt-3">
            H35. I ensure work-life balance.
            {renderScaleOptions("H35")}
            </label>
            <label className="block mt-3">
            H36. I always choose to befriend good people.
            {renderScaleOptions("H36")}
            </label>
            <label className="block mt-3">
            H37. I always prefer not to choose a bad companion.
            {renderScaleOptions("H37")}
            </label>
            <label className="block mt-3">
            H38. I don’t impose; I only share with those who really want to listen.
            {renderScaleOptions("H38")}
            </label>
            <label className="block mt-3">
            H39. I would fulfil the rights of all regardless of their backgrounds.
            {renderScaleOptions("H39")}
            </label>
            <label className="block mt-3">
            H40. As an entrepreneur, I would try to minimize conflict by addressing the needs of each and every employee.
            {renderScaleOptions("H40")}
            </label>
            <label className="block mt-3">
            H41. I always adopt polite communication skills when delivering information.
            {renderScaleOptions("H41")}
            </label>
            <label className="block mt-3">
            H42. As an entrepreneur, I would be flexible yet still uphold the key principles of the organization.
            {renderScaleOptions("H42")}
            </label>
            <label className="block mt-3">
            H43. I always exercise tolerance in a task to be a flexible person.
            {renderScaleOptions("H43")}
            </label>
            <label className="block mt-3">
            H44. As an entrepreneur, I would prioritize harmony in the organization.
            {renderScaleOptions("H44")}
            </label>
            <label className="block mt-3">
            H45. I believe an entrepreneur should be wise and mature when delivering speech so that she/he will be heard by the employees.
            {renderScaleOptions("H45")}
            </label>
            <label className="block mt-3">
            H46. When dealing with any conflicting personality, to disagree, I would follow a logical approach and argument/justification.
            {renderScaleOptions("H46")}
            </label>
            <label className="block mt-3">
            H47. As an entrepreneur, in general, I believe the employees are trustworthy in performing their duties.
            {renderScaleOptions("H47")}
            </label>
            <label className="block mt-3">
            H48. As an entrepreneur, I trust the employees are able to perform their duties.
            {renderScaleOptions("H48")}
            </label>


        </div>

        <div>
          <h3 className="font-medium text-lg text-gray-800 mt-6">
            Tahsiniyyat (Qalb) Items
          </h3>
          {/* <label className="block mt-3">
            T14. I always give sincere advice to protect my team’s well-being.
            {renderScaleOptions("T14")}
          </label>
          <label className="block mt-3">
            T15. I would not blame my employees for their failure.
            {renderScaleOptions("T15")}
          </label> */}
            <label className="block mt-3">
            T49. I always give sincere advice to protect my team’s well-being.
            {renderScaleOptions("T49")}
            </label>
            <label className="block mt-3">
            T50. I would not blame my employees for their failure.
            {renderScaleOptions("T50")}
            </label>
            <label className="block mt-3">
            T51. I would always be courteous to my employees/team members to benefit the organisation/team.
            {renderScaleOptions("T51")}
            </label>
            <label className="block mt-3">
            T52. I would ensure mutual trust exists between my employees/team members.
            {renderScaleOptions("T52")}
            </label>
            <label className="block mt-3">
            T53. I prefer to work with others.
            {renderScaleOptions("T53")}
            </label>
            <label className="block mt-3">
            T54. I try to optimize the usage of equipment and resources in the organization.
            {renderScaleOptions("T54")}
            </label>
            <label className="block mt-3">
            T55. I always encourage my employees/team members to engage in charitable activities.
            {renderScaleOptions("T55")}
            </label>
            <label className="block mt-3">
            T56. I prioritize charitable activities as part of my organization’s/team’s social responsibility.
            {renderScaleOptions("T56")}
            </label>
            <label className="block mt-3">
            T57. I always engage in charity to give back to society.
            {renderScaleOptions("T57")}
            </label>
            <label className="block mt-3">
            T58. I make efforts to ensure a productive work environment.
            {renderScaleOptions("T58")}
            </label>
            <label className="block mt-3">
            T59. I ensure that I am calm and collected when making any decision.
            {renderScaleOptions("T59")}
            </label>
            <label className="block mt-3">
            T60. I always emphasize the importance of checks-and-balances to ensure all decisions are aligned with the organisational or team principles and goals.
            {renderScaleOptions("T60")}
            </label>
            <label className="block mt-3">
            T61. As an entrepreneur, I must always look cheerful when meeting with people, no matter whether I like or dislike them.
            {renderScaleOptions("T61")}
            </label>
            <label className="block mt-3">
            T62. As an entrepreneur, I would not show dislike if the opinion of any subordinate is not agreed upon.
            {renderScaleOptions("T62")}
            </label>


        </div>

        <div>
          <h3 className="font-medium text-lg text-gray-800 mt-6">
            Inclusive Innovation
          </h3>
          {/* <label className="block mt-3">
            II1. I would produce inclusive goods for marginalized groups.
            {renderScaleOptions("II1")}
          </label> */}

          <label className="block mt-3">
        II63. I would produce inclusive goods for marginalized groups.
        {renderScaleOptions("II63")}
        </label>
        <label className="block mt-3">
        II64. I would produce inclusive goods for the commonly marginalized groups such as the poor, the disabled, the migrants, the women, the elderly, certain ethnic groups, etc.
        {renderScaleOptions("II64")}
        </label>
        <label className="block mt-3">
        II65. I would strive to achieve significantly low costs.
        {renderScaleOptions("II65")}
        </label>
        <label className="block mt-3">
        II66. I would price our product affordably low.
        {renderScaleOptions("II66")}
        </label>
        <label className="block mt-3">
        II67. I would ensure our product is accessible by the commonly marginalized groups such as the poor, the disabled, the migrants, the women, the elderly, certain ethnic groups, etc.
        {renderScaleOptions("II67")}
        </label>
        <label className="block mt-3">
        II68. I would offer products and services designed for the commonly marginalized groups that are appealing to the mass market as well.
        {renderScaleOptions("II68")}
        </label>

        </div>

        <div>
          <h3 className="font-medium text-lg text-gray-800 mt-6">Attitude</h3>
          {/* <label className="block mt-3">
            Att1. If I had opportunity and resources, I would start a business.
            {renderScaleOptions("Att1")}
          </label> */}
          <label className="block mt-3">
            Att68. If I had the opportunity and resources, I would start a business.
            {renderScaleOptions("Att68")}
            </label>
            <label className="block mt-3">
            Att69. Among various options, I prefer to be an entrepreneur.
            {renderScaleOptions("Att69")}
            </label>
            <label className="block mt-3">
            Att70. Being an entrepreneur would give me great satisfaction and involves more advantages than disadvantages to me.
            {renderScaleOptions("Att70")}
            </label>

        </div>
        <div>
          <h3 className="font-medium text-lg text-gray-800 mt-6">Subjective Norms (TPB) Items</h3>
          
          <label className="block mt-3">
  SN71. My friends would accept my decision to start a new firm.
  {renderScaleOptions("SN71")}
</label>
<label className="block mt-3">
  SN72. My immediate family would approve my decision to start a business.
  {renderScaleOptions("SN72")}
</label>
<label className="block mt-3">
  SN73. My colleagues would appreciate my decision to create a business.
  {renderScaleOptions("SN73")}
</label>


        </div>
        <div>
          <h3 className="font-medium text-lg text-gray-800 mt-6">Perceived Behavioural Control (TPB) Items</h3>
          
          <label className="block mt-3">
  PBC74. I am able to control the process of creating a new business.
  {renderScaleOptions("PBC74")}
</label>
<label className="block mt-3">
  PBC75. I think I would be completely able to start a new firm.
  {renderScaleOptions("PBC75")}
</label>
<label className="block mt-3">
  PBC76. Generally, it will be easy for me to develop a business idea.
  {renderScaleOptions("PBC76")}
</label>

        </div>
        <div>
          <h3 className="font-medium text-lg text-gray-800 mt-6">Hipster (Dream Team) Items</h3>
          
          <label className="block mt-3">
  Hip77. I am quite artistic and able to design things.
  {renderScaleOptions("Hip77")}
</label>
<label className="block mt-3">
  Hip78. I am a creative person.
  {renderScaleOptions("Hip78")}
</label>
<label className="block mt-3">
  Hip79. I am a cool person and prefer products that are different and cool.
  {renderScaleOptions("Hip79")}
</label>
<label className="block mt-3">
  Hip80. I enjoy playing with colours.
  {renderScaleOptions("Hip80")}
</label>
<label className="block mt-3">
  Hip81. The aesthetics or look of things are important to me.
  {renderScaleOptions("Hip81")}
</label>
<label className="block mt-3">
  Hip82. I believe people buy products based on looks or design.
  {renderScaleOptions("Hip82")}
</label>


        </div>
        <div>
          <h3 className="font-medium text-lg text-gray-800 mt-6">Hacker (Dream Team) Items</h3>
          
          <label className="block mt-3">
  Hac83. I am a technical person.
  {renderScaleOptions("Hac83")}
</label>
<label className="block mt-3">
  Hac84. I am very good with computers and related technologies.
  {renderScaleOptions("Hac84")}
</label>
<label className="block mt-3">
  Hac85. I am good with programming.
  {renderScaleOptions("Hac85")}
</label>
<label className="block mt-3">
  Hac86. What is inside is more important to me than how it looks outside.
  {renderScaleOptions("Hac86")}
</label>
<label className="block mt-3">
  Hac87. I like to figure out how something works.
  {renderScaleOptions("Hac87")}
</label>
<label className="block mt-3">
  Hac88. I believe people buy products based on their performance and functionality.
  {renderScaleOptions("Hac88")}
</label>



        </div>
        <div>
          <h3 className="font-medium text-lg text-gray-800 mt-6">Hustler (Dream Team) Items</h3>
          
          <label className="block mt-3">
  Hus89. I am a good communicator.
  {renderScaleOptions("Hus89")}
</label>
<label className="block mt-3">
  Hus90. I often can talk my way to get what I want.
  {renderScaleOptions("Hus90")}
</label>
<label className="block mt-3">
  Hus91. I am an outgoing person.
  {renderScaleOptions("Hus91")}
</label>
<label className="block mt-3">
  Hus92. I am good at networking and establishing connections.
  {renderScaleOptions("Hus92")}
</label>
<label className="block mt-3">
  Hus93. People often say that I am a person who 'could sell ice to the Eskimos'.
  {renderScaleOptions("Hus93")}
</label>
<label className="block mt-3">
  Hus94. I believe any product can be successful with a good sales and marketing approach.
  {renderScaleOptions("Hus94")}
</label>




        </div>
        <div>
          <h3 className="font-medium text-lg text-gray-800 mt-6">Inclusive Entrepreneurship Intention Items</h3>
          
         <label className="block mt-3">
  Y95. I’m ready to do anything to be an inclusive entrepreneur.
  {renderScaleOptions("Y95")}
</label>
<label className="block mt-3">
  Y96. My professional goal is becoming an inclusive entrepreneur.
  {renderScaleOptions("Y96")}
</label>
<label className="block mt-3">
  Y97. I will make every effort to start and run my own firm that produces inclusive products/services.
  {renderScaleOptions("Y97")}
</label>
<label className="block mt-3">
  Y98. I’m determined to create a firm in the future that produces inclusive products/services.
  {renderScaleOptions("Y98")}
</label>
<label className="block mt-3">
  Y99. I have very seriously thought about starting a firm that produces inclusive products/services.
  {renderScaleOptions("Y99")}
</label>
<label className="block mt-3">
  Y100. I’ve got the firm intention to start a firm someday that produces inclusive products/services.
  {renderScaleOptions("Y100")}
</label>


        </div>

        <div className="text-center mt-8">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Survey
          </button>
        </div>
      </form>
    </div>
  );
};

export default SurveyForm;
