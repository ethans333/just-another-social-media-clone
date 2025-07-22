import api from "@/lib/api";
import type { CommentData } from "@/types/models";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function CommentSheet({ postId }: { postId: number }) {
  const [comments, setComments] = useState<CommentData[]>([]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await api.get(`/posts/${postId}/comments/`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
    fetchComments();
  }, [postId]);

  return (
    <Sheet>
      <SheetTrigger>
        <p className="pt-2 pb-1 text-muted-foreground cursor-pointer">
          View all {comments.length} comments
        </p>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Comments</SheetTitle>
          <SheetDescription className="max-h-[50vh] overflow-y-auto space-y-5 p-2">
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

function Comment({ comment }: { comment: CommentData }) {
  return (
    <div className="flex items-start gap-3 mt-3">
      <img
        src={comment.user.profile_picture_url}
        alt={`${comment.user.username}'s profile`}
        className="w-8 h-8 rounded-full object-cover"
      />
      <div>
        <div className="flex items-center gap-2">
          <Link
            to={`/account/${comment.user.id}`}
            className="font-bold text-foreground"
          >
            {comment.user.username}
          </Link>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(comment.created_at), {
              addSuffix: true,
            })}
          </p>
        </div>
        <p className="mt-1">{comment.content}</p>
      </div>
    </div>
  );
}
