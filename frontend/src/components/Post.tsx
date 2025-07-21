import type { PostData } from "../types/models";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle } from "lucide-react";
import CommentSheet from "./CommentSheet";

export default function Post({ post }: { post: PostData }) {
  return (
    <div className="max-w-[900px] px-7 py-5 border rounded-lg">
      <div className="flex gap-x-[5px] mb-3 items-center">
        <img
          src={post.user.profile_picture_url}
          alt={`${post.user.username}'s profile`}
          className="w-7 h-7 rounded-full object-cover mr-1"
        />
        <p className="font-bold">{post.user.username}</p>
        <p className="text-xl flex items-center justify-center font-bold">
          &middot;
        </p>
        <p className="text-muted-foreground">
          {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
        </p>
      </div>
      <img
        src={post.image_url}
        alt="Post image"
        className="w-full h-128 rounded object-cover mb-3"
      />
      <div className="flex gap-4 pt-3">
        <Heart className="w-6 h-6" strokeWidth={1.5} />
        <MessageCircle className="w-6 h-6" strokeWidth={1.5} />
      </div>
      <p className="pt-2 pb-1 font-bold">{post.likes} likes</p>
      <p className="line-clamp-2 overflow-hidden text-ellipsis">
        <span className="font-bold">{post.user.username}</span> {post.content}
      </p>
      <CommentSheet postId={post.id} />
    </div>
  );
}
