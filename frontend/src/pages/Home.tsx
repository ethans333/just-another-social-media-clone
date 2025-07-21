import { useState, useEffect } from "react";
import api from "../lib/api";
import Post from "@/components/Post";
import type { PostData } from "@/types/models";

export default function Home() {
  const [posts, setPosts] = useState<PostData[] | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await api.get("/posts/");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {posts && (
        <div className="grid grid-cols-1 gap-10 w-full max-w-xl">
          {posts.map((post: PostData) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
