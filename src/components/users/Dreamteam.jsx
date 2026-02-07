import { Users } from "lucide-react";
import Sidebar from "../../utills/Sidebar";

const DreamTeam = () => {
  return (
    <>
      <div className="bg-blue-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3">
            <Sidebar />
          </aside>
          <main className="lg:col-span-9 space-y-6">
            {/* Profile header card */}

            <section className=" ">
              <div className="  bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                <div className="w-full max-w-4xl text-center">
                  <div className="bg-white rounded-2xl shadow-lg p-10 md:p-16">
                    {/* Title */}
                    <h2 className="flex items-center justify-center gap-2  font-semibold text-gray-800 mb-6">
                      <span className="text-green-500"><Users /></span>
                      Big Five Personality Survey
                    </h2>

                    {/* Coming Soon */}
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                      Coming Soon<span className="text-gray-500"></span>
                    </h1>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default DreamTeam;
