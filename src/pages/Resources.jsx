import { ExternalLink, FileText, Video } from "lucide-react";
import { useState } from "react";

export default function Resources() {
  const [activeTab, setActiveTab] = useState("video");

  // Passport URL
  const passportUrl = "https://drive.google.com/drive/folders/1QGBGHea435f8p09V0bkEUiqtdU4n75sf";

  // Videos (MP4) resources
  const videos = [
    {
      title: "Business model",
      viewUrl:
        "https://drive.google.com/file/d/1QkCTjH-8-80Npo6lrDPdB7CQ42WGlQkN/view?usp=drive_link",
      downloadUrl:
        "https://drive.google.com/uc?export=download&id=1QkCTjH-8-80Npo6lrDPdB7CQ42WGlQkN",
    },
    {
      title: "Ideation",
      viewUrl:
        "https://drive.google.com/file/d/1Wh_dcQOJ6hohuEw6UTB4aHimkr-N2FeV/view?usp=drive_link",
      downloadUrl:
        "https://drive.google.com/uc?export=download&id=1Wh_dcQOJ6hohuEw6UTB4aHimkr-N2FeV",
    },
    {
      title: "inspiring_entrepreneur",
      viewUrl:
        "https://drive.google.com/file/d/14dULg_k8iHGsUjXV17IJYajWxKKZf5I9/view?usp=drive_link",
      downloadUrl:
        "https://drive.google.com/uc?export=download&id=14dULg_k8iHGsUjXV17IJYajWxKKZf5I9",
    },
    {
      title: "introtoEntrepreneurs",
      viewUrl:
        "https://drive.google.com/file/d/1Fa-vNQMfIpl8RnIqOFMdBxeLmQarBNYk/view?usp=drive_link",
      downloadUrl:
        "https://drive.google.com/uc?export=download&id=1Fa-vNQMfIpl8RnIqOFMdBxeLmQarBNYk",
    },
    {
      title: "maqasid-alsharia model",
      viewUrl:
        "https://drive.google.com/file/d/121aOmuH7NaZ3hrC7LAPr4Wbz4gTNyww3/view?usp=drive_link",
      downloadUrl:
        "https://drive.google.com/uc?export=download&id=121aOmuH7NaZ3hrC7LAPr4Wbz4gTNyww3",
    },
    {
      title: "market_validation",
      viewUrl:
        "https://drive.google.com/file/d/1ut2rFVMLUOIODpPl_COR-VMKhuFTro6e/view?usp=drive_link",
      downloadUrl:
        "https://drive.google.com/uc?export=download&id=1ut2rFVMLUOIODpPl_COR-VMKhuFTro6e",
    },
    {
      title: "Pitching_1",
      viewUrl:
        "https://drive.google.com/file/d/1A9iRAkgFEKyCvaB9rkjBRf9LVLOY-wGi/view?usp=drive_link",
      downloadUrl:
        "https://drive.google.com/uc?export=download&id=1A9iRAkgFEKyCvaB9rkjBRf9LVLOY-wGi",
    },
    {
      title: "pitching_2",
      viewUrl:
        "https://drive.google.com/file/d/1opLZH8O73VoiDxQBUIdrn-1hhqlcEOD3/view?usp=drive_link",
      downloadUrl:
        "https://drive.google.com/uc?export=download&id=1opLZH8O73VoiDxQBUIdrn-1hhqlcEOD3",
    },
    {
      title: "Traction-1",
      viewUrl:
        "https://drive.google.com/file/d/1V2_8hh4QRwacyHBgmx_46B2URLQSHtIl/view?usp=drive_link",
      downloadUrl:
        "https://drive.google.com/uc?export=download&id=1V2_8hh4QRwacyHBgmx_46B2URLQSHtIl",
    },
    {
      title: "Traction-3",
      viewUrl:
        "https://drive.google.com/file/d/1nusyMG5rdiVnFOgmKqEjdGQXXDItUtnt/view?usp=drive_link",
      downloadUrl:
        "https://drive.google.com/uc?export=download&id=1nusyMG5rdiVnFOgmKqEjdGQXXDItUtnt",
    },
  ];

  // Slides (PPT) resources
  const slides = [
    {
      title: "Business model",
      viewUrl:
        "https://docs.google.com/presentation/d/1w89czCf4Q2FQPHTjOxY3Ap7JwnVf-xWz/edit?usp=drive_link&ouid=111964271464933346710&rtpof=true&sd=true",
      downloadUrl:
        "https://docs.google.com/presentation/d/1w89czCf4Q2FQPHTjOxY3Ap7JwnVf-xWz/export/pptx",
    },
    {
      title: "Ideation",
      viewUrl:
        "https://docs.google.com/presentation/d/1haxZIWacQCsqdIFJZPYx83LYpYOGkjip/edit?usp=drive_link&ouid=111964271464933346710&rtpof=true&sd=true",
      downloadUrl:
        "https://docs.google.com/presentation/d/1haxZIWacQCsqdIFJZPYx83LYpYOGkjip/export/pptx",
    },
    {
      title: "Inspiring Entrepreneur",
      viewUrl:
        "https://docs.google.com/presentation/d/1Y_Q2c5KdA5MPCa4t_7WUPfozuOylUjWW/edit?usp=drive_link&ouid=111964271464933346710&rtpof=true&sd=true",
      downloadUrl:
        "https://docs.google.com/presentation/d/1Y_Q2c5KdA5MPCa4t_7WUPfozuOylUjWW/export/pptx",
    },
    {
      title: "Intro to Entrepreneurship",
      viewUrl:
        "https://docs.google.com/presentation/d/1Onsbweqnd4yvwF4C5g6-yIMDtNjawua_/edit?usp=drive_link&ouid=111964271464933346710&rtpof=true&sd=true",
      downloadUrl:
        "https://docs.google.com/presentation/d/1Onsbweqnd4yvwF4C5g6-yIMDtNjawua_/export/pptx",
    },
    {
      title: "Islamic Entrepreneurship",
      viewUrl:
        "https://docs.google.com/document/d/1v-RbdxFs_DLV5ksRiOixJoLjYEsi8pOn/edit?usp=drive_link&ouid=111964271464933346710&rtpof=true&sd=true",
      downloadUrl:
        "https://docs.google.com/document/d/1v-RbdxFs_DLV5ksRiOixJoLjYEsi8pOn/export?format=docx",
    },
    {
      title: "Market validation",
      viewUrl:
        "https://docs.google.com/presentation/d/1WPBfgGEJb7FTU1uRPdZst_4g6CsMCZZO/edit?usp=drive_link&ouid=111964271464933346710&rtpof=true&sd=true",
      downloadUrl:
        "https://docs.google.com/presentation/d/1WPBfgGEJb7FTU1uRPdZst_4g6CsMCZZO/export/pptx",
    },
    {
      title: "Pitching",
      viewUrl:
        "https://docs.google.com/presentation/d/1l04ZZ5NoBgS69wXnP9vsNtMURxV2xy3B/edit?usp=drive_link&ouid=111964271464933346710&rtpof=true&sd=true",
      downloadUrl:
        "https://docs.google.com/presentation/d/1l04ZZ5NoBgS69wXnP9vsNtMURxV2xy3B/export/pptx",
    },
    {
      title: "Qalb Entrepreneurship",
      viewUrl:
        "https://docs.google.com/document/d/1592PAEWGPqJZFMxpFHgWmm4vOn9Ao9dt/edit?usp=drive_link&ouid=111964271464933346710&rtpof=true&sd=true",
      downloadUrl:
        "https://docs.google.com/document/d/1592PAEWGPqJZFMxpFHgWmm4vOn9Ao9dt/export?format=docx",
    },
    {
      title: "Starting up",
      viewUrl:
        "https://docs.google.com/presentation/d/1A1PpLuyrcw5g9CS4BY83lcaC5Ynx1H25/edit?usp=drive_link&ouid=111964271464933346710&rtpof=true&sd=true",
      downloadUrl:
        "https://docs.google.com/presentation/d/1A1PpLuyrcw5g9CS4BY83lcaC5Ynx1H25/export/pptx",
    },
    {
      title: "Traction",
      viewUrl:
        "https://docs.google.com/presentation/d/1FjL6EmKO_bzBX3BgjNjeHB8087Tc1DqF/edit?usp=drive_link&ouid=111964271464933346710&rtpof=true&sd=true",
      downloadUrl:
        "https://docs.google.com/presentation/d/1FjL6EmKO_bzBX3BgjNjeHB8087Tc1DqF/export/pptx",
    },
    {
      title: "Qalb Entrepreneurial Passport Version 3",
      viewUrl:
        "https://docs.google.com/document/d/144XnaFzAHoajk_hwBIovP6-dcQ8se-wK/edit?usp=drive_link&ouid=111964271464933346710&rtpof=true&sd=true",
      downloadUrl:
        "https://docs.google.com/document/d/144XnaFzAHoajk_hwBIovP6-dcQ8se-wK/export?format=docx",
    },
    {
      title: "Qalb Entrepreneurial Passport",
      viewUrl:
        "https://docs.google.com/document/d/1gufFFbAl13h7hTBjULs5FVd2gjVcFPMP/edit?usp=drive_link&ouid=111964271464933346710&rtpof=true&sd=true",
      downloadUrl:
        "https://docs.google.com/document/d/1gufFFbAl13h7hTBjULs5FVd2gjVcFPMP/export?format=docx",
    },
  ];

  const handlePassportView = () => {
    window.open(passportUrl, "_blank");
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-4 sm:py-6 md:py-8 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Resources
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
            {activeTab === "video" && (
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {videos.map((video) => (
                    <div
                      key={video.title}
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
                      <div className="flex flex-wrap gap-2">
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
                  ))}
                </div>
              </div>
            )}

            {activeTab === "slides" && (
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {slides.map((slide) => (
                    <div
                      key={slide.title}
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
                      <div className="flex flex-wrap gap-2">
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
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
