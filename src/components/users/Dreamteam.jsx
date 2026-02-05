const DreamTeam = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Empty State Container */}
        <div className="bg-white rounded-2xl shadow-xl p-10 md:p-16">
          {/* Large Icon */}
          <div className="text-7xl mb-6">👥</div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-3">No Dream Team Yet</h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Complete the survey to get your personalized Dream Team recommendations based on your
            skills and personality profile.
          </p>

          {/* Features List */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span>✨</span> What You'll Get
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-xl">🎨</span>
                <span>Perfect matches for your Hipster qualities</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-xl">⚙️</span>
                <span>Hacker collaborators who complement your tech skills</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-xl">🚀</span>
                <span>Hustler partners to boost your sales and networking</span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
              📋 Take Survey
            </button>
            <button className="px-8 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition duration-300 transform hover:scale-105">
              ℹ️ Learn More
            </button>
          </div> */}

          {/* Footer Text */}
          <p className="text-sm text-gray-500 mt-8">
            🎯 Your Dream Team awaits. Complete the survey now!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DreamTeam;
