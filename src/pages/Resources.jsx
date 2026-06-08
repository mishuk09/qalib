import { ExternalLink, FileText, Loader2, Video } from "lucide-react";
import { useEffect, useState } from "react";
import Sidebar from "../utills/Sidebar";

export default function Resources() {
  const [activeTab, setActiveTab] = useState("video");
  const [loadingVideos, setLoadingVideos] = useState({});
  const [loadingSlides, setLoadingSlides] = useState({});
  const [videos, setVideos] = useState([]);
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch training resources from database
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("https://qalib.cloud/api/training-resources");

        if (!response.ok) {
          throw new Error("Failed to fetch training resources");
        }

        const data = await response.json();
        const resources = data.resources || [];

        // Separate resources by type
        const videoResources = resources
          .filter((resource) => resource.type === "video")
          .map((resource) => ({
            id: resource.id,
            title: resource.title,
            viewUrl: resource.videoUrl,
            downloadUrl: resource.videoUrl,
            description: resource.description,
          }));

        const slideResources = resources
          .filter((resource) => resource.type === "ppt")
          .map((resource) => ({
            id: resource.id,
            title: resource.title,
            viewUrl: resource.videoUrl,
            downloadUrl: resource.videoUrl,
            description: resource.description,
          }));

        setVideos(videoResources);
        setSlides(slideResources);
      } catch (err) {
        console.error("Error fetching resources:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  // const handlePassportView = () => {
  //   window.open(passportUrl, "_blank");
  // };

  const handleVideoView = (url) => {
    window.open(url, "_blank");
  };

  const handleVideoDownload = (url) => {
    window.open(url, "_blank");
  };

  const handleSlideView = (url) => {
    window.open(url, "_blank");
  };

  const handleSlideDownload = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-3">
          <Sidebar />
        </aside>
        <main className="lg:col-span-9 space-y-6">
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-4 sm:py-6 md:py-8 px-3 sm:px-4">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  Library
                </h1>
                <p className="text-sm sm:text-base text-gray-600 px-4">
                  Access your learning materials and documentation
                </p>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex border-b border-gray-200">
                  <button
                    className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 md:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-200 ${
                      activeTab === "video"
                        ? "bg-blue-500 text-white border-b-4 border-blue-700"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("video")}
                  >
                    <Video size={18} className="sm:w-5 sm:h-5" />
                    <span className="hidden xs:inline">Video Resources</span>
                    <span className="xs:hidden">Video</span>
                  </button>
                  <button
                    className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 md:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-200 ${
                      activeTab === "slides"
                        ? "bg-blue-500 text-white border-b-4 border-blue-700"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("slides")}
                  >
                    <FileText size={18} className="sm:w-5 sm:h-5" />
                    <span>Slides</span>
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                      <span className="ml-3 text-gray-600">Loading resources...</span>
                    </div>
                  ) : error ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                      <p className="font-semibold">Error loading resources</p>
                      <p className="text-sm mt-1">{error}</p>
                    </div>
                  ) : activeTab === "video" ? (
                    <div className="video-section py-6 sm:py-8">
                      <div className="text-center mb-6 sm:mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-indigo-100 rounded-full mb-4">
                          <Video size={32} className="text-indigo-600 sm:w-10 sm:h-10" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 px-4">
                          Video Resources
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 px-4">
                          Watch our training videos
                        </p>
                      </div>

                      {videos.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <p>No video resources available</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {videos.map((video) => {
                            // Extract file ID from Google Drive URL for embedding
                            const fileId = video.viewUrl.match(/\/d\/([^/]+)/)?.[1];
                            const embedUrl = fileId
                              ? `https://drive.google.com/file/d/${fileId}/preview`
                              : null;

                            return (
                              <div
                                key={video.id}
                                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                    <Video size={18} className="text-indigo-600" />
                                  </div>
                                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                                    {video.title}
                                  </h3>
                                </div>

                                {/* Video Player */}
                                {embedUrl && (
                                  <div className="mb-3 rounded-lg overflow-hidden bg-gray-900 relative">
                                    {loadingVideos[video.id] !== false && (
                                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                                        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                                      </div>
                                    )}
                                    <iframe
                                      src={embedUrl}
                                      className="w-full aspect-video"
                                      allow="autoplay"
                                      allowFullScreen
                                      onLoad={() =>
                                        setLoadingVideos((prev) => ({
                                          ...prev,
                                          [video.id]: false,
                                        }))
                                      }
                                    ></iframe>
                                  </div>
                                )}

                                <div className="flex flex-wrap gap-2 justify-center">
                                  <button
                                    onClick={() => handleVideoView(video.viewUrl)}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-md hover:bg-gray-200 transition-all"
                                  >
                                    <ExternalLink size={16} />
                                    <span>View</span>
                                  </button>
                                  <button
                                    onClick={() => handleVideoDownload(video.downloadUrl)}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700 transition-all"
                                  >
                                    <ExternalLink size={16} />
                                    <span>Download</span>
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : activeTab === "slides" ? (
                    <div className="slides-section py-6 sm:py-8">
                      <div className="text-center mb-6 sm:mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-indigo-100 rounded-full mb-4">
                          <FileText size={32} className="text-indigo-600 sm:w-10 sm:h-10" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 px-4">
                          Slides (PPT & Docs)
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 mb-3 px-4">
                          View or download your slide decks
                        </p>
                      </div>

                      {slides.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <p>No slide resources available</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {slides.map((slide) => {
                            // Create embed URL from Google Docs/Slides view URL
                            let embedUrl = null;
                            if (slide.viewUrl.includes("/presentation/")) {
                              // For Google Slides
                              embedUrl = slide.viewUrl.replace("/edit", "/embed");
                            } else if (slide.viewUrl.includes("/document/")) {
                              // For Google Docs
                              embedUrl = slide.viewUrl.replace("/edit", "/preview");
                            } else if (slide.viewUrl.includes("drive.google.com/file/d/")) {
                              const fileId = slide.viewUrl.match(/\/d\/([^/]+)/)?.[1];
                              embedUrl = fileId
                                ? `https://drive.google.com/file/d/${fileId}/preview`
                                : null;
                            }

                            return (
                              <div
                                key={slide.id}
                                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                    <FileText size={18} className="text-indigo-600" />
                                  </div>
                                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                                    {slide.title}
                                  </h3>
                                </div>

                                {/* Slide/Document Preview */}
                                {embedUrl && (
                                  <div className="mb-3 rounded-lg overflow-hidden bg-gray-100 relative">
                                    {loadingSlides[slide.id] !== false && (
                                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                                      </div>
                                    )}
                                    <iframe
                                      src={embedUrl}
                                      className="w-full aspect-video"
                                      allowFullScreen
                                      onLoad={() =>
                                        setLoadingSlides((prev) => ({
                                          ...prev,
                                          [slide.id]: false,
                                        }))
                                      }
                                    ></iframe>
                                  </div>
                                )}

                                <div className="flex flex-wrap gap-2 justify-center">
                                  <button
                                    onClick={() => handleSlideView(slide.viewUrl)}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-md hover:bg-gray-200 transition-all"
                                  >
                                    <ExternalLink size={16} />
                                    <span>View</span>
                                  </button>
                                  <button
                                    onClick={() => handleSlideDownload(slide.downloadUrl)}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700 transition-all"
                                  >
                                    <ExternalLink size={16} />
                                    <span>Download</span>
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
