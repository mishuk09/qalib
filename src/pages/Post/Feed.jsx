import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFeed = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get("https://qalib.cloud/api/feed", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Get user email from localStorage
      const userEmail = localStorage.getItem("email");

      // Filter posts to show only those matching the user's email
      const filteredPosts = userEmail
        ? res.data.filter((post) => post.author_email === userEmail)
        : res.data;

      setPosts(filteredPosts);
    } catch (err) {
      console.error(err);
      setError("Failed to load feed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handlePostDeleted = (postId) => {
    setPosts((prev) => prev.filter((post) => post.post_id !== postId));
  };

  return (
    <div className="   ">
      {/* Create Post */}
      {/* <CreatePost onPostCreated={fetchFeed} /> */}

      {/* Feed */}
      {loading && <p className="text-center text-gray-500">Loading feed...</p>}

      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && posts.length === 0 && (
        <p className="text-center text-gray-500">No posts yet. Be the first to post!</p>
      )}

      <div className="flex gap-2 overflow-x-auto pb-4">
        {!loading &&
          posts.map((post) => (
            <PostCard key={post.post_id} post={post} onPostDeleted={handlePostDeleted} />
          ))}
      </div>
    </div>
  );
};

export default Feed;
