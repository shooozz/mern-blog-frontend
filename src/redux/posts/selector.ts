// selectors.ts
import { RootState } from "../store";

export const selectPosts = (state: RootState) => state.posts.items;
export const selectCurrentPost = (state: RootState) => state.posts.currentPost;
export const selectPostsStatus = (state: RootState) => state.posts.status;
