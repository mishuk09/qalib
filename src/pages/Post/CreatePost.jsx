import { useState } from "react";
import axios from "axios";
import { uploadToCloudinary } from "../../utills/cloudinaryUpload";

const CreatePost = ({ onPostCreated }) => {
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageSelect = async (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setLoading(true);
    setError("");

    try {
      const uploadedUrls = [];
      for (const file of files) {
        const url = await uploadToCloudinary(file);
        uploadedUrls.push(url);
      }
      setImages(uploadedUrls);
    } catch (err) {
      console.error(err);
      setError("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim() && images.length === 0) {
      setError("Post cannot be empty");
      return;
    }

    if (text.length > 300) {
      setError("Text must be under 300 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post(
        "http://127.0.0.1:5000/api/posts",
        { text, images },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        }
      );

      setText("");
      setImages([]);
      if (onPostCreated) onPostCreated();
    } catch (err) {
      console.error(err);
      setError("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Textarea */}
        <textarea
          className="w-full resize-none rounded-lg border border-gray-300 p-3 text-sm
                     placeholder-gray-400 focus:outline-none focus:ring-2
                     focus:ring-blue-500 focus:border-blue-500 transition"
          rows={3}
          placeholder="Share something with your network…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={300}
        />

        {/* Actions row */}
        <div className="flex items-center justify-between text-sm">
          <span
            className={`${
              text.length === 300 ? "text-red-500" : "text-gray-400"
            }`}
          >
            {text.length}/300
          </span>

          <label className="inline-flex items-center gap-1 cursor-pointer text-blue-600 hover:text-blue-700 font-medium">
            <span>📷 Add Images</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </label>
        </div>

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg border"
              >
                <img
                  src={img}
                  alt="preview"
                  className="h-24 w-full object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-2.5 text-white font-medium
                     hover:bg-blue-700 active:scale-[0.98] transition
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Posting…" : "Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
