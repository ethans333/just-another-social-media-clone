export interface UserData {
  id: number;
  username: string;
  profile_picture_url?: string;
  bio?: string | null;
  location?: string | null;
}

export interface PostData {
  id: number;
  user: UserData;
  content: string;
  created_at: string; // ISO 8601 date string
  updated_at: string;
  image_url?: string;
  likes: number;
  comments_count: number;
}

export interface CommentData {
  id: number;
  post: number | PostData;
  user: UserData;
  content: string;
  created_at: string;
}
