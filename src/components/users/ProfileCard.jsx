import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from 'react-icons/fa';
import useUserData from "../../utills/useUserData";
import MiniLoading from '../../utills/miniLoading';


export default function ProfileCard() {
  const { userData, loading, error } = useUserData();



  return (
    <>


      <div className="bg-blue-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Main column - 9/12 (75%) on large screens --> use lg:col-span-9 */}
          <main className="lg:col-span-9 space-y-6">

            {/* Profile header card */}
            <section className="bg-white rounded-xl shadow p-3 overflow-hidden">
              <div className="relative">
                {/* Cover/banner */}
                <div className="h-44 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-lg" />

                {/* Avatar (overlapping) */}
                <div className="absolute left-6 top-26">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Profile"
                    className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-md"
                  />
                </div>

                {/* Profile content (moved right to leave room for avatar) */}
                <div className="ml-4  pt-10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">

                    <div>
                      <h1 className="text-2xl font-semibold text-gray-900"><h1>{loading ? <MiniLoading /> : userData?.name}</h1>
                      </h1>
                      <p className="text-sm text-gray-500 mt-1">Full-Stack Developer · MERN Stack · React · NoSQL</p>
                      <p className="text-sm text-gray-400 mt-1">Melaka, Malacca · Multimedia University</p>
                    </div>

                    <div className="mt-4 md:mt-0 flex items-center gap-3">
                      <a
                        href="https://mishukinfo.com"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition"
                        aria-label="Visit website"
                      >
                        <FaGlobe /> <span>Website</span>
                      </a>

                      <button
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition"
                        aria-pressed="false"
                      >
                        Open to work
                      </button>
                    </div>

                  </div>

                  {/* Socials & contact */}
                  <div className="mt-4 flex items-center gap-3">
                    <a
                      href="https://github.com/mishuk09"
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-600 hover:text-black transition"
                      aria-label="GitHub"
                    >
                      <FaGithub size={20} />
                    </a>
                    <a
                      href="https://www.linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin size={20} />
                    </a>
                    <a
                      href="mailto:your.email@example.com"
                      className="text-gray-600 hover:text-indigo-600 transition"
                      aria-label="Email"
                    >
                      <FaEnvelope size={18} />
                    </a>
                  </div>

                  {/* Quick stats */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-xs text-gray-500">Profile views</div>
                      <div className="font-semibold">104</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-xs text-gray-500">Post impressions</div>
                      <div className="font-semibold">1,227</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-xs text-gray-500">Followers</div>
                      <div className="font-semibold">1,391</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-xs text-gray-500">Connections</div>
                      <div className="font-semibold">500+</div>
                    </div>
                  </div>

                  {/* About & Skills */}
                  <div className="mt-6 border-t pt-4">
                    <h2 className="font-semibold text-gray-800">About</h2>
                    <p className="text-sm text-gray-600 mt-2">
                      I build full-stack web applications using the MERN stack. I enjoy turning Figma designs into responsive React apps, integrating APIs, and exploring AI/ML workflows.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind', 'Next.js'].map((tag) => (
                        <span key={tag} className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sample post / activity card */}
            {/* <section className="bg-white rounded-xl shadow p-6">
              <div className="flex items-start gap-4">
                <img
                  src="https://via.placeholder.com/80"
                  alt="actor"
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Mohnad Moamen</h3>
                      <p className="text-xs text-gray-500">Automation Architect at e& UAE</p>
                    </div>
                    <div className="text-xs text-gray-400">2d</div>
                  </div>

                  <p className="mt-3 text-sm text-gray-600">Mohnad started a new position — congratulations!</p>

                  <div className="mt-4 flex gap-3">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Like</button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">Comment</button>
                    <button className="px-4 py-2 bg-yellow-300 text-black rounded-lg hover:bg-yellow-400 transition">Congratulate</button>
                  </div>
                </div>
              </div>
            </section> */}

          </main>

          {/* Right column - 3/12 (25%) on large screens --> use lg:col-span-3 */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow p-4 sticky top-24">
              <h3 className="font-semibold mb-3">People you may know</h3>

              <ul className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200" />
                      <div>
                        <div className="text-sm font-semibold">User {i}</div>
                        <div className="text-xs text-gray-400">Role · Company</div>
                      </div>
                    </div>
                    <button className="text-blue-600 text-sm">Connect</button>
                  </li>
                ))}
              </ul>

              <div className="mt-4 border-t pt-4 text-sm text-gray-500">© 2025 Qalib Network</div>
            </div>
          </aside>

        </div>
      </div>
    </>
  );
}
