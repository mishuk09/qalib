import { motion } from "framer-motion";
import { useState } from "react";

const RatingScale = ({ name, label, value, onChange }) => {
    return (
        <div className="p-4 mb-6 bg-white  rounded-2xl shadow-sm border border-gray-200">
            {/* Question Label */}
            <p className="text-base text-justify font-semibold text-gray-800 mb-4">{label}</p>

            {/* Scale */}
            <div className="flex items-center justify-between w-full">
                <span className="text-xs text-gray-500">Strongly Disagree</span>

                <div className="flex gap-3">
                    {[...Array(5)].map((_, i) => {
                        const val = i + 1;
                        return (
                            <motion.label
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                key={val}
                                className="flex flex-col items-center text-xs cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    name={name}
                                    value={val}
                                    checked={value === String(val)}
                                    onChange={onChange}
                                    className="hidden"
                                />
                                <div
                                    className={`w-9 h-9 flex items-center justify-center rounded-full border-2 transition-all 
                    ${value === String(val)
                                            ? "bg-blue-500 text-white border-blue-500 shadow-md"
                                            : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                                        }`}
                                >
                                    {val}
                                </div>
                            </motion.label>
                        );
                    })}
                </div>

                <span className="text-xs text-gray-500">Strongly Agree</span>
            </div>
        </div>
    );
};

const BehaviorQuestion = () => {
    const [formData, setFormData] = useState({

        // 2(A). Trustworthy
        twoaq1: '',
        twoaq2: '',
        twoaq3: '',
        twoaq4: '',
        twoaq5: '',

        // 2(B).	Concern for the Welfare
        twobq6: '',
        twobq7: '',
        twobq8: '',
        twobq9: '',
        twobq10: '',
        twobq11: '',
        twobq12: '',
        twobq13: '',

        // 2(C).	Do not Waste
        twocq14: '',
        twocq15: '',
        twocq16: '',
        twocq17: '',
        twocq18: '',
        twocq19: '',
        twocq20: '',
        twocq21: '',

        // 2(D).	Caring for the Society and Environment
        twodq22: '',
        twodq23: '',
        twodq24: '',
        twodq25: '',

        // 2(E).	Faith (Taqwa) to Allah when running a business

        twoeq26: '',
        twoeq27: '',
        twoeq28: '',
        twoeq29: '',
        twoeq30: '',
        twoeq31: '',

        // 2(F).	6. Halal as a Top Priority

        twofq32: '',
        twofq33: '',
        twofq34: '',

        // 2(G).	Worship to Allah is a Priority
        twogq35: '',
        twogq36: '',

        // 2(H).	Practicing High Moral Values
        twohq37: '',
        twohq38: '',
        twohq39: '',
        twohq40: '',
        twohq41: '',
        twohq42: '',
        twohq43: '',
        twohq44: '',
        twohq45: '',
        twohq46: '',
        twohq47: '',
        twohq48: '',
        twohq49: '',
        twohq50: '',
        twohq51: '',
        twohq52: '',
        twohq53: '',
        twohq54: '',
        twohq55: '',
        twohq56: '',
        twohq57: '',

        // 2(I).	Knowledgeable
        twoiq58: '',
        twoiq59: '',
        twoiq60: '',
        twoiq61: '',
        twoiq62: '',
        twoiq63: '',


        // SECTION 3. INCLUSIVE INNOVATIVENESS
        three64: '',
        three65: '',
        three66: '',
        three67: '',
        three68: '',


        // SECTION 4. INCLUSIVE ENTREPRENEURSHIP INTENTION

        four69: '',
        four70: '',
        four71: '',
        four72: '',
        four73: '',
        four74: '',

        // SECTION 5. RELIGIOSITY

        five75: '',
        five76: '',
        five77: '',
        five78: '',
        five79: '',

        // SECTION 6. THEORY OF PLAN BEHAVIOR

        // 6(A).	Attitude
        sixa80: '',
        sixa81: '',
        sixa82: '',
        sixa83: '',


        // 6(B).	Subjective Norms

        sixb84: '',
        sixb85: '',
        sixb86: '',

        // 6(C).	Perceived Behavioural Control
        sixc87: '',
        sixc88: '',
        sixc89: '',
        sixc90: '',
        sixc91: '',



    });

    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div>
            <form action="">
                <div className='font-bold text-gray-800 text-lg mb-4'>❓ QALB BEHAVIORAL TRAITS</div>

                {/* ================= SECTION 2. QALB BEHAVIORAL TRAITS ================= */}

                {/* 2(A). Trustworthy */}
                <div className="p-4 bg-blue-50 rounded-xl shadow-md mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">2(A). Trustworthy</h2>
                    <RatingScale name="twoaq1" label="1. I am someone who strives to fulfil the organization’s trust" value={formData.twoaq1} onChange={handleRadioChange} />
                    <RatingScale name="twoaq2" label="2. I am someone who leads by following the guidelines set by the organization" value={formData.twoaq2} onChange={handleRadioChange} />
                    <RatingScale name="twoaq3" label="3. I would be an honest entrepreneur with high integrity" value={formData.twoaq3} onChange={handleRadioChange} />
                    <RatingScale name="twoaq4" label="4. I practice high levels of responsibility and trustworthiness when leading and controlling an organization" value={formData.twoaq4} onChange={handleRadioChange} />
                    <RatingScale name="twoaq5" label="5. As entrepreneur, I am responsible for the expenses in the organization" value={formData.twoaq5} onChange={handleRadioChange} />
                </div>

                {/* 2(B). Concern for the Welfare */}
                <div className="p-4 bg-blue-50 rounded-xl shadow-md mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">2(B). Concern for the Welfare</h2>
                    <RatingScale name="twobq6" label="6. As an entrepreneur, I would advise employees on religious matters" value={formData.twobq6} onChange={handleRadioChange} />
                    <RatingScale name="twobq7" label="7. As an entrepreneur, I would exercise my powers to ensure my employees' rights are safeguarded" value={formData.twobq7} onChange={handleRadioChange} />
                    <RatingScale name="twobq8" label="8. As an entrepreneur, I am responsible for the failure of my employees in the organization" value={formData.twobq8} onChange={handleRadioChange} />
                    <RatingScale name="twobq9" label="9. As an entrepreneur, I would educate the employees to practice good manners" value={formData.twobq9} onChange={handleRadioChange} />
                    <RatingScale name="twobq10" label="10. As an entrepreneur, I would give sincere advice to the subordinates so that their well-being is protected" value={formData.twobq10} onChange={handleRadioChange} />
                    <RatingScale name="twobq11" label="11. As an entrepreneur, I do not blame the employees for their failure" value={formData.twobq11} onChange={handleRadioChange} />
                    <RatingScale name="twobq12" label="12. As an entrepreneur, I use simple and courteous approach in building relationship with the employees that benefits the organization" value={formData.twobq12} onChange={handleRadioChange} />
                    <RatingScale name="twobq13" label="13. As an entrepreneur I would ensure mutual trust exists between the employees" value={formData.twobq13} onChange={handleRadioChange} />
                </div>

                {/* 2(C). Do not Waste */}
                <div className="p-4 bg-blue-50 rounded-xl shadow-md mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">2(C). Do not Waste</h2>
                    <RatingScale name="twocq14" label="14. As an entrepreneur, I would refrain from making decisions resulting in any wrongdoing" value={formData.twocq14} onChange={handleRadioChange} />
                    <RatingScale name="twocq15" label="15. As an entrepreneur, I do not compromise with any kind of wrongdoings" value={formData.twocq15} onChange={handleRadioChange} />
                    <RatingScale name="twocq16" label="16. I practice saving resources when in the workplace" value={formData.twocq16} onChange={handleRadioChange} />
                    <RatingScale name="twocq17" label="17. I utilize time effectively" value={formData.twocq17} onChange={handleRadioChange} />
                    <RatingScale name="twocq18" label="18. I always consider own abilities before performing any job" value={formData.twocq18} onChange={handleRadioChange} />
                    <RatingScale name="twocq19" label="19. I always manage the time efficiently" value={formData.twocq19} onChange={handleRadioChange} />
                    <RatingScale name="twocq20" label="20. As an entrepreneur, I would work together with the employees" value={formData.twocq20} onChange={handleRadioChange} />
                    <RatingScale name="twocq21" label="21. As an entrepreneur, I would try to optimize the usage of equipment and resources in the organization" value={formData.twocq21} onChange={handleRadioChange} />
                </div>

                {/* 2(D). Caring for the Society and Environment */}
                <div className="p-4 bg-blue-50 rounded-xl shadow-md mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">2(D). Caring for the Society and Environment</h2>
                    <RatingScale name="twodq22" label="22. As an entrepreneur, I encourage the organization and the employees to engage in charity by helping the poor and needy" value={formData.twodq22} onChange={handleRadioChange} />
                    <RatingScale name="twodq23" label="23. As an entrepreneur, I encourage the organization’s corporate social responsibility (CSR) policy prioritizes charitable activity" value={formData.twodq23} onChange={handleRadioChange} />
                    <RatingScale name="twodq24" label="24. I engage in charity to give back to society" value={formData.twodq24} onChange={handleRadioChange} />
                    <RatingScale name="twodq25" label="25. As an entrepreneur, I demonstrate a serious approach to maintain a conducive work environment" value={formData.twodq25} onChange={handleRadioChange} />
                </div>

                {/* 2(E). Faith (Taqwa) to Allah when running a business */}
                <div className="p-4 bg-blue-50 rounded-xl shadow-md mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">2(E). Faith (Taqwa) to Allah when running a business</h2>
                    <RatingScale name="twoeq26" label="26. I realize that status and rank are tests from Allah (SWT)" value={formData.twoeq26} onChange={handleRadioChange} />
                    <RatingScale name="twoeq27" label="27. Religion is important factor in entrepreneurship" value={formData.twoeq27} onChange={handleRadioChange} />
                    <RatingScale name="twoeq28" label="28. I always refrain from spiritual sin" value={formData.twoeq28} onChange={handleRadioChange} />
                    <RatingScale name="twoeq29" label="29. I believe that any wrongdoings committed on my part will receive punishment from Allah (SWT)" value={formData.twoeq29} onChange={handleRadioChange} />
                    <RatingScale name="twoeq30" label="30. I would correct any organization and entrepreneur that provides a wrong perception of Islam" value={formData.twoeq30} onChange={handleRadioChange} />
                    <RatingScale name="twoeq31" label="31. As an entrepreneur I would not deal with any organization that is against Islamic teachings" value={formData.twoeq31} onChange={handleRadioChange} />
                </div>

                {/* 2(F). Halal as a Top Priority */}
                <div className="p-4 bg-blue-50 rounded-xl shadow-md mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">2(F). Halal as a Top Priority</h2>
                    <RatingScale name="twofq32" label="32. As an entrepreneur, I believe that every human, especially a leader, is obliged to do what is permitted and leave what is forbidden in the religion" value={formData.twofq32} onChange={handleRadioChange} />
                    <RatingScale name="twofq33" label="33. As an entrepreneur, I would put high priority the use of Halal resources within the organization" value={formData.twofq33} onChange={handleRadioChange} />
                    <RatingScale name="twofq34" label="34. I believe fear of God prevails in daily course of life" value={formData.twofq34} onChange={handleRadioChange} />
                </div>

                {/* 2(G). Worship to Allah is a Priority */}
                <div className="p-4 bg-blue-50 rounded-xl shadow-md mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">2(G). Worship to Allah is a Priority</h2>
                    <RatingScale name="twogq35" label="35. I believe an entrepreneur must obey and carry out the orders of Allah and His Messengers" value={formData.twogq35} onChange={handleRadioChange} />
                    <RatingScale name="twogq36" label="36. I believe every opinion or suggestion should be thoroughly examined" value={formData.twogq36} onChange={handleRadioChange} />
                </div>

                {/* 2(H). Practicing High Moral Values */}
                <div className="p-4 bg-blue-50 rounded-xl shadow-md mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">2(H). Practicing High Moral Values</h2>
                    <RatingScale name="twohq37" label="37. I would refrain from making a decision when angry" value={formData.twohq37} onChange={handleRadioChange} />
                    <RatingScale name="twohq38" label="38. As an entrepreneur, I would emphasize to the employees to always be patient in achieving their goals" value={formData.twohq38} onChange={handleRadioChange} />
                    <RatingScale name="twohq39" label="39. I believe a decision should be made in calm conditions" value={formData.twohq39} onChange={handleRadioChange} />
                    <RatingScale name="twohq40" label="40. I would strive to exhibit Prophet Muhammad (SAW)'s generosity" value={formData.twohq40} onChange={handleRadioChange} />
                    <RatingScale name="twohq41" label="41. As an entrepreneur, I would work hard to avoid injustice to the employees" value={formData.twohq41} onChange={handleRadioChange} />
                    <RatingScale name="twohq42" label="42. As an entrepreneur, I would ensure that I am not partial while exercising power" value={formData.twohq42} onChange={handleRadioChange} />
                    <RatingScale name="twohq43" label="43. I always strive to balance work and personal matters" value={formData.twohq43} onChange={handleRadioChange} />
                    <RatingScale name="twohq44" label="44. As an entrepreneur, I would always conduct check-and-balance while making any decision so that principles are aligned with the organization’s goals" value={formData.twohq44} onChange={handleRadioChange} />
                    <RatingScale name="twohq45" label="45. I always choose to befriend good people" value={formData.twohq45} onChange={handleRadioChange} />
                    <RatingScale name="twohq46" label="46. I always prefer not to choose a bad companion" value={formData.twohq46} onChange={handleRadioChange} />
                    <RatingScale name="twohq47" label="47. I would only share my ideas and thoughts only to those who really want to listen" value={formData.twohq47} onChange={handleRadioChange} />
                    <RatingScale name="twohq48" label="48. I would fulfil the rights of all regardless their backgrounds" value={formData.twohq48} onChange={handleRadioChange} />
                    <RatingScale name="twohq49" label="49. As an entrepreneur, I must always look cheerful when meeting with people, whether like or dislike them" value={formData.twohq49} onChange={handleRadioChange} />
                    <RatingScale name="twohq50" label="50. As an entrepreneur, I would be fair to anyone in managing organizational conflict" value={formData.twohq50} onChange={handleRadioChange} />
                    <RatingScale name="twohq51" label="51. As an entrepreneur, I would try to minimize conflict by addressing the need of each and every employee" value={formData.twohq51} onChange={handleRadioChange} />
                    <RatingScale name="twohq52" label="52. I always adopt polite communication skills when delivering information" value={formData.twohq52} onChange={handleRadioChange} />
                    <RatingScale name="twohq53" label="53. As an entrepreneur, I would not show dislike if the opinion of any subordinate is not agreed upon" value={formData.twohq53} onChange={handleRadioChange} />
                    <RatingScale name="twohq54" label="54. As an entrepreneur, I would be flexible yet still would uphold the key principle of the organization" value={formData.twohq54} onChange={handleRadioChange} />
                    <RatingScale name="twohq55" label="55. I always exercise tolerance in a task to be a flexible person" value={formData.twohq55} onChange={handleRadioChange} />
                    <RatingScale name="twohq56" label="56. As an entrepreneur, I would prioritize harmony in the organization" value={formData.twohq56} onChange={handleRadioChange} />
                    <RatingScale name="twohq57" label="57. As an entrepreneur, I would exercise diligence when making decisions" value={formData.twohq57} onChange={handleRadioChange} />
                </div>

                {/* 2(I). Knowledgeable */}
                <div className="p-4 bg-blue-50 rounded-xl shadow-md mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">2(I). Knowledgeable</h2>
                    <RatingScale name="twoiq58" label="58. As an entrepreneur, I would always be alert to the development of competitors" value={formData.twoiq58} onChange={handleRadioChange} />
                    <RatingScale name="twoiq59" label="59. I believe an entrepreneur should be wise and mature when delivering speech so that she/he will be heard by the employees" value={formData.twoiq59} onChange={handleRadioChange} />
                    <RatingScale name="twoiq60" label="60. When dealing with any conflicting personality, to disagree I would follow logical approach and argument/justification" value={formData.twoiq60} onChange={handleRadioChange} />
                    <RatingScale name="twoiq61" label="61. As an entrepreneur, in general I believe the employees are trustworthy in performing their duties" value={formData.twoiq61} onChange={handleRadioChange} />
                    <RatingScale name="twoiq62" label="62. As an entrepreneur I trust the employees are able to perform their duties" value={formData.twoiq62} onChange={handleRadioChange} />
                    <RatingScale name="twoiq63" label="63. As an entrepreneur, in general I believe decisions made by the employees are free from any influence by their immediate superiors" value={formData.twoiq63} onChange={handleRadioChange} />
                </div>



                {/* SECTION 3. INCLUSIVE INNOVATIVENESS */}

                <div className="p-4 bg-blue-50 rounded-xl shadow-md mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">3. Inclusive Innovativeness</h2>
                    <RatingScale
                        name="three64"
                        label="64. I would produce inclusive goods for the commonly marginalized groups such as the poor, the disabled, the migrants, the women, the elderly, certain ethnic group, etc"
                        value={formData.three64}
                        onChange={handleRadioChange}
                    />

                    <RatingScale
                        name="three65"
                        label="65. I would strive to achieve significantly low costs"
                        value={formData.three65}
                        onChange={handleRadioChange}
                    />

                    <RatingScale
                        name="three66"
                        label="66. I would price our product affordably low"
                        value={formData.three66}
                        onChange={handleRadioChange}
                    />

                    <RatingScale
                        name="three67"
                        label="67. I would ensure our product is accessible by the commonly marginalized groups such as the poor, the disabled, the migrants, the women, the elderly, certain ethnic group, etc"
                        value={formData.three67}
                        onChange={handleRadioChange}
                    />

                    <RatingScale
                        name="three68"
                        label="68. I would offer products and services designed for the commonly marginalized groups that is appealing to the mass market as well"
                        value={formData.three68}
                        onChange={handleRadioChange}
                    />

                </div>


                {/* SECTION 4. INCLUSIVE ENTREPRENEURSHIP INTENTION */}

                <div className="p-4 bg-blue-50 rounded-xl shadow-md mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">INCLUSIVE ENTREPRENEURSHIP INTENTION</h2>
                    <RatingScale
                        name="four69"
                        label="69. I’m ready to do anything to be an inclusive entrepreneur"
                        value={formData.four69}
                        onChange={handleRadioChange}
                    />

                    <RatingScale
                        name="four70"
                        label="70. My professional goal is becoming an inclusive entrepreneur"
                        value={formData.four70}
                        onChange={handleRadioChange}
                    />

                    <RatingScale
                        name="four71"
                        label="71. I will make every effort to start and run my own firm that produce inclusive products/services"
                        value={formData.four71}
                        onChange={handleRadioChange}
                    />

                    <RatingScale
                        name="four72"
                        label="72. I’m determined to create a firm in the future that produce inclusive products/services"
                        value={formData.four72}
                        onChange={handleRadioChange}
                    />

                    <RatingScale
                        name="four73"
                        label="73. I have very seriously thought in starting a firm that produce inclusive products/services"
                        value={formData.four73}
                        onChange={handleRadioChange}
                    />

                    <RatingScale
                        name="four74"
                        label="74. I’ve got the firm intention to start a firm someday that produce inclusive products/services"
                        value={formData.four74}
                        onChange={handleRadioChange}
                    />

                </div>


                {/* SECTION 5. RELIGIOSITY */}
                <div className="p-4 bg-blue-50 rounded-xl shadow-md mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">RELIGIOSITY</h2>
                    <RatingScale
                        name="five75"
                        label="75. I use the lessons from the Qur'an/Holy book/Scriptures in my conversations"
                        value={formData.five75}
                        onChange={handleRadioChange}
                    />


                    <RatingScale
                        name="five76"
                        label="76. I am the first to greet when meeting another person"
                        value={formData.five76}
                        onChange={handleRadioChange}
                    />

                    <RatingScale
                        name="five77"
                        label="77. I fulfil all my promises"
                        value={formData.five77}
                        onChange={handleRadioChange}
                    />

                    <RatingScale
                        name="five78"
                        label="78. I perceive those who are not the same religion as mine as potential believers of my religion"
                        value={formData.five78}
                        onChange={handleRadioChange}
                    />

                    <RatingScale
                        name="five79"
                        label="79. I respect those who are not the same religion as mine"
                        value={formData.five79}
                        onChange={handleRadioChange}
                    />

                </div>


                {/* SECTION 6. THEORY OF PLANNED BEHAVIOR */}


                {/* 6(A). Attitude */}

                <div className="p-4 bg-blue-50 rounded-xl shadow-md mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Attitude</h2>
                    <RatingScale
                        name="sixa80"
                        label="80. If I had opportunity and resources, I would start a business"
                        value={formData.sixa80}
                        onChange={handleRadioChange}
                    />

                    <RatingScale
                        name="sixa81"
                        label="81. Among various options, I prefer to be an entrepreneur"
                        value={formData.sixa81}
                        onChange={handleRadioChange}
                    />

                    <RatingScale
                        name="sixa82"
                        label="82. Being an entrepreneur would give me great satisfaction and involves more advantages than disadvantages to me"
                        value={formData.sixa82}
                        onChange={handleRadioChange}
                    />

                    <RatingScale
                        name="sixa83"
                        label="83. I believe entrepreneurship is a desirable career choice for me"
                        value={formData.sixa83}
                        onChange={handleRadioChange}
                    />

                </div>

                {/* 6(B). Subjective Norms */}
                <div className="p-4 bg-blue-50 rounded-xl shadow-md mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Subjective Norms</h2>
                    <RatingScale
                        name="sixb84"
                        label="84. My friends would accept my decision to start a new firm"
                        value={formData.sixb84}
                        onChange={handleRadioChange}
                    />

                    <RatingScale
                        name="sixb85"
                        label="85. My immediate family would approve my decision to start a business"
                        value={formData.sixb85}
                        onChange={handleRadioChange}
                    />

                    <RatingScale
                        name="sixb86"
                        label="86. My colleagues would appreciate my decision to create a business"
                        value={formData.sixb86}
                        onChange={handleRadioChange}
                    />

                </div>

                {/* 6(C). Perceived Behavioural Control */}

                <div className="p-4 bg-blue-50 rounded-xl shadow-md mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Perceived Behavioural Control</h2>
                    <RatingScale
                        name="sixc87"
                        label="87. I am able to control the process of creating a new business"
                        value={formData.sixc87}
                        onChange={handleRadioChange}
                    />

                    <RatingScale
                        name="sixc88"
                        label="88. I think I would be completely able to start a new firm"
                        value={formData.sixc88}
                        onChange={handleRadioChange}
                    />

                    <RatingScale
                        name="sixc89"
                        label="89. Generally it will be easy for me to develop a business idea"
                        value={formData.sixc89}
                        onChange={handleRadioChange}
                    />

                    <RatingScale
                        name="sixc90"
                        label="90. I have the skills and knowledge required to start a business"
                        value={formData.sixc90}
                        onChange={handleRadioChange}
                    />

                    <RatingScale
                        name="sixc91"
                        label="91. Starting a business is within my control"
                        value={formData.sixc91}
                        onChange={handleRadioChange}
                    />

                </div>

                <button
                    type="submit"
                    className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:scale-[1.02] hover:shadow-lg transition-all"
                >
                    🚀 Submit Response
                </button>
            </form>
        </div>
    );
};

export default BehaviorQuestion;
