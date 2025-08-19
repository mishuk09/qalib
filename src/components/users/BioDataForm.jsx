import React, { useState } from 'react';
import { motion } from "framer-motion";

const RatingScale = ({ name, label, value, onChange }) => {
    return (
        <div className="p-4 mb-6 bg-gray-50 rounded-2xl shadow-sm border border-gray-200">
            {/* Question Label */}
            <p className="text-base text-justify font-semibold text-gray-800 mb-4">{label}</p>

            {/* Scale */}
            <div className="flex items-center justify-between w-full">
                <span className="text-xs text-gray-500">Not at all</span>

                <div className="flex gap-3">
                    {[...Array(10)].map((_, i) => {
                        const val = i + 1;
                        return (
                            <motion.label
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                key={val}
                                className={`flex flex-col items-center   text-xs cursor-pointer`}
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

                <span className="text-xs text-gray-500">Definitely</span>
            </div>
        </div>
    );
};


const BioDataForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        religion: '',
        otherReligion: '',
        gender: '',
        age: '',
        residence: '',
        fathersOccupation: '',
        mothersOccupation: '',
        income: '',
        educationLevel: '',
        fieldOfStudy: '',
        university: '',
        attendedProgram: '',
        familyEntrepreneur: '',
        isEntrepreneur: '',
        priorExperience: '',
        inclusiveEntrepreneur: '',
        q1: '',  // new rating question
        q2: '',  // new rating question
        q3: '',  // new rating question
        q4: '',  // new rating question
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // You can replace this with any form submission logic (e.g., API request)
    };

    return (

        <>
            {/* <div className='items-center text-center justify-center text-lg font-semibold text-gray-800'>Update Profile</div> */}
            <div className="w-full  mx-auto p-4 bg-white shadow-lg rounded-2xl">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    📝 Student Entrepreneurship Survey
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">
                            👤 Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">
                            📧 Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                            placeholder="example@email.com"
                            required
                        />
                    </div>

                    {/* Religion */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">
                            🕌 Religion
                        </label>
                        <div className="mt-2 grid grid-cols-2 gap-3">
                            {["Islam", "Christianity", "Buddhism", "Hinduism"].map((religion) => (
                                <label
                                    key={religion}
                                    className="flex items-center space-x-2 p-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition"
                                >
                                    <input
                                        type="radio"
                                        name="religion"
                                        value={religion}
                                        onChange={handleRadioChange}
                                        checked={formData.religion === religion}
                                        className="accent-blue-500"
                                    />
                                    <span>{religion}</span>
                                </label>
                            ))}

                            {/* Others */}
                            <div className="col-span-2">
                                <label className="flex items-center space-x-2 p-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition">
                                    <input
                                        type="radio"
                                        name="religion"
                                        value="Others"
                                        onChange={handleRadioChange}
                                        checked={formData.religion === "Others"}
                                        className="accent-blue-500"
                                    />
                                    <span>Others</span>
                                </label>
                                {formData.religion === "Others" && (
                                    <input
                                        type="text"
                                        name="otherReligion"
                                        value={formData.otherReligion}
                                        onChange={handleChange}
                                        className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                                        placeholder="Specify Religion"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">
                            ⚧ Gender
                        </label>
                        <div className="mt-2 flex gap-4">
                            {["Male", "Female"].map((gender) => (
                                <label
                                    key={gender}
                                    className="flex items-center space-x-2 p-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition"
                                >
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={gender}
                                        onChange={handleRadioChange}
                                        checked={formData.gender === gender}
                                        className="accent-blue-500"
                                    />
                                    <span>{gender}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Age */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">
                            🎂 Age Group
                        </label>
                        <select
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                            required
                        >
                            <option value="">Select Age Group</option>
                            {[
                                "19 or younger",
                                "20-25",
                                "26-30",
                                "31-35",
                                "36-40",
                                "41 or older",
                            ].map((age) => (
                                <option key={age} value={age}>
                                    {age}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Residence */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">
                            🏠 Place of Residence (City & State)
                        </label>
                        <input
                            type="text"
                            name="residence"
                            value={formData.residence}
                            onChange={handleChange}
                            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                            placeholder="E.g. Kuala Lumpur, Selangor"
                            required
                        />
                    </div>

                    {/* Father's Occupation */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">
                            👔 Father’s Occupation
                        </label>
                        <input
                            type="text"
                            name="fathersOccupation"
                            value={formData.fathersOccupation}
                            onChange={handleChange}
                            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                            placeholder="E.g. Engineer, Teacher"
                            required
                        />
                    </div>

                    {/* Mother's Occupation */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">
                            👩‍👩‍👧‍👦 Mother’s Occupation
                        </label>
                        <input
                            type="text"
                            name="mothersOccupation"
                            value={formData.mothersOccupation}
                            onChange={handleChange}
                            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                            placeholder="E.g. Nurse, Businesswoman"
                            required
                        />
                    </div>

                    {/* Household Monthly Income */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">
                            💰 Household Monthly Income
                        </label>
                        <div className="mt-2 grid grid-cols-2 gap-3">
                            {[
                                "MYR 2500 >",
                                "MYR 2501 – MYR 5000",
                                "MYR 5001 – MYR 7500",
                                "MYR 7500 <",
                            ].map((income) => (
                                <label
                                    key={income}
                                    className="flex items-center text-sm space-x-2 p-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition"
                                >
                                    <input
                                        type="radio"
                                        name="income"
                                        value={income}
                                        onChange={handleRadioChange}
                                        checked={formData.income === income}
                                        className="accent-blue-500"
                                    />
                                    <span>{income}</span>
                                </label>
                            ))}
                        </div>
                    </div>


                    <div className='font-semibold text-gray-800'>Open Minded Questions</div>
                    {/* Rating Questions */}
                    <RatingScale
                        name="q1"
                        label="1. Please assess the extent of your overall embodiment (possession and expression) ofDARRURIYAT (Necessities) entrepreneurial traitsDarurriyyat entrepreneurial traits represent the Irst and basic level of purposes that essential forhuman life that every Muslim entrepreneur <necessary> to have during starting, executing,managing, and leading his business or venture. Note: Having Entrepreneurial traits does not meanto be an entrepreneur."
                        value={formData.q1}
                        onChange={handleRadioChange}
                    />

                    <RatingScale
                        name="q2"
                        label="2. Please assess the extent of your overall embodiment (possession and expression)ofHAJJIYAT (Needs) entrepreneurial traitsDajiyyat entrepreneurial traits represent the second level of purposes that less essential for humanlife than darruriyyat Qalb traits that every Muslim entrepreneur <Need> to have during starting,executing, managing, and leading his business or venture. Note: Having Entrepreneurial traits doesnot mean to be an entrepreneur."
                        value={formData.q2}
                        onChange={handleRadioChange}
                    />

                    <RatingScale
                        name="q3"
                        label="3. Please assess the extent of your overall embodiment (possession and expression) ofthe TAHSINIYYAT (Luxuries) entrepreneurial traitsTahsiniyyat entrepreneurial traits represent the third and highest level of purposes that beautifyinghuman life, which is higher than darruriyyat Qalb traits and hajiyyat Qalb traits, that every Muslimentrepreneur <better> to have during starting, executing, managing, and leading his business orventure. Note: Having Entrepreneurial traits does not mean to be an entrepreneur."
                        value={formData.q3}
                        onChange={handleRadioChange}
                    />

                    <RatingScale
                        name="q4"
                        label="4. Please assess the extent of being inclusive innovative *The inclusive innovativeness is a trait represents the level of inclusive innovation of the Muslimyouth who has the capacity to innovate inclusively."
                        value={formData.q4}
                        onChange={handleRadioChange}
                    />



                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:scale-[1.02] hover:shadow-lg transition-all"
                    >
                        🚀 Submit Response
                    </button>
                </form>
            </div>

        </>
    );
};

export default BioDataForm;
