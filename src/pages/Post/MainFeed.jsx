import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";

const MainFeed = () => {
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

      // // Get user email from localStorage
      // const userEmail = localStorage.getItem("email");

      // // Filter posts to show only those matching the user's email
      // const filteredPosts = userEmail
      //   ? res.data.filter((post) => post.author_email === userEmail)
      //   : res.data;

      setPosts(res.data);
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

      <div className="space-y-2 ">
        {!loading && posts.map((post) => <PostCard key={post.post_id} post={post} />)}
      </div>
    </div>
  );
};

export default MainFeed;
