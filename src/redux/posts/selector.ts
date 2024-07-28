// selectors.ts
import { RootState } from "../store";

export const selectPosts = (state: RootState) => state.posts.items;
export const selectPostsStatus = (state: RootState) => state.posts.status;
