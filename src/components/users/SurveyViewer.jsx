import React, { useState, useEffect } from 'react';
import { Loader2, Zap, AlertTriangle, CheckCircle } from 'lucide-react';

// Custom Modal Component for non-alert messages
const CustomMessageModal = ({ message, type, onClose }) => {
  if (!message) return null;

  const icon = type === 'error' ? <AlertTriangle className="w-6 h-6 text-red-600" /> 
             : type === 'success' ? <CheckCircle className="w-6 h-6 text-green-600" />
             : <Zap className="w-6 h-6 text-indigo-600" />;
  
  const title = type === 'error' ? 'Operation Failed' : 'Information';
  const color = type === 'error' ? 'border-red-500' : 'border-indigo-500';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm transform transition-all border-t-4 ${color}`}>
        <div className="flex items-center space-x-3">
          {icon}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="mt-4 text-sm text-gray-600">{message}</p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const API_ENDPOINT = "http://127.0.0.1:5000/api/get-survey";

const SurveyViewer = () => {
  const [surveyData, setSurveyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalMessage, setModalMessage] = useState(null);
  const [modalType, setModalType] = useState('info');

  const showModal = (message, type = 'info') => {
    setModalMessage(message);
    setModalType(type);
  };

  const closeModal = () => {
    setModalMessage(null);
  };

  useEffect(() => {
    const fetchSurveyData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        showModal("You must be logged in to view your survey data.", 'error');
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(API_ENDPOINT, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Pass the token for backend authentication
            "Authorization": `Bearer ${token}`, 
          },
        });

        const data = await res.json();
        
        if (res.ok) {
          setSurveyData(data.survey);
        } else {
          setError(data.error || "Failed to fetch survey data.");
          showModal(data.error || "An unknown error occurred while fetching data.", 'error');
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Network error: Could not connect to the server.");
        showModal("Network error: Could not connect to the server.", 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurveyData();
  }, []);

  // Helper to make the keys look nicer (e.g., 'D1' -> 'Question D1')
  const formatKey = (key) => {
    if (typeof key !== 'string') return '';
    if (key.startsWith('D')) return `Darruriyat Item ${key.substring(1)}`;
    if (key.startsWith('Hac')) return `Hacker Item ${key.substring(3)}`;
    if (key.startsWith('Hip')) return `Hipster Item ${key.substring(3)}`;
    if (key.startsWith('Hus')) return `Hustler Item ${key.substring(3)}`;
    return key; // Fallback for other keys
  };

  // Rendering logic
  let content;
  
  if (isLoading) {
    content = (
      <div className="flex flex-col items-center justify-center p-8 space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <p className="text-gray-500">Loading your survey data...</p>
      </div>
    );
  } else if (error) {
    content = (
      <div className="p-6 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg shadow-md">
        <p className="font-semibold">Error:</p>
        <p>{error}</p>
        <p className="mt-2 text-sm">Please check your network connection and ensure you are logged in correctly.</p>
      </div>
    );
  } else if (surveyData && Object.keys(surveyData).length === 0) {
    content = (
      <div className="p-6 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 rounded-lg shadow-md">
        <p className="font-semibold">No Survey Data Found</p>
        <p>It looks like you haven't completed the survey yet, or the data is empty.</p>
      </div>
    );
  } else if (surveyData) {
    const surveyEntries = Object.entries(surveyData);
    
    // Grouping for better display
    const groups = surveyEntries.reduce((acc, [key, value]) => {
      const prefix = key.match(/^[A-Za-z]+/)?.[0] || 'Misc';
      if (!acc[prefix]) {
        acc[prefix] = [];
      }
      acc[prefix].push({ key, value });
      return acc;
    }, {});
    
    content = (
      <div className="space-y-6">
        {Object.entries(groups).map(([prefix, entries]) => (
          <div key={prefix} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b pb-2">
              {prefix} Section ({entries.length} Items)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {entries.map(({ key, value }) => (
                <div key={key} className="p-3 bg-gray-50 rounded-lg shadow-inner">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {key}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-indigo-600">
                    {value === "" ? "N/A (Empty)" : value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          My Completed Survey Responses
        </h1>
        
        <div className="relative">
          {content}
        </div>
      </div>

      <CustomMessageModal 
        message={modalMessage} 
        type={modalType} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default SurveyViewer;