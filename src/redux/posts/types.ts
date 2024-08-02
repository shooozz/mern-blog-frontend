import { Comment, User } from "../types";

export interface FetchPostsParams {
    sortBy?: string;
    sortOrder?: string;
}

export interface Post {
    _id: string;
    title: string;
    text: string;
    tags: string[];
    viewsCount: number;
    user: User;
    createdAt: string;
    updatedAt: string;
    __v: number;
    comments: Comment[];
    id: string;
}

export interface PostsState {
    items: Post[];
    currentPost: Post | null;
    status: "loading" | "loaded" | "error";
}
