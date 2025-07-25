import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Grid3x3, Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

import api from "@/lib/api";
import type { PostData, UserData } from "@/types/models";
import Post from "@/components/Post";
import EditProfileDialog from "@/components/EditProfileDialog";
import CreatePostDialog from "@/components/CreatePostDialog";

export default function Account({ isMe = false }: { isMe?: boolean }) {
  let { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserData | null>(null);
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let userResponse;

        if (isMe) {
          userResponse = await api.get(`/me`);
          id = userResponse.data.id;
        } else {
          userResponse = await api.get(`/users/${id}`);
        }

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
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">{user.username}</h2>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p className="text-muted-foreground">{user.location}</p>
                  </div>
                </div>
                {isMe ? (
                  <div className="flex space-x-4">
                    <CreatePostDialog />
                    <EditProfileDialog user={user} />
                  </div>
                ) : (
                  <Button variant="outline" className="cursor-pointer">
                    Follow
                  </Button>
                )}
              </div>
              <p className="text-muted-foreground w-[500px] pt-5">{user.bio}</p>
            </div>
          </div>
          <div className="w-full max-w-2xl mx-auto pt-10">
            <div className="flex items-center space-x-2">
              <Grid3x3 className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Posts</h2>
            </div>
            <div className="grid grid-cols-1 gap-10 w-full max-w-xl mx-auto py-10">
              {posts && posts.length > 0 ? (
                posts.map((post) => <Post key={post.id} post={post} />)
              ) : (
                <p className="text-center text-muted-foreground h-[30vh] flex items-center justify-center">
                  No posts available
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
