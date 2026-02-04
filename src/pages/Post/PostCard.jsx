import axios from "axios";
import { useState } from "react";

const PostCard = ({ post, onPostDeleted }) => {
  const [liked, setLiked] = useState(post.liked_by_me);
  const [likeCount, setLikeCount] = useState(post.like_count);
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const currentUserEmail = localStorage.getItem("email");
  const isAuthor = post.author_email === currentUserEmail;

  const handleLike = async () => {
    if (loading) return;

    setLoading(true);
    setAnimate(true);

    // optimistic update
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));

    try {
      await axios.post(
        `https://qalib.cloud/api/posts/${post.post_id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (err) {
      // rollback
      setLiked((prev) => !prev);
      setLikeCount((prev) => (liked ? prev + 1 : prev - 1));
      console.error(err);
    } finally {
      setLoading(false);
      setTimeout(() => setAnimate(false), 300);
    }
  };

  const handleDelete = async () => {
    if (deleting) return;

    setDeleting(true);

    try {
      await axios.delete(`https://qalib.cloud/api/posts/${post.post_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setShowMenu(false);
      if (onPostDeleted) {
        onPostDeleted(post.post_id);
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="border rounded-lg border-gray-300 bg-white shadow-sm p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
            {post.author_email.charAt(0).toUpperCase()}
          </div>
          <div className="ml-3">
            <p className="text-sm font-semibold">{post.author_email}</p>
            <p className="text-xs text-gray-500">{new Date(post.created_at).toLocaleString()}</p>
          </div>
        </div>

        {/* Menu Button - Only show for post author */}
        {isAuthor && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100"
            >
              ⋮
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Text */}
      {post.text && <p className="text-sm text-gray-800 mb-3">{post.text}</p>}

      {/* Images */}
      {post.images?.length > 0 && (
        <div
          className={`grid gap-2 mb-3 ${
            post.images.length === 1
              ? "grid-cols-1"
              : post.images.length === 2
                ? "grid-cols-2"
                : "grid-cols-3"
          }`}
        >
          {post.images.map((img, index) => (
            <img key={index} src={img} alt="post" className="w-full h-50 object-cover rounded" />
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center text-sm text-gray-600">
        <button
          onClick={handleLike}
          disabled={loading}
          className={`flex items-center space-x-1 transition-colors duration-200 ${
            liked ? "text-red-500" : "hover:text-red-400"
          }`}
        >
          <span className={`text-lg ${animate ? "animate-like" : ""}`}>{liked ? "❤️" : "🤍"}</span>
          <span>{likeCount}</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
