import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import api from "../lib/api";
import Post from "@/components/Post";
import type { PostData } from "@/types/models";
import SearchBox from "@/components/SearchBox";

export default function Home() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await api.get("/posts/", {
        params: {
          page: page,
        },
      });
      const newPosts = response.data.results || [];

      setPosts((prev) => [...prev, ...newPosts]);

      // If no more pages, stop fetching
      if (!response.data.next) {
        setHasMore(false);
      }

      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto">
      <div className="max-w-[900px] w-full mb-6">
        <SearchBox />
      </div>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={<h4 className="text-center">Loading...</h4>}
        endMessage={
          <p className="text-center text-muted mt-6">
            <b>No more posts to show</b>
          </p>
        }
        style={{ overflow: "visible" }}
      >
        <div className="grid grid-cols-1 gap-10">
          {posts.map((post: PostData) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </InfiniteScroll>

      {posts.length === 0 && (
        <div className="text-center text-foreground-muted h-[50vh] flex items-center justify-center">
          No posts available.
        </div>
      )}
    </div>
  );
}
