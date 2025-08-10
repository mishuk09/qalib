import underimg from '../assets/underimg.png';

const Home = () => {
    return (
        <div className="w-full px-3 pb-6 md:px-0 relative h-auto flex flex-col items-center bg-blue-50">
            {/* Wallet Connect Section */}
           

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center mt-36">
                {/* Title */}
                <h1 className="text-3xl md:text-5xl font-bold text-gray-800 text-center">
                    👋 Discover the Future of Startups with
                    <span className="text-blue-600 inline-block ms-3 relative">
                        Qaliv
                        {/* Underline Image */}
                        <div className="absolute mt-[-4px] left-0">
                            <img
                                src={underimg}
                                alt="underline effect"
                                className="w-[140px] h-auto"
                            />
                        </div>
                    </span>
                </h1>

                {/* Subtext */}
                <p className="text-gray-600 mt-4 font-medium text-sm md:text-base mb-4 px-4 text-center max-w-xl">
                    Connect your profile to begin your entrepreneurial journey with Qalib.
                </p>

                {/* Start Button */}
                <div className="flex justify-center mt-4">
                    <a
                        href="/register"
                        className="px-14 md:px-20 bg-blue-500 hover:bg-white hover:text-black hover:ring-1 hover:ring-blue-600 duration-300 transition-all ease-in-out text-white py-2 rounded text-base md:text-lg font-medium"
                    >
                        Start
                    </a>
                </div>

                {/* Description */}
                <div className="mt-14 text-center max-w-4xl bg-white border-2 border-blue-500 p-4 rounded-lg shadow-lg">
                    <p className="text-gray-600 leading-relaxed">
                        Discover how Qaliv is shaping the entrepreneurial intentions of
                        Muslim youth in Malaysia through Qalb behavioral traits and
                        inclusive innovation. Join us in empowering underrepresented
                        communities.
                    </p>
                </div>

                {/* Steps to Success */}
                {/* Steps Section */}
                {/* Steps Section */}
                <div className="mt-14 max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {/* Step 1 */}
                        <div className="p-5 bg-blue-50 rounded-lg hover:shadow-md transition-shadow">
                            <h3 className="font-semibold text-lg text-blue-700 mb-2">
                                1️⃣ Connect Profile
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Create your profile to access resources and opportunities.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="p-5 bg-blue-50 rounded-lg hover:shadow-md transition-shadow">
                            <h3 className="font-semibold text-lg text-blue-700 mb-2">
                                🎯 Set Goals
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Define your business or social impact objectives.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="p-5 bg-blue-50 rounded-lg hover:shadow-md transition-shadow">
                            <h3 className="font-semibold text-lg text-blue-700 mb-2">
                                🤝 Collaborate
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Connect with others and share ideas.
                            </p>
                        </div>

                        {/* Step 4 */}
                        <div className="p-5 bg-blue-50 rounded-lg hover:shadow-md transition-shadow">
                            <h3 className="font-semibold text-lg text-blue-700 mb-2">
                                ⚡ Take Action
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Turn ideas into reality with Qaliv’s support.
                            </p>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Home;
