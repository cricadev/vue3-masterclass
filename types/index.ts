export interface User {
  avatar: string;
  bio: string;
  email: string;
  lastVisitAt: number;
  name: string;
  isModerator: boolean;
  registeredAt: number;
  twitter: string;
  username: string;
  usernameLower: string;
  website: string;
  id: string;
}

export interface Thread {
  contributors: string[];
  firstPostId: string;
  forumId: string;
  lastPostAt: number;
  lastPostId: string;
  posts: string[];
  publishedAt: number;
  slug: string;
  title: string;
  userId: string;
  id: string;
}export interface Category {
  forums: string[];
  name: string;
  slug: string;
  id: string;
}
export interface Forum {
  categoryId: string;
  description: string;
  lastPostId: string;
  name: string;
  slug: string;
  threads: string[];
  id: string;
}
export interface Post {
  edited: Edited;
  publishedAt: number;
  text: string;
  threadId: string;
  userId: string;
  id: string;
}

export interface Edited {
  at: number;
  by: string;
  moderated: boolean;
}
export interface Stats {
  postsCount: number;
  threadsCount: number;
  usersCount: number;
  usersOnline: number;
}