import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Grid3x3 } from "lucide-react";

import api from "@/lib/api";
import type { PostData, UserData } from "@/types/models";
import Post from "@/components/Post";

export default function Account() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserData | null>(null);
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const userResponse = await api.get(`/users/${id}`);
        const postsResponse = await api.get(`/users/${id}/posts`);
        setUser(userResponse.data);
        setPosts(postsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="flex flex-col items-center pt-7">
      {user ? (
        <div>
          <div className="flex space-x-16 mb-6">
            <img
              src={user.profile_picture_url}
              className="rounded-full w-36 h-36"
            />
            <div className="py-10">
              <h2 className="text-xl font-bold">{user.username}</h2>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <p className="text-muted-foreground">{user.location}</p>
              </div>
              <p className="text-muted-foreground w-[600px] pt-5">{user.bio}</p>
            </div>
          </div>
          <div className="w-full max-w-2xl mx-auto pt-10">
            <div className="flex items-center space-x-2">
              <Grid3x3 className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Posts</h2>
            </div>
            <div className="grid grid-cols-1 gap-10 w-full max-w-xl mx-auto py-10">
              {posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
