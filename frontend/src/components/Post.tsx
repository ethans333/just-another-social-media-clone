import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { PostData } from "../types/models";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, Ellipsis } from "lucide-react";
import { Link } from "react-router-dom";
import CommentSheet from "./CommentSheet";
import api from "@/lib/api";

export default function Post({ post }: { post: PostData }) {
  return (
    <div className="max-w-[900px] px-7 py-5 border rounded-lg border-input">
      <div className="flex gap-x-[5px] mt-1 mb-4 items-center">
        <Link
          to={`/account/${post.user.id}`}
          className="flex items-center gap-x-2"
        >
          <img
            src={post.user.profile_picture_url}
            alt={`${post.user.username}'s profile`}
            className="w-7 h-7 rounded-full object-cover mr-1"
          />
          <p className="font-bold">{post.user.username}</p>
        </Link>
        <p className="text-xl flex items-center justify-center font-bold">
          &middot;
        </p>
        <p className="text-muted-foreground">
          {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
        </p>
        <div className="ml-auto">
          <PostDropDown postId={post.id} />
        </div>
      </div>
      <img
        src={post.image_url}
        alt="No image found"
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

function PostDropDown({ postId }: { postId: number }) {
  function deletePost() {
    api.delete(`/posts/${postId}/`).catch((error) => {
      console.error("Failed to delete post:", error);
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis className="w-5 h-5 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer">
          Edit Post
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-destructive"
          onClick={deletePost}
        >
          Delete Post
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
